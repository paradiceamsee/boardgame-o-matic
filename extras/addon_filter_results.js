/*
This file seems to be long and complex, and it kind of is, because it must accommodate a variety of different filter types and configurations as well as their interactions
However, the procedure for each filter type (started by setupFilters()) is the same:
  * createFilterHtml (of course, highly different HTML for each filter type)
  * addFilterNodeToDOM
  * addEventListenerToFilter (little differences depending on filter type)
  * Now, after the filter is triggered:
    * validateFilter (only required for filter types where input can be invalid; if input is invalid, error message is displayed)
    * hideResults (logic is highly different for each filter type)
    * checkIfAnyResultsLeft (always the same; if not, explanatory message is displayed)
    * sendMessageToLimitResultsAddon (always the same; ensures compatability of both addons)

Other functions:
  * setFiltersAtStart (incl. internal functions) & setPreselectedFilter: Only called if any of the filters are to be set at the beginning before the first question
  * setupButtonResetAllFilters: Only called if button shall be displayed

*/

window.addEventListener("load", setupFilters);

function setupFilters() {
  for (let i = 0; i < FILTERS.length; i++) {
    if (FILTERS[i].sortOptionsAlphabetically) {
      FILTERS[i].options.sort((a, b) => a.label.localeCompare(b.label));
    }
  }
  setFiltersAtStart();
  const filtersTab = document.createElement("div");
  filtersTab.setAttribute("id", "filters");
  filtersTab.classList.add("col", "d-none");
  filtersTab.innerHTML = `<div id="filtersHeading" class="tabHeading">
      <h1>${TEXT_FILTERS_HEADING}</h1>
      <h2>${TEXT_FILTERS_SUBHEADING}</h2>
    </div>
    <div id="filtersContainer"></div>`;
  document
    .querySelector("#sectionResults")
    .insertBefore(filtersTab, document.querySelector("#results"));

  // Start mutation observer to recognize when the results page is displayed
  const target = document.querySelector("#resultsHeading");
  const observer = new MutationObserver(() => {
    FILTERS.forEach((filter) => {
      const nodeFilter = createFilterHtml(filter);
      addFilterNodeToDOM(nodeFilter, filter);
    });
    addEventListenerToApplyFilters();
    if (
      FILTERS.some(
        (filter) => filter.displayFilterValuesInResultDetails?.isWanted
      )
    )
      displayFilterValuesInResultDetails();
  });
  var config = {
    childList: true,
  };
  observer.observe(target, config);
  if (BUTTON_RESET_ALL_FILTERS?.showButton) setupButtonResetAllFilters();
}

