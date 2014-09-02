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

  def self.authenticate email, password
    User.find_by_email(email).try(:authenticate,password)
  end

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["display_name"]
      user.picURL = auth["extra"]["raw_info"]["user"]["avatar150"]
    end
  end

end
