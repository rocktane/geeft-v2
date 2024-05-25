import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="upcoming-events"
export default class extends Controller {
  static targets = ["event", "bob"];

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
          event.classList.add("date-selected");
        } else {
          event.classList.remove("date-selected");
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

      const months = document.querySelectorAll(".upcoming-month");
      console.log(months[0]);
      months.forEach((month) => {
        console.log("month from dataset", month.getAttribute("month"));
        console.log("calendar_month", calendar_month + 1);
        if (
          month.querySelectorAll(".event-infos-calendar").length >= 1 &&
          month.getAttribute("month") < calendar_month + 1
        ) {
          month.style.display = "none";
        } else {
          month.style.display = "";
        }
      });

      this.eventTargets.forEach((event) => {
        const eventYear = parseInt(event.dataset["eventDateYear"]);
        const eventMonth = parseInt(event.dataset["eventDateMonth"]);

        if (
          eventYear < calendar_year ||
          (eventYear === calendar_year && eventMonth < calendar_month + 1)
        ) {
          event.style.display = "none";
          event.closest(".upcoming-month").style.display = "none";
        } else {
          event.style.display = "";
          event.closest(".upcoming-month").style.display = "";
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
    this.only_six_months();
    this.year_update();
  }

  only_six_months() {
    const num_months = 6;
    const months_displayed = this.bobTargets.filter(
      (event) => event.style.display !== "none"
    );
    if (months_displayed.length >= num_months) {
      months_displayed.slice(num_months).forEach((event) => {
        event.style.display = "none";
      });
    }
  }

  year_update() {
    const years = document.querySelectorAll(".upcoming-year");
    years.forEach((year) => {
      const months = year.querySelectorAll(".upcoming-month");
      const array = [];
      months.forEach((month) => {
        if (month.style.display == "none") {
          array.push(month.style.display);
        } else {
          array.push(month.style.display);
        }
      });
      array.includes("")
        ? (year.style.display = "")
        : (year.style.display = "none");
    });
  }
}
