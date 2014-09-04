class FitbitController < ApplicationController

  def index
  end

  def results

  end

  def show

    @current_user = User.find(session[:user_id])
    # @current_user = User.last
    gon.results_food = @current_user.fitbit.recent_foods
   gon.calsIn = @current_user.fitbit.data_by_time_range("/foods/log/caloriesIn",{:base_date => "2014-09-03",:period => "1d"})
   gon.calsOut = @current_user.fitbit.data_by_time_range("/activities/tracker/calories",{:base_date => "2014-09-03",:period => "1d"})
   gon.miles = @current_user.fitbit.data_by_time_range("/activities/tracker/distance",{:base_date => "2014-09-03",:period => "1d"})
   gon.steps = @current_user.fitbit.data_by_time_range("/activities/tracker/steps",{:base_date => "2014-09-03",:period => "1d"})
   gon.something ="awesome"
    gon.results_food = @results_food

    puts @results_calsIn
    puts @results_calsOut
    puts @results_miles
    puts @results_steps

  end

end
