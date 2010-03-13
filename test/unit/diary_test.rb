require 'test_helper'

class DiaryTest < ActiveSupport::TestCase

  setup do
    @d = diaries(:one)
    @d.date = Date.today
    @t1 = tasks(:one)
    @t2 = tasks(:two)
  end

  test "start task" do 
    @d.toggle_task(@t1)
    assert_equal(3, @d.timelogs.count)
    assert_nil(@d.timelogs[0].end_at)
    assert_equal(@t1, @d.current_task)
  end

  test "stop task" do
    @d.toggle_task(@t1)
    @d.toggle_task(@t1)
    assert_equal(3, @d.timelogs.count)
    assert_not_nil(@d.timelogs.last.end_at)
    assert_nil(@d.current_task)
  end

  test "switch task" do
    @d.toggle_task(@t1)
    @d.toggle_task(@t2)
    assert_equal(4, @d.timelogs.count)
    assert_equal(@t2, @d.current_task)
  end
  
  test "update end_at while pulse" do
    @d.toggle_task(@t1)
    assert_nil(@d.timelogs.last.end_at)
    @d.pulse
    should_end_at = @d.timelogs.last.end_at
    assert_not_nil(should_end_at)
    @d.toggle_task(@t1)
    @d.pulse
    assert_equal(should_end_at.to_s, @d.timelogs.last.end_at.to_s)
  end

end
