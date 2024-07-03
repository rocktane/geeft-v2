import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="age-buttons"
export default class extends Controller {
  static targets = ["input", "hiddenInput"];

  connect() {}

  updateAge(age) {
    const input = this.inputTarget;
    const hiddenAgeField = this.hiddenInputTarget;
    input.value = age;
    hiddenAgeField.value = age;
  }

  calcAge(amount) {
    let age = parseInt(this.inputTarget.value, 10);
    const hiddenAgeField = this.hiddenInputTarget;
    if (age <= 0) {
      age = 0;
      this.updateAge(age);
    } else if (age > 100) {
      age = 100;
      this.updateAge(age);
    } else {
      age += amount;
      this.updateAge(age);
    }
  }

  plusOne() {
    this.calcAge(1);
  }

  minusOne() {
    this.calcAge(-1);
  }
}
