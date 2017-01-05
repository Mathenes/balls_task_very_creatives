function Circle(color){
  this.x = canvas.width / 2;
  this.y = 50;
  this.radius = 30;
  this.color = color;
}

Circle.prototype.draw = function(){
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
  context.closePath();
}

function getScoreByColor(color){
  if(color == 'mediumpurple'){
    return 15;
  }else if(color == 'royalblue'){
    return 5;
  }else if(color == 'lightgreen'){
    return 3;
  }else{
    return 1;
  }
}

function drawCircle(color){
  ballsCounter++;

  var c = new Circle(color);
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

  document.getElementById('sum').innerHTML = ballsCounter;
  // document.getElementById('balls_core_sum').value = ballsCounter;
  document.getElementById('score').innerHTML = score;
}
