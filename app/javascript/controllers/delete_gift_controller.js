import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    console.log("hello from delete gift controller");
  }

  // Deletion of a gift on an event 'edit' page
  delete(gift) {
    // console.log(gift.target.parentElement);
    // console.log(gift.target.closest("ul"));
    const userConfirmed = confirm(
      "Êtes-vous sûr de vouloir supprimer ce cadeau ?"
    );
    // if (userConfirmed) gift.target.parentElement.remove();
    if (userConfirmed) gift.target.closest("li").remove();
  }
}
