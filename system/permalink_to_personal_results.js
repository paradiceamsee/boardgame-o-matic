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
   arPersonalPositions = decompressBase36IntoArrayOfNumbers(
      personalPositionsFromUrl,
      10
   );

   const votingDoubleFromUrl = decodeURIComponent(urlParams.get("double"));
   arVotingDouble = decompressBase36IntoArrayOfNumbers(
      votingDoubleFromUrl,
      2
   ).map((number) => !!number); // Convert Ones and Zeros to boolean values

   const typeFromUrl = decodeURIComponent(urlParams.get("type"));

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
   // Jump to results or to last questions. Without timeout, not everything would be ready
   setTimeout(() => {
      if (typeFromUrl === "back-to-questions") {
         fnShowQuestionNumber(intQuestions - 2);

         FILTERS.forEach((filter) => {
            const urlValue = decodeURIComponent(
               urlParams.get(filter.internalName)
            );
            if (urlValue === "null") return;
            window[`setFilter${filter.internalName}`] = urlValue;
            for (let i = 0; i < intQuestions; i++) {
               history.pushState({type: "question", questionNumber: i}, "");
            }
         });
      } else {
         fnShowQuestionNumber(intQuestions);
         handleTypeFromPermalink(typeFromUrl);
         if (isActivated("addon_filter_results.js"))
            handleFiltersFromPermalink(urlParams);
      }
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
            nodeFilter.dispatchEvent(new Event("change", {bubbles: true}));
         } else if (filter.type === "checkbox-list") {
            const arCheckedOptions = urlValue.split(",");
            document
               .querySelectorAll(`#container-${filter.internalName} input`)
               .forEach((checkbox) => {
                  const initialState = checkbox.checked;
                  if (arCheckedOptions.includes(checkbox.value))
                     checkbox.checked = true;
                  else checkbox.checked = false;
                  // Change event must be actively triggered; otherwise, visual changes to label (icon and line-trough) would not be applied
                  if (initialState !== checkbox.checked)
                     checkbox.dispatchEvent(
                        new Event("change", {bubbles: true})
                     );
               });
            document
               .querySelector("#resultsTabBtn")
               .dispatchEvent(new Event("click"));
         }
      }, 300);
   });
}

function handleTypeFromPermalink(type) {
   const nodeWelcome = document.createElement("div");
   nodeWelcome.setAttribute("id", "welcome-message-after-permalink");
   nodeWelcome.innerHTML =
      type === "share"
         ? TEXT_WELCOME_AFTER_PERMALINK_SHARE
         : TEXT_WELCOME_AFTER_PERMALINK_SAVE;
   document.querySelector("#results").prepend(nodeWelcome);
}

function generateLinkWithCurrentUserAnswers(type) {
   let link = window.location.origin + window.location.pathname;
   // Add parameter with personal positions
   const arPersonalPositionsCompressed = compressArrayOfNumbersIntoBase36(
      arPersonalPositions,
      10
   );
   link += "?pos=" + arPersonalPositionsCompressed;
   // Add parameter with voting double values, turn bool to numbers to avoid confusing strings like "false,false,false..." in the URL
   const arVotingDoubleCompressed = compressArrayOfNumbersIntoBase36(
      Array.from(arVotingDouble, (bool) => +(bool || false)), // This ensures that empty slots in the array are set to 0
      2
   );
   link += "&double=" + arVotingDoubleCompressed;

   if (isActivated("addon_filter_results.js")) {
      FILTERS.forEach((filter) => {
         if (filter.type === "dropdown") {
            const selectedOption = document.querySelector(
               `#filter-dropdown-${filter.internalName}`
            ).value;
            if (selectedOption === "show-all") return;
            link += `&${filter.internalName}=${selectedOption}`;
         } else if (filter.type === "checkbox-list") {
            const arCheckedOptions = Array.from(
               document.querySelectorAll(
                  `#container-${filter.internalName} input:checked`
               )
            ).map((node) => node.value);
            if (arCheckedOptions.length === 0) return;
            link += `&${filter.internalName}=${encodeURIComponent(
               arCheckedOptions.join(",")
            )}`;
         }
      });
   }
   link += `&type=${type}`;
   return link;
}

// This compression method supports custom questions with up to 9 answer options.
function compressArrayOfNumbersIntoBase36(array, initialBase) {
   // Prepend a "1" and remove it after decompressing, so that zeros at the start are not lost
   let initialString = "1";
   array.forEach((number) => {
      if (number === 99) initialString += 5;
      else if (number < 0) initialString += 10 + number;
      else initialString += number;
   });
   return parseInt(initialString, initialBase).toString(36);
}

function decompressBase36IntoArrayOfNumbers(base36, finalBase) {
   let decompressedNumberAsString = parseInt(base36, 36).toString(finalBase);
   // Remove the leading "1" that was prepended to preserve leading zeros
   decompressedNumberAsString = decompressedNumberAsString.slice(1);
   let array = decompressedNumberAsString.split("");
   array = array.map((numberAsString) => {
      const number = +numberAsString;
      if (number === 5) return 99;
      else if (number > 5) return number - 10;
      else return number;
   });
   return array;
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

      document.querySelector("#shareAndSaveHeading").innerHTML =
         `<h1>${TEXT_SHARE_AND_SAVE_HEADING}</h1><h2>${TEXT_SHARE_AND_SAVE_SUBHEADING}</h2>`;
      // Without disconnecting, the mutation would for some reason be triggered twice, leading to 2 buttons
      observerResults.disconnect();
      ["share", "save"].forEach((type) => {
         const permalinkButton = document.createElement("button");
         permalinkButton.setAttribute("id", `permalink-button-${type}`);
         permalinkButton.setAttribute(
            "onclick",
            `copyPermalinkAndShowExplanation("${type}")`
         );
         permalinkButton.classList.add("btn", "btn-secondary", "flex-center");
         permalinkButton.innerHTML =
            type === "share"
               ? TEXT_BTN_PERMALINK_SHARE
               : TEXT_BTN_PERMALINK_SAVE;
         document
            .querySelector("#permalink-btn-container")
            .append(permalinkButton);
      });
   }
});

function copyPermalinkAndShowExplanation(type) {
   const permalinkUrl = generateLinkWithCurrentUserAnswers(type);
   const permalinkDescription = document.querySelector(
      "#permalink-description"
   );
   if (type === "share") {
      try {
         navigator.share({
            title: descriptionHeading1,
            text: MESSAGE_SHARE_VIA_WEB_SHARE_API,
            url: permalinkUrl,
         });
      } catch {
         permalinkDescription.innerHTML = DESCRIPTION_PERMALINK_SHARE;
         navigator.clipboard.writeText(permalinkUrl).catch((error) => {
            permalinkDescription.innerHTML = DESCRIPTION_PERMALINK_SHARE_ALT;
         });
         permalinkDescription.classList.add("permalink-description-visible");
         setTimeout(() => {
            permalinkDescription.classList.remove(
               "permalink-description-visible"
            );
         }, PERMALINK_DESCRIPTION_DURATION * 1000);
      }
   } else {
      permalinkDescription.innerHTML = DESCRIPTION_PERMALINK_SAVE;
      navigator.clipboard.writeText(permalinkUrl).catch((error) => {
         permalinkDescription.innerHTML = DESCRIPTION_PERMALINK_SAVE_ALT;
      });
      permalinkDescription.classList.add("permalink-description-visible");
      setTimeout(() => {
         permalinkDescription.classList.remove("permalink-description-visible");
      }, PERMALINK_DESCRIPTION_DURATION * 1000);
   }
}
