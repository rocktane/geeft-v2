import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["saveList", "gift", "list"];

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

    const giftId = event.currentTarget.dataset.id || "";
    let env = event.currentTarget.dataset.env || "";

    // If the environment is not defined, we set it to development
    if (env === "development") {
      env = "http://localhost:3000";
    } else {
      env = "https://www.geeft.club";
    }

    const url = `${env}/updatelist/${giftId}`;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const newList = this.newList();

    try {
      await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Incluez le jeton CSRF dans les en-têtes
        },
        body: JSON.stringify({ generated_list: newList }),
      });

      if (document.body.querySelector("[data-event-id]")) {
        // Redirection to the event show if the id is found
        const eventId = document
          .querySelector("[data-event-id]")
          .getAttribute("data-event-id");
        window.setTimeout(() => {
          window.location.href = `${env}/events/${eventId}`;
        }, 500);
      } else {
        // Redirection to the event new if the id is not found
        window.setTimeout(() => {
          window.location.href = `${env}/gifts/${giftId}/events/new`;
        }, 500);
      }
    } catch (error) {
      console.error("Une erreur s'est produite : ", error);
    }
  }
}
