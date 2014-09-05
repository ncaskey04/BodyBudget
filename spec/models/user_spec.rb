require 'rails_helper'

RSpec.describe User, :type => :model do

  it " should create a user with the new syntax" do
    Angga = User.new(provider: "fitbit", uid: "2W45SG", full_name: "Angga Putra", gender: "MALE", country: "US")
    expect(Angga.provider).to eq(["fitbit"])
      expect(Angga.uid).to eq(["2W45SG"])
      expect(Angga.full_name).to eq(["info"]["Angga Putra"])
      expect(Angga.gender).to eq(["info"]["MALE"])
  	end

end
