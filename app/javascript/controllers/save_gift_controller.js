import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["saveList", "gift"];

  connect() {}

  newList() {
    // Recover the 5 gifts displayed
    const old_list = this.giftTargets.slice(0, 5);
    let new_list = [];
    old_list.forEach((gift) => {
      new_list.push(gift.firstChild.nodeValue.trim());
    });
    return new_list;
  }

  async save(event) {
    event.preventDefault();

    const giftId = this.saveListTarget.dataset.giftId || "";
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    let env = this.saveListTarget.dataset.env || "";

    // If the environment is not defined, we set it to development
    if (env === "development") {
      env = "http://localhost:3000";
    } else {
      env = "https://www.geeft.club";
    }

    const url = `${env}/updatelist/${giftId}`;
    const origin = window.location.href;
    const showGiftUrl = `${env}/gifts/${giftId}`;
    let redirection = `${env}/gifts/${giftId}/events/new`;

    if (origin === !showGiftUrl) {
      redirection = `${env}/events/${eventId}`;
    }

    const newList = this.newList();

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Incluez le jeton CSRF dans les en-têtes
        },
        body: JSON.stringify({ generated_list: newList }), // A ADAPTER POUR LE generated_list au cas ou Gift
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error("Network response was not ok");
      }

      window.setTimeout(() => {
        window.location.href = redirection;
      }, 500);
    } catch (error) {
      console.error("Une erreur s'est produite : ", error);
    }
  }
}
