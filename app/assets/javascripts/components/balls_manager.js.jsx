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
    this.xhr.open('POST', COMPLETE_URL, true);
    this.xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    this.xhr.setRequestHeader('X-CSRF-TOKEN', token);
    this.xhr.onreadystatechange = () => {
      if (this.xhr.status === 200 && this.xhr.readyState === 4) {
        this.xhr.onload = () => {
          success(this.xhr.responseText);
        };
      }
    };
    this.xhr.send(params);
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
    const BALLSCOUNT = this.state.ballsCount + 1;
    let score = this.state.score;
    let color = '';
    BallsManager.accessServer(
      BALLSCOUNT,
      (data) => {
        color = JSON.parse(data).color;
        score += BallsManager.getScoreByColor(color);
        this.setState({ ballsCount: BALLSCOUNT, score, color });
      },
      this.token,
    );
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
            <Result area={'Sum'} nameOfClass={'sum_area'} value={this.state.ballsCount} />

            <Result area={'Score'} nameOfClass={'score_area'} value={this.state.score} />
          </div>
        </div>
        <div className="container_canvas">
          <Canvas color={this.state.color} />
        </div>
      </div>
    );
  }

}
