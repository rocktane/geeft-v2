import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="refresh-gift"
export default class extends Controller {
  static targets = ["hiddenGift"];

  connect() {
    console.log("hello from refresh gift controller");
  }

  refresh(event) {
    const li = event.target.parentElement;
    const firstHiddenGift = this.hiddenGiftTargets[0];
    li.innerHTML = firstHiddenGift.innerHTML;
    firstHiddenGift.remove();
  }
}
