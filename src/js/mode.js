const STORAGE_KEY = "mode";
const COLOR_MODE_KEY = "--color-mode";

const $modeToggle = document.querySelector("[data-button-toggle]");

applySetting();

$modeToggle.addEventListener("click", () => applySetting(toggleSetting()));

function applySetting(passedSetting) {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
    document.documentElement.setAttribute(
      "data-user-color-scheme",
      currentSetting
    );
  }
}

function toggleSetting() {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting =
        getCSSCustomProp(COLOR_MODE_KEY) === "dark" ? "light" : "dark";
      break;
    case "light":
      currentSetting = "dark";
      break;
    case "dark":
      currentSetting = "light";
      break;
    default:
      console.log("something wrong!");
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
}

// helpers

function getCSSCustomProp(propKey) {
  let response = getComputedStyle(document.documentElement).getPropertyValue(
    propKey
  );

  if (response.length) {
    response = response.replace(/\"/g, "").trim();
  }

  return response;
}
