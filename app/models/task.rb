class Task < ActiveRecord::Base
  validates_presence_of :name
  has_many :timelogs, :order => 'start_at'

  def self.todos
    find_all_by_done(false,:order => "priority")
  end

  def self.reorder(new_order)
    new_order.each_with_index { |id,index| Task.find(id).update_attribute(:priority,index+1)}
  end
  
end
