chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "copied") {
    saveText(message.text, message.url);
  }
});

function saveText(text, url) {
  chrome.storage.local.get(["copiedTexts"], function (result) {
    let copiedTexts = result.copiedTexts || [];
    copiedTexts.push({
      text: text,
      timestamp: new Date().toISOString(),
      url: url,
    });
    chrome.storage.local.set({ copiedTexts: copiedTexts }, function () {
      console.log("Text saved.");
    });
  });
}
