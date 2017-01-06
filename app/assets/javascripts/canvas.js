// circle properties
function Circle(color){
  this.x = canvas.width / 2;
  this.y = 50;
  this.radius = 30;
  this.color = color;
}

// method that draw a circle in the canvas
Circle.prototype.draw = function(){
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
  context.closePath();
}

// a tiny method in es6, just for a little bonus. =]
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

// as the name says, return the score based on the color given
function getScoreByColor(color){
  return SCORES[getKeyByValue(COLORS, color)]
}

// method that manages everything in the screen regarding the criation of
// a new ball, the redraw of older balls below their older positions,
// the increment of Sum (balls counter), Score and the resize of the canvas to
// hold another ball
function drawCircle(color){
  var c = new Circle(color);
  ballsCounter++;
  score += getScoreByColor(color);

  // insert the circle in the array of circles
  circles.push(c);
  // begin to clear the canvas after the first drawn circle
  if(ballsCounter > 1){
    // clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    // increase canvas height for one more circle
    canvas.height += 85;
    // increase y axis for all circles to be drawn at a new position
    for (var i = 0; i < circles.length - 1; i++) {
      circles[i].y += 85;
      // draw the previous circles
      circles[i].draw();
    }
  }
  // draw the new circle when the button is pressed
  c.draw();

  document.getElementById(parameter_sum).innerHTML = ballsCounter;
  document.getElementById(parameter_score).innerHTML = score;
}
