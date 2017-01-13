class BallsManager extends React.Component {

  static getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  static getScoreByColor(color) {
    return this.scores[BallsManager.getKeyByValue(this.colors, color)];
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    BallsManager.getKeyByValue = BallsManager.getKeyByValue.bind(this);
    BallsManager.getScoreByColor = BallsManager.getScoreByColor.bind(this);
    this.colors = {
      pink: 'pink',
      green: 'lightgreen',
      blue: 'royalblue',
      purple: 'mediumpurple',
    };
    this.scores = {
      pink: 1,
      green: 3,
      blue: 5,
      purple: 15,
    };
    this.state = { ballsCount: 0, score: 0, color: '' };
  }

  handleSubmit(event) {
    event.preventDefault();

    // simulating JSON response => just a test
    const color = 'pink';
    const ballsCount = this.state.ballsCount + 1;
    const score = this.state.score + BallsManager.getScoreByColor(color);
    //-----------------------------------------

    this.setState({ ballsCount, score, color });
  }

  render() {
    return (
      <div className="container">
        <div className="container_header">
          <div className="button_area">
            <center>
              <button type="submit" onClick={this.handleSubmit}>Drop</button>
            </center>
          </div>
          <div className="results_area">
            <Result area={'Sum'} class_name={'sum_area'} value={this.state.ballsCount} />

            <Result area={'Score'} class_name={'score_area'} value={this.state.score} />
          </div>
        </div>
        <div className="container_canvas">
          <Canvas color={this.state.color} />
        </div>
      </div>
    );
  }

}
