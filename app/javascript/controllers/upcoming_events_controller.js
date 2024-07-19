import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="upcoming-events"
export default class extends Controller {
  static targets = ["event", "upcomingMonth", "year"];

  connect() {
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
      const calendar_month =
        1 +
        parseInt(
          document
            .querySelector(".flatpickr-current-month")
            .getAttribute("data-month")
        );

      this.upcomingMonthTargets.forEach((month) => {
        month.style.display = "";
      });

      const years = this.yearTargets;

      years.forEach((year) => {
        const num_year = parseInt(year.innerText);
        const monthsOfYear =
          year.parentElement.querySelectorAll(".upcoming-month");
        if (num_year === calendar_year) {
          monthsOfYear.forEach((month) => {
            const num_month = parseInt(month.getAttribute("month"));
            if (num_month < calendar_month) {
              month.style.display = "none";
            }
          });
        } else if (num_year < calendar_year) {
          monthsOfYear.forEach((month) => {
            month.style.display = "none";
          });
        }
      });
      this.only_six_months();
      this.year_update();
    }
  }

  only_six_months() {
    const num_months = 6;
    const months = this.upcomingMonthTargets;
    const display_months = months.filter(
      (month) => month.style.display !== "none"
    );

    display_months.slice(num_months).forEach((month) => {
      month.style.display = "none";
    });
  }

  year_update() {
    const years = document.querySelectorAll(".upcoming-year");
    years.forEach((year) => {
      const months = year.querySelectorAll(".upcoming-month");
      const array = [];
      months.forEach((month) => {
        array.push(month.style.display);
      });
      array.includes("")
        ? (year.style.display = "")
        : (year.style.display = "none");
    });
  }
}
