const todayDate = new Date();
let day = todayDate.getDate();
let month = todayDate.getMonth() + 1;
let year = todayDate.getFullYear();
document.querySelector("#todayDate").innerHTML = `${day}/${month}/${year}`;

let registersDiv = document.querySelector("#registers");

document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["copiedTexts"], function (result) {
    let copiedTexts = result.copiedTexts || [];
    copiedTexts = copiedTexts.reverse();

    function renderCopiedTexts() {
      registersDiv.innerHTML = ""; // Vider le conteneur avant de le remplir
      copiedTexts.forEach((item, index) => {
        let listItem = document.createElement("div");
        let timestamp = new Date(item.timestamp);
        listItem.setAttribute("data-index", index);
        listItem.innerHTML = `<p><span class='copied-text'>${
          item.text
        }</span> (Copied on: ${timestamp.getDate()}/${
          timestamp.getMonth() + 1
        }/${timestamp.getFullYear()}) from <a target='_blank' href='${
          item.url
        }'>${
          item.url
        }</a></p> <button class='delete-button'><span>X</span></button>`;
        registersDiv.appendChild(listItem);

        // Attacher l'événement de suppression directement ici
        listItem
          .querySelector(".delete-button")
          .addEventListener("click", function () {
            deleteCopiedText(index);
          });
      });
    }

    function deleteCopiedText(index) {
      copiedTexts.splice(index, 1); // Supprimer l'élément à l'index donné
      chrome.storage.local.set({ copiedTexts: copiedTexts }, function () {
        console.log("Text deleted.");
        renderCopiedTexts(); // Re-rendre les éléments après suppression
      });
    }

    renderCopiedTexts();
  });
});
