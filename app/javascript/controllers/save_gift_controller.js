import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["saveList", "gift", "list"];

  connect() {
    const url = window.location.href;

    if (url.includes("event_id") === true) {
      console.log("event found");
    } else {
      console.log("no event found");
    }
  }

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
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Incluez le jeton CSRF dans les en-têtes
        },
        body: JSON.stringify({ generated_list: newList }),
      });

      const eventId = document.body.getAttribute("data-event-id");

      if (typeof eventId !== "undefined") {
        window.setTimeout(() => {
          window.location.href = `/events/${eventId}`;
        }, 500);
      } else {
        window.setTimeout(() => {
          window.location.href = `/gifts/${giftId}/events/new`;
        }, 500);
      }
    } catch (error) {
      console.error("Une erreur s'est produite : ", error);
    }
  }
}
