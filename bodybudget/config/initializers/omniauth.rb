Rails.application.config.middleware.use OmniAuth::Builder do
  provider :fitbit, '959e020d204549509cdbaaa5f5e21c2b', '52b465fa0a694a908bf3593bbd3fd365'
end