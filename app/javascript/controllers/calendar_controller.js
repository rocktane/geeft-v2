import { Controller } from "@hotwired/stimulus";
import flatpickr from "flatpickr";
import "flatpickr/dist/l10n/fr.js";

export default class extends Controller {
  connect() {
    flatpickr(this.element, {
      altInput: true,
      altFormat: "d/m/Y",
      dateFormat: "Y-m-d",
      locale: "fr",
      allowInput: true,
    });
  }
}
