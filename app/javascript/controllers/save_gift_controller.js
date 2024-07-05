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

    // let url, redirection, newList;

    // if (this.saveListTarget.dataset.eventId) {
    //   // Test if the event id is present
    //   const eventId = this.saveListTarget.dataset.eventId;
    //   const urlToMatch = `${env}/events/${eventId}/edit`;
    //   if (urlToMatch == location) {
    //     // If the url matches the event edit page we need to patch the event
    //     url = `${env}/events/${eventId}`;
    //     redirection = `${env}/events/${eventId}`;
    //     newList = this.giftTargets.map((gift) => gift.innerText);
    //   } else {
    //     // If the url does not match the event edit page we need to create an event
    //     url = `${env}/updatelist/${giftId}`;
    //     redirection = `${env}/events/${eventId}`;
    //     newList = this.giftTargets.map((gift) =>
    //       gift.firstChild.nodeValue.trim()
    //     );
    //   }
    // } else {
    //   // If the event id is not present we need to patch the gift
    //   console.log("No event id");
    //   url = `${env}/updatelist/${giftId}`;
    //   redirection = `${env}/gifts/${giftId}/events/new`;
    //   newList = this.newList();
    // }

    const url = `${env}/updatelist/${giftId}`;
    const redirection = `${env}/gifts/${giftId}`;

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
