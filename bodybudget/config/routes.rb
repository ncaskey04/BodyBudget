Rails.application.routes.draw do

  get 'fitbit/index'

  get 'fitbit/results'

  root to: 'users#index'

  get 'articles/index'

  get '/login', :to => 'sessions#new', :as => :login
  get '/auth/:provider/callback', :to => 'sessions#create'
  get '/logout', :to => 'sessions#destroy'

  resources :users

end
