class ChangeSiteBackgroundOptions < ActiveRecord::Migration
  def change
    remove_column :sites, :body_class
    add_column :sites, :background_css, :text
  end
end
