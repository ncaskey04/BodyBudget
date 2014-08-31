class SessionsController < ApplicationController
  
  def new
  end

  def create

    # set a variable to get auth_token info
    auth_hash = request.env['omniauth.auth']
    # show the auth_token info
    render :text => auth_hash.inspect

  end

  def failure
  end

end
