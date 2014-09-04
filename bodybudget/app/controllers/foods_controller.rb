class FoodsController < ApplicationController
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
    
    @results = JSON.parse(request.body)["ingredientLines"]

    
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