function createFilterHtml(filter) {
  // All filters, regardless of type, have the container in common
  const containerOfFilter = document.createElement("div");
  containerOfFilter.classList.add("filter-container");
  containerOfFilter.setAttribute(
    "id",
    `filter-container-${filter.internalName}`
  );
  let divContent = "";
  // Content of container highly differs depending on filter type
  if (filter.type === "dropdown") {
    containerOfFilter.classList.add("filter-container-dropdown");
    if (filter.label)
      divContent += `<i class="bx bx-fw ${filter.icon}"></i>
      <label id="filter-label-dropdown-${filter.internalName}" class="filter-label" for="filter-dropdown-${filter.internalName}">${filter.label}</label>`;
    divContent += `<select name="filter-dropdown-${filter.internalName}" id="filter-dropdown-${filter.internalName}" class="filter-dropdown-select">`;
    divContent += `<option value="show-all">${filter.textOfOptionToShowAll}</option>`; // the 1st option is always a "show all" option (applies no filter to results)
    filter.options.forEach((option) => {
      divContent += `<option value="${option.value}">${option.text}</option>`;
    });
    divContent += "</select>";
  } else if (filter.type === "input-datalist") {
    containerOfFilter.classList.add("filter-container-input-datalist");
    if (filter.label)
      divContent += `<label for="filter-input-${filter.internalName}">${filter.label}</label>`;
    divContent += `
    <input
      type="text"
      placeholder="${filter.placeholder}"
      id="filter-input-${filter.internalName}"
      list="datalist-${filter.internalName}"
    />`; // the input type is not relevant, because it is not actually submitted and sent to a server , "text" works just fine for all cases

    divContent += `<p class='error-message' id='error-message-filter-${filter.type}-${filter.internalName}'></p>
    <datalist id="datalist-${filter.internalName}">`;
    // The datalist generates a dropdown which is filtered by the input and therefore allows auto-complete
    filter.datalist.forEach((item) => {
      divContent += `<option value="${item}"></option>`;
    });
    divContent += "</datalist>";
  } else if (filter.type === "distance") {
    containerOfFilter.classList.add("filter-container-distance");
    divContent += `
    <label for="filter-distance-${filter.internalName}">${filter.label}</label><br>
    <input
      type="text"
      placeholder="${filter.placeholderLocation}"
      id="filter-distance-location-${filter.internalName}"
      list="datalist-${filter.internalName}"
    />`;

    divContent += `<datalist id="datalist-${filter.internalName}">`;
    // The datalist generates a dropdown which is filtered by the input and therefore allows auto-complete
    filter.datalist.forEach((item) => {
      divContent += `<option value="${item.text}"></option>`;
    });
    divContent += "</datalist>";
    divContent += `
    <input
      type="number"
      placeholder="${filter.placeholderDistance}"
      id="filter-distance-distance-${filter.internalName}"
    /> km
    <p class='error-message' id='error-message-filter-${filter.type}-${filter.internalName}'></p>`;
  } else if (filter.type === "checkbox-list") {
    divContent += `<div id="container-${filter.internalName}" class='container-checkbox-list' style='padding-left: 27px'>`;
    if (filter.description)
      divContent += `<p class="filter-description">${filter.description}</p>`;
    for (let i = 0; i < filter.options.length; i++) {
      const isChecked =
        filter.allCheckedByDefault || filter.options[i].checkedByDefault;
      divContent += `<div class="checkbox-container flex-center">
      <input type="checkbox" class="hidden-checkbox" id="filter-checkbox-list-${
        filter.internalName
      }-option${i}" ${isChecked ? "checked" : ""} value="${
        filter.options[i].value
      }" onchange="toggleStylesOfLabel(this, ${
        filter.strikethroughOptionsThatGetHidden && filter.checkedMeansExcluded
      }); showBtnGoToUpdatedResults()">
      <label class="checkbox-list-label" for="filter-checkbox-list-${
        filter.internalName
      }-option${i}">
      <i class='bx bx-sm bx-border ${
        filter.checkedMeansExcluded
          ? "bx-x bg-color-danger"
          : "bx-check bg-color-success"
      } ${!isChecked ? "empty-checkbox" : ""}'></i>
      <span ${
        isChecked &&
        filter.checkedMeansExcluded &&
        filter.strikethroughOptionsThatGetHidden
          ? "class='line-through'"
          : ""
      }>${filter.options[i].label}</span>
      </label>`;
      if (filter.options[i].help) {
        divContent += `<button class="bx bx-help-circle icon-help" id="icon-help-${filter.internalName}-option${i}" onclick='showHelpModalExplainingFilterOption("${filter.options[i].label}",
          "${filter.options[i].help}")'></button>`;
      }
      divContent += `</div>`;
    }
    divContent += "</div>";
  } else if (filter.type === "single-checkbox") {
    if (filter.heading)
      divContent += `<p id="filter-heading-single-checkbox-${filter.internalName}" class="filter-heading">${filter.heading}</p>`;
    divContent += `<input type="checkbox" id="filter-single-checkbox-${
      filter.internalName
    }" ${filter.checkedByDefault ? "checked" : ""}>
    <label for="filter-single-checkbox-${filter.internalName}"> ${
      filter.label
    }</label>`;
  } else if (filter.type === "number-comparison") {
  }
  containerOfFilter.innerHTML = divContent;
  return containerOfFilter;
}

function addFilterNodeToDOM(nodeFilter, filter) {
  if (!document.querySelector("#resultsHeading").textContent) return;
  if (filter.displayInCollapsibleSection?.isWanted)
    createAndAppendCollapsibleSection(nodeFilter, filter);
  else document.querySelector("#filtersContainer").appendChild(nodeFilter);
  // addEventListenerToFilter(filter);
  if (filter.setAtStart?.isWanted) setPreselectedFilter(filter);
}

function toggleStylesOfLabel(element, strikethroughOptionsThatGetHidden) {
  const icon = element.nextElementSibling.querySelector("i");
  icon.classList.toggle("empty-checkbox");
  if (strikethroughOptionsThatGetHidden) {
    element.nextElementSibling
      .querySelector("span")
      .classList.toggle("line-through");
  }
}

