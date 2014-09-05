Rails.application.routes.draw do

  get 'sites/index'

  get 'sites/show'

  get 'sites/new'

  get 'foods/new'

  post 'foods/create'

  delete 'foods/delete'

  get 'foods/index'

  get 'foods/:id', to: 'foods#show'

  root to: 'sites#index'

  get 'articles/index'

  get '/login', :to => 'sessions#new', :as => :login
  get '/auth/:provider/callback', :to => 'sessions#create'
  get '/logout', :to => 'sessions#destroy'

  # if Rails.env.development?
  #  get '404', :to => 'application#page_not_found'
  # end

  resources :users

end
