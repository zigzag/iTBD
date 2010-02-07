class Task < ActiveRecord::Base
  validates_presence_of :name
  has_many :timelogs, :order => 'start_at'

  def initialize(opt=nil)
    super(opt)
    self.done = false
    self.active = false
  end

  def self.todos
    find_all_by_done(false,:order => "priority")
  end

  def self.reorder(new_order)
    new_order.each_with_index { |id,index| Task.find(id).update_attribute(:priority,index+1)}
  end
  
  def hours
    timelogs.enum_for.sum(&:duration)
  end

  def start
    timelogs.create :date => Date.today, :task_name => name, :start_at => Time.now
    update_attribute(:active,true)
  end

  def stop
    last_timelog = timelogs.last
    last_timelog.update_attribute(:end_at,Time.now) if (last_timelog && last_timelog.date == Date.today)
    update_attribute(:active,false)
  end
  
  def toggle
    (active?) ? stop : start
  end
  
  def to_json(opts=nil)
    option = (opts || {}).merge(:methods => [:hours])
    super(option)
  end
  
end
