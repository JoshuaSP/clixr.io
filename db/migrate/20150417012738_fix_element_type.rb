class FixElementType < ActiveRecord::Migration
  def change
    change_table :elements do |t|
      t.rename :type, :element_type
    end
  end
end
