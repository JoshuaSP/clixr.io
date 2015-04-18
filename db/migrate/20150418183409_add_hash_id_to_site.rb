class AddHashIdToSite < ActiveRecord::Migration
  def change
    add_column :sites, :hash_id, :string
  end
end
