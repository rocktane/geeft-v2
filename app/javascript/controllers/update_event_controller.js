import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["gift", "name", "description", "url", "date"];

  connect() {}

  async update(event) {
    event.preventDefault();

    let env = event.currentTarget.dataset.env || "";
    const eventId = document
      .querySelector("[data-event-id]")
      .getAttribute("data-event-id");

    // If the environment is not defined, we set it to development
    if (env === "development") {
      env = "http://localhost:3000";
    } else {
      env = "https://www.geeft.club";
    }

    const url = `${env}/events/${eventId}`;
    const newList = this.giftTargets.map((gift) => gift.innerText);

    // const url = `${env}/updatelist/${giftId}`;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Incluez le jeton CSRF dans les en-têtes
        },
        body: JSON.stringify({
          gift_list: newList,
          date: new Date(this.dateTarget.value),
          name: this.nameTarget.value,
          url: this.urlTarget.value,
          description: this.descriptionTarget.value,
        }), // A ADAPTER POUR LE generated_list au cas ou Gift
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error("Network response was not ok");
      }

      window.setTimeout(() => {
        window.location.href = url;
      }, 500);
    } catch (error) {
      console.error("Une erreur s'est produite : ", error);
    }
  }
}
