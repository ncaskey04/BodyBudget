module Fitgem
  class Client
   
    def foods_on_date(date)
      get("/user/#{@user_id}/foods/log/date/#{format_date(date)}.json")
    end

    def food_goals
      get("/users/#{@user_id}/foods/log/goal.json")
    end

  end
end