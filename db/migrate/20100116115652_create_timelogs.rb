class CreateTimelogs < ActiveRecord::Migration
  def self.up
    create_table :timelogs do |t|
      t.datetime :start_at
      t.datetime :end_at
      t.date :date
      t.integer :task_id

      t.timestamps
    end
  end

  def self.down
    drop_table :timelogs
  end
end
