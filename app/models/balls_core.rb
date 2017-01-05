class BallsCore

  include ActiveModel::Model
  include ActiveModel::AttributeAssignment

  attr_accessor :sum, :color

  def sum
    @sum ? @sum.to_i : 0
  end

  def calculate_color
    color = 'pink'
    if(sum % 15 == 0)
      color = 'mediumpurple'
    elsif (sum % 3 == 0)
      color = 'lightgreen'
    elsif (sum % 5 == 0)
      color = 'royalblue'
    end
    @color = color
  end

end
