class Timelog < ActiveRecord::Base
  belongs_to :task
  belongs_to :diary

  def duration
    return 0 unless end_at
    (end_at - start_at).to_i
  end

  def self.search(from,to,tag)
    diaries = Diary.where('date between :from and :to',{:from => from,:to => to})
    timelogs = diaries.includes(:timelogs).map(&:timelogs).flatten
    hit_timelogs = timelogs.select{|x| x.task_name =~ /#{tag}/i}
  end
end
