require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test "get todo list" do
    todos = Task.todos
    assert_equal(2, todos.size)
    assert(!todos.first.done?, "Should be not done")
    assert(!todos.last.done?, "Should be not done")
  end

  test "reorder should change the priority" do
    todos = Task.todos
    assert_equal("Review", todos.first.name)

    Task.reorder(todos.map(&:id).reverse)
    todos = Task.todos
    assert_equal("Review", todos.last.name)
  end
  
  test "calculate hours from timelogs" do
    task = Task.new
    
    t1 = Timelog.new
    t1.start_at = 1.hour.ago
    t1.end_at = Time.now
    task.timelogs << t1
    
    t2 = Timelog.new
    t2.start_at = 2.hours.ago
    t2.end_at = Time.now
    task.timelogs << t2
    
    assert_equal(3.hours, task.hours)
  end

  test "start task will have a timelog created and be actived" do
    assert_equal(2, tasks(:one).timelogs.size)
    assert(!tasks(:one).active?, "Task should NOT be active before start")
    tasks(:one).start
    assert_equal(3, tasks(:one).timelogs.size)
    assert_equal(Date.today, tasks(:one).timelogs.last.date)
    assert(tasks(:one).active?, "Task should be active after start")
  end
  
  test "stop task will finish the last timelog today" do
    tasks(:one).start
    assert(tasks(:one).active?, "Task should be active after start")
    assert_nil(tasks(:one).timelogs.last.end_at)
    tasks(:one).stop
    assert(!tasks(:one).active?, "Task should NOT be active after stop")
    assert_not_nil(tasks(:one).timelogs.last.end_at)
  end

  test "stop task will NOT finish the last timelog in the other day" do
    tasks(:one).stop
    assert(!tasks(:one).active?, "Task should NOT be active after stop")
    assert_nil(tasks(:one).timelogs.last.end_at)
  end

end
