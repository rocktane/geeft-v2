import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="budget-slider"
export default class extends Controller {
  static targets = ["slider", "input"];

  connect() {
    this.updatePos();
  }

  updatePos() {
    const slider = this.sliderTarget;
    const sliderElement = slider.getBoundingClientRect();
    const input = this.inputTarget;
    const inputElement = input.getBoundingClientRect();
    const budget = parseInt(slider.value); // 50
    const percentage = budget / (slider.max - slider.min); // 0.1
    const inputSize = inputElement.width; // 27
    const thumbSize = 50; // FIND THE VALUE IN BUDGET_SLIDER.SCSS
    const padding = 22; // FIND THE VALUE IN FORM.SCSS

    input.style.top = "36px";
    const startPoint = padding + thumbSize / 2 - inputSize / 2;
    const posCalculated =
      startPoint + (sliderElement.width - thumbSize) * percentage;
    input.style.left = `${posCalculated}px`;
    input.style.opacity = "1";
  }

  updateValue() {
    const slider = this.sliderTarget;
    this.inputTarget.innerHTML = slider.value;
    this.updatePos();
  }
}
