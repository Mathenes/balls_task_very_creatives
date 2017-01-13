class BallsManager extends React.Component {

  static getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  static getScoreByColor(color) {
    return this.scores[BallsManager.getKeyByValue(this.colors, color)];
  }

  static accessServer(ballsCounter, success, token) {
    const params = JSON.stringify({ balls_core: { sum: ballsCounter } });
    const COMPLETE_URL = '/balls_core/send_sum';
    this.xhr.open('POST', COMPLETE_URL, false);
    this.xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    this.xhr.setRequestHeader('X-CSRF-TOKEN', token);
    this.xhr.send(params);
    if (this.xhr.status === 200) {
      const DATA = this.xhr.responseText;
      success(DATA);
    }
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    BallsManager.getKeyByValue = BallsManager.getKeyByValue.bind(this);
    BallsManager.getScoreByColor = BallsManager.getScoreByColor.bind(this);
    BallsManager.accessServer = BallsManager.accessServer.bind(this);
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
    this.xhr = new XMLHttpRequest();
    this.state = { ballsCount: 0, score: 0, color: '' };
  }

  componentDidMount() {
    this.token = document.getElementsByName('csrf-token')[0].content;
  }

  handleSubmit(event) {
    event.preventDefault();

    const ballsCount = this.state.ballsCount + 1;
    let score = this.state.score;
    let color = '';

    BallsManager.accessServer(
      ballsCount,
      (data) => {
        color = JSON.parse(data).color;
        score += BallsManager.getScoreByColor(color);
      },
      this.token,
    );
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
