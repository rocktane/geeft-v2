class GiftsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_client, only: [:create]

  def index
    @gifts = Gift.all
  end

  def show
    @user = current_user
    @event = params[:event_id] ? Event.find(params[:event_id]) : Event.new
    @gift = Gift.find(params[:id])
  end

  def new
    @event = params[:event_id] ? Event.find(params[:event_id]) : Event.new
    @gift = Gift.new
    @gift.event = @event
  end

  def create
    @event = params[:event_id] ? Event.find(params[:event_id]) : Event.new
    @gift = Gift.new(gift_params)
    @gift.event = @event
    @gift.user = current_user
    @gift.interests = @gift.interests.compact_blank
    raise
    @gift.generated_list = @gift.gen_gifts(
                                $client,
                                @gift.budget,
                                @gift.age,
                                @gift.genre,
                                @gift.occasion,
                                @gift.interests,
                                @gift.relationship)
                                .split(/\d+\.\s+/).map(&:strip).compact_blank
    if @gift.save
      redirect_to gift_path(@gift, event_id: @event)
    else
      render :new
    end
  end

  def update
    @gift = Gift.find(params[:id])
    comment = params[:comment]
    @gift.update(generated_list: @gift.update_gifts($client, comment, @gift.interests).split(/\d+\.\s+/).map(&:strip).compact_blank)
    if @gift.save
      redirect_to gift_path(@gift)
    else
      render :new
    end
  end

  def updatelist
    @gift = Gift.find(params[:id])
    @gift.generated_list = [params[:gift][:generated_list]].flatten
    if @gift.save
      respond_to do |format|
        format.json { render json: @gift }
      end
    else
      render :show, status: :unprocessable_entity
    end
  end

  private

  def gift_params
    params.require(:gift).permit(:budget, :age, :genre, :occasion, [interests: []], :relationship, :generated_list, :comment, :user_id, :event_id)
  end

  def set_client
    $client = $client ? $client : OpenAI::Client.new
  end

end
