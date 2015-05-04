Rails.application.routes.draw do
  root 'sites#new'

  namespace :api do
    resources :sites, only: [:show, :update], defaults: {format: "json"}
    get 'sites/:id/address', to: 'sites#check_address'
    resources :pages, only: [:create, :show, :update, :destroy], defaults: {format: "json"}
    resources :elements, only: [:create, :show, :update, :destroy], defaults: {format: "json"}
  end

  resources :sites, only: [:index, :create, :destroy, :edit]

  get "keep_alive", to: 'keep_alive#live'

  get ':sitename', to: 'sites#show'
end
