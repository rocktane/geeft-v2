class PagesController < ApplicationController

  def home
    if current_user
      @user = User.find(current_user.id)
      # Organisation des événements par mois
      @events = Event.all.order(:date)
      start_date = Date.today.beginning_of_month
      end_date = 2.month.from_now.beginning_of_month
      all_months = (start_date..end_date).map(&:beginning_of_month).uniq
      @events_by_month = all_months.map do |month|
        [month, @events.select { |e| e.date.beginning_of_month == month }]
      end.to_h
    else
      @user = "guest"
    end
  end
end
