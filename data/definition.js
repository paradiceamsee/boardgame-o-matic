// Defines which i18n/i18n_xx.js file is used
const language = "de";

// This is the central configuration file of the Boardgame-O-Matic
// If possible, all adjustments should be made through variables in this file

// Separator used in CSV files
const separator = ";";

// Name of the CSV file with the questions in the /data directory
const fileQuestions = `demo-questions-${language}.csv`;

// Number of questions
const intQuestions = 6;

// Name of the CSV file with the board games in the /data directory
const fileAnswers = `demo-games-${language}-new-filters.csv`;

// File paths to system and CSS files
// If you have several instances of this tool running, you can use absolute references to global files (therefore, these are not hardcoded)=
const system = [
  "system/output.js",
  "system/general.js",
  "system/privacy.js",
  "system/permalink_to_personal_results.js",
];
const design = [
  "styles/global.css",
  "styles/demo.css",
  "styles/boxicons.min.css",
];

// Changes to how Matomo is implemented can be made directly in system/privacy.js
const matomoTracking = "off"; // "on" / "optin" / "off"
const matomoUrl = "";
const matomoSiteId = "";

// Logo in top left corner for branding (not recommended if embedded as iframe)
const showMainLogoInTopLeftCorner = true;
// const mainLogoPath = "./Boardgame-O-Matic-Logo.png";
const mainLogoPath = "./Brettspiel-O-Mat-Logo.png";

const mainLogoHref = ""; // The link opens in a new tab
const mainLogoTitle = "Demo Logo"; // This is just used for the title attribute of the image, it is not displayed

// Welcome and info screen before the first question
const descriptionShowOnStart = true;
// The title of the page, which is displayed in the browser tab, must be changed directly in the index.html (<title> and meta property "og:title")
// const descriptionHeading1 = "Demo BoardGame-O-Matic";
const descriptionHeading1 = "Demo Brettspiel-O-Mat";
// const descriptionHeading2 = "Playfully find your matching board game";
const descriptionHeading2 = "Spielerisch das passende Brettspiel finden";
const descriptionExplanation =
  // "Answer the short questions to find out which board games of our collection best match your preferences.</p><p><em>This example tool demonstrates how the BoardGame-O-Matic works. You can setup your own version for free, see <a style='color: var(--warning); text-decoration: underline;' href='https://github.com/fenglisch/boardgame-o-matic' target='_blank'>https://github.com/fenglisch/boardgame-o-matic</a></em>";
  "Beantworte die kurzen Fragen, um herauszufinden, welche Spiele aus unserer Sammlung am besten zu deinen Vorlieben passen.</p><p><em>Dieses Beispiel-Tool demonstriert, wie der Brettspiel-O-Mat funktioniert. Du kannst kostenlos deine eigene Version aufsetzen, siehe <a style='color: var(--warning); text-decoration: underline;' href='https://github.com/fenglisch/boardgame-o-matic' target='_blank'>https://github.com/fenglisch/boardgame-o-matic</a></em>";

// Right to left slide animations when a new question is shown - OR - immediate cuts
const animateQuestionsCard = true;

// If true, the #resultsTabBtn is bigger than the others
// Only works if addon_filter_results.js is active, because only then there are 5 buttons with the results button in the middle (only then it makes sense to highlight it)
const highlightResultsTabBtnOfNavigationBar = false;

// Show "Current question number/total question number" (e. g. "3/15") before title of question
// Not recommended if addon_make_questions_optional.js is active
const showQuestionNumberOnCard = false;

// Optional box with info icon and text, displayed on results page between headings and results table
const showInfoBoxAboveResultsShortTable = true;
const textInfoBox =
  "Dieses Demo-Tool basiert nicht auf einer echten Brettspiel-Sammlung. Stattdessen werden für das Matching einfach die BoardGameGeek 200 (Stand März 2024) verwendet.";
// "This demo tool is not based on a real board game collection. Instead, the matching simply uses the BoardGameGeek Top 200 games (as of March 2024).";

// Save anonymous data about how users answered the questions and which results they got?
// If active, users see a modal before they get their results, asking them for permission (opt-in)
// If they agree, their data is sent to a database
// Defined in extras/statistics/db_settings.php
const statsRecord = false;
const statsServer = "extras/statistics/vote_db.php";

