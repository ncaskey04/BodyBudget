class CreateFoods < ActiveRecord::Migration
  def change
    create_table :foods do |t|
      t.string :recipe_name
      t.string :recipe_id
      t.string :recipe_url
      t.string :image_url
      t.references :user, index: true

      t.timestamps
    end
  end
end
