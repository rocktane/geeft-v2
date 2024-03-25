class GiftsController < ApplicationController
  before_action :authenticate_user!

  def index
    @gifts = Gift.all
  end

  def show
    @gift = Gift.find(params[:id])
  end

  def new
    @gift = Gift.new
  end

  def create
    @gift = Gift.new(gift_params)
    @gift.user = current_user
    if @gift.save!
      redirect_to gift_path(@gift)
    else
      render :new
    end
  end

  private

  def gift_params
    params.require(:gift).permit(:budget, :age, :genre, :occasion, [interests: []], :relationship, :generated_list, :user_id, :event_id)
  end

end
