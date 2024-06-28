import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="search-input"
export default class extends Controller {
  connect() {}

  animate(event) {
    const section = event.target.dataset.searchInputValue;
    const searchIcon = document.querySelector(
      `span.search-icon[data-search-input-value="${section}"]`
    );
    const searchInput = searchIcon.parentElement.querySelector("input");

    searchInput.style.border = "1px solid #ccc";
    if (searchInput.style.width === "0px" || searchInput.style.width === "") {
      // Measure the final width by setting the width to 'auto' temporarily
      searchInput.style.width = "auto";
      const finalWidth = searchInput.getBoundingClientRect().width + "px";
      searchInput.style.width = "0px"; // Reset to 0 to start the animation
      searchInput.style.marginLeft = "0.5em";
      searchInput.style.padding = "0.25em 0em 0.25em 1em";
      setTimeout(function () {
        searchInput.style.padding = "0.25em 0.5em 0.25em 2.5em";
        searchInput.focus();
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
    }
  }

  normalizeText(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/·/g, "")
      .toUpperCase();
  }

  filterList(event) {
    let input,
      filter,
      ul,
      i,
      txtValue,
      atLeastOneVisible = false,
      span;
    const sectionName =
      event.target.parentElement.querySelector("span").dataset.searchInputValue;
    console.log("sectionName", sectionName);
    const capitalized =
      sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
    console.log("capitalized, capitalized");
    // const div = document.querySelector("div.gift_interests");
    input = event.target;
    console.log("input", input);
    filter = this.normalizeText(input.value);
    console.log("filter", filter);
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
      const div = document.querySelector("div.gift_interests");
      const content = `
          <input class="check_boxes optional" type="checkbox" value="${search}" name="gift[interests][]">
          <label class="collection_check_boxes" for="gift_interests_${search
            .toLowerCase()
            .replace(/\s/g, "")}" id="new-gift-${search
        .toLowerCase()
        .replace(/\s/g, "")}">
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
}
