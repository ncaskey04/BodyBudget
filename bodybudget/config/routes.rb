Rails.application.routes.draw do

  # this will set up a route to log into fitbit, create a new session, and set the path variable to 'login'
  get  '/login', :to => 'sessions#new', :as => :login

  # user authorizes our app to use fitbit data and redirects to sessions#create to make use of their fitbit data
  get '/auth/fitbit/callback', to: 'sessions#create'

  # handler for authorization failure (auth issue, or user doesn't authorize us to use their info)
  get '/auth/failure', :to => 'sessions#failure'

end
