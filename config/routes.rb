Rails.application.routes.draw do
  devise_for :users
  get "up" => "rails/health#show", as: :rails_health_check

  root "pages#home"

  get "dashboard" => "events#dashboard", as: :dashboard
  get "link" => "events#link", as: :link

  resources :events do
    resources :gifts, only: [:new, :create]
  end
  resources :gifts do
    resources :events, only: [:new, :create]
  end
end
