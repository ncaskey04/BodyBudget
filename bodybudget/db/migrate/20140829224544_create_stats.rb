class CreateStats < ActiveRecord::Migration
  def change
    create_table :stats do |t|
      t.integer :total_cals
      t.integer :cals_in
      t.integer :cals_burned
      t.integer :yield
      t.date :date
      t.references :user, index: true

      t.timestamps
    end
  end
end
