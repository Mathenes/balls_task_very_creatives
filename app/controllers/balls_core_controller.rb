class BallsCoreController < ApplicationController

  def index
  end

  def send_sum
    @balls_core = BallsCore.new balls_core_params
    if @balls_core.valid?
      @balls_core.calculate_color
    else
      render json: @balls_core.errors, status: :unprocessable_entity
    end
  end

  def get_colors_and_scores
    @colors = BallsCore::COLORS
    @scores = BallsCore::SCORES
  end

  private
    def balls_core_params
      params.require(:balls_core).permit(:sum)
    end
end
