Rails.application.routes.draw do
  get 'sandbox', to: 'static_pages#sandbox'
  get 'image_upload', to: 'image_upload#show'

  namespace :api do
    resources :sites, only: [:show, :update], defaults: {format: "json"}
    resources :pages, only: [:create, :show, :update], defaults: {format: "json"}
    resources :elements, only: [:create, :show, :update, :destroy], defaults: {format: "json"}
  end
  resources :sites, only: [:index, :create, :destroy, :edit]

  get '[:sitename]', to: 'sites#show'
end