// URL of imprint
// If tool is embedded as iframe in a page which links to the imprint in its footer, the tool itself must not link to imprint as well
// In this case, leave empty and set --display-imprint in the CSS file to "none"
const imprintLink = "";

// See comment to imprintLink
const privacyExternalPageLink = false;

// Instead of linking to a privacy policy page, you can also create on
// If privacyExternalPageLink is falsy, the privacy button will open open a full screen modal
const privacyModalTitle = `Privacy policy for the Demo Boardgame-O-Matic`;
const privacyModalGeneral = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

// How many seconds is the explanatory text shown after each button click before it disappears again?
const PERMALINK_DESCRIPTION_DURATION = 15;

// Addons can vastly enhance the functionality of your tool
// Add the paths of the addon files you want to activate to the array
// If you have several instances of this tool running, you can use absolute references to global files
const addons = [
  "extras/addon_limit_results.js",
  "extras/addon_filter_results.js",
  "extras/addon_custom_voting_buttons.js",
  "extras/addon_show_first_results.js",
  "extras/addon_tooltips.js",
];

// Addon-specific variables are set in this configuration file as well
// For better clarity, the variables are ordered in blocks corresponding to their plugin
// The variables in each block are only relevant if the addon is active, i. e. if it is added to the "addons" array
// Variables are declared without "let" or "const", this would make them block-scoped and therefore not accessible in the addon files

function isActivated(addonFileName) {
  // Helper function allowing us to use an easier to read shortcut
  return addons.some((item) => item.includes(addonFileName));
}

//
if (isActivated("addon_contacts_in_results.js")) {
  // Show a button, allowing the user to establish contact
  CR_CONTACT_ACTIVE_EMAIL = true;

  // Label of the buttons (displayed in the detail section of each result)
  CR_CONTACT_BUTTON_EMAIL = "";

  // Global email address
  // Only used if the result has NO data-email tag in the csv file
  CR_CONTACT_ADDRESS_EMAIL = "";

  // Subject of the email. The name of the result is automatically appended
  // 1. - if the result DOES have an data-email tag in the CSV file
  CR_CONTACT_SUBJECT_EMAIL_DATATAG = "";
  // 2. - Fallback, if the result has NO data-email tag in the CSV file
  CR_CONTACT_SUBJECT_EMAIL_DEFAULT = "";

  // Content of the email
  // 1. - if the result DOES have an data-email tag in the CSV file
  CONTACT_TEXT_EMAIL_DATATAG = ``;
  // 2. - Fallback, if the result has NO data-email tag in the CSV file

  CONTACT_TEXT_EMAIL_DEFAULT = "";
}

if (isActivated("addon_limit_results.js")) {
  // Number of results displayed at first
  // Also the number of results added to the table with each press of the show more button
  intPartiesShowAtEnd = 10;
  // TEXT_RESULTS_BUTTON_SHOW_MORE = "<strong>+</strong> Show more";
  // TEXT_RESULTS_BUTTON_SHOW_LESS = "<strong>-</strong> Show less";
  // TEXT_RESULTS_BUTTON_SHOW_ALL = "Show all";
  TEXT_RESULTS_BUTTON_SHOW_MORE = "<strong>+</strong> Mehr zeigen";
  TEXT_RESULTS_BUTTON_SHOW_LESS = "<strong>-</strong> Weniger zeigen";
  TEXT_RESULTS_BUTTON_SHOW_ALL = "Alle zeigen";
}

if (isActivated("addon_tooltips.js")) {
  // If a tooltip should not be shown, give the variable a falsy value
  // Text of the tooltip explaining the Voting Double button
  TOOLTIP_VOTING_DOUBLE = false;
  // "If a question is particularly important to you, click on &quot;Double weight&quot; <strong>before</strong> you select your answer.";
  // Text of the tooltip explaining the buttons in the Results Short Table, with which you can change your answer
  TOOLTIP_RESULTS_SHORT = false;
  // "Click on the icon to change your answer.";
  // Text of the tooltip explaining the buttons in the Results By Thesis Table, with which you can change or double your answer
  TOOLTIP_RESULTS_BY_THESIS = false;
  // "Click on the buttons to change or double-weight your answer.";

  TOOLTIP_FILTER_TAB = "Setze Filter, um bessere Vorschläge zu erhalten.";

  // Number of the question where the TOOLTIP_RESULTS_BY_THESIS is displayed
  // This is relevant, if the first question(s) are custom questions (see addon_custom_voting_buttons.js) where hideVotingDouble is true
  // If this is the case, this variable should be the number of the first question where the Voting Double button is displayed
  // Otherwise, this can just be set to 1
  TOOLTIP_RESULTS_BY_THESIS_QUESTION_NUMBER = 3;
}

