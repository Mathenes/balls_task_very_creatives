require 'test_helper'

class CirclesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @circle = circles(:one)
  end

  test "should get index" do
    get circles_url
    assert_response :success
  end

  test "should get new" do
    get new_circle_url
    assert_response :success
  end

  test "should create circle" do
    assert_difference('Circle.count') do
      post circles_url, params: { circle: { color: @circle.color, counter: @circle.counter } }
    end

    assert_redirected_to circle_url(Circle.last)
  end

  test "should show circle" do
    get circle_url(@circle)
    assert_response :success
  end

  test "should get edit" do
    get edit_circle_url(@circle)
    assert_response :success
  end

  test "should update circle" do
    patch circle_url(@circle), params: { circle: { color: @circle.color, counter: @circle.counter } }
    assert_redirected_to circle_url(@circle)
  end

  test "should destroy circle" do
    assert_difference('Circle.count', -1) do
      delete circle_url(@circle)
    end

    assert_redirected_to circles_url
  end
end
