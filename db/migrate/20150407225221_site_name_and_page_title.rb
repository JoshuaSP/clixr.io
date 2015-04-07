class SiteNameAndPageTitle < ActiveRecord::Migration
  def change
    change_table :sites do |t|
      t.rename :title, :name
    end

    change_table :pages do |t|
      t.rename :name, :title
    end
  end
end
