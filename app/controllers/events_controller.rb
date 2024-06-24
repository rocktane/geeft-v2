class EventsController < ApplicationController
  before_action :set_cache_headers
  before_action :authenticate_user!
  before_action :set_event , only: [:show, :edit, :update, :destroy]

  def dashboard
    # Pour avoir les evenements organisés par mois
    @events = Event.where(user: current_user).order(:date)
    @eventsDates = @events.map { |event| event.date.strftime("%Y-%m-%d") }
    # start_date = Date.today.beginning_of_month
    # end_date = 1.year.from_now.beginning_of_month
    start_date = [@events.first.date.beginning_of_month, Date.today.beginning_of_month].min
    end_date = @events.last.date.beginning_of_month
    @all_months = (start_date..end_date).map(&:beginning_of_month).uniq
    @today = Date.today
    @events_by_month = @all_months.map do |month|
      unless @events.select { |e| e.date.beginning_of_month == month }.nil?
        [month, @events.select { |e| e.date.beginning_of_month == month }]
      end
    end.to_h
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
    @event.gift = @gift
    if @event.save
      redirect_to event_path(@event), notice: "L'évènement a été créé avec succès."
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @event.update(event_params)
      redirect_to event_path(@event), notice: 'L\'évènement a été mis à jour.'
    else
      flash.now[:alert] = "L'URL n'est pas valide ou il y a d'autres erreurs dans le formulaire."
      render :edit
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

  # def add_gifts
  #   @event.update(event_params)
  #   redirect_to event_path(@event)
  # end

  def destroy
    @event.destroy
    redirect_to dashboard_path
  end

  private

  def event_params
    params.require(:event).permit(:name, :date, :description, :url, :gift_list, :user_id, :gift_id, :event_id)
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def set_cache_headers
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
  end

end
