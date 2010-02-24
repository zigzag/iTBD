class CreateDiaries < ActiveRecord::Migration
  def self.up
    create_table :diaries do |t|
      t.integer :current_task_id
      t.date :date

      t.timestamps
    end
  end

  def self.down
    drop_table :diaries
  end
end
