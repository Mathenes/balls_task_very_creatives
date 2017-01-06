require 'test_helper'

class BallsCoreTest < ActiveSupport::TestCase

  test "should respond to sum" do
    balls_core = BallsCore.new({sum: 1})
    assert balls_core.respond_to? :sum
  end

  test "should respond to sum=" do
    balls_core = BallsCore.new({sum: 1})
    assert balls_core.respond_to? :sum=
  end

  test "should respond to color" do
    balls_core = BallsCore.new({sum: 1})
    assert balls_core.respond_to? :color
  end

  test "should respond to color=" do
    balls_core = BallsCore.new({sum: 1})
    assert balls_core.respond_to? :color=
  end

  test "should be valid with an integer value for sum" do
    balls_core = BallsCore.new({sum: 1})
    assert balls_core.valid?
  end

  test "should not be valid with a non integer value for sum" do
    balls_core = BallsCore.new({sum: "a"})
    assert_not balls_core.valid?
  end

  test "should not be valid with sum empty" do
    balls_core = BallsCore.new({sum: ""})
    assert_not balls_core.valid?
  end

  test "should return the score 1 for pink color" do
    assert_equal 1, BallsCore::SCORES[:pink]
  end

  test "should return the score 3 for GREEN color" do
    assert_equal 3, BallsCore::SCORES[:green]
  end

  test "should return the score 5 for BLUE color" do
    assert_equal 5, BallsCore::SCORES[:blue]
  end

  test "should return the score 15 for PURPLE color" do
    assert_equal 15, BallsCore::SCORES[:purple]
  end

  test "should return 'pink' for pink color" do
    assert_equal 'pink', BallsCore::COLORS[:pink]
  end

  test "should return 'lightgreen' for green color" do
    assert_equal 'lightgreen', BallsCore::COLORS[:green]
  end

  test "should return 'royalblue' for blue color" do
    assert_equal 'royalblue', BallsCore::COLORS[:blue]
  end

  test "should return 'mediumpurple' for purple color" do
    assert_equal 'mediumpurple', BallsCore::COLORS[:purple]
  end

end