if (isActivated("addon_custom_voting_buttons.js")) {
  CUSTOM_POSITION_BUTTONS_DEFAULT_VALUES = {
    backgroundColor: "var(--secondary-color)",
    textColor: "var(--text-on-secondary)",
    // To overwrite the default values for a question, set the key arBackgroundColor / arTextColor in an object of CUSTOM_POSITION_BUTTONS
    // The value of arBackgroundColor / arTextColor must be an array with as many elements as there are values of the button
  };
  // For each question that should be customized, add an object to the array CUSTOM_POSITION_BUTTONS
  // The following keys are required (x = number of options/buttons for this question, should be an odd number)
  //    questionNr (integer; 1-indexed)
  //    arButtonLabels (array of x strings; texts of the voting buttons)
  //    arButtonAltTexts (array of x strings; alternative texts & titles of the buttons, e. g. same as arButtonLabels without HTML symbols)
  //    arPositionIcons (array of x strings; content of buttons/icons on the results page, must be super short, ideally symbols)
  //    arPositionValues (array of x integers; value for each button/option; the value of the middle option should be 0)
  // The following keys are optional
  //    votingDoubleByDefault (boolean; default: false; meaning: Should the voting double button be in the active state by default?)
  //    hideVotingDouble (boolean; default: false; meaning: Should the voting double button be hidden on the question card and in the results tables, so that the default state cannot be changed?)
  //    isYesOrDontCareQuestion (boolean; default: false; meaning: If true, the options with the values 0 and -1 [not necessarily the 2nd and 3rd option], cannot be selected. There is not voting button for option 0. If the user selects option -1 on the question card or changes to 0 or -1 in a results table, it automatically changes to the skipped state (99). Should only be used for yes-no-questions, where the issue of the question is either relevant for the user or not)
  //    buttonTextAndIconLabelForDontCare (string, should be very short; overrides the skipped symbol "↷" as button content in the results tables. Should be used together with isYesOrDontCareQuestion. Without it, users could be confused why they get the skipped icon when they try to choose the option with the value -1)
  //    arBackgroundColor (array of x strings, each a hex value/rgb value/CSS color keyword representing the background color of the jumpToQuestion table cell and the icons in the results tables, if the corresponding option is selected; if not set, all options get CUSTOM_POSITION_BUTTONS_DEFAULT_VALUES.backgroundColor)
  //    arTextColor (array of x strings, same as arBackgroundColor; consider the contrast to the corresponding background color)

  CUSTOM_POSITION_BUTTONS = [
    {
      questionNr: 1,
      // arButtonLabels: [
      //   "Super easy",
      //   "Beginner-friendly",
      //   "Moderate",
      //   "Advanced",
      //   "For experts",
      // ],
      // arButtonAltTexts: [
      //   "Super easy",
      //   "Beginner-friendly",
      //   "Moderate",
      //   "Advanced",
      //   "For experts",
      // ],
      // arPositionIcons: [
      //   "Super easy",
      //   "Beginner-friendly",
      //   "Moderate",
      //   "Advanced",
      //   "For experts",
      // ],
      arButtonLabels: [
        "Super einfach",
        "Einstiegsfreundlich",
        "Moderat",
        "Fortgeschritten",
        "Für Expert:innen",
      ],
      arButtonAltTexts: [
        "Super einfach",
        "Einstiegsfreundlich",
        "Moderat",
        "Fortgeschritten",
        "Für Expert:innen",
      ],
      arPositionIcons: [
        "Super einfach",
        "Einstiegsfreundlich",
        "Moderat",
        "Fortgeschritten",
        "Für Expert:innen",
      ],
      arPositionValues: [2, 1, 0, -1, -2],
      votingDoubleByDefault: false,
      hideVotingDouble: false,
    },
    {
      questionNr: 2,
      // arButtonLabels: [
      //   "Up to 45&nbsp;min",
      //   "45&nbsp;&ndash;&nbsp;90&nbsp;min",
      //   "90&nbsp;&ndash;&nbsp;120&nbsp;min",
      //   "120&nbsp;&ndash;&nbsp;180&nbsp;min",
      //   "More than 180&nbsp;min",
      // ],
      arButtonLabels: [
        "Bis zu 45&nbsp;min",
        "45&nbsp;&ndash;&nbsp;90&nbsp;min",
        "90&nbsp;&ndash;&nbsp;120&nbsp;min",
        "120&nbsp;&ndash;&nbsp;180&nbsp;min",
        "Mehr als 180&nbsp;min",
      ],
      // arButtonAltTexts: [
      //   "Up to 45 min",
      //   "45 - 90 min",
      //   "90 - 120 min",
      //   "120 - 180 min",
      //   "More than 180 min",
      // ],
      arButtonAltTexts: [
        "Bis zu 45 min",
        "45 - 90 min",
        "90 - 120 min",
        "120 - 180 min",
        "Mehr als 180 min",
      ],
      arPositionIcons: [
        "<&nbsp;45&prime;",
        "45&prime;&nbsp;- 90&prime;",
        "90&prime;&nbsp;- 120&prime;",
        "120&prime;&nbsp;- 180&prime;",
        ">&nbsp;180&prime;",
      ],
      arPositionValues: [2, 1, 0, -1, -2],
      votingDoubleByDefault: false,
      hideVotingDouble: false,
    },
    {
      questionNr: 3,
      arPositionValues: [1, 0, -1],
      // arButtonLabels: ["Cooperative", "Team-based", "Competitive"],
      // arButtonAltTexts: ["Cooperative", "Team-based", "Competitive"],
      // arPositionIcons: ["Coop", "Team-based", "Compe&shy;titive"],
      arButtonLabels: [
        "Kooperativ<br><small>(Alle zusammen gegen das Spiel)</small>",
        "Team-basiert / semi-kooperativ<br><small>(Team vs. Team oder eine:r vs. alle)</small>",
        "Kompetitiv<br><small>(Alle gegen alle)</small>",
      ],
      arButtonAltTexts: ["Kooperativ", "Team-basiert", "Kompetitiv"],
      arPositionIcons: ["Kooperativ", "Team-basiert", "Kompe&shy;titiv"],
    },
    {
      questionNr: 4,
      arPositionValues: [1, 0, -1],
      // arButtonLabels: [
      //   "Low conflict level",
      //   "Moderate conflict level",
      //   "High conflict level",
      // ],
      arButtonLabels: [
        "Geringes Konflikt-Level",
        "Moderates Konflikt-Level",
        "Hohes Konflikt-Level",
      ],
      // arButtonAltTexts: [
      //   "Low conflict level",
      //   "Moderate conflict level",
      //   "High conflict level",
      // ],
      arButtonAltTexts: [
        "Geringes Konflikt-Level",
        "Moderates Konflikt-Level",
        "Hohes Konflikt-Level",
      ],
      // arPositionIcons: ["Little conflict", "Medium conflict", "High conflict"],
      arPositionIcons: [
        "Wenig Konflikt",
        "Moderater Konflikt",
        "Hoher Konflikt",
      ],
      // Disclaimer is only displayed it answer to previous question was "Cooperative"
      disclaimer:
        "Du hast angegeben, dass du kooperative Spiele bevorzugst. Bitte beantworte (oder überspringe) dennoch diese Frage hinsichtlich kompetitiver und team-basierter Spiele.",
      // "You just indicated that you prefer cooperative games. Nevertheless, please answer (or skip) this question with regards to competitive and team-based games.",
    },
    {
      questionNr: 5,
      arPositionValues: [2, 1, 0, -1, -2],
      // arButtonLabels: [
      //   "No text",
      //   "Little text",
      //   "Some text",
      //   "Lots of text",
      //   "Massive text",
      // ],
      // arButtonAltTexts: [
      //   "No text",
      //   "Little text",
      //   "Some text",
      //   "Lots of text",
      //   "Massive text",
      // ],
      // arPositionIcons: [
      //   "No text",
      //   "Little text",
      //   "Some text",
      //   "Lots of text",
      //   "Massive text",
      // ],
      arButtonLabels: [
        "Kein Text",
        "Wenig Text",
        "Etwas Text",
        "Viel Text",
        "Extrem viel Text",
      ],
      arButtonAltTexts: [
        "Kein Text",
        "Wenig Text",
        "Etwas Text",
        "Viel Text",
        "Extrem viel Text",
      ],
      arPositionIcons: [
        "Kein Text",
        "Wenig Text",
        "Etwas Text",
        "Viel Text",
        "Extrem viel Text",
      ],
      isYesOrDontCareQuestion: true,
      // buttonTextAndIconLabelForYes: "Yes",
      // buttonTextAndIconLabelForDontCare: "No matter",
      buttonTextAndIconLabelForYes: "Ja, möglichst wenig Text",
      buttonTextAndIconLabelForDontCare: "Egal",
    },
    {
      questionNr: 6,
      arPositionValues: [2, 1, 0, -1, -2],
      // arButtonLabels: [
      //   "≤ 2 years old",
      //   "3 - 5 years old",
      //   "5 - 10 years old",
      //   "10 - 20 years old",
      //   "> 20 years old",
      // ],
      arButtonLabels: [
        "≤ 2 Jahre alt",
        "3 - 5 Jahre alt",
        "5 - 10 Jahre alt",
        "10 - 20 Jahre alt",
        "> 20 Jahre alt",
      ],
      // arButtonAltTexts: [
      //   "Less than 3 years old",
      //   "3 - 5 years old",
      //   "5 - 10 years old",
      //   "10 - 20 years old",
      //   "More than 20 years old",
      // ],
      arButtonAltTexts: [
        "WEniger als 3 Jahre alt",
        "3 - 5 Jahre alt",
        "5 - 10 Jahre alt",
        "10 - 20 Jahre alt",
        "Mehr als 20 Jahre alt",
      ],
      // arPositionIcons: [
      //   "≤ 2 years old",
      //   "3 - 5 years old",
      //   "5 - 10 years old",
      //   "10 - 20 years old",
      //   "> 20 years old",
      // ],
      arPositionIcons: [
        "≤ 2 Jahre alt",
        "3 - 5 Jahre alt",
        "5 - 10 Jahre alt",
        "10 - 20 Jahre alt",
        "> 20 Jahre alt",
      ],
      isYesOrDontCareQuestion: true,
      // buttonTextAndIconLabelForYes: "Yes",
      // buttonTextAndIconLabelForDontCare: "No matter",
      buttonTextAndIconLabelForYes: "Ja, möglichst neue Spiele",
      buttonTextAndIconLabelForDontCare: "Egal",
    },
  ];
}

