class RemoveDateFromTimelog < ActiveRecord::Migration
  def self.up
    remove_column :timelogs, :date
  end

  def self.down
    add_column :timelogs, :date, :date
  end
end
