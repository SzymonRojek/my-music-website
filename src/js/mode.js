const STORAGE_KEY = "mode";
const COLOR_MODE_KEY = "--color-mode";

const $modeToggleOne = document.querySelector(".js-footerSwitcher__mode");
const $modeToggleTwo = document.querySelector(".js-buttonToggle__mode");

const getCSSCustomProp = (propKey) => {
  let response = getComputedStyle(document.documentElement).getPropertyValue(
    propKey
  );

  if (response.length) {
    response = response.replace(/\"/g, "").trim();
  }

  return response;
};

const applySetting = (passedSetting) => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
    document.documentElement.setAttribute(
      "data-user-color-scheme",
      currentSetting
    );
  }
};

const toggleSetting = () => {
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
};

$modeToggleOne.addEventListener("click", () => applySetting(toggleSetting()));
$modeToggleTwo.addEventListener("click", () => {
  applySetting(toggleSetting());
});

applySetting();
