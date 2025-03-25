// FUNKTION
// Erzeuge einen wegklickbaren, responsiven Tooltip für den Button "Doppelt gewichten", der die Funktion kurz erklärt.

// 1.) Allgemeine Angaben
// General Settings

// Bei Bedarf kannst du die CSS-Regeln im Code direkt bearbeiten oder in einem anderen Stylesheet überschreiben

// 2.) In der DEFINITION.JS in den Erweiterten Einstellungen das Add-On eintragen.
// Add the add-on to the advanced settings in DEFINITION.JS
// var addons = ["extras/addon_contacts_in_results.js"]

// 3.) Fertig.
// That's it.

/// ////////////////////////////////////////////////////////////////////

// Hier kommt nur noch Quellcode. Bitte gehen Sie weiter. Hier gibt es nichts zu sehen.
// That's just source code. Please move on. Nothing to see here.

/// ////////////////////////////////////////////////////////////////////

// Tooltip für Button "Doppelt gewichten" erzeugen
if (TOOLTIP_VOTING_DOUBLE) {
  window.addEventListener("load", () => {
    document
      .querySelector("#descriptionButtonStart")
      .addEventListener("click", () => {
        // Erzeuge den Tooltip und seine Inhalte
        const tooltipVotingDouble = document.createElement("div");
        tooltipVotingDouble.classList.add("tooltipVotingDouble");
        tooltipVotingDouble.innerHTML = `
        <span>${TOOLTIP_VOTING_DOUBLE}</span>
        <button class="closeTooltipVotingDouble">&times;</button>`;
        document
          .querySelector("#votingDouble")
          .parentNode.appendChild(tooltipVotingDouble);

        // If users are not forced to close the tooltip, they often just leave it open. On mobile devices, this leads to the pro button being covered all the time
        // Therefore, we force users on mobile devices to close the button
        if (window.screen.width < 768) {
          const tooltipBackdrop = document.createElement("div");
          tooltipBackdrop.style.cssText =
            "position: fixed;   top: 0;   left: 0;   z-index: 4;   width: 100vw;   height: 100vh;";
          tooltipBackdrop.setAttribute("id", "tooltip-backdrop");
          document
            .querySelector("#votingDouble")
            .parentNode.appendChild(tooltipBackdrop);

          tooltipBackdrop.addEventListener("click", () => {
            tooltipBackdrop.classList.add("d-none");
            tooltipVotingDouble.classList.add("d-none");
          });
          document
            .querySelector(".closeTooltipVotingDouble")
            .addEventListener("click", () => {
              tooltipBackdrop.classList.add("d-none");
            });
        }

        // Füge einen Event-Listener zum X-Button hinzu
        document
          .querySelector(".closeTooltipVotingDouble")
          .addEventListener("click", () => {
            // Verstecke den Tooltip
            tooltipVotingDouble.classList.add("d-none");
          });
      });
  });
}

