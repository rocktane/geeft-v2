import { Controller } from "@hotwired/stimulus";
import flatpickr from "flatpickr";
import "flatpickr/dist/l10n/fr.js";

export default class extends Controller {
  connect() {
    this.intializeFlatpickr();
  }

  disconnect() {
    this.destroyFlatpickr();
  }

  intializeFlatpickr() {
    const userLang = navigator.language === "fr" ? "fr" : "en";
    let datesPresent, booked;

    if (document.querySelector("[data-events-dates]")) {
      datesPresent = true;
      booked = JSON.parse(
        document.body
          .querySelector("[data-events-dates]")
          .getAttribute("data-events-dates")
      );
    }

    if (this.element._flatpickr) {
      this.element._flatpickr.destroy();
    }

    const calendar = flatpickr(this.element, {
      locale: userLang,
      inline: "true",
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",
      monthSelectorType: "static",

      onChange: function (selectedDates, dateStr, instance) {
        const event = new CustomEvent("dateChange", {
          detail: { selectedDates, dateStr, instance },
        });
        document.dispatchEvent(event);
        const selectedDate = document.querySelector("#new-event");
        selectedDate.href = `/events/new?date=${dateStr}`;
      },

      onDayCreate: function (dObj, dStr, fp, dayElem) {
        const offset = dayElem.dateObj.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(dayElem.dateObj.getTime() - offset);
        const isoString = adjustedDate.toISOString().slice(0, 10).valueOf();

        if (datesPresent) {
          booked.forEach((bookedDate) => {
            if (isoString == bookedDate) {
              dayElem.innerHTML += "<span class='booked'></span>";
            }
          });
        }
      },

      onMonthChange: function () {
        document
          .querySelector(".flatpickr-current-month")
          .setAttribute("data-month", calendar.currentMonth);
        document
          .querySelector(".flatpickr-current-month")
          .setAttribute("data-year", calendar.currentYear);
      },
    });

    document
      .querySelector(".flatpickr-current-month")
      .setAttribute("data-month", calendar.currentMonth);
    document
      .querySelector(".flatpickr-current-month")
      .setAttribute("data-year", calendar.currentYear);
  }

  destroyFlatpickr() {
    if (this.element._flatpickr) {
      this.element._flatpickr.destroy();
      this.element._flatpickr = null;
    }
  }
}
