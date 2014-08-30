class User < ActiveRecord::Base
  has_many :stats
  has_many :foods

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

  validates :password,
            :presence => true,
            :length => {:minimum => 6}, on: :create

  # validates :token,
  #           :presence => true

  def self.authenticate email, password
    User.find_by_email(email).try(:authenticate,password)
  end

  def set_password_reset
    # puts self.inspect
    self.code = SecureRandom.urlsafe_base64
    self.expires_at = 4.hours.from_now
    self.save!(validate: false)
  end


end
