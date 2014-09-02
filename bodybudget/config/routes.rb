Rails.application.routes.draw do


  get 'users#index'
  get 'articles/index'

  root to: 'users#index'

  resources :users

  get '/login', :to => 'sessions#new', :as => :login
  get '/auth/:provider/callback', :to => 'sessions#create'
  get '/logout', :to => 'sessions#destroy'

end
