chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Maybe implement a way to only call the api when the side panel is open.
// chrome.action.onClicked.addListener(() => {
//   chrome.sidePanel.getPanelState((state) => {
//     if (state === "opened") {
//       console.log("The side panel is open.");
//     } else {
//       console.log("The side panel is closed.");
//     }
//   });
// });
