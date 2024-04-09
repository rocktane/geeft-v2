import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["saveList", "gift", "list"];

  connect() {}

  newList() {
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

    if (env === "development") {
      env = "http://localhost:3000";
    } else {
      env = "https://www.geeft.club";
    }

    const url = `${env}/gifts/${giftId}`;
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
        const eventId = document.body
          .querySelector("[data-event-id]")
          .getAttribute("data-event-id");
      } else {
        const eventId = 0;
      }

      if (typeof eventId === "string") {
        window.setTimeout(() => {
          window.location.href = `${env}/events/${eventId}`;
        }, 500);
      } else {
        window.setTimeout(() => {
          window.location.href = `${env}/gifts/${giftId}/events/new`;
        }, 500);
      }
    } catch (error) {
      console.error("Une erreur s'est produite : ", error);
    }
  }
}
