class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  after_filter :cors_set_access_control_headers
  helper_method :current_user

 	def cors_set_access_control_headers
  	headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
  	headers['Access-Control-Request-Method'] = '*'
  	headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end

  def is_authenticated?
    redirect_to login_url if session[:user_id].nil?
    # redirect_to login_url  unless current_user
  end

  private
  def current_user
    @current_user ||= User.find(session[:user_id]) if !@current_user
  end

end
