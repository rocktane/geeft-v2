import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="budget-slider"
export default class extends Controller {
  static targets = ["slider", "value"];

  connect() {
    this.colors = {
      up: "rgb(255, 254, 165)",
      down: "rgb(165, 255, 180)",
      bg: "rgb(255, 165, 165)",
    };

    // add hit-test functionality to DOMRect
    DOMRect.prototype.hit = function (x, y) {
      return (
        x >= this.left && x <= this.right && y >= this.top && y <= this.bottom
      );
    };
    this.init();
  }

  // yum
  px(n) {
    return `${n}px`;
  }

  dragBudget() {
    this.init();
    // this.sliderTarget.value = this.valueTarget.innerText;
  }

  init() {
    // HTML elements
    this.drag_div = document.getElementById("drag_div"); // to delete
    this.hit_div = document.getElementById("hit_div"); // to delete

    // listeners
    window.addEventListener("pointerdown", this.pointerDown.bind(this));
    window.addEventListener("pointermove", this.pointerMove.bind(this));
    window.addEventListener("pointerup", this.pointerUp.bind(this));
    window.addEventListener("resize", this.resize.bind(this));

    // init data
    this.dragging = false;
    this.offset = { x: 0, y: 0 };
    this.win_rect = document.body.getBoundingClientRect();

    // position div to center
    this.drag_rect = this.drag_div.getBoundingClientRect();
    let left = Math.round(this.win_rect.width / 2 - this.drag_rect.width / 2);
    let top = Math.round(this.win_rect.height / 2 - this.drag_rect.height / 2);
    this.drag_div.style.left = this.px(left);
    this.drag_div.style.top = this.px(top);
  }

  resize() {
    // keep track of changed client area dimensions
    this.win_rect = document.body.getBoundingClientRect();
  }

  pointerDown(event) {
    let [x, y] = [event.clientX, event.clientY];
    let drag_rect = this.drag_div.getBoundingClientRect();
    const hit_rect = this.hit_div.getBoundingClientRect();
    if (hit_rect.hit(x, y)) {
      this.dragging = true;
      this.offset.x = x - drag_rect.x;
      this.offset.y = y - drag_rect.y;
      this.hit_div.style.backgroundColor = this.colors.down;
    }
  }

  pointerMove(event) {
    let [x, y] = [event.clientX, event.clientY];
    let drag_rect = this.drag_div.getBoundingClientRect();
    if (this.dragging) {
      let left = x - this.offset.x - 51.2;
      let right = left + drag_rect.width;
      let top = y - this.offset.y - 400;
      let bottom = top + drag_rect.height;

      // prevent dragging off screen left/right
      if (left < 0) {
        left = 0;
      } else if (
        right >
        document.getElementById("budget-slider").getBoundingClientRect().right -
          51.2
      ) {
        left = this.win_rect.right - this.drag_rect.width * 2;
      }

      // prevent dragging off screen top/bottom
      if (top < 0) {
        top = 0;
      } else if (bottom > this.win_rect.bottom) {
        top = this.win_rect.bottom - this.drag_rect.height;
      }

      let drag_div_rect = this.drag_div.getBoundingClientRect();

      this.drag_div.style.left = this.px(left);
      this.drag_div.style.top = this.px(top);
    }
  }

  pointerUp(event) {
    this.dragging = false;
    this.hit_div.style.backgroundColor = this.colors.up;
  }
}
