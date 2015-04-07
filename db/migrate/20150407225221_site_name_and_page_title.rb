class SiteNameAndPageTitle < ActiveRecord::Migration
  def change
    change_table :pages do |t|
      t.rename :name, :title
    end
  end
end
