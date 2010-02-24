class RemoveActiveFromTask < ActiveRecord::Migration
  def self.up
    remove_column :tasks, :active 
  end

  def self.down
    add_column :tasks, :active, :boolean
  end
end
