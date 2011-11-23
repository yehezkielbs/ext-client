class CreateInitialSchema < ActiveRecord::Migration
  def self.up
    create_table :customer_groups do |t|
      t.string :name
      t.text :description

      t.timestamps
    end

    create_table :customers do |t|
      t.string :name
      t.text :description
      t.boolean :active
      t.date :join_date
      t.decimal :debt, :precision => 2, :scale => 11
      t.float :rating
      t.references :customer_group

      t.timestamps
    end
  end

  def self.down
    drop_table :customers
    drop_table :customer_groups
  end
end
