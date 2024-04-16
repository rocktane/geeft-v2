import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="refresh-gift"
export default class extends Controller {
  static targets = ["hiddenGift"];

  connect() {}

  refresh(gift) {
    if (this.hiddenGiftTargets.length > 0) {
      const li = gift.target.parentElement;
      const firstHiddenGift = this.hiddenGiftTargets[0];
      li.innerHTML = firstHiddenGift.innerHTML;
      firstHiddenGift.remove();
    }
  }
}
