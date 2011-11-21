class CreateCustomers < ActiveRecord::Migration
  def self.up
    create_table :customers do |t|
      t.string :name
      t.text :description
      t.boolean :active
      t.date :join_date
      t.decimal :debt, :precision => 2, :scale => 11
      t.float :rating

      t.timestamps
    end
  end

  def self.down
    drop_table :customers
  end
end
