class SitesController < ApplicationController
  before_action :is_authenticated?, :except => [:index, :show]

  def index
  end

  def show
  end

  def new
  end
  
end
