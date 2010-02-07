class AddTaskNameToTimelog < ActiveRecord::Migration
  def self.up
    add_column :timelogs, :task_name, :string
  end

  def self.down
    remove_column :timelogs, :task_name
  end
end
