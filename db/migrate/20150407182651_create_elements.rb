class CreateElements < ActiveRecord::Migration
  def change
    create_table :elements do |t|
      t.integer :placeable_id, null: false
      t.string :placeable_type, null: false
      t.string :type, null: false
      t.string :class
      t.integer :container_id
      t.integer :height
      t.integer :width
      t.integer :top
      t.integer :left
      t.integer :z_index
      t.string :resize_property
      t.text :css
      t.string :url
      t.text :content

      t.timestamps null: false
    end
  end
end
