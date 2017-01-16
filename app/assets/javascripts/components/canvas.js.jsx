class Canvas extends React.Component {

  constructor() {
    super();
    this.handleBallInsertion = this.handleBallInsertion.bind(this);
    this.state = { balls: [] };
  }

// Update all the positions of previous balls in a position below ther old postions
// and create a new ball to be inserted in the array "balls" that is the state of this
// component and where all the balls that will be drawn are.
  componentWillReceiveProps(nextProps) {
    if (nextProps.color) {
      let balls = Object.assign(this.state.balls);
      this.state.balls.forEach((ball, index) => { balls[index].y += 85; });
      const ball = new Circle(nextProps.color, this.canvas);
      balls = React.addons.update(balls, { $push: [ball] });
      this.setState({ balls });
    }
  }

// call "handleBallInsertion" method when new props arrive
  componentDidUpdate() {
    this.handleBallInsertion();
  }

// Method that draws a new ball and redraws previous balls below their old positions,
// already calculated in "componentWillReceiveProps" method. Also resize the canvas to
// hold another ball
  handleBallInsertion() {
    const context = this.canvas.getContext('2d');
    const ball = this.state.balls[this.state.balls.length - 1];
    const balls = this.state.balls;
    if (this.props.color) {
      if (balls.length > 1) {
        // clear the canvas
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // increase canvas height for one more circle
        this.canvas.height += 85;
        // redraw all the previous balls
        balls.forEach((_ball, index, array) => {
          if (index !== array.length - 1) {
            _ball.draw();
          }
        });
      }
      ball.draw();
    }
  }

  render() {
    return (
      <canvas
        id="balls_canvas" className="fit" height="100" ref={(input) => { this.canvas = input; }}
      >
        { 'Your browser cannot render canvas! Please download one that can! Like chrome!' }
      </canvas>
    );
  }

}

Canvas.propTypes = {
  color: React.PropTypes.string.isRequired,
};
