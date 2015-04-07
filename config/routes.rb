Rails.application.routes.draw do
  namespace :api do
    resources :sites, only: [:index, :show, :update]
  end
  resources :sites, only: [:index, :create, :destroy, :edit]

end
