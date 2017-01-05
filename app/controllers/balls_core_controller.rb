class BallsCoreController < ApplicationController

  def index
    @balls_core = BallsCore.new
  end

  def send_sum
    @balls_core = BallsCore.new balls_core_params

    @balls_core.calculate_color

    respond_to do |format|
      format.json { render :send_sum, status: :ok }
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def balls_core_params
      params.require(:balls_core).permit(:sum)
    end
end
