function setMutationObserverAnswersAndFilterValuesInResultDetails() {
  const target = document.querySelector("#resultsHeading");
  var observer = new MutationObserver(
    displayAnswersAndFilterValuesInResultDetails
  );
  var config = {
    attributes: true,
    childList: true,
    subtree: true,
  };
  observer.observe(target, config);
}

function createLookupTablesAnswersAndFilterValuesInResultDetails() {
  window.lookupTableForCustomQuestions = {};
  QUESTIONS_TO_BE_DISPLAYED.forEach((question) => {
    if (!question.isCustomQuestion) return;
    const lookupTableEntry = {};
    objCustomQuestion = CUSTOM_POSITION_BUTTONS.find(
      (obj) => obj.questionNr === question.questionNr
    );
    objCustomQuestion.arPositionValues.forEach((value, index) => {
      lookupTableEntry[value] = objCustomQuestion.arButtonLabels[index];
    });
    window.lookupTableForCustomQuestions[question.questionNr] =
      lookupTableEntry;
  });
  window.lookupTableForFilters = {};
  FILTERS_TO_BE_DISPLAYED.forEach((filter) => {
    const objFilter = FILTERS.find(
      (obj) => obj.internalName === filter.internalName
    );
    const lookupTableEntry = {};
    objFilter.options.forEach((option) => {
      lookupTableEntry[option.value] =
        objFilter.type === "dropdown" ? option.text : option.label;
    });
    lookupTableForFilters[filter.internalName] = lookupTableEntry;
  });
}

function displayAnswersAndFilterValuesInResultDetails() {
  function addAnswersToDivContent(divContent, description) {
    const resultNr = +description
      .getAttribute("id")
      .replace("resultsShortPartyDescription", "");

    QUESTIONS_TO_BE_DISPLAYED.forEach((question) => {
      const answerIndex = resultNr * intQuestions + (question.questionNr - 1);
      const answerValue = arPartyPositions[answerIndex];
      let answerText = "";
      if (question.isCustomQuestion)
        answerText =
          window.lookupTableForCustomQuestions[question.questionNr][
            answerValue
          ];
      else
        answerText =
          arIcons[answerValue === 1 ? "0" : answerValue === 0 ? "1" : "2"];
      divContent += `<li class="flex-center"><i class="bx ${
        arQuestionsIcon[question.questionNr - 1]
      }"></i>`;
      if (question.displayQuestionHeading)
        divContent += `${arQuestionsShort[question.questionNr - 1]}: `;
      divContent += answerText;
      divContent += "</li>";
    });
    return divContent;
  }

  function addFilterValuesToDivContent(divContent, description) {
    FILTERS_TO_BE_DISPLAYED.forEach((filter) => {
      const objFilter = FILTERS.find(
        (obj) => obj.internalName === filter.internalName
      );
      const presentFilterValues = description
        .querySelector(".filter-values")
        .getAttribute(`data-${filter.internalName}`)
        .split(" ");
      if (presentFilterValues.length === 1 && presentFilterValues[0] === "")
        return;
      const textsForPresentFilterValues = presentFilterValues.map(
        (value) => window.lookupTableForFilters[filter.internalName][value]
      );
      divContent += `<li class="">`;
      if (filter.label)
        divContent += `<span class="flex-center" style="display: inline-flex"><i class="bx ${objFilter.icon}"></i> ${filter.label}:</span> `;
      if (filter.bulletList) {
        divContent += "<ul>";
        textsForPresentFilterValues.forEach((text) => {
          divContent += `<li>${text}</li>`;
          const objFilterOption = objFilter.options.find(
            (option) => option.label === text
          );
          if (objFilterOption.help) {
            index = objFilter.options.indexOf(objFilterOption);
            const nodeHelpIcon = document.querySelector(
              `#icon-help-${objFilter.internalName}-option${index}`
            );
            const clone = nodeHelpIcon.cloneNode();
            document.body.appendChild(clone);
          }
          divContent += `</li>`;
        });
        divContent += "</ul>";
      } else divContent += textsForPresentFilterValues.join("; ");
    });
    return divContent;
  }
  if (!document.querySelector("#resultsHeading").textContent) return;
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

window.addEventListener("load", () => {
  setMutationObserverAnswersAndFilterValuesInResultDetails();
  createLookupTablesAnswersAndFilterValuesInResultDetails();
});
