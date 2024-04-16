import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="upcoming-events"
export default class extends Controller {
  static targets = ["event"];

  connect() {
    console.log("Hello, upcoming events!");
    this.update();

    const calendarNavbar = document.querySelector(".flatpickr-months");
    const calendarDates = document.querySelector(".flatpickr-days");

    calendarNavbar.addEventListener("click", () => {
      this.update();
      this.focus();
    });

    calendarDates.addEventListener("click", () => {
      this.focus();
      this.update();
    });

    document.addEventListener("dateChange", this.handleDateChange);
  }

  focus() {
    const calendar_year = parseInt(
      document
        .querySelector(".flatpickr-current-month")
        .getAttribute("data-year")
    );

    if (document.querySelector("#event_start_time").hasAttribute("value")) {
      const calendar_day = parseInt(
        document
          .querySelector("#event_start_time")
          .getAttribute("value")
          .slice(-2)
      );

      const calendar_month = parseInt(
        document
          .querySelector("#event_start_time")
          .getAttribute("value")
          .slice(-5, -3)
      );

      this.eventTargets.forEach((event) => {
        const eventYear = parseInt(event.dataset["eventDateYear"]);
        const eventMonth = parseInt(event.dataset["eventDateMonth"]);
        const eventDay = parseInt(event.dataset["eventDateDay"]);

        if (
          eventYear === calendar_year &&
          eventMonth === calendar_month &&
          eventDay === calendar_day
        ) {
          event.style.color = "red";
        } else {
          event.style.color = "inherit";
        }
      });
    }
    this.update();
  }

  update() {
    if (
      document
        .querySelector(".flatpickr-current-month")
        .hasAttribute("data-year") &&
      document
        .querySelector(".flatpickr-current-month")
        .hasAttribute("data-month")
    ) {
      const calendar_year = parseInt(
        document
          .querySelector(".flatpickr-current-month")
          .getAttribute("data-year")
      );
      const calendar_month = parseInt(
        document
          .querySelector(".flatpickr-current-month")
          .getAttribute("data-month")
      );
      this.eventTargets.forEach((event) => {
        const eventYear = parseInt(event.dataset["eventDateYear"]);
        const eventMonth = parseInt(event.dataset["eventDateMonth"]);

        if (
          eventYear < calendar_year ||
          (eventYear === calendar_year && eventMonth < calendar_month + 1)
        ) {
          event.style.display = "none";
        } else {
          event.style.display = "";
          if (!document.querySelector(".flatpickr-day.selected")) {
            this.eventTargets.forEach((event) => {
              event.style.color = "inherit";
            });
          }
        }
      });
    } else {
      console.log("No data-year or data-month attributes found");
    }
  }
}
