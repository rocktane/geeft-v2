Rails.application.routes.draw do
  devise_for :users
  get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"

  get "dashboard" => "events#dashboard", as: :dashboard

  resources :events do
    resources :gifts, only: [:new, :create]
  end
  resources :gifts
end
