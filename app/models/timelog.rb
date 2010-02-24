class Timelog < ActiveRecord::Base
  belongs_to :task
  belongs_to :diary

  def duration
    return 0 unless end_at
    (end_at - start_at).to_i
  end

end
