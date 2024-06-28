import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="search-input"
export default class extends Controller {
  static targets = ["input"];
  connect() {}

  animate(event) {
    const section = event.target.dataset.searchInputValue;
    const searchIcon = document.querySelector(
      `span.search-icon[data-search-input-value="${section}"]`
    );
    const searchInput = searchIcon.parentElement.querySelector("input");
    const xMark = document.querySelector("#x-mark");
    const reset = document.querySelector("#reset");

    searchInput.style.border = "1px solid #ccc";
    if (searchInput.style.width === "0px" || searchInput.style.width === "") {
      // Measure the final width by setting the width to 'auto' temporarily
      searchInput.style.width = "auto";
      searchInput.style.padding = "0.25em 0.5em 0.25em 2.5em";
      const finalWidth = searchInput.getBoundingClientRect().width + "px";
      searchInput.style.padding = "0.25em 0em 0.25em 1em";
      searchInput.style.width = "0px"; // Reset to 0 to start the animation
      // searchInput.style.marginLeft = "0.5em";
      searchInput.style.padding = "0.25em 0em 0.25em 1em";

      setTimeout(function () {
        searchInput.style.padding = "0.25em 0.5em 0.25em 2.5em";
        searchInput.focus();
        if (section === "interests") {
          xMark.style.opacity = "1";
          reset.style.opacity = "1";
        }
      }, 1000);

      // Force a reflow to apply the reset width
      // eslint-disable-next-line no-unused-expressions
      searchInput.offsetHeight;

      // Set the final width to trigger the animation
      searchInput.style.width = finalWidth;
    } else {
      // Collapse the div back to 0 width
      searchInput.style.width = "0px";
      searchInput.style.padding = "0.25em 0em 0.25em 1em";
      xMark.style.opacity = "0";
      reset.style.opacity = "0";
    }
  }

  normalizeText(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/·/g, "")
      .toUpperCase();
  }

  filterList(event = "interests") {
    let input,
      filter,
      ul,
      i,
      txtValue,
      atLeastOneVisible = false,
      span,
      sectionName;
    if (event === "interests") {
      sectionName = "interests";
    } else {
      sectionName =
        event.target.parentElement.querySelector("span").dataset
          .searchInputValue;
    }
    input = this.inputTarget;
    filter = this.normalizeText(input.value);
    ul = document.querySelector(`.gift_${sectionName}`);
    span = ul.getElementsByTagName("span");

    if (document.querySelectorAll('[id^="new-gift-"]')) {
      const newGifts = document.querySelectorAll('[id^="new-gift-"]');
      newGifts.forEach((newGift) => {
        if (newGift.parentElement.querySelector("input").checked === false) {
          newGift.parentElement.remove();
        }
      });
    }

    for (i = 0; i < span.length; i++) {
      txtValue = span[i].textContent || span[i].innerText;
      if (this.normalizeText(txtValue).indexOf(filter) > -1) {
        span[i].style.display = "";
        if (sectionName === "interests") {
          atLeastOneVisible = true;
        }
      } else {
        span[i].style.display = "none";
      }
    }
    this.addIfNeeded(input.value, atLeastOneVisible);
  }
  addIfNeeded(input, atLeastOneVisible) {
    if (!atLeastOneVisible) {
      const search = input.charAt(0).toUpperCase() + input.slice(1);
      const searchLower = search.toLowerCase().replace(/\s/g, "");
      const div = document.querySelector("div.gift_interests");
      const content = `
          <input class="check_boxes optional" type="checkbox" value="${search}" name="gift[interests][]" id="gift_interests_${searchLower}">
          <label class="collection_check_boxes" for="gift_interests_${searchLower}" id="new-gift-${searchLower}">
            <i class="fa-solid fa-square-plus"></i>
            ${search}
          </label>
        `;
      const span = document.createElement("span");
      span.classList.add("checkbox");
      div.appendChild(span);
      span.innerHTML = content;
    }
  }

  empty() {
    this.inputTarget.value = "";
    this.inputTarget.focus();
    this.filterList();
  }

  reset() {
    const checkboxes = document.querySelectorAll(
      ".interests input[type='checkbox']:checked"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    if (document.querySelectorAll("[id^='new-gift-']")) {
      const newGifts = document.querySelectorAll("[id^='new-gift-']");
      newGifts.forEach((newGift) => {
        newGift.parentElement.remove();
      });
    }
    this.empty();
  }

  // function empty() {
  //   document.getElementById('searchInterestsInput').value = '';

  // }

  // function reset() {
  //   this.empty();
  //   const checkboxes = document.querySelectorAll('.interests input[type="checkbox"]:checked');
  //   checkboxes.forEach((checkbox) => {
  //     checkbox.checked = false;
  //   });
  //   if (document.querySelectorAll('[id^="new-gift-"]')) {
  //     const newGifts = document.querySelectorAll('[id^="new-gift-"]');
  //     newGifts.forEach((newGift) => {
  //       newGift.parentElement.remove();
  //     });
  //   }
  //   filterList('interests');
  // }
}
