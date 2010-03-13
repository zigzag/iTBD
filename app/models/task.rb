class Task < ActiveRecord::Base
  validates_presence_of :name
  has_many :timelogs, :order => 'start_at'
  scope :todos, where("done = ?",false).order("priority")

  def self.reorder(new_order)
    new_order.each_with_index { |id,index| Task.find(id).update_attribute(:priority,index+1)}
  end
  
end
