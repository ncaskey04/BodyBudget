class SessionsController < ApplicationController

  def create
      auth = request.env["omniauth.auth"]
      ap auth
      user = User.find_by_provider_and_uid(auth["provider"], auth["uid"]) || User.create_with_omniauth(auth)
      
      user.token = auth["credentials"]["token"]
      user.secret = auth["credentials"]["secret"]
      user.save

      session[:user_id] = user.id
      redirect_to user
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end

end
