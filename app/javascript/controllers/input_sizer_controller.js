import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["textarea"];

  connect() {
    console.log("InputSizerController connected");
    this.textareaTargets.forEach((textarea) => {
      this.adjustHeight(textarea);
      textarea.addEventListener('input', () => this.adjustHeight(textarea));
    });
  }

  adjustHeight(textarea) {
    textarea.style.height = 'auto'; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    console.log(`New height set to: ${textarea.style.height}`);
  }
}
