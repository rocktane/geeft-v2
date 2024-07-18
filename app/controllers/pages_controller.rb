class PagesController < ApplicationController
  def home
    if user_signed_in?
      @user = User.find(current_user.id)
      # Récupérer tous les évènements de l'utilisateur
      @events = Event.where(user: current_user.id).order(:date)
    else
      @user = 'guest'
    end
  end
end