function getPositionVerbal(positionValue, question) {
  let positionVerbal;
  if (
    isActivated("addon_custom_voting_buttons.js") &&
    question.isCustomQuestion
  ) {
    positionVerbal =
      window.lookupTableForCustomQuestions[question.questionNr][positionValue];
  } else {
    positionVerbal =
      arIcons[positionValue === 1 ? "0" : positionValue === 0 ? "1" : "2"];
  }
  return positionVerbal;
}

function showTagTooltipOnMobile(clickedElement, event) {
  if (window.screen.width >= 1024) return;
  document.querySelectorAll(".tooltip-active-mobile").forEach((el) => {
    if (el !== clickedElement) el.classList.remove("tooltip-active-mobile");
  });
  clickedElement.classList.toggle("tooltip-active-mobile");
  event.stopPropagation();
  setTimeout(() => {
    document.addEventListener(
      "click",
      () => {
        clickedElement.classList.remove("tooltip-active-mobile");
      },
      { once: true }
    );
  }, 0);

  setTimeout(() => {
    clickedElement.classList.remove("tooltip-active-mobile");
  }, 4000);
}

function displayFilterValuesInResultDetails() {
  function createLookupTableForAnswersToCustomQuestionsResultDetails() {
    window.lookupTableForCustomQuestions = {};
    DISPLAY_ANSWERS_TO_QUESTIONS_IN_RESULT_DETAILS.questionsToBeDisplayed.forEach(
      (question) => {
        if (
          !isActivated("addon_custom_voting_buttons.js") ||
          !question.isCustomQuestion
        )
          return;
        const lookupTableEntry = {};
        objCustomQuestion = CUSTOM_POSITION_BUTTONS.find(
          (obj) => obj.questionNr === question.questionNr
        );
        objCustomQuestion.arPositionValues.forEach((value, index) => {
          lookupTableEntry[value] = objCustomQuestion.arButtonLabels[index];
        });
        window.lookupTableForCustomQuestions[question.questionNr] =
          lookupTableEntry;
      }
    );
  }
  function addAnswersToDivContent(divContent, description) {
    const resultNr = +description
      .getAttribute("id")
      .replace("resultsShortPartyDescription", "");

    DISPLAY_ANSWERS_TO_QUESTIONS_IN_RESULT_DETAILS.questionsToBeDisplayed.forEach(
      (question) => {
        const answerIndex = resultNr * intQuestions + (question.questionNr - 1);
        const answerValue = +arPartyPositions[answerIndex];
        let answerText =
          answerValue === 99
            ? TEXT_NO_DATA
            : getPositionVerbal(answerValue, question);
        divContent += `<li class="row-answer-in-result-details"><i class="bx ${
          arQuestionsIcon[question.questionNr - 1]
        }"></i><span class="text-answer-in-result-details">`;
        if (question.displayQuestionHeading)
          divContent += `${arQuestionsShort[question.questionNr - 1]}: `;
        divContent += answerText;
        divContent += "</span>";
        if (
          DISPLAY_ANSWERS_TO_QUESTIONS_IN_RESULT_DETAILS.showMatchWithPersonalAnswer
        ) {
          const personalPosition = arPersonalPositions[question.questionNr - 1];
          let displayedValue;
          let elementClass;
          let tooltip;
          if (personalPosition === 99) {
            displayedValue = TEXT_SKIPPED;
            elementClass = "skipped";
            tooltip = TOOLTIP_FOR_MATCH_TAG_IN_RESULT_DETAILS_SKIPPED;
          } else {
            const matchValue = calculateMatchValue(
              personalPosition,
              answerValue,
              question.questionNr
            );
            const personalPositionVerbal = getPositionVerbal(
              personalPosition,
              question
            );
            displayedValue = `${matchValue * 100}${
              language === "de" ? "&nbsp;" : ""
            }%`;
            elementClass = matchValue * 100;
            tooltip = `${TOOLTIP_FOR_MATCH_TAG_IN_RESULT_DETAILS_NOT_SKIPPED.replace(
              " %%%placeholder%%% ",
              matchValue === 1 ? " " : ` &quot;${personalPositionVerbal}&quot; `
            )} ${displayedValue}.`;
          }
          divContent += `<span class="match-tag-in-result-details match-${elementClass}" data-tooltip="${tooltip}" onclick="showTagTooltipOnMobile(this, event)">${displayedValue}</span>`;
          if (
            personalPosition !== 99 &&
            arVotingDouble[question.questionNr - 1]
          ) {
            divContent += `<span class="voting-double-tag-in-result-details" data-tooltip="${TOOLTIP_FOR_DOUBLE_WEIGHTED_TAG_IN_RESULT_DETAILS}" onclick="showTagTooltipOnMobile(this, event)">x2</span>`;
          }
        }
        divContent += "</li>";
      }
    );
    return divContent;
  }
  function addFilterValuesToDivContent(divContent, description) {
    FILTERS.forEach((filter) => {
      if (!filter.displayFilterValuesInResultDetails?.isWanted) return;
      const presentFilterValueStrings = description
        .querySelector(".filter-values")
        ?.getAttribute(`data-${filter.internalName}`)
        ?.split(" ");
      if (
        presentFilterValueStrings.length === 1 &&
        presentFilterValueStrings[0] === ""
      ) {
        return;
      }
      const presentFilterOptions = presentFilterValueStrings.map(
        (presentValue) =>
          filter.options.find((option) => option.value === presentValue)
      );
      divContent += `<li>`;
      divContent += `<span class="flex-center" style="display: inline-flex"><i class="bx ${filter.icon}"></i> ${filter.displayFilterValuesInResultDetails.label}:</span> `;
      if (filter.displayFilterValuesInResultDetails.bulletList) {
        divContent += "<ul>";
        presentFilterOptions.forEach((option) => {
          divContent += `<li>${
            option[filter.type === "dropdown" ? "text" : "label"]
          }`;
          if (option.help) {
            divContent += `<button class="bx bx-help-circle icon-help icon-help-result-details-${
              filter.internalName
            }-option${filter.options.indexOf(
              option
            )}" onclick='showHelpModalExplainingFilterOption(
              "${option[filter.type === "dropdown" ? "text" : "label"]}",
              "${option.help}")'></button>`;
          }
          divContent += `</li>`;
        });
        divContent += "</ul>";
      } else
        divContent += presentFilterOptions
          .map(
            (option) => option[filter.type === "dropdown" ? "text" : "label"]
          )
          .join("; ");
    });
    return divContent;
  }
  if (!document.querySelector("#resultsHeading").textContent) return;
  if (DISPLAY_ANSWERS_TO_QUESTIONS_IN_RESULT_DETAILS?.isWanted)
    createLookupTableForAnswersToCustomQuestionsResultDetails();
  document
    .querySelectorAll("div[id^='resultsShortPartyDescription']")
    .forEach((description) => {
      const nodeAnswersAndFilterValues = document.createElement("div");
      let divContent =
        "<ul class='list-answers-and-filter-values-in-result-details'>";
      divContent = addAnswersToDivContent(divContent, description);
      divContent = addFilterValuesToDivContent(divContent, description);
      divContent += "</ul>";
      nodeAnswersAndFilterValues.innerHTML = divContent;
      description.insertBefore(
        nodeAnswersAndFilterValues,
        description.querySelector("#internet-below-description")
      );
    });
}

