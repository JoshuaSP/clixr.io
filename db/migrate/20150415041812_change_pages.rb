class ChangePages < ActiveRecord::Migration
  def change
    remove_column :pages, :url
    add_column :pages, :address, :string
  end
end
