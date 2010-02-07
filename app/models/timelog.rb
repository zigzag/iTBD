class Timelog < ActiveRecord::Base
  belongs_to :task
  
  def duration
    (possible_end_at - start_at).to_i
  end

  def to_json(opts=nil)
    option = (opts || {}).merge(:methods => [:duration])
    super(option)
  end

  private 
  def possible_end_at
    return end_at if end_at
    return Time.now if date == Date.today
    return date.to_date.end_of_day
  end
end
