class BallsManager extends React.Component {

  static getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

  static getScoreByColor(color) {
    return this.scores[BallsManager.getKeyByValue(this.colors, color)];
  }

  static accessServer(ballsCounter, success, token) {
    const params = JSON.stringify({ balls_core: { sum: ballsCounter } });
    const url = Routes.send_sum_balls_core_index_path({ format: 'json' });
    this.xhr.open('POST', url, true);
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
    const ballsCount = this.state.ballsCount + 1;
    let score = this.state.score;
    let color = '';
    BallsManager.accessServer(
      ballsCount,
      (data) => {
        color = JSON.parse(data).color;
        score += BallsManager.getScoreByColor(color);
        this.setState({ ballsCount, score, color });
      },
      this.token,
    );
  }

  render() {
    return (
      <div className="container absolute clearfix border-box border mx-auto">
        <div className="container_header fit bg-gray" >
          <div id="button_area" className="button_area">
            <center className="pt2">
              <button
                type="submit" className="not-rounded" onClick={this.handleSubmit}
              >
                Drop
              </button>
            </center>
          </div>
          <div id="results_area" className="results_area h4 pl1 pr1">
            <Result id="sum_area" area={'Sum'} nameOfClass={'left pl3'} value={this.state.ballsCount} />

            <Result id="score_area" area={'Score'} nameOfClass={'right pr3'} value={this.state.score} />
          </div>
        </div>
        <div id="container_canvas" className="container_canvas fit overflow-scroll">
          <Canvas color={this.state.color} />
        </div>
      </div>
    );
  }

}
