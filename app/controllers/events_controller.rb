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
      @event = Event.new
    end

  def create
    @event = Event.new(event_params)
    @event.user = current_user
    if @event.save
      redirect_to dashboard_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    @event.update(event_params)
    redirect_to dashboard_path
  end

  def destroy
    @event.destroy
    redirect_to dashboard_path
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

end
