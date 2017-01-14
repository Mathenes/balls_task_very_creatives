class Canvas extends React.Component {

  constructor() {
    super();
    this.handleBallInsertion = this.handleBallInsertion.bind(this);
    this.state = { balls: [] };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.color) {
      let balls = this.state.balls;
      this.state.balls.forEach((ball, index) => { balls[index].y += 85; });
      const ball = new Circle(nextProps.color, this.canvas);
      balls = React.addons.update(balls, { $push: [ball] });
      this.setState({ balls });
    }
  }

  componentDidUpdate() {
    this.handleBallInsertion();
  }

  handleBallInsertion() {
    const CONTEXT = this.canvas.getContext('2d');
    const ball = this.state.balls[this.state.balls.length - 1];
    const balls = this.state.balls;
    if (this.props.color) {
      if (balls.length > 1) {
        // clear the canvas
        CONTEXT.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // increase canvas height for one more circle
        this.canvas.height += 85;
        // increase y axis for all circles to be drawn at a new position
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
      <canvas id="balls_canvas" height="100" ref={input => this.canvas = input}>
        { 'Your browser cannot render canvas! Please download one that can! Like chrome!' }
      </canvas>
    );
  }

}

Canvas.propTypes = {
  color: React.PropTypes.string.isRequired,
};
