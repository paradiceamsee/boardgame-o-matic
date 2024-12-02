// This addon must be loaded before addon_permalink_to_personal_results.js in array "addons" in definition.js
// Otherwise, changing the position of a custom question at the end does not trigger the refresh button of the permalink addon

function createCustomVotingButtons() {
  document
    .querySelector("#sectionShowQuestions")
    .setAttribute("data-question-number", activeQuestion); // To add custom CSS, if needed

  // Show voting double button, might have been hidden from previous question
  // const colVoteDouble = document.querySelector("#votingDouble").parentNode;
  const colVoteDouble = document.querySelector("#voting-double-container-card");
  colVoteDouble.classList.remove("d-none");

  // Remove all custom buttons (from previous question), except those for the active question
  document
    .querySelectorAll(`.btn-custom:not(.btn-custom-${activeQuestion})`)
    .forEach((btn) => {
      btn.parentNode.parentNode.removeChild(btn.parentNode);
    });
  const nodelistStandardVotingButtons = document.querySelectorAll(
    "#votingPro, #votingNeutral, #votingContra"
  );

  // Check if active question should be customized, directly assign matching object to variable
  if (
    (correspondingCustomQuestion = CUSTOM_POSITION_BUTTONS.find(
      (obj) => obj.questionNr === activeQuestion + 1
    )) &&
    // Check if start screen is showing, because otherwise it could trigger this block, since it has activeQuestion = 0
    window.getComputedStyle(document.querySelector("#sectionDescription"))
      .display === "none"
  ) {
    if (correspondingCustomQuestion.hideVotingDouble)
      colVoteDouble.classList.add("d-none");

    nodelistStandardVotingButtons.forEach((btn) =>
      btn.parentNode.classList.add("d-none")
    );

    for (
      let i = 0;
      i < correspondingCustomQuestion.arButtonLabels.length;
      i++
    ) {
      const newBtn = document.createElement("div");
      newBtn.classList.add("col");
      newBtn.innerHTML = `<button type="button" class="btn btn-lg btn-custom btn-custom-${activeQuestion} btn-block btn-voting">${correspondingCustomQuestion.arButtonLabels[i]}</button>`;
      if (correspondingCustomQuestion.isYesOrDontCareQuestion) {
        // For such questions, it only needs two buttons:
        //    One button meaning "I do care": The first button is used (it is the one which agrees most)
        //    One button meading "I don't care": The last button is used (the value is later changed to 99)
        if (i === 0) {
          newBtn.querySelector("button").innerHTML =
            correspondingCustomQuestion.buttonTextAndIconLabelForYes;
        } else if (
          i ===
          correspondingCustomQuestion.arButtonLabels.length - 1
        ) {
          newBtn.querySelector("button").innerHTML =
            correspondingCustomQuestion.buttonTextAndIconLabelForDontCare;
        } else continue;
      }
      newBtn.querySelector("button").addEventListener("click", () => {
        arPersonalPositions[activeQuestion] =
          correspondingCustomQuestion.arPositionValues[i];
        fnShowQuestionNumber(activeQuestion);
      });

      const referenceNode = document.querySelector(
        "#sectionVotingButtons .w-100"
      );
      referenceNode.parentNode.insertBefore(newBtn, referenceNode);
    }
  } else {
    // Active question is not to be customized -> Show standard voting buttons (in case they are hidden from previous custom question)
    nodelistStandardVotingButtons.forEach((btn) =>
      btn.parentNode.classList.remove("d-none")
    );
  }
}

function createInitialCustomPositionButtons() {
  // mutationObserver is triggered at the very start, because resultsHeading is emptied. This first trigger is ignored
  if (!document.querySelector("#resultsHeading").textContent) return;
  CUSTOM_POSITION_BUTTONS.forEach((obj) => {
    const i = obj.questionNr - 1;
    if (obj.hideVotingDouble)
      document.querySelector(
        `#voting-double-container-question${i}`
      ).style.display = "none"; // Not using .d-none, because this is removed and added to this element by other mechanism
    document.querySelectorAll(`.selfPosition${i}`).forEach((dropdown) => {
      let dropdownContent = "";
      if (obj.isYesOrDontCareQuestion) {
        dropdownContent += `
        <option value="${obj.arPositionValues[0]}">${obj.buttonTextAndIconLabelForYes}</option>
        <option value="99">${obj.buttonTextAndIconLabelForDontCare}</option>`;
      } else {
        for (let j = 0; j < obj.arPositionValues.length; j++) {
          dropdownContent += `<option value="${obj.arPositionValues[j]}">${obj.arPositionIcons[j]}</option>`;
        }
        dropdownContent += `<option value="99">${ICON_SKIPPED}</option>`;
      }
      dropdown.innerHTML = dropdownContent;
      dropdown.value = arPersonalPositions[i];
    });

    document.querySelectorAll(`.partyPositionToQuestion${i}`).forEach((btn) => {
      btn.classList.remove(
        "btn-success",
        "btn-warning",
        "btn-danger",
        "btn-default"
      );
      const partyPosition = +btn.getAttribute("data-value");
      const positionIndex = obj.arPositionValues.indexOf(partyPosition);
      let btnTitleAndAltText = "";
      if (positionIndex === -1) {
        btn.style.cssText = "background-color: transparent; color: #000";
        btn.innerHTML = ICON_SKIPPED;
        btnTitleAndAltText = obj.arButtonAltTexts[index] ?? TEXT_VOTING_SKIP;
      } else {
        btn.innerHTML = obj.arPositionIcons[positionIndex];
        btn.style.cssText = `background-color: ${
          obj.arBackgroundColor?.[positionIndex] ||
          CUSTOM_POSITION_BUTTONS_DEFAULT_VALUES.backgroundColor
        }; color: ${
          obj.arTextColor?.[positionIndex] ||
          CUSTOM_POSITION_BUTTONS_DEFAULT_VALUES.textColor
        }`;
        btnTitleAndAltText = obj.arButtonAltTexts[positionIndex];
        btn.setAttribute("alt", `${TEXT_ANSWER_PARTY}: ${btnTitleAndAltText}`);
        btn.setAttribute(
          "title",
          `${TEXT_ANSWER_PARTY}: ${btnTitleAndAltText}`
        );
      }
    });
  });
}

window.addEventListener("load", () => {
  CUSTOM_POSITION_BUTTONS.forEach((obj) => {
    if (obj.votingDoubleByDefault) arVotingDouble[obj.questionNr - 1] = true;
  });

  // For custom questions with votingDoubleByDefault & hideVotingDouble, the user shall not see this state
  const stylesheet = document.createElement("style");
  stylesheet.setAttribute("id", "customVotingButtonsCSS");
  CUSTOM_POSITION_BUTTONS.forEach((obj) => {
    if (obj.votingDoubleByDefault && obj.hideVotingDouble)
      stylesheet.textContent += `#jumpToQuestionNr${obj.questionNr} a {
        font-weight: 400 !important;
      }`;
  });
  document.head.appendChild(stylesheet);

  const observerQuestion = new MutationObserver(createCustomVotingButtons);
  observerQuestion.observe(document.querySelector("#showQuestionsQuestion"), {
    childList: true,
  });

  const observerResults = new MutationObserver(
    createInitialCustomPositionButtons
  );
  observerResults.observe(document.querySelector("#resultsHeading"), {
    childList: true,
  });
});
