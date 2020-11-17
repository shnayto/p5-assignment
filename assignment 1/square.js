function Square(x, y, e) {
    this.x = x;
    this.y = y;
    this.e = 40; //edge length
    this.alpha = alpha;
    this.clicked = function() { //if mouse is within the edges
        if (mouseX > this.x - this.e/2 && mouseX < this.x + this.e/2
            && mouseY < this.y + this.e/2 && mouseY > this.y - this.e/2){
          return true
        } else {
          return false;
        }
      }
    this.show = function() {
      strokeWeight(3);
      stroke(210, 0, 0, this.alpha);
      fill(210, 80, 80, this.alpha);
      rectMode(CENTER)
      rect(this.x, this.y, this.e);
  }
}
