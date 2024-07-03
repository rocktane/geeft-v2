import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="refresh-gift"
export default class extends Controller {
  static targets = ["hiddenGift", "refresh", "gift", "list"];

  connect() {
    this.giftTargets.forEach((giftContainer) =>
      this.initializeHammer(giftContainer)
    );
  }

  initializeHammer(giftContainer) {
    const wrapper = giftContainer.parentElement;
    const hammer = new Hammer(giftContainer);

    hammer.add(new Hammer.Pan({ threshold: 0 }));

    hammer.on("panstart", () => {
      console.log("Touch");
      this.addContainer(giftContainer);
    });

    hammer.on("panright", (event) => {
      console.log("Pan right");
      const offset = this.giftTarget.offsetWidth;
      const panManager = {
        diff: function () {
          return offset;
        },
        stayPut: function () {
          return "translateX(-50%)";
        },
        transform: function (left) {
          if (left) {
            return "translateX(0%)";
          } else {
            return "translateX(-50%)";
          }
        },
      };
      wrapper.style.transform =
        "translate(" + (event.deltaX - panManager.diff()) + "px)";
    });

    hammer.on("panend", (panEnd) => {
      console.log("panEnd");
      const offset = panEnd.target.offsetWidth;
      const panManager = {
        diff: function () {
          return offset;
        },
        stayPut: function () {
          return "translateX(0%)";
        },
        transform: function (left) {
          if (left) {
            return "translateX(0%)";
          } else {
            return "translateX(-50%)";
          }
        },
      };

      if (panEnd.deltaX <= 0) {
        //panleft
        if (panEnd.velocityX < -1 || panEnd.deltaX < offset / 2) {
          wrapper.classList.add("is-animating");
          wrapper.style.transform = panManager.transform(false);
        } else {
          wrapper.classList.add("is-animating");
          wrapper.style.transform = panManager.stayPut();
        }
      } else {
        //panright
        if (panEnd.velocityX > 1 || panEnd.deltaX > offset / 2) {
          wrapper.classList.add("is-animating");
          wrapper.style.transform = panManager.transform(true);
        } else {
          wrapper.classList.add("is-animating");
          wrapper.style.transform = panManager.stayPut();
        }
        setTimeout(() => {
          wrapper.classList.remove("is-animating");
          const newGift = panEnd.target.previousElementSibling;
          this.initializeHammer(newGift);
          // console.log(panEnd.target);
          panEnd.target.parentElement.style.transform = "translateX(-50%)";
          panEnd.target.remove();
          this.hiddenGiftTargets[0].remove();
        }, 200);
      }
    });

    this.hammer = hammer;
  }

  addContainer(giftContainer) {
    const newContainer = giftContainer.cloneNode(true);
    const div = newContainer.querySelector(".gift-name");
    div.textContent = this.hiddenGiftTargets[0].textContent;
    const main = giftContainer.parentElement;
    main.prepend(newContainer);
    giftContainer.parentElement.style.transform = "translateX(-50%)";
  }

  handlePanRight(wrapper) {
    const panManager = {
      diff: function () {
        return 0;
      },
      stayPut: function () {
        return "translateX(0%)";
      },
      transform: function (left) {
        return "translateX(50%)";
      },
    };

    wrapper.style.transform = "translateX(0px)";
  }

  disconnect() {
    if (this.hammer) {
      this.hammer.destroy();
    }
  }
}
