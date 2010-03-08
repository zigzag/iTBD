class ReportController < ApplicationController
  def index
    @details = Timelog.search(Date.today,Date.today,'')
    @total_hours = @details.sum(&:duration)
  end

  def list
    @details = Timelog.search(Date.parse(params[:from]),Date.parse(params[:to]),params[:tag])
    @total_hours = @details.sum(&:duration)
    render(:partial => 'report_detail') 
  end
end
