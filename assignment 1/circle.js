function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r; // radius
    this.alpha = alpha; //transparency
    this.clicked = function() {
      let d = dist(mouseX, mouseY, this.x, this.y); //distance mouse and radius
        if (d < this.r) {
          return true
        } else {
          return false;
        }
      }
    this.show = function() {
    stroke(0, 0, 210, this.alpha);
    fill(80, 80, 210, this.alpha);
    ellipse(this.x, this.y, this.r);
  }
}
