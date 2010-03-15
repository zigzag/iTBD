require 'test_helper'

class TimelogTest < ActiveSupport::TestCase

  test "duration" do
    t = Timelog.new
    t.start_at = 1.hour.ago
    t.end_at = Time.now
    assert_equal(1.hour, t.duration)
  end

  test "search" do
    result = Timelog.search(Date.parse('2010-01-01'),Date.parse('2010-03-09'),'iTBD')
    assert_equal(1, result.size)
    assert_equal('Coding #iTBD', result[0].task_name)
  end

  test "search should ignore case" do
    result = Timelog.search(Date.parse('2010-01-01'),Date.parse('2010-03-09'),'itbd')
    assert_equal(1, result.size)
    assert_equal('Coding #iTBD', result[0].task_name)
  end
end

