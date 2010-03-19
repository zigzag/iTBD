class ReportController < ApplicationController

  DATE_PREIOD = [:Today, :ThisWeek, :ThisMonth, :ThisYear]

  def index
    @details = Timelog.search(Date.today,Date.today,'')
    sum_up
  end

  def list
    @details = Timelog.search(Date.parse(params[:from]),Date.parse(params[:to]),params[:tag])
    sum_up
  end

  private
  def sum_up
    @total_hours = @details.sum(&:duration)
  end
end
