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
end
