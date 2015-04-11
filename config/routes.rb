Rails.application.routes.draw do
  get 'sandbox', to: 'static_pages#sandbox'
  get 'image_upload', to: 'image_upload#show'

  namespace :api do
    resources :sites, only: [:index, :show, :update], defaults: {format: "json"}
  end
  resources :sites, only: [:index, :create, :destroy, :edit]

end
