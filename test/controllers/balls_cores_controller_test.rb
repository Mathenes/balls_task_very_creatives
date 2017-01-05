require 'test_helper'

class BallsCoresControllerTest < ActionDispatch::IntegrationTest
  setup do
    @balls_core = balls_cores(:one)
  end

  test "should get index" do
    get balls_cores_url
    assert_response :success
  end

  test "should get new" do
    get new_balls_core_url
    assert_response :success
  end

  test "should create balls_core" do
    assert_difference('BallsCore.count') do
      post balls_cores_url, params: { balls_core: { color: @balls_core.color, score: @balls_core.score, sum: @balls_core.sum } }
    end

    assert_redirected_to balls_core_url(BallsCore.last)
  end

  test "should show balls_core" do
    get balls_core_url(@balls_core)
    assert_response :success
  end

  test "should get edit" do
    get edit_balls_core_url(@balls_core)
    assert_response :success
  end

  test "should update balls_core" do
    patch balls_core_url(@balls_core), params: { balls_core: { color: @balls_core.color, score: @balls_core.score, sum: @balls_core.sum } }
    assert_redirected_to balls_core_url(@balls_core)
  end

  test "should destroy balls_core" do
    assert_difference('BallsCore.count', -1) do
      delete balls_core_url(@balls_core)
    end

    assert_redirected_to balls_cores_url
  end
end
