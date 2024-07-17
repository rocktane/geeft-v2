Rails.application.routes.draw do
  devise_for :users
  # devise_for :users, controllers: {
  #   sessions: 'users/sessions',
  #   registrations: 'users/registrations'
  # }

  get 'up' => 'rails/health#show', as: :rails_health_check

  root 'pages#home'

  patch 'updatelist/:id' => 'gifts#updatelist', as: :updatelist

  get 'dashboard' => 'events#dashboard', as: :dashboard
  get 'link' => 'events#link', as: :link

  resources :events do
    resources :gifts, only: %i[new create]
  end
  resources :gifts do
    resources :events, only: %i[new create]
  end
end
