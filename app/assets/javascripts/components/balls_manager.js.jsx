class BallsManager extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getKeyByValue = this.getKeyByValue.bind(this);
    this.getScoreByColor = this.getScoreByColor.bind(this);
    this.accessServer = this.accessServer.bind(this);
    this.getColorsAndScores = this.getColorsAndScores.bind(this);
    this.token = document.getElementsByName('csrf-token')[0].content;
    this.xhr = new XMLHttpRequest();
    this.getColorsAndScores(
        (data) => {
          this.colors = JSON.parse(data).scores_and_colors.colors;
          this.scores = JSON.parse(data).scores_and_colors.scores;
        },
    );
    this.state = { ballsCount: 0, score: 0, color: '' };
  }

  getKeyByValue(value) {
    return Object.keys(this.colors).find(key => this.colors[key] === value);
  }

  getScoreByColor(color) {
    return this.scores[this.getKeyByValue(color)];
  }

  getColorsAndScores(success, token) {
    const url = Routes.get_colors_and_scores_balls_core_index_path({ format: 'json' });
    this.xhr.open('GET', url, true);
    this.xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    this.xhr.setRequestHeader('X-CSRF-TOKEN', token);
    this.xhr.onload = () => { success(this.xhr.responseText); };
    this.xhr.send(null);
  }

  accessServer(ballsCounter, success) {
    const params = JSON.stringify({ balls_core: { sum: ballsCounter } });
    const url = Routes.send_sum_balls_core_index_path({ format: 'json' });
    this.xhr.open('POST', url, true);
    this.xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    this.xhr.setRequestHeader('X-CSRF-TOKEN', this.token);
    this.xhr.onreadystatechange = () => {
      if (this.xhr.status === 200 && this.xhr.readyState === 4) {
        this.xhr.onload = () => {
          success(this.xhr.responseText);
        };
      }
    };
    this.xhr.send(params);
  }

  handleSubmit(event) {
    event.preventDefault();
    const ballsCount = this.state.ballsCount + 1;
    let score = this.state.score;
    let color = '';
    this.accessServer(
      ballsCount,
      (data) => {
        color = JSON.parse(data).color;
        score += this.getScoreByColor(color);
        this.setState({ ballsCount, score, color });
      },
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
