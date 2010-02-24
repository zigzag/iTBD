class AddDiaryToTimelog < ActiveRecord::Migration
  def self.up
    add_column :timelogs, :diary_id, :integer
  end

  def self.down
    remove_column :timelogs, :diary_id
  end
end
