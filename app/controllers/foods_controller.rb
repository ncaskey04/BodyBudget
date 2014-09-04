class FoodsController < ApplicationController
  before_action :is_authenticated?
  
  def index
  end

  def show
    id = params[:id]
    

    request = Typhoeus.get(
      "http://api.yummly.com/v1/api/recipe/"+id+"?_app_id=c1253ae0&_app_key=93339743e1f51102f39071380a7c414c"
      # :params => {:s => @query}
      )
    @deets = JSON.parse(request.body)
    ap @deets
    @rating = JSON.parse(request.body)["rating"]
    @serving = JSON.parse(request.body)["numberOfServings"]
    @results = JSON.parse(request.body)["ingredientLines"]
    @url = JSON.parse(request.body)["source"]["sourceRecipeUrl"]

    
  end

  def new
  end

  def create
  end

  def update
  end

  def destroy
  end
end
