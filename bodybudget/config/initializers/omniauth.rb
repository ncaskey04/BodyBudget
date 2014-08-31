Rails.application.config.middleware.use OmniAuth::Builder do
  provider :fitbit, ENV["FIT_BIT_KEY"], ENV['FIT_BIT_SECRET']
end 