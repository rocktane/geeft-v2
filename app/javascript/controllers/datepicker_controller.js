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
    console.log("Hello, datepicker!");
    const userLang = navigator.language === "fr" ? "fr" : "en";

    const booked = JSON.parse(
      document.body
        .querySelector("[data-events-dates]")
        .getAttribute("data-events-dates")
    );

    if (this.element._flatpickr) {
      this.element._flatpickr.destroy();
    }

    const calendar = flatpickr(this.element, {
      locale: userLang,
      inline: "true",
      altInput: true,
      altFormat: "F j, Y",
      dateFormat: "Y-m-d",

      onChange: function (selectedDates, dateStr, instance) {
        const event = new CustomEvent("dateChange", {
          detail: { selectedDates, dateStr, instance },
        });
        document.dispatchEvent(event);
      },

      onDayCreate: function (dObj, dStr, fp, dayElem) {
        const offset = dayElem.dateObj.getTimezoneOffset() * 60000;
        const adjustedDate = new Date(dayElem.dateObj.getTime() - offset);
        const isoString = adjustedDate.toISOString().slice(0, 10).valueOf();

        booked.forEach((bookedDate) => {
          if (isoString == bookedDate) {
            dayElem.innerHTML += "<span class='booked'></span>";
          }
        });
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
