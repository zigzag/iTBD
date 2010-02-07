class RemoveHoursFromTask < ActiveRecord::Migration
  def self.up
    remove_column :tasks, :hours
  end

  def self.down
    add_column :tasks, :hours, :integer
  end
end
