class SimplifyElementsAndChangePages < ActiveRecord::Migration
  def change
    remove_column :elements, :container_id
    remove_column :elements, :height
    remove_column :elements, :width
    remove_column :elements, :top
    remove_column :elements, :left
    remove_column :elements, :z_index
    add_column :pages, :url, :string
  end
end