if (addons.some((item) => item.includes("extras/addon_filter_results.js"))) {
  // TEXT_FILTERS_HEADING = "Filters";
  TEXT_FILTERS_HEADING = "Filter";
  // TEXT_FILTERS_SUBHEADING = "Set filters to get more accurate suggestions";
  TEXT_FILTERS_SUBHEADING = "Setze Filter, um genauere Ergebnisse zu bekommen";
  HIGHLIGHT_FILTER_ICON = true;
  FILTERS = [
    /* 
  Global keys:
    * internalName::string (required, must be unique)

  Available types and their special keys:
  "dropdown"
    * label::string (optional, but highly recommended)
    * options::object (required)
      * text::string (required)
      * value::string (required)
    * textOfOptionToShowAll::string (required)
    * setAtStart::object (optional)
      * isWanted::bool (optional; default: false)
      * cardHeading::string (required, if "isWanted: true")
      * cardBody::string (required, if "isWanted: true")
  
  "input-datalist"
    * label::string (optional)
    * datalist::array:string (required)
    * placeholder::string (required)
    * textButtonSubmit::string (required, if "displayInSharedModal: false" or undefined)
    * errorMessage::string (required)
  
  "distance" (note: only works with kilometres)
    * label::string (optional)
    * datalist::object (required)
      * text::string (required)
      * lat::number (required)
      * lon::number (required)
    * placeholderLocation::string (required)
    * placeholderDistance::string (required)
    * textButtonSubmit::string (required, if "displayInSharedModal: false" or undefined)
    * errorMessageNoLocation::string (required)
    * errorMessageWrongLocation::string (required)
    * errorMessageDistance::string (required)
  
  "checkbox-list"
    * heading::string (optional, but highly recommended)
    * options::object (required)
      * label::string (required)
      * value::string (required)
      * checkedByDefault::bool (optional; default: false; is overwritten by allCheckedByDefault)
    * allCheckedByDefault::bool (optional; default: false; overwrites allCheckedByDefault of individual options)
    * checkedMeansExcluded::bool (optional; default: false)
    * textButtonSubmit::string (required, if "displayInSharedModal: false" or undefined)
    * errorMessage::string (required)
  
  "single-checkbox"
    * heading::string (optional)
    * label::string (required)
    * value::string (required)
    * checkedByDefault::bool (optional; default: false)
    * checkedMeansExcluded::bool (optional; default: false)
      */
    {
      internalName: "player-number",
      type: "checkbox-list",
      icon: "bx-group",
      // label: "Number of players: ",
      description:
        "Alle Spiele, die mit keiner der ausgewählten Spieler:innenzahlen spielbar sind, werden ausgeblendet",
      options: [
        { label: "Solo", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "≥ 7", value: "7" },
      ],
      allCheckedByDefault: false,
      checkedMeansExcluded: false,
      displayInCollapsibleSection: {
        isWanted: true,
        heading: "Spieler:innenanzahl",
      },

      displayFilterValuesInResultDetails: {
        isWanted: true,
        // label: "Player number",
        label: "Spieler:innenanzahl",
        bulletList: false,
      },
      setAtStart: {
        isWanted: true,
        // cardHeading: "Number of players",
        cardHeading: "Spieler:innenanzahl",
        // cardBody: "With how many players do you want to play?",
        cardBody: "Zu wievielt wollt ihr spielen?",
      },
      errorMessage: "Du musst mindestens eine Spieler:innenanzahl erlauben.",
    },
    {
      internalName: "themes",
      type: "checkbox-list",
      icon: "bx-landscape",
      description:
        // "All board games, which have at least one of the themes you disallow, are excluded from your results.",
        "Alle Spiele, die keins der ausgewählten Themen enthalten, werden ausgeschlossen.",
      options: [
        {
          value: "adventure",
          label: "Abenteuer & Erkundung",
        },
        {
          value: "oldHistory",
          label: "Antike & Mittelalter",
        },
        {
          value: "animals",
          label: "Tiere, Umwelt & Landwirtschaft",
        },
        {
          value: "arts",
          label: "Kunst & Handwerk",
        },
        {
          value: "economy-infrastructure",
          label: "Wirtschaft & Infrastruktur",
        },
        {
          value: "fantasy",
          label: "Fantasy & Mythologie",
        },
        {
          value: "horror",
          label: "Horror & Zombies",
        },
        {
          value: "murder",
          label: "Mord & Mysterien",
        },
        {
          value: "politics",
          label: "Politik & Spionage",
        },
        {
          value: "newHistory",
          label: "Neuzeitliche Geschichte",
        },
        {
          value: "science",
          label: "Wissenschaft & Forschung",
        },
        {
          value: "scifi",
          label: "Science Fiction",
        },
        {
          value: "nautical",
          label: "Schiffe & Piraten",
        },
        {
          value: "trains",
          label: "Züge, Autos, Flugzeuge & Rennen",
        },
        {
          value: "war",
          label: "Krieg & Kampf",
        },
      ],
      allCheckedByDefault: false,
      checkedMeansExcluded: false,
      sortOptionsAlphabetically: true,
      strikethroughOptionsThatGetHidden: true,
      displayInCollapsibleSection: {
        isWanted: true,
        heading: "Themen",
      },
      displayFilterValuesInResultDetails: {
        isWanted: true,
        // label: "Themes",
        label: "Themen",
        bulletList: true,
      },
      // errorMessage: "You must allow at least one theme.",
      errorMessage: "Du musst mindestens ein Thema erlauben.",
    },
    {
      internalName: "mechanics",
      type: "checkbox-list",
      icon: "bx-cog",
      // heading:
      //   "All board games, which have at least one of the mechanics you disallow, are excluded from your results.",
      description:
        "Alle Spiele, die keine der ausgewählten Mechaniken enthalten, werden ausgeschlossen.",
      options: [
        {
          value: "action",
          label: "Action, Schnelligkeit & Geschicklichkeit",
          help: "Schnelle Reaktionen, physisches Geschick oder Echtzeit-Entscheidungen sind erforderlich.",
          examples:
            "Jenga, Captain Sonar, KLASK, Galaxy Trucker, Pitch Car, Crokinole",
        },
        {
          value: "areaControl",
          label: "Area Control",
          help: "Ziel ist die Vorherrschaft über bestimmte Gebiete (durch Mehrheiten, Einfluss oder direkte Eroberung), um strategische Vorteile zu sichern.",
          examples:
            "Risiko, El Grande, Scythe, Small World, Blood Rage, Root, Eclipse",
        },
        {
          value: "auction",
          label: "Auktionen & Gebote",
          help: "Ressourcen, Aktionen oder Einfluss werden versteigert. Schätze den Wert richtig ein und überbiete deine Mitspieler:innen im richtigen Moment.",
          examples: "Funkenschlag, Modern Art, Ra, Keyflower, Furnace, QE",
        },
        {
          value: "cards",
          label: "Kartenspiele",
          help: "Karten sind die zentrale oder sogar die einzige Komponenente des Spiels.",
          examples:
            "Dominion, 7 Wonders, Flügelschlag, Die Crew, Splendor, Codenames",
        },
        {
          value: "deckBuilding",
          label: "Deck Building",
          help: "Baue dir dein eigenes Deck aus passenden Karten zusammen, um Synergien zu schaffen und deine Strategie zu optimieren. Anstelle eines Kartendecks z.&nbsp;T. auch mit Plättchen-Beutel oder Ressourcenpool.",
          examples:
            "Dominion, Orleans, Die Quacksalber von Quedlinburg, Dune: Imperium, Klong!, Star Realms",
        },
        {
          value: "deduction",
          label: "Deduktion",
          help: "Nutze Hinweise und Muster, um versteckte Informationen aufzudecken. Kombiniere logisches Denken und Beobachtungsgabe, um die richtigen Schlussfolgerungen zu ziehen.",
          examples:
            "Cluedo, Codenames, Hanabi, Die Werwölfe von Düsterwald, Secret Hitler, Mysterium",
        },
        {
          value: "drafting",
          label: "Drafting",
          help: "Wähle nacheinander Karten, Würfel oder andere Elemente aus einem begrenzten Angebot. Achte auf deine Strategie und passe dich an die Entscheidungen deiner Mitspieler:innen an.",
          examples:
            "7 Wonders, Azul, Sushi Go!, Die Burgen von Burgund, Cascadia, Kingdomino",
        },
        {
          value: "dungeonCrawler",
          label: "Dungeon Crawler",
          help: "Erkunde gefährliche Verliese, besiege Gegner und sammle Schätze. Meistere Herausforderungen, um deinen Charakter zu verbessern.",
          examples: "Gloomhaven, HeroQuest, Klong!, Maus und Mystik, Zombicide",
        },
        {
          value: "networks",
          label: "Netzwerke & Verbindungen",
          help: "Baue ein Netzwerk aus Routen und Verbindungen, um Orte zu erreichen oder Boni freizuschalten. Plane strategisch, um dein Netz effizient zu erweitern und Vorteile zu sichern.",
          examples:
            "Zug um Zug, Siedler von Catan, Funkenschlag, Terra Mystica, Concordia, Brass: Birmingham, Thurn und Taxis",
        },
        {
          value: "party",
          label: "Partyspiele",
          help: "Einfache Regeln, schneller Spielspaß und viel Interaktion: Perfekt für Gruppen, bei denen der Spaß und das gemeinsame Erlebnis im Vordergrund stehen.",
          examples:
            "Codenames, Just One, Tabu, Cards Against Humaniy, Werwölfe von Düsterwald, Stille Post Extrem, Nobody Is Perfect",
        },
        {
          value: "rollAndWrite",
          label: "Roll&Write / Flip&Write",
          help: "Würfle oder decke Karten auf und trage die Werte in dein Spielblatt ein. Plane geschickt, um Muster zu optimieren, Boni zu nutzen und das beste Ergebnis zu erzielen.",
          examples:
            "Kniffel, Qwixx, Ganz Schön Clever, Noch mal!, Der Kartograph",
        },
        {
          value: "storytelling",
          label: "Storytelling & Role Playing",
          help: "Erschaffe oder erlebe Geschichten durch Erzählungen, Entscheidungen und Charakterentwicklung. Tauche in narrative Abenteuer ein und gestalte den Verlauf der Geschichte mit.",
          examples:
            "Gloomhaven, Once Upon A Time, Too Many Bones, Winter der Toten, Dixit",
        },
        {
          value: "tilePlacement",
          label: "Plättchen legen & Muster bilden",
          help: "Platziere Plättchen geschickt, um Muster zu bilden, Gebiete zu vervollständigen oder Räume optimal zu füllen. Achte auf Positionierung und Synergien, um Punkte zu maximieren oder Aktionen auszulösen.",
          examples:
            "Carcassone, Azul, Cascadia, Kingdomino, Patchwork, Ubungo, Die Burgen von Burgund",
        },
        {
          value: "trading",
          label: "Handeln & Verhandeln",
          help: "Tausche Ressourcen oder verhandle mit Mitspieler:innen, um Vorteile zu erlangen. Knüpfe Deals, schmiede Allianzen oder bluffe, um deine Position zu stärken.",
          examples: "Siedler von Catan, Monopoly, Bohnanza, ",
        },
        {
          value: "words",
          label: "Wörter & Sprache",
          help: "Sei kreativ beim Erraten, Bilden oder Interpretieren von Wörtern. Clevere Assoziationen und geschickte Kommunikation führen zum Erfolg.",
          examples: "",
        },
        {
          value: "workerPlacement",
          label: "Worker Placement",
          help: "Setze deine Spielfiguren auf verschiedene Aktionensfelder, um Ressourcen zu sammeln, Aufgaben zu erfüllen und Vorteile zu sichern &ndash; oder um deinen Mitspieler:innen das Feld zu versperren.",
          examples: "",
        },
      ],
      allCheckedByDefault: false,
      checkedMeansExcluded: false,
      sortOptionsAlphabetically: true,
      strikethroughOptionsThatGetHidden: true,
      displayInCollapsibleSection: {
        isWanted: true,
        heading: "Mechaniken",
      },
      displayFilterValuesInResultDetails: {
        isWanted: true,
        // label: "Mechanics",
        label: "Mechaniken",
        bulletList: true,
      },
      // errorMessage: "You must allow at least one mechanic.",
      errorMessage: "Du musst mindestens eine Mechanik erlauben.",
    },
  ];
  /* 
  Other required variables:
  * BUTTON_RESET_ALL_FILTERS::object (optional)
    * showButton::bool (optional; default: false)
    * textButton::string (required, if "showButton: true")
  * ERROR_MESSAGE_NO_FILTER_RESULTS::string (required)
  */

  BUTTON_RESET_ALL_FILTERS = {
    showButton: true,
    // textButton: "Reset all filters",
    textButton: "Alle Filter zurücksetzen",
    iconButton: "bx-trash",
  };
  ERROR_MESSAGE_NO_FILTER_RESULTS =
    // "None of our board games matches all your filters. Please change your filters and try again.";
    "Keines unserer Spiele entspricht allen gesetzten Filtern. Bitte ändere deine Filter und versuche es erneut.";
  DISPLAY_ANSWERS_TO_QUESTIONS_IN_RESULT_DETAILS = {
    isWanted: true,
    showMatchWithPersonalAnswer: true,
    questionsToBeDisplayed: [
      { questionNr: 1, displayQuestionHeading: true, isCustomQuestion: true },
      { questionNr: 2, displayQuestionHeading: true, isCustomQuestion: true },
      { questionNr: 3, displayQuestionHeading: false, isCustomQuestion: true },
      { questionNr: 4, displayQuestionHeading: false, isCustomQuestion: true },
      { questionNr: 5, displayQuestionHeading: false, isCustomQuestion: true },
    ],
  };
}

const HIDE_TABLE_resultsByPartyAnswers = true;
