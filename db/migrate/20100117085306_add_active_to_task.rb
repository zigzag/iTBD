class AddActiveToTask < ActiveRecord::Migration
  def self.up
    add_column :tasks, :active, :boolean
    add_column :tasks, :priority, :integer
  end

  def self.down
    remove_column :tasks, :priority
    remove_column :tasks, :active
  end
end
