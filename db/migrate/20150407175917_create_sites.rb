class CreateSites < ActiveRecord::Migration
  def change
    create_table :sites do |t|
      t.integer :user_id, default: 0, null: false, index: true
      t.string :title, null: false
      t.string :published_address, unique: true, index: true
      t.string :thumbnail_url
      t.string :background_url
      t.string :body_class
      t.string :body_css
      t.string :transition

      t.timestamps null: false
    end
  end
end
