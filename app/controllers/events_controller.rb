class EventsController < ApplicationController
  before_action :set_cache_headers
  before_action :authenticate_user!
  before_action :set_event, only: %i[show edit update destroy]

  def dashboard
    @events = Event.where(user: current_user).order(:date)
    if @events.empty?
      render :dashboard
    else
      @today = Date.today
      @range = (@today.year..@today.next_year(10).year).to_a
      @events_dates = @events.map { |event| event.date.strftime('%Y-%m-%d') }
      start_date = [@events.first.date.beginning_of_month, Date.today.beginning_of_month].min
      end_date = [@events.last.date.beginning_of_month, @today.next_year(10).beginning_of_month].max
      @all_months = (start_date..end_date).map(&:beginning_of_month).uniq
      @future_events = Event.where(user: current_user).where('date >= ?', @today).order(:date)
      @events_by_month = @all_months.map do |month|
        unless @events.select { |e| e.date.beginning_of_month == month }.nil?
          [month, @events.select { |e| e.date.beginning_of_month == month }]
        end
      end.to_h
    end
  end

  def show
    @gift = Gift.new
  end

  def new
    @gift = params[:gift_id] ? Gift.find(params[:gift_id]) : Gift.new
    @event = Event.new(gift: @gift)
  end

  def create
    @gift = params[:gift_id] ? Gift.find(params[:gift_id]) : Gift.new
    @event = Event.new(event_params)
    @event.gift_list = @gift.generated_list
    @event.user = current_user
    @event.gift = @gift if @gift.present?
    if @event.save
      duplicate(@event) if @event.recurrent && !@event.occurrence_from.present?
      redirect_to event_path(@event), notice: "L'évènement a été créé avec succès."
    else
      render :new
    end
  end

  def duplicate(event)
    years_to_cover = 3 # create occurrences for the next 10 years
    year = 1
    while year <= years_to_cover
      new_event = event.dup
      new_event.gift_list = []
      new_event.url = ''
      new_event.occurrence_from = event.id
      new_event.date = event.date.next_year(year)
      new_event.save!
      year += 1
    end
  end

  def edit; end

  def update
    respond_to do |format|
      if @event.update(event_params)
        if !@event.recurrent && Event.where(occurrence_from: @event.id).where('date >= ?', @event.date).exists?
          occurrences = Event.where(occurrence_from: @event.occurrence_from || @event.id).where('date > ?',
                                                                                                @event.date)
          occurrences.each(&:destroy)
        end
        format.html { redirect_to event_path(@event), notice: "L'évènement a été mis à jour." }
        format.json { render json: { message: 'L\'évènement a été mis à jour.', event: @event }, status: :ok }
      else
        format.html do
          flash.now[:alert] = "L'URL n'est pas valide ou il y a d'autres erreurs dans le formulaire."
          render :edit
        end
        format.json { render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity }
      end
    end
  rescue StandardError => e
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/500.html", layout: false, status: :internal_server_error }
      format.json { render json: { error: e.message }, status: :internal_server_error }
    end
  end

  def link
    @event = Event.find(params[:event_id])
    @gift = Gift.find(params[:gift_id])
    @event.gift_list = @gift.generated_list
    if @event.save
      redirect_to event_path(@event)
    else
      render 'gifts/show'
    end
  end

  def destroy
    if Event.where(occurrence_from: @event.id).exists?
      # Si l'événement a des occurrences futures, les supprimer
      occurrences = Event.where(occurrence_from: @event.occurrence_from || @event.id).where('date >= ?', @event.date)
      occurrences.each(&:destroy)
    end
    @event.destroy
    redirect_to dashboard_path, notice: 'Event and its future occurrences were successfully destroyed.'
  end

  private

  def event_params
    params.require(:event).permit(:name, :date, :recurrent, :description, :url, :user_id, :gift_id, :event_id,
                                  gift_list: [])
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def set_cache_headers
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
  end
end
