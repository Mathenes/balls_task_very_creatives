require 'test_helper'

class BallsCoreControllerTest < ActionDispatch::IntegrationTest
  setup do
    @balls_core_pink   = BallsCore.new({sum:1})
    @balls_core_green  = BallsCore.new({sum:3})
    @balls_core_blue   = BallsCore.new({sum:5})
    @balls_core_purple = BallsCore.new({sum:15})
  end

  test "should get index" do
    get balls_core_index_url
    assert_response :success
  end

  test "should post successfully to send_sum with the right parameter" do
    post send_sum_balls_core_index_url, params: { balls_core: { sum: 1 } }, xhr: true
    assert_response :success
  end

  test "should not post successfully to send_sum with sum blank" do
    post send_sum_balls_core_index_url, params: { balls_core: { sum: "" } }
    assert_response :unprocessable_entity
  end

  test "should not post successfully to send_sum with sum is not an integer" do
    post send_sum_balls_core_index_url, params: { balls_core: { sum: "whatever" } }
    assert_response :unprocessable_entity
  end

  test "should not post successfully to send_sum with the wrong parameter" do
    post send_sum_balls_core_index_url, params: { balls_core: { whatever: 1 } }
    assert_response :unprocessable_entity
  end

  test "should post successfully to send_sum and response shoud be a JSON" do
    post send_sum_balls_core_index_url, params: { balls_core: { sum: 1 } }
    assert_equal "application/json", response.content_type
  end

  test "should post successfully to send_sum and retrive the right JSON body" do
    post send_sum_balls_core_index_url, params: { balls_core: { sum: @balls_core_pink.sum } }
    assert_equal({'color'=>'pink'}, JSON.parse(response.body))
  end

  test "should send the correct sum value thats retrives the color green" do
    post send_sum_balls_core_index_url, params: { balls_core: { sum: @balls_core_green.sum } }
    assert_equal({'color'=>"#{BallsCore::COLORS[:green]}"}, JSON.parse(response.body))
  end

  test "should send the correct sum value thats retrives the color blue" do
    post send_sum_balls_core_index_url, params: { balls_core: { sum: @balls_core_blue.sum } }
    assert_equal({'color'=>"#{BallsCore::COLORS[:blue]}"}, JSON.parse(response.body))
  end

  test "should send the correct sum value thats retrives the color purple" do
    post send_sum_balls_core_index_url, params: { balls_core: { sum: @balls_core_purple.sum } }
    assert_equal({'color'=>"#{BallsCore::COLORS[:purple]}"}, JSON.parse(response.body))
  end
end
