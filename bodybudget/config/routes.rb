Rails.application.routes.draw do

  get 'foods/new'

  post 'foods/create'

  delete 'foods/delete'

  get 'foods/index'

  get 'foods/:id', to: 'foods#show'

  get 'fitbit/index'

  get 'fitbit/results'

  root to: 'users#index'

  get 'articles/index'

  get '/login', :to => 'sessions#new', :as => :login
  get '/auth/:provider/callback', :to => 'sessions#create'
  get '/logout', :to => 'sessions#destroy'

  resources :users


end
