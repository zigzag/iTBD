class Diary < ActiveRecord::Base
  WORKING_HOURS = 8.hours

  has_many :timelogs
  belongs_to :current_task, :class_name => "Task"
  after_initialize :set_default_date

  def set_default_date 
    self.date ||= Date.today
  end

  def pulse
    timelogs.last.try(:update_attribute,:end_at,Time.now) if (current_task && date == Date.today)
  end

  def toggle_task(task)
    pulse
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
      task_hash[log.task.id] ||= {:id => log.task.id, :name => log.task_name,:seconds => 0}
      task_hash[log.task.id][:seconds] += log.duration
    end 
    task_hash.values
  end
  
  def to_json(opt=nil)
    super((opt||{}).merge(:include => :timelogs, :methods => [:tasks_today,:duration,:total_seconds,:left_seconds]))
  end

  def total_seconds
    @total_seconds ||= timelogs.all.sum(&:duration)
  end

  def left_seconds
    (WORKING_HOURS - total_seconds).to_i
  end

end
