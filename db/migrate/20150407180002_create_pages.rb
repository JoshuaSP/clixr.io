class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.references :site, index: true
      t.string :name
      t.integer :ord

      t.timestamps null: false
    end
    add_foreign_key :pages, :sites
  end
end
