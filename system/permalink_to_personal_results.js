// Dieses Addon muss im Array addons in der definition.js NACH dem addon_custom_voting_buttons.js eingetragen werden
// Sonst wird der refresh button bei den custom questions am Ende nicht getriggered

// FUNKTION
// Erzeuge über der Ergebnistabelle einen Button, der einen Permalink kopiert, mit man zurück zu der persönlichen Ergebnisseite gelangt

// 1.) Allgemeine Angaben -> In definition.js

// 2.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS
// var addons = ["extras/addon_contacts_in_results.js"]

// 3.) Fertig.
// That's it.

/// ////////////////////////////////////////////////////////////////////

// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.

/// ////////////////////////////////////////////////////////////////////

function checkIfUrlIsPermalink() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("pos")) processPermalink(urlParams);
}

function processPermalink(urlParams) {
  // Restart button would be only visible element (except loading animation) that is visible while processing
  document.querySelector("#restart").classList.add("d-none");

  // arPersonalPositions and arVotingDouble are global arrays
  const personalPositionsFromUrl = decodeURIComponent(urlParams.get("pos"));
  arPersonalPositions = personalPositionsFromUrl
    .split(",")
    .map((value) => +value);

  const votingDoubleFromUrl = decodeURIComponent(urlParams.get("double"));
  arVotingDouble = votingDoubleFromUrl.split(",").map((element) => !!+element); // Convert Ones and Zeros to boolean values

  if (statsRecord) {
    // The stats modal shall not be shown
    // This is hard to achieve. Toggling it, simulating a click on the No-button or setting display:none don't work (partly due to timing)
    // Therefore, remove the modal
    document
      .querySelector("#statisticsModal")
      .parentNode.removeChild(document.querySelector("#statisticsModal"));
    // Without modal, output.js would throw an error because of a missing button, which would stop this function
    // Therefore, create a fake button to avoid the error
    const fakeElement = document.createElement("div");
    fakeElement.setAttribute("id", "statisticsModalButtonYes");
    fakeElement.classList.add("d-none");
    document.body.append(fakeElement);
  }
  document.querySelector("#sectionDescription")?.classList.add("d-none");
  setTimeout(() => {
    // Jump to results. Without timeout, not everything would be ready
    fnShowQuestionNumber(intQuestions);
    if (isActivated("addon_filter_results.js"))
      handleFiltersFromPermalink(urlParams);
  }, 500);

  setTimeout(() => {
    document.querySelector("#restart").classList.remove("d-none");
  }, 2000);
}

function handleFiltersFromPermalink(urlParams) {
  FILTERS.forEach((filter) => {
    const urlValue = decodeURIComponent(urlParams.get(filter.internalName));
    if (urlValue === "null") return;
    // Without timeout, element would not be found
    setTimeout(() => {
      if (filter.type === "dropdown") {
        const nodeFilter = document.querySelector(
          `#filter-dropdown-${filter.internalName}`
        );
        nodeFilter.value = urlValue;
        // Change event must be actively triggered; otherwise, the dropdown would show the right filter value, but filter would not be applied
        nodeFilter.dispatchEvent(new Event("change", { bubbles: true }));
      } else if (filter.type === "checkbox-list") {
        const arExludedOptions = urlValue.split(",");
        document
          .querySelectorAll(`#container-${filter.internalName} input`)
          .forEach((checkbox) => {
            const initialState = checkbox.checked;
            if (
              (arExludedOptions.includes(checkbox.value) &&
                filter.checkedMeansExcluded) ||
              (!arExludedOptions.includes(checkbox.value) &&
                !filter.checkedMeansExcluded)
            )
              checkbox.checked = true;
            else checkbox.checked = false;
            // Change event must be actively triggered; otherwise, visual changes to label (icon and line-trough) would not be applied
            if (initialState !== checkbox.checked)
              checkbox.dispatchEvent(new Event("change", { bubbles: true }));
          });
        const btnApplyFilter = filter.displayInSharedModal
          ? "#shared-filter-modal-confirm"
          : filter.displayInIndividualModal?.isWanted
          ? `#individual-filter-modal-confirm-${filter.internalName}`
          : `#submit-filter-${filter.internalName}`;
        document.querySelector(btnApplyFilter).click();
      }
    }, 300);
  });
  // const filterFromUrl = decodeURIComponent(urlParams.get("fil"));
  // if (!filterFromUrl) return;
  // setTimeout(() => {
  //   // Without timeout, element would not be found
  //   document.querySelector("#textfilter-dropdown").value = filterFromUrl;
  //   // Change event must be actively triggered; otherwise, the dropdown would show the right filter value, but filter would not be applied
  //   document
  //     .querySelector("#textfilter-dropdown")
  //     .dispatchEvent(new Event("change", { bubbles: true }));
  // }, 300);
}

