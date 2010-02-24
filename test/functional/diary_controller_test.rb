require 'test_helper'

class DiaryControllerTest < ActionController::TestCase
  # Replace this with your real tests.
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should toggle task" do
    put :toggle, :id => tasks(:one).to_param
    assert_response :success
  end
end
