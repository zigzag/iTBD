require 'test_helper'

class TimelogsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:timelogs)
  end

  test "should create timelog" do
    assert_difference('Timelog.count') do
      post :create, :timelog => timelogs(:one).attributes
    end

    assert_response :success
  end

  test "should show timelog" do
    get :show, :id => timelogs(:one).to_param
    assert_response :success
  end

  test "should update timelog" do
    put :update, :id => timelogs(:one).to_param, :timelog => timelogs(:one).attributes
    assert_response :success
  end

  test "should destroy timelog" do
    assert_difference('Timelog.count', -1) do
      delete :destroy, :id => timelogs(:one).to_param
    end

    assert_response :success
  end
end
