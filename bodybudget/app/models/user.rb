class User < ActiveRecord::Base
  has_many :stats
  has_many :foods
  has_many :authorizations

  has_secure_password

  validates :first_name,
            :presence => true,
            :length => {:minimum => 2}

  validates :last_name,
            :presence => true,
            :length => {:minimum => 2}

  validates :email,
            :presence => true,
            :format => {with: /\A([\w-]|\.)+@([\w-]|\.)+\.[a-z]{2,3}\z/i},
            :uniqueness => {case_sensitive: false}

  # validates :password,
  #           :presence => true,
  #           :length => {:minimum => 6}, on: :create

  def self.authenticate email, password
    User.find_by_email(email).try(:authenticate,password)
  end

  def set_password_reset
    # puts self.inspect
    self.code = SecureRandom.urlsafe_base64
    self.expires_at = 4.hours.from_now
    self.save!(validate: false)
  end

  def add_provider(auth_hash)
    # Check if the provider already exists, so we don't add it twice
    unless authorizations.find_by_provider_and_uid(auth_hash["provider"], auth_hash["uid"])
      Authorization.create :user => self, :provider => auth_hash["provider"], :uid => auth_hash["uid"]
    end
  end

end
