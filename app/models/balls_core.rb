require 'active_model'

class BallsCore

  include ActiveModel::Model
  include ActiveModel::AttributeAssignment
  include ActiveModel::Validations::Callbacks

  attr_accessor :sum, :color

  validates :sum, presence: true
  validates :sum, numericality: { only_integer: true }

  after_validation :sum_to_integer

  COLORS = { pink: 'pink', green: 'lightgreen', blue: 'royalblue', purple: 'mediumpurple' }
  SCORES = { pink: 1, green: 3, blue: 5, purple: 15 }

  def calculate_color
    color = COLORS[:pink]
    if(sum % SCORES[:purple] == 0)
      color = COLORS[:purple]
    elsif (sum % SCORES[:blue] == 0)
      color = COLORS[:blue]
    elsif (sum % SCORES[:green] == 0)
      color = COLORS[:green]
    end
    @color = color
  end

  def sum_to_integer
    @sum = @sum.to_i
  end

end
