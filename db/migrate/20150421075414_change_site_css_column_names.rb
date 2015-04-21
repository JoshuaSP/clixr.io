class ChangeSiteCssColumnNames < ActiveRecord::Migration
  def change
    change_table :sites do |t|
      t.rename :body_css, :image_cover_css
    end
  end
end
