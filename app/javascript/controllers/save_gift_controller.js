import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["saveList", "gift", "list"];

  connect() {
    console.log("hello from save gift controller");
    console.log(this.saveListTarget);
  }

  newList() {
    const old_list = this.giftTargets;
    let new_list = [];
    for (let i = 0; i < 5; i++) {
      new_list.push(old_list[i].firstChild.nodeValue.trim());
    }
    return new_list;
  }

  save(event) {
    event.preventDefault();

    const giftId = event.currentTarget.dataset.id || "";
    const env = event.currentTarget.dataset.env || "";
    // console.log("datasetId", giftId);
    // console.log("datasetEnv", env);

    if (env === "development") {
      env = "http://localhost:3000";
    } else {
      env = "https://www.geeft.club";
    }

    const url = `${env}/gifts/${giftId}`;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const newList = this.newList();
    console.log(newList);

    // const formData = new FormData();

    // fetch("/gifts", {
    //   method: "POST",
    //   body: formData,
    //   headers: {
    //     "X-CSRF-Token": document.querySelector('[name="csrf-token"]')
    //       .content,
    //   },
    //   credentials: "include",
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json(); // ou response.text() si vous attendez une redirection sous forme de chaîne
    //     }
    //     throw new Error("Réponse réseau non ok.");
    //   })
    //   .then((data) => {
    //     window.location.href = data.redirectPath; // Redirigez l'utilisateur en utilisant la réponse du serveur
    //   })
    //   .catch((error) =>
    //     console.error(
    //       "Il y a eu un problème avec l'opération fetch: ",
    //       error
    //     )
    //   );
  }
}
