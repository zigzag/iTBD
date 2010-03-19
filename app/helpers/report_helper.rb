module ReportHelper
  def date_json
    h = {}
    t = Date.today
    h[:Today] = [t, t]
    h[:ThisWeek] = [t.beginning_of_week, t.end_of_week]
    h[:ThisMonth] = [t.beginning_of_month, t.end_of_month]
    h[:ThisYear] = [t.beginning_of_year, t.end_of_year]
    h
  end
end
