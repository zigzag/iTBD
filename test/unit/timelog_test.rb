require 'test_helper'

class TimelogTest < ActiveSupport::TestCase

  test "duration" do
    t = Timelog.new
    t.start_at = 1.hour.ago
    t.end_at = Time.now
    assert_equal(1.hour, t.duration)
  end

end
