function execute() {
  requisition();

  xhr.onload = function(){
    var color = JSON.parse(data).color;
    drawCircle(color)
  };
}
