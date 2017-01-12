class Result extends React.Component{

  render() {
    return(
      <div className={ this.props.class_name }>
        { this.props.area }
        <span id={ this.props.area }>{ this.props.value }</span>
      </div>
    );
  }

}
