

function Cursor() {
  this.radius = 21;
  this.r = 245;
  this.g = 22;
  this.b = 33;

  this.showEllipse = function(r, g, b) {
  noStroke();
  fill(this.r, this.g, this.b);
  ellipse(mouseX, mouseY, this.radius*2);
  }

  this.showRect = function() {
    noStroke();
    fill(245, 22, 23);
    rectMode(CENTER)
    rect(mouseX, mouseY, this.radius*2);
    }
}
