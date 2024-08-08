document.addEventListener("copy", (event) => {
  let copiedText = document.getSelection().toString();
  let url = window.location.href;
  chrome.runtime.sendMessage({ type: "copied", text: copiedText, url: url });
  console.log("Text copied: " + copiedText); // Ajoute un log pour déboguer
});
