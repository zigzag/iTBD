require 'test_helper'

class TimelogTest < ActiveSupport::TestCase
  test "duration for already ended timelog at the same day" do
    t = Timelog.new
    t.start_at = 1.hour.ago
    t.end_at = Time.now
    assert_equal(1.hour, t.duration)
  end
  test "duration for not-ended timelog at the same day" do
    t = Timelog.new
    t.start_at = 2.hours.ago
    t.end_at = nil
    t.date = Date.today
    assert_equal(2.hours, t.duration)
  end
  test "duration for not-ended timelog for different days" do
    t = Timelog.new
    t.date = 1.days.ago
    t.start_at = 24.hours.ago
    t.end_at = nil
    assert_equal((Time.now.end_of_day - Time.now).to_i, t.duration)
  end

end
