require 'rails_helper'

RSpec.describe FitbitController, :type => :controller do

  describe "GET index" do
    it "returns http success" do
      get :index
      expect(response).to be_success
    end
  end

  describe "GET results" do
    it "returns http success" do
      get :results
      expect(response).to be_success
    end
  end

end
