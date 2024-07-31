import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text"];

  connect() {
    console.log("InputSizerController connected");
    this.textTargets.forEach((text) => {
      this.adjustHeight(text);
      text.addEventListener('input', () => this.adjustHeight(text));
    });
  }

  adjustHeight(text) {
    text.style.height = 'auto';
    text.style.height = `${text.scrollHeight}px`;
    console.log(`New height set to: ${text.style.height}`);
  }
}
