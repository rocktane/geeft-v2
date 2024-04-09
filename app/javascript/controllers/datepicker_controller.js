import { Controller } from "@hotwired/stimulus";
import flatpickr from "flatpickr";

export default class extends Controller {
  connect() {
    const booked = JSON.parse(
      document.body
        .querySelector("[data-events-dates]")
        .getAttribute("data-events-dates")
    );
    console.log(booked);
    console.log(booked.length);
    console.log(typeof booked);

    flatpickr(this.element, {
      onDayCreate: function (dObj, dStr, fp, dayElem) {
        let date = dayElem.dateObj.toISOString(true).slice(0, 10).valueOf();

        booked.forEach((bookedDate) => {
          console.log("boucle");
          if (date == bookedDate) {
            console.log("booked found");
            dayElem.innerHTML += "<span class='booked'></span>";
          }
        });
      },
    });
  }
}