function updateMatchTags() {
  // Updating the match tags would require quite a lot of code. Until refactoring, we just delete the the entire section and create it anew
  document
    .querySelectorAll(".list-answers-and-filter-values-in-result-details")
    .forEach((node) => {
      node.parentElement.remove();
    });
  displayFilterValuesInResultDetails();
}

function showHelpModalExplainingFilterOption(heading, body) {
  let helpModal = document.querySelector("#help-modal-filter-option");
  if (helpModal) {
    helpModal.querySelector(".modal-header h2").innerHTML = heading;
    helpModal.querySelector(".modal-body").innerHTML = body;
  } else {
    helpModal = document.createElement("div");
    helpModal.classList.add("modal", "fade");
    helpModal.setAttribute("id", "help-modal-filter-option");
    helpModal.setAttribute("role", "dialog");
    helpModal.setAttribute("aria-modal", "true");
    helpModal.setAttribute("tabindex", "-1");
    let divContent = `<div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${heading}</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">${body}</div>
            </div>
        </div>`;
    helpModal.innerHTML = divContent;
    document.body.append(helpModal);

    $("#help-modal-filter-option").on("hide.bs.modal", () => {
      const otherOpenModal = document.querySelector(
        ".modal.show:not(#help-modal-filter-option)"
      );
      if (!otherOpenModal) return;
      // Reset other modal's z-index to be in front of its own backdrop (z-index: 1040), but still behind #help-modal-filter-option (z-index: 1050)
      otherOpenModal.style.zIndex = "1045";
      setTimeout(() => {
        document.body.classList.add("modal-open");
      }, 500);
    });
  }
  $("#help-modal-filter-option").modal("show");
  const otherOpenModal = document.querySelector(
    ".modal.show:not(#help-modal-filter-option)"
  );
  if (otherOpenModal) {
    // Put the other modal behind its own backdrop (resetted when top modal is closed)
    otherOpenModal.style.zIndex = "1040";
    setTimeout(() => {
      // Make the backdrop of the top modal invisible
      document.querySelectorAll(".modal-backdrop")[1].style.opacity = "0";
    }, 0);
  }
}

