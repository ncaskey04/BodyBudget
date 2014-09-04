class FitbitController < ApplicationController

  def index
  end

  def results
  end

  def show

    @current_user = User.find(session[:user_id])
    gon.results_food = @current_user.fitbit.recent_foods
    gon.results_calsIn = @current_user.fitbit.data_by_time_range("/foods/log/caloriesIn",{:base_date => "2014-09-03",:period => "1d"})
    gon.results_calsOut = @current_user.fitbit.data_by_time_range("/activities/tracker/calories",{:base_date => "2014-09-03",:period => "1d"})
    gon.results_miles = @current_user.fitbit.data_by_time_range("/activities/tracker/distance",{:base_date => "2014-09-03",:period => "1d"})
    gon.results_steps = @current_user.fitbit.data_by_time_range("/activities/tracker/steps",{:base_date => "2014-09-03",:period => "1d"})

    puts @results_calsIn
    puts @results_calsOut
    puts @results_miles
    puts @results_steps

  end

end
