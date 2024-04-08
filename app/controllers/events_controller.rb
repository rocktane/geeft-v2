class EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event , only: [:show, :edit, :update, :destroy]

  def dashboard
    @events = Event.where(user: current_user)
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
    if @event.save
      redirect_to event_path(@event)
    else
      render :new
    end
  end

  def edit
  end

  def update
    @event.update(event_params)
    redirect_to event_path(@event)
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

end
