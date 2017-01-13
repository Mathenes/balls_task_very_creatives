class Circle {

  constructor(color, canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.x = this.canvas.width / 2;
    this.y = 50;
    this.radius = 30;
    this.color = color;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }

}
