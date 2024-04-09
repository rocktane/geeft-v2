import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("hello from delete gift controller");
  }

  delete(event) {
    const userConfirmed = confirm(
      "Êtes-vous sûr de vouloir supprimer cet élément ?"
    );
    if (userConfirmed) event.target.parentElement.remove();
  }
}
