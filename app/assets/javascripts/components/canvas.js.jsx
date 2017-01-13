class Canvas extends React.Component {

  render() {
    // simulating props from balls_manager and simulating draw of a ball => just a test!
    const color = this.props.color;
    if (color) {
      const c = new Circle(color, this.canvas);
      c.draw();
    }
    //-----------------------------------------

    return (
      <canvas id="balls_canvas" height="100" ref={input => this.canvas = input}>
        { 'Your browser cannot render canvas! Please download one that can! Like chrome!' }
      </canvas>
    );
  }

}

Canvas.propTypes = {
  color: React.PropTypes.string,
};

Canvas.defaultProps = {
  color: "",
};