function addEventListenerToApplyFilters() {
  document
    .querySelectorAll("#resultsTabBtn, #finetuningTabBtn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        hideResults();
        checkIfAnyResultsLeft();
        sendMessageToLimitResultsAddon();
      });
    });

  if (
    FILTERS.some(
      (filter) =>
        filter.type === "single-checkbox" || filter.type === "checkbox-list"
    )
  ) {
    // In case filters are set by default, a first check must be done upfront
    document.querySelector("#resultsTabBtn").dispatchEvent(new Event("click"));
  }
}

function showBtnGoToUpdatedResults() {
  if (
    !document.querySelector("#filters").classList.contains("activeTab") || // If the filters tab is not active, the filter was not manually changed, but this function was triggered initially at startup
    document.querySelector("#btn-see-updated-results")
  )
    return;
  const btnSeeUpdatedResults = document.createElement("button");
  btnSeeUpdatedResults.setAttribute("id", "btn-see-updated-results");
  btnSeeUpdatedResults.classList.add(
    "btn",
    "flex-center",
    "off-screen",
    "btn-secondary"
  );
  btnSeeUpdatedResults.innerHTML = REFRESH_BUTTON_TEXT;
  document.querySelector("#sectionResults").appendChild(btnSeeUpdatedResults);
  setTimeout(() => {
    btnSeeUpdatedResults.classList.remove("off-screen");
  }, 0);
  const resultsTabBtn = document.querySelector("#resultsTabBtn");
  btnSeeUpdatedResults.addEventListener("click", () => {
    resultsTabBtn.click();
  });
  resultsTabBtn.addEventListener("click", () => {
    btnSeeUpdatedResults.remove();
  });
}

