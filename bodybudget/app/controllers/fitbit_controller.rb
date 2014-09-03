class FitbitController < ApplicationController

  def index
  end

  def results

  # set up new Typhoeus request with test API call (Will's info)
  #   Typhoeus::Request.new("http://api.fitbit.com/1/user/2W54P4/activities/date/2014-02-25.json",
  #     method: "get",
  #     # header information needed for authentication
  #     headers: {
  #       Authorization: 'OAuth oauth_consumer_key="959e020d204549509cdbaaa5f5e21c2b"',
  #       oauth_signature_method: "HMAC-SHA1",
  #       # having issues with these 2 parameters...
  #       oauth_timestamp: Time.new.to_i,
  #       oauth_nonce: SecureRandom.urlsafe_base64
  #       },
  #     params: {oauth_token: request.env["omniauth.auth"]["credentials"]["token"]}
  #     )

  end

  def show
  end

end
