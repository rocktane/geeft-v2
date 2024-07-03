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

    const location = window.location.href;
    const giftId = event.currentTarget.dataset.id || "";
    let env = event.currentTarget.dataset.env || "";

    // If the environment is not defined, we set it to development
    if (env === "development") {
      env = "http://localhost:3000";
    } else {
      env = "https://www.geeft.club";
    }

    let url, redirection, eventId, newList;

    if (document.body.querySelector("[data-event-id]")) {
      // Test if the event id is present
      console.log("Event id is present");
      eventId = document
        .querySelector("[data-event-id]")
        .getAttribute("data-event-id");
      const urlToMatch = `${env}/events/${eventId}/edit`;
      if (urlToMatch == location) {
        // If the url matches the event edit page we need to patch the event
        console.log("Match edit page");
        url = `${env}/events/${eventId}`;
        console.log("url", url);
        redirection = `${env}/events/${eventId}`;
        console.log("redirection", redirection);
        newList = this.giftTargets.map((gift) => gift.innerText);
        console.log("newList", this.giftTargets);
      } else {
        // If the url does not match the event edit page we need to create an event
        console.log("No match edit page, new event");
        url = `${env}/updatelist/${giftId}`;
        redirection = `${env}/events/${eventId}`;
        newList = this.giftTargets.map((gift) =>
          gift.firstChild.nodeValue.trim()
        );
      }
    } else {
      // If the event id is not present we need to patch the gift
      console.log("No event id");
      url = `${env}/updatelist/${giftId}`;
      redirection = `${env}/gifts/${giftId}/events/new`;
      newList = this.newList();
    }

    // const url = `${env}/updatelist/${giftId}`;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    console.log("typeof newList", typeof newList);
    console.log(newList);
    console.log("body", JSON.stringify({ gift_list: newList }));

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Incluez le jeton CSRF dans les en-têtes
        },
        body: JSON.stringify({ gift_list: newList }), // A ADAPTER POUR LE generated_list au cas ou Gift
      });

      const data = await response.json();
      console.log("data", data);

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