function hideResults() {
  const nodelistAllResults = document.querySelectorAll(".row-with-one-result");

  FILTERS.forEach((filter) => {
    if (filter.type === "dropdown") {
      const selectedOption = document.querySelector(
        `#filter-dropdown-${filter.internalName}`
      ).value;
      nodelistAllResults.forEach((nodeResult) => {
        nodeResult.classList.remove(`hidden-by-filter-${filter.internalName}`);
        const arCorrespondingFilterValues = nodeResult
          .querySelector(".filter-values")
          ?.getAttribute(`data-${filter.internalName}`)
          ?.split(" ");

        if (
          selectedOption !== "show-all" &&
          (!arCorrespondingFilterValues ||
            !arCorrespondingFilterValues.includes(selectedOption))
        )
          nodeResult.classList.add(`hidden-by-filter-${filter.internalName}`);
      });
    } else if (filter.type === "input-datalist") {
      const inputValue = document.querySelector(
        `#filter-input-${filter.internalName}`
      ).value;
      nodelistAllResults.forEach((nodeResult) => {
        nodeResult.classList.remove(`hidden-by-filter-${filter.internalName}`);
        const arCorrespondingFilterValues = nodeResult
          .querySelector(".filter-values")
          ?.getAttribute(`data-${filter.internalName}`)
          ?.split(" ");

        if (
          inputValue &&
          (!arCorrespondingFilterValues ||
            !arCorrespondingFilterValues.includes(inputValue))
        )
          nodeResult.classList.add(`hidden-by-filter-${filter.internalName}`);
      });
    } else if (filter.type === "distance") {
      const inputValueLocation = document.querySelector(
        `#filter-distance-location-${filter.internalName}`
      ).value;

      const inputValueDistance = +document.querySelector(
        `#filter-distance-distance-${filter.internalName}`
      ).value;
      // If both are empty, the validation succeeded, but no filter shall be applied
      if (!inputValueLocation && !inputValueDistance) return;

      const correspondingDatalistItem = filter.datalist.filter(
        (item) => item.text === inputValueLocation
      )[0];
      const latUser = +correspondingDatalistItem.lat;
      const lonUser = +correspondingDatalistItem.lon;

      nodelistAllResults.forEach((nodeResult) => {
        nodeResult.classList.remove(`hidden-by-filter-${filter.internalName}`);
        const latResult = +nodeResult
          .querySelector(".filter-values")
          ?.getAttribute(`data-${filter.internalName}-lat`);
        const lonResult = +nodeResult
          .querySelector(".filter-values")
          ?.getAttribute(`data-${filter.internalName}-lon`);

        if (
          !latResult ||
          !lonResult ||
          +haversineDistance(latUser, lonUser, latResult, lonResult) >
            inputValueDistance
        )
          nodeResult.classList.add(`hidden-by-filter-${filter.internalName}`);

        function haversineDistance(latUser, lonUser, latParty, lonParty) {
          // Radius of the Earth in kilometers
          const R = 6371;
          // Convert latitude and longitude from degrees to radians
          const dLat = ((latParty - latUser) * Math.PI) / 180;
          const dLon = ((lonParty - lonUser) * Math.PI) / 180;
          // Haversine formula
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((latUser * Math.PI) / 180) *
              Math.cos((latParty * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          // Distance in kilometers
          const distance = R * c;
          return distance;
        }
      });
    } else if (filter.type === "checkbox-list") {
      const selectedOptions = [];
      for (let i = 0; i < filter.options.length; i++) {
        if (
          document.querySelector(
            `#filter-checkbox-list-${filter.internalName}-option${i}`
          ).checked
        )
          selectedOptions.push(filter.options[i].value);
      }

      nodelistAllResults.forEach((nodeResult) => {
        nodeResult.classList.remove(`hidden-by-filter-${filter.internalName}`);
        if (selectedOptions.length === 0) return;
        const arCorrespondingFilterValues = nodeResult
          .querySelector(".filter-values")
          ?.getAttribute(`data-${filter.internalName}`)
          ?.split(" ");
        const doFiltersValuesIncludeSelectedOption = selectedOptions.some(
          (item) => arCorrespondingFilterValues.includes(item)
        );

        if (
          !arCorrespondingFilterValues ||
          (filter.checkedMeansExcluded &&
            doFiltersValuesIncludeSelectedOption) ||
          (!filter.checkedMeansExcluded &&
            !doFiltersValuesIncludeSelectedOption)
        )
          nodeResult.classList.add(`hidden-by-filter-${filter.internalName}`);
      });
    } else if (filter.type === "single-checkbox") {
      const isChecked = document.querySelector(
        `#filter-single-checkbox-${filter.internalName}`
      ).checked;
      nodelistAllResults.forEach((nodeResult) => {
        nodeResult.classList.remove(`hidden-by-filter-${filter.internalName}`);
        const correspondingFilterValue = nodeResult
          .querySelector(".filter-values")
          ?.getAttribute(`data-${filter.internalName}`);
        // If checkedMeansExcluded is false, all results are shown when the box is checked. If the box is unchecked, those results with the corresponding value are hidden
        // If checkedMeansExcluded is true, vice versa (results with the value are hidden when box is checked)
        // if correspondingFilterValue is undefined, the result is not hidden; therefore, the attribute is only required on results to be hidden by this filter
        if (
          correspondingFilterValue === filter.value &&
          ((!filter.checkedMeansExcluded && !isChecked) ||
            (filter.checkedMeansExcluded && isChecked))
        )
          nodeResult.classList.add(`hidden-by-filter-${filter.internalName}`);
      });
    }
  });
}

function checkIfAnyResultsLeft() {
  const nodelistResultsNotHiddenByFilters = document.querySelectorAll(
    ".row-with-one-result:not([class*='hidden-by-filter'])"
  );
  if (nodelistResultsNotHiddenByFilters.length === 0) {
    if (document.querySelector("#error-message-no-filter-results")) return;
    const nodeErrorMessage = document.createElement("div");
    nodeErrorMessage.classList.add("error-message");
    nodeErrorMessage.setAttribute("id", "error-message-no-filter-results");
    nodeErrorMessage.innerHTML = `<p>${ERROR_MESSAGE_NO_FILTER_RESULTS}</p>\
    <button id="no-filter-results-change-filters" class="btn btn-primary flex-center"><i class="bx bx-chevron-left bx-sm"></i> ${PROMPT_CHANGE_FILTERS_IF_NO_RESULTS_MATCH}</button>`;
    nodeErrorMessage
      .querySelector("#no-filter-results-change-filters")
      .addEventListener("click", () => {
        document.querySelector("#filtersTabBtn").click();
      });
    document.querySelector("#resultsShort").appendChild(nodeErrorMessage);
  } else document.querySelector("#error-message-no-filter-results")?.remove();
}

function sendMessageToLimitResultsAddon() {
  window.postMessage("filter changed", "*");
}

function createAndAppendCollapsibleSection(nodeFilter, filter) {
  const section = document.createElement("details");
  section.innerHTML = `<summary><i class='bx bx-fw disclosure-chevron'></i><span class="collapsible-section-opener"><i class="bx bx-fw ${filter.icon}"></i>${filter.displayInCollapsibleSection.heading}<span></summary>`;
  section.appendChild(nodeFilter);
  document.querySelector("#filtersContainer").appendChild(section);

  // Only one expanded section at a time
  section.addEventListener("toggle", () => {
    if (!section.open) return;
    document.querySelectorAll("details[open]").forEach((openDetail) => {
      if (openDetail !== section) {
        openDetail.open = false;
      }
    });
  });

  // Collapse section if tab changes
  document
    .querySelectorAll("#navigationBar button:not(#filtersTabBtn)")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        section.open = false;
      });
    });
}

