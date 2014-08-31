Rails.application.routes.draw do

  root to: 'users#index'

  resources :users 

  get '/login', :to => 'sessions#new', :as => :login
  get '/auth/:provider/callback', :to => 'sessions#create'
  get '/auth/failure', :to => 'sessions#failure'

end
