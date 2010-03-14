class DiaryController < ApplicationController
  # GET /diary
  def index
  end

  def pulse
    diary_today.pulse
    render(:json => diary_today.to_json)
  end
  
  # PUT /diary/1
  def toggle
    diary_today.toggle_task(Task.find(params[:id]))
    render(:json => diary_today.to_json)
  end

  private 
  def diary_today
     @diary_today ||= Diary.find_or_create_by_date Date.today
  end

end
