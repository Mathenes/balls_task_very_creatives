// function that is called by the onClick event in the "Drop" button at the view.
// when the XMLHttpRequest() object (xhr) is ready with the response in the "data"
// variable, the JSON that comes in the response is parsed and used as the color parameter 
function execute() {
  requisition();

  xhr.onload = function(){
    var color = JSON.parse(data).color;
    drawCircle(color)
  };
}
