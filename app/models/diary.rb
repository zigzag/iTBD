class Diary < ActiveRecord::Base
  has_many :timelogs
  belongs_to :current_task, :class_name => "Task"
  after_initialize :set_default_date

  def set_default_date 
    self.date = Date.today
  end

  def toggle_task(task)
    last_timelog = timelogs.last
    last_timelog.update_attribute(:end_at,Time.now) if last_timelog
    if (task == current_task)
      self.current_task = nil
    else
      timelog = Timelog.create(:start_at => Time.now,
                              :task => task,
                              :task_name => task.name)
      timelogs << timelog
      self.current_task = task
    end
    save
  end
  
  def tasks_today
    task_hash = {}
    timelogs.each do |log|
      task_hash[log.task.id] ||= {:name => log.task_name,:seconds => 0}
      task_hash[log.task.id][:seconds] += log.duration
    end 
    task_hash.values
  end
  
  def to_json(opt=nil)
    super((opt||{}).merge(:include => :timelogs, :methods => [:tasks_today,:duration]))
  end
end