if (TOOLTIP_RESULTS_SHORT || TOOLTIP_RESULTS_BY_THESIS || TOOLTIP_FILTER_TAB) {
  // eslint-disable-next-line no-inner-declarations
  function fnTooltipsInResults() {
    if (!document.querySelector("#resultsHeading").textContent) return;
    if (TOOLTIP_RESULTS_SHORT) {
      let isTooltipResultsShortAlreadyShowing = false;
      // Wenn in der resultsShortTable ein Button "Antworten anzeigen" geklickt wird: prüfe, ob das das erste Mal war.
      // Wenn ja, Tooltip erstellen und hinter dem ersten selfPosition-Button einfügen
      document
        .querySelector("#resultsShortTable")
        .querySelectorAll(".nonexpanded")
        .forEach((button) => {
          button.addEventListener("click", (e) => {
            if (!isTooltipResultsShortAlreadyShowing) {
              isTooltipResultsShortAlreadyShowing = true;
              // Partei-Nummer aus Event herausfiltern
              const partyNumForTooltip = e.target.id
                .replace("resultsByPartyAnswers", "")
                .replace("collapse", "");
              const tooltipResultsShort = document.createElement("div");
              tooltipResultsShort.classList.add("tooltipResultsShort");
              tooltipResultsShort.innerHTML = `<span>${TOOLTIP_RESULTS_SHORT}</span>
                                  <button class="closeTooltipResultsShort">&times;</button>`;
              document
                .querySelector(
                  `#resultsByPartyAnswersToQuestion${partyNumForTooltip}`
                )
                .querySelector("#selfPositionContainer0")
                .appendChild(tooltipResultsShort);

              document
                .querySelector(".closeTooltipResultsShort")
                .addEventListener("click", () => {
                  document
                    .querySelector(".tooltipResultsShort")
                    .classList.add("d-none");
                });
            }
          });
        });
    }
    if (TOOLTIP_RESULTS_BY_THESIS) {
      const tooltipResultsByThesis = document.createElement("div");
      tooltipResultsByThesis.classList.add("tooltipResultsByThesis");
      tooltipResultsByThesis.innerHTML = `
      <span>${TOOLTIP_RESULTS_BY_THESIS}</span>
      <button class="closeTooltipResultsByThesis">&times;</button>
      `;
      document
        .querySelector(
          `#resultsByThesisQuestion${
            TOOLTIP_RESULTS_BY_THESIS_QUESTION_NUMBER - 1
          }`
        )
        .previousElementSibling.appendChild(tooltipResultsByThesis);
      document
        .querySelector(".closeTooltipResultsByThesis")
        .addEventListener("click", () => {
          document
            .querySelector(".tooltipResultsByThesis")
            .classList.add("d-none");
        });
    }
    if (TOOLTIP_FILTER_TAB) {
      const tooltipFilterTab = document.createElement("div");
      tooltipFilterTab.classList.add("tooltipFilterTab", "d-none", "invisible");
      tooltipFilterTab.innerHTML = `
      <span>${TOOLTIP_FILTER_TAB}</span>
      <button class="closeTooltipFilterTab">&times;</button>`;
      tooltipFilterTab.addEventListener("click", (event) => {
        event.stopPropagation();
      });
      document
        .querySelector("#filtersTabBtnContainer")
        .prepend(tooltipFilterTab);

      const backdrop = document.createElement("div");
      backdrop.classList.add("d-none");
      backdrop.setAttribute("id", "backdropTooltipFilterTab");
      document.querySelector("#navigationBar").appendChild(backdrop); // It must be in the fixed navbar in element for the stacking context to work

      let hasTriggered = false;
      const triggerPoint = 800;
      window.addEventListener("scroll", () => {
        requestAnimationFrame(() => {
          if (
            !hasTriggered &&
            window.scrollY >= triggerPoint &&
            document.querySelector("#resultsTabBtn.activeTabBtn")
          ) {
            hasTriggered = true;
            tooltipFilterTab.classList.remove("d-none");
            backdrop.classList.remove("d-none");
            document
              .querySelector("#filtersTabBtn")
              .classList.add("tooltipped");
            document.body.style.overflow = "hidden"; // Prevent scrolling

            setTimeout(() => {
              tooltipFilterTab.classList.replace("invisible", "fadeInTop");
              backdrop.classList.add("active");
            }, 0);
            setTimeout(() => {
              tooltipFilterTab.classList.remove("fadeInTop");

              document
                .querySelectorAll(
                  ".closeTooltipFilterTab, #filtersTabBtn, #backdropTooltipFilterTab"
                )
                .forEach((btn) => {
                  btn.addEventListener("click", () => {
                    tooltipFilterTab.classList.add("fadeOutBottom");
                    backdrop.classList.remove("active");
                    document
                      .querySelector("#filtersTabBtn")
                      .classList.remove("tooltipped");
                    document.body.style.overflow = ""; // Restore scrolling
                    setTimeout(() => {
                      tooltipFilterTab.remove();
                      backdrop.remove();
                    }, 350);
                  });
                });
            }, 400);
          }
        });
      });
      document.querySelector("#filtersTabBtn").addEventListener("click", () => {
        hasTriggered = true;
      });
    }
  }

  const resultsObserver = new MutationObserver(fnTooltipsInResults);

  window.addEventListener("load", () => {
    resultsObserver.observe(document.querySelector("#resultsHeading"), {
      childList: true,
    });
  });
}
