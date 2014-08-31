class SessionsController < ApplicationController

  def new
  end

  def create

  	auth_hash = request.env['omniauth.auth']
   
    @authorization = Authorization.find_by_provider_and_uid(auth_hash["provider"], auth_hash["uid"])
    if @authorization
      render :text => "Welcome back #{@authorization.user.first_name}! You have already signed up."
    else
      user = User.new :first_name => auth_hash["info"]["first_name"],
                      :last_name => auth_hash["info"]["last_name"],
                      :email => auth_hash["info"]["email"]
                      # don't forget to deal with password issues in auth_hash before deployment!
      user.authorizations.build :provider => auth_hash["provider"], :uid => auth_hash["uid"]
      user.save
   
      render :text => "Hi #{user.first_name}! You've signed up."
    end

  end

  def failure
  end

end
