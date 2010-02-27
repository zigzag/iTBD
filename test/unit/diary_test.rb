require 'test_helper'

class DiaryTest < ActiveSupport::TestCase

  setup do
    @d = diaries(:one)
    @t1 = tasks(:one)
    @t2 = tasks(:two)
  end

  test "start task" do 
    @d.toggle_task(@t1)
    assert_equal(1, @d.timelogs.count)
    assert_nil(@d.timelogs[0].end_at)
    assert_equal(@t1, @d.current_task)
    assert_equal(Date.today, @d.date)
  end

  test "stop task" do
    @d.toggle_task(@t1)
    @d.toggle_task(@t1)
    assert_equal(1, @d.timelogs.count)
    assert_not_nil(@d.timelogs[0].end_at)
    assert_nil(@d.current_task)
  end

  test "switch task" do
    @d.toggle_task(@t1)
    @d.toggle_task(@t2)
    assert_equal(2, @d.timelogs.count)
    assert_not_nil(@d.timelogs[0].end_at)
    assert_nil(@d.timelogs[1].end_at)
    assert_equal(@t2, @d.current_task)
  end
  
  test "today's tasks" do
    @d.toggle_task(@t1)
    sleep(1)
    @d.toggle_task(@t1)
    assert_equal(1, @d.tasks_today.count)
    assert_equal("Coding", @d.tasks_today[0][:name])
    assert_equal(1,@d.tasks_today[0][:seconds])
    @d.toggle_task(@t2)
  end

  test "total_seconds and left_seconds in diary" do
    @d.toggle_task(@t1)
    sleep(1)
    @d.toggle_task(@t1)
    assert_equal(1, @d.total_seconds)
    assert_equal(8.hours - 1, @d.left_seconds)
    puts @d.to_json
  end

  test "update end_at while pulse" do
    @d.toggle_task(@t1)
    assert_nil(@d.timelogs[0].end_at)
    @d.pulse
    assert_not_nil(@d.timelogs[0].end_at)
  end

end
