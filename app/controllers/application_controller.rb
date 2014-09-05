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

  # def page_not_found
  #   respond_to do |format|
  #     format.html { render template: 'errors/not_found_error', layout: 'layouts/application', status: 404 }
  #     format.all  { render nothing: true, status: 404 }
  #   end
  # end
  
  def is_authenticated?
    redirect_to root_url if session[:user_id].nil?
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if !@current_user
  end

  private
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

end
