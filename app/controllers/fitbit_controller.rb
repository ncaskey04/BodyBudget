class FitbitController < ApplicationController

  def index
  end

  def results

  end

  def show

    @current_user = User.find(session[:user_id])
    @results_food = @current_user.fitbit.recent_foods
    @results_calsIn = @current_user.fitbit.data_by_time_range("/foods/log/caloriesIn",{:base_date => "2014-09-03",:period => "1d"})
    puts @results_calsIn

  end

end