function generateLinkWithCurrentUserAnswers() {
  let link = window.location.origin + window.location.pathname;
  // Add parameter with personal positions
  link += "?pos=" + encodeURIComponent(arPersonalPositions.join(","));
  // Add parameter with voting double values, turn bool to numbers to avoid confusing strings like "false,false,false..." in the URL
  link +=
    "&double=" +
    encodeURIComponent(arVotingDouble.map((element) => +element).join(","));
  if (isActivated("addon_filter_results.js")) {
    FILTERS.forEach((filter) => {
      if (filter.type === "dropdown") {
        const selectedOption = document.querySelector(
          `#filter-dropdown-${filter.internalName}`
        ).value;
        if (selectedOption === "show-all") return;
        link += `&${filter.internalName}=${selectedOption}`;
      } else if (filter.type === "checkbox-list") {
        const arExludedOptions = Array.from(
          document.querySelectorAll(
            `#container-${filter.internalName} input${
              filter.checkedMeansExcluded ? ":checked" : ":not(:checked)"
            }`
          )
        ).map((node) => node.value);
        if (arExludedOptions.length === 0) return;
        link += `&${filter.internalName}=${encodeURIComponent(
          arExludedOptions.join(",")
        )}`;
      }
    });
  }
  return link;
}

window.addEventListener("load", () => {
  checkIfUrlIsPermalink();

  const observerResults = new MutationObserver(createBtnPermalink);
  observerResults.observe(document.querySelector("#resultsHeading"), {
    childList: true,
  });

  // It is an inner function, so that it can access observerResults (in order to disconnect it)
  function createBtnPermalink() {
    // mutationObserver is triggered at the very start, because resultsHeading is emptied. This first trigger is ignored
    if (!document.querySelector("#resultsHeading").textContent) return;

    document.querySelector(
      "#shareAndSaveHeading"
    ).innerHTML = `<h1>${TEXT_SHARE_AND_SAVE_HEADING}</h1><h2>${TEXT_SHARE_AND_SAVE_SUBHEADING}</h2>`;
    // Without disconnecting, the mutation would for some reason be triggered twice, leading to 2 buttons
    observerResults.disconnect();
    const permalinkButton = document.createElement("button");
    permalinkButton.setAttribute("id", "permalink-button");
    permalinkButton.classList.add("btn", "btn-secondary", "flex-center");
    permalinkButton.innerHTML = PERMALINK_BUTTON_TEXT;
    const permalinkDescription = document.createElement("p");
    permalinkDescription.setAttribute("id", "permalink-description");
    permalinkDescription.innerHTML = PERMALINK_DESCRIPTION_TEXT;

    permalinkButton.addEventListener("click", () => {
      const permalinkUrl = generateLinkWithCurrentUserAnswers();
      // Method for copying to clipboard is not supported in all browsers. Fallback: Show URL and tell user to copy it
      navigator.clipboard.writeText(permalinkUrl).catch((error) => {
        permalinkButton.innerHTML = `${
          window.PERMALINK_BUTTON_TEXT_ALT !== undefined
            ? PERMALINK_BUTTON_TEXT_ALT
            : "Kopiere den folgenden Link und speichere ihn an einem Ort deiner Wahl oder teile ihn. Dieser Link führt wieder zu dieser persönlichen Ergebnisseite"
        }: <small><a href="${permalinkUrl}" target="_blank">${permalinkUrl}</a></small>`;
      });
      // Animating the appearance and disappearance of the description box
      permalinkDescription.classList.add("permalink-description-visible");
      setTimeout(() => {
        permalinkDescription.classList.remove("permalink-description-visible");
      }, PERMALINK_DESCRIPTION_DURATION * 1000);
    });

    document
      .querySelector("#shareAndSave")
      .append(permalinkButton, permalinkDescription);
  }
});
