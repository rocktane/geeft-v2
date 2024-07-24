import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["resizeDescription"]

  connect() {
    this.resize()
  }

  resize() {
    this.resizeDescriptionTarget.style.height = 'auto';
    this.resizeDescriptionTarget.style.height = `${this.resizeDescriptionTarget.scrollHeight}px`;
  }

  update() {
    this.resize()
  }
}
