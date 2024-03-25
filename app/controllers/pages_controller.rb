class PagesController < ApplicationController

  def home
    if current_user #for connected users
      @user = User.find(current_user.id)
    else #for visitors not connected users
      @user = "guest"
    end
  end

end
