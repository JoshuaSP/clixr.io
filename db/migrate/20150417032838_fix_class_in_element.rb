class FixClassInElement < ActiveRecord::Migration
  def change
    change_table :elements do |t|
      t.rename :class, :element_class
    end
  end
end
