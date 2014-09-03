class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :full_name
      t.string :gender
      t.string :about_me
      t.string :city
      t.string :state
      t.string :country
      t.date :dob
      t.date :member_since
      t.string :locale
      t.string :timezone
      t.timestamps
    end
  end
end