function setFiltersAtStart() {
  const arFiltersToSetAtStart = FILTERS.filter(
    (filter) => filter.setAtStart?.isWanted
  );
  if (arFiltersToSetAtStart.length === 0) return;
  const elementsToHide = document.querySelectorAll(
    "#sectionShowQuestions, #sectionNavigation, #restart"
  );
  document
    .querySelector("#descriptionButtonStart")
    .addEventListener("click", () => {
      elementsToHide.forEach((element) => {
        element.classList.add("d-none");
      });
      showNextCardToSetFilter(0);
    });

  // From here it is just function declarations, nothing directly happening in setFiltersAtStart()

  function showNextCardToSetFilter(index) {
    if (index >= arFiltersToSetAtStart.length) {
      // All filters are set (or skipped), therefore show first question
      if (animateQuestionsCard) {
        setTimeout(() => {
          elementsToHide.forEach((element) => {
            element.classList.remove("d-none");
          });
          document
            .querySelector("#sectionShowQuestions")
            .classList.add("flyInRight");
        }, 400);
        setTimeout(() => {
          document
            .querySelector("#sectionShowQuestions")
            .classList.remove("flyInRight");
        }, 800);
      } else {
        elementsToHide.forEach((element) => {
          element.classList.remove("d-none");
        });
      }
      history.pushState({ type: "question", questionNumber: 0 }, "");
      return;
    }

    history.replaceState({ type: "filterAtStart" }, "");

    const filter = arFiltersToSetAtStart[index];
    if (
      filter.type !== "dropdown" &&
      (filter.type !== "checkbox-list" || filter.checkedMeansExcluded)
    ) {
      // So far, only dropdown filters and checkbox lists that are not exclusion-based are supported; other types can be added in the future if needed
      showNextCardToSetFilter(index + 1);
      return;
    }
    const cardToSetFilter = document.createElement("div");
    cardToSetFilter.classList.add("card");
    cardToSetFilter.setAttribute(
      "id",
      `card-to-set-filter-${filter.internalName}`
    );
    cardToSetFilter.style.cssText = "margin: 1rem 15px 0 15px;";
    let divContent = `<div class="card-header"><h2 class="flex-center"><i class="bx ${filter.icon}"></i>${filter.setAtStart.cardHeading}</h2></div>
            <hr>
            <div class="card-body">
              <p class="card-text lead">${filter.setAtStart.cardBody}</p>
            </div>
            <section>
                    <div class="row">`;
    for (let i = 0; i < filter.options.length; i++) {
      divContent += `<div class="col">
            <button type="button" data-value="${
              filter.options[i].value
            }" class="btn btn-lg btn-block btn-voting btn-set-filter-${
        filter.internalName
      }">${
        filter.options[i][filter.type === "dropdown" ? "text" : "label"]
      }</button>
          </div>`;
    }
    divContent += `</div></section>
        <div class="w-100"></div>
        <div class="col">
                        <button type="button" style="background-color: transparent; color: var(--text-on-primary)" id="skip-set-filter-${filter.internalName}" class="btn btn-secondary btn float-right flex-center">${TEXT_VOTING_SKIP}</button>
                      </div>`;

    cardToSetFilter.innerHTML = divContent;

    if (animateQuestionsCard) {
      setTimeout(() => {
        sectionShowQuestions.parentNode.insertBefore(
          cardToSetFilter,
          sectionShowQuestions
        );
        cardToSetFilter.classList.add("flyInRight");
      }, 400);
      setTimeout(() => {
        cardToSetFilter.classList.remove("flyInRight");
        addEventListenersToButtons(filter, index);
      }, 800);
    } else {
      sectionShowQuestions.parentNode.insertBefore(
        cardToSetFilter,
        sectionShowQuestions
      );
      addEventListenersToButtons(filter, index);
    }

    function addEventListenersToButtons(filter, index) {
      const buttonsSetFilter = document.querySelectorAll(
        `#card-to-set-filter-${filter.internalName} .btn-set-filter-${filter.internalName}`
      );
      buttonsSetFilter.forEach((button) => {
        button.addEventListener("click", (e) => {
          window[`setFilter${filter.internalName}`] =
            e.target.getAttribute("data-value");
          hideCardToSetFilter(index);
        });
      });
      document
        .querySelector(
          `#card-to-set-filter-${filter.internalName} #skip-set-filter-${filter.internalName}`
        )
        .addEventListener("click", () => {
          window[`setFilter${filter.internalName}`] = null;
          hideCardToSetFilter(index);
        });
    }
    function hideCardToSetFilter(index) {
      const cardToSetFilter = document.querySelector(
        `#card-to-set-filter-${arFiltersToSetAtStart[index].internalName}`
      );
      if (animateQuestionsCard) {
        cardToSetFilter.classList.add("flyOutLeft");
        setTimeout(() => {
          cardToSetFilter.classList.add("d-none");
          showNextCardToSetFilter(index + 1);
        }, 400);
      } else {
        cardToSetFilter.classList.add("d-none");
        showNextCardToSetFilter(index + 1);
      }
    }
  }
}

