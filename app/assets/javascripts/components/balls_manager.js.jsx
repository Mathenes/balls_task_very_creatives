class BallsManager extends React.Component {

  render() {
    return(
      <div className="container">
        <div className="container_header">
          <div className="button_area">
            <center>
              <button type="submit">Drop</button>
            </center>
          </div>
          <div className="results_area">
            <Result area={ "Sum" } class_name={ "sum_area" } value={ 0 }/>

            <Result area={ "Score" } class_name={ "score_area" } value={ 0 }/>
          </div>
        </div>
        <div className="container_canvas">
          <Canvas/>
        </div>
      </div>
    );
  }

}
