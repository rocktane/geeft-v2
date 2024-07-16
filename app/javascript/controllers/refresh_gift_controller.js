import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="refresh-gift"
export default class extends Controller {
  static targets = ["refresh"];

  connect() {
    // this.giftTargets.forEach((giftContainer) =>
    //   this.initializeHammer(giftContainer)
    // );
    this.getBonus();
  }

  async getBonus() {
    const url = window.location.href;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.bonusGifts = Array.from(data.generated_list.slice(5));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  refresh(gift) {
    if (this.bonusGifts.length > 0) {
      const target = gift.target;
      const giftContainer = this.findParentWithClass(target, "gift-container");
      const giftName = giftContainer.querySelector(".gift-name");

      giftName.style.transform = "translateY(250%)";

      setTimeout(() => {
        const firstBonusGift = this.bonusGifts[0];
        giftName.textContent = firstBonusGift;
        giftName.style.opacity = 0;
        giftName.style.transform = "translateY(-250%)";

        setTimeout(() => {
          giftName.style.opacity = 1;
          giftName.style.transform = "translateY(0)";
        }, 500);

        this.bonusGifts.shift();
      }, 600);
    }
    if (this.bonusGifts.length === 0) {
      this.greyOutRefresh();
    }
  }

  greyOutRefresh() {
    this.refreshTargets.forEach((icon) => {
      icon.style.opacity = "0.2";
      icon.style.cursor = "not - allowed";
    });
  }

  findParentWithClass(element, className) {
    while (element && !element.classList.contains(className)) {
      element = element.parentElement;
    }
    return element;
  }
}

// SWIPE GESTURES

// initializeHammer(giftContainer) {
//   const wrapper = giftContainer.parentElement;
//   const hammer = new Hammer(giftContainer);

//   hammer.add(new Hammer.Pan({ threshold: 0 }));

//   hammer.on("panstart", () => {
//     console.log("Touch");
//     this.addContainer(giftContainer);
//   });

//   hammer.on("panright", (event) => {
//     console.log("Pan right");
//     const offset = this.giftTarget.offsetWidth;
//     const panManager = {
//       diff: function () {
//         return offset;
//       },
//       stayPut: function () {
//         return "translateX(-50%)";
//       },
//       transform: function (left) {
//         if (left) {
//           return "translateX(0%)";
//         } else {
//           return "translateX(-50%)";
//         }
//       },
//     };
//     wrapper.style.transform =
//       "translate(" + (event.deltaX - panManager.diff()) + "px)";
//   });

//   hammer.on("panleft", (event) => {
//     if (event.deltaX > 0) {
//       console.log("panleft enabled");
//     }
//   });

//   hammer.on("panend", (panEnd) => {
//     console.log("panEnd");
//     const offset = panEnd.target.offsetWidth;
//     const panManager = {
//       diff: function () {
//         return offset;
//       },
//       stayPut: function () {
//         return "translateX(0%)";
//       },
//       transform: function (left) {
//         if (left) {
//           return "translateX(0%)";
//         } else {
//           return "translateX(-50%)";
//         }
//       },
//     };

//     if (panEnd.deltaX <= 0) {
//       //panleft
//       if (panEnd.velocityX < -1 || panEnd.deltaX < offset / 2) {
//         console.log("not enough velocity");
//         wrapper.classList.add("is-animating");
//         wrapper.style.transform = panManager.transform(false);
//       } else {
//         wrapper.classList.add("is-animating");
//         wrapper.style.transform = panManager.stayPut();
//       }
//       panEnd.target.remove();
//     } else {
//       //panright
//       if (panEnd.velocityX > 1 || panEnd.deltaX >= offset / 2) {
//         console.log("enough velocity");
//         wrapper.classList.add("is-animating");
//         wrapper.style.transform = panManager.transform(true);
//       } else {
//         wrapper.classList.add("is-animating");
//         wrapper.style.transform = panManager.stayPut();
//       }
//       const newGift = panEnd.target.previousElementSibling;
//       panEnd.target.parentElement.style.transform = "translateX(-50%)";
//       this.hiddenGiftTargets[0].remove();
//       this.initializeHammer(newGift);

//       setTimeout(() => {
//         wrapper.classList.remove("is-animating");
//       }, 200);
//     }
//   });

//   this.hammer = hammer;
// }

// addContainer(giftContainer) {
//   const newContainer = giftContainer.cloneNode(true);
//   const div = newContainer.querySelector(".gift-name");
//   div.textContent = this.hiddenGiftTargets[0].textContent;
//   const main = giftContainer.parentElement;
//   main.prepend(newContainer);
//   giftContainer.parentElement.style.transform = "translateX(-50%)";
// }

// handlePanRight(wrapper) {
//   const panManager = {
//     diff: function () {
//       return 0;
//     },
//     stayPut: function () {
//       return "translateX(0%)";
//     },
//     transform: function (left) {
//       return "translateX(50%)";
//     },
//   };

//   wrapper.style.transform = "translateX(0px)";
// }

// disconnect() {
//   if (this.hammer) {
//     this.hammer.destroy();
//   }
// }
// }