function setPreselectedFilter(filter) {
  if (window.allFiltersResetted) {
    // If BUTTON_RESET_ALL_FILTERS.showButton is true and the button has been clicked already, window.allFiltersResetted is set to true
    // This prevents setting preselected filters again (reset all filters overwrites preselected filters)
    return;
  }

  const selectedFilter = window[`setFilter${filter.internalName}`];
  if (!selectedFilter) return;
  if (filter.type === "dropdown") {
    document.querySelector(`#filter-dropdown-${filter.internalName}`).value =
      selectedFilter;
  } else if (filter.type === "checkbox-list") {
    document
      .querySelectorAll(`#filter-container-${filter.internalName} input`)
      .forEach((checkbox) => {
        const currentState = checkbox.checked;
        const newState = checkbox.value === selectedFilter ? true : false;
        if (currentState !== newState) {
          checkbox.checked = newState;
          checkbox.dispatchEvent(new Event("change"));
        }
      });
  }

  // This causes the filter to be applied, so the result list is updated accordingly
  document.querySelector("#resultsTabBtn").dispatchEvent(new Event("click"));
}

function setupButtonResetAllFilters() {
  const target = document.querySelector("#resultsHeading");
  const observer = new MutationObserver(createButtonResetAllFilters);
  var config = {
    childList: true,
  };
  observer.observe(target, config);
  function createButtonResetAllFilters() {
    if (!document.querySelector("#resultsHeading").textContent) return;
    const containerBtn = document.createElement("div");
    containerBtn.setAttribute("id", "container-reset-all-filters");
    containerBtn.innerHTML = `<button id="reset-all-filters">
      <i class="bx bx-fw ${BUTTON_RESET_ALL_FILTERS.iconButton}"></i>
      ${BUTTON_RESET_ALL_FILTERS.textButton}
    </button>`;
    document.querySelector("#filtersContainer").appendChild(containerBtn);
    document
      .querySelector("#reset-all-filters")
      .addEventListener("click", () => {
        window.allFiltersResetted = true; // This prevents that the preselected filters from the start are set again by setPreselectedFilter()
        // Instead of manually resetting each filter, we just delete and re-create them all
        document
          .querySelectorAll(
            `#filtersContainer details, \
            .filter-container, \
            #container-reset-all-filters, \
            #error-message-no-filter-results`
          )
          .forEach((node) => {
            node.remove();
          });
        FILTERS.forEach((filter) => {
          const nodeFilter = createFilterHtml(filter);
          addFilterNodeToDOM(nodeFilter, filter);
        });
        document
          .querySelectorAll(".row-with-one-result[class*='hidden-by-filter']")
          .forEach((result) => {
            Array.from(result.classList).forEach((className) => {
              if (className.startsWith("hidden-by-filter")) {
                result.classList.remove(className);
              }
            });
          });
        showBtnGoToUpdatedResults();
        createButtonResetAllFilters();
        sendMessageToLimitResultsAddon();
      });
  }
}
