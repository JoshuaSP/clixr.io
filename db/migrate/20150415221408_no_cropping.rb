class NoCropping < ActiveRecord::Migration
  def change
    remove_column :elements, :resize_property
  end
end
