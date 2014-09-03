class SessionsController < ApplicationController

  def create
      auth = request.env["omniauth.auth"]
      ap auth
      user = User.find_by_provider_and_uid(auth["provider"], auth["uid"]) || User.create_with_omniauth(auth)
      session[:user_id] = user.id
      # binding.pry
      redirect_to root_url, :notice => "Signed in!"
  end

  def destroy
    session[:user_id] = nil
    render :text => "You've logged out!"
  end

end