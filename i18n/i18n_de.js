// DEUTSCHE TEXTE http://www.mat-o-wahl.de

// Buttons
const TEXT_START = "Los geht's!";
const TEXT_VOTING_PRO = "Gefällt mir";
const TEXT_VOTING_NEUTRAL = "Teils teils";
const TEXT_VOTING_CONTRA = "Gefällt mir nicht";
const TEXT_VOTING_BACK =
  "<i class='bx bx-skip-previous bx-sm'></i>&nbsp;Zurück";
const TEXT_VOTING_SKIP =
  "Egal&nbsp;/ Überspringen <i class='bx bx-skip-next bx-sm'></i>";
const TEXT_VOTING_DOUBLE = "Doppelt gewichten";
const ICON_SKIPPED = "Egal";
const TEXT_SKIPPED = "Egal";
const ICON_NO_DATA = "&ndash;";
const TEXT_NO_DATA = "&ndash;";

// Statistic
const TEXT_ALLOW_STATISTIC_TITLE = "Before you see your results...";
const TEXT_ALLOW_STATISTIC_TEXT = `Do you authorise us to transfer your <strong>anonymised</strong> answers for statistical purposes in accordance with our <a ${
  privacyExternalPageLink
    ? `href="${privacyExternalPageLink}" target="_blank"`
    : `href="#" onclick="fnShowPrivacy()"`
}>privacy policy</a>? By doing so, you will help us to improve the Boardgame-O-Matic in the future.`;
const TEXT_ALLOW_STATISTIC_YES = "Yeah, sure!";
const TEXT_ALLOW_STATISTIC_NO = "No, thanks.";

// Footer
const TEXT_IMPRINT = "Impressum";
const TEXT_PRIVACY = "Datenschutzerklärung";
const TEXT_RESTART = "<i class='bx bx-revision'></i> Neu starten";

const TITLE_MATOMO_MODAL = "";
const TEXT_MATOMO_MODAL = `Do you authorise us to collect data about your visit for statistical purposes in order to further develop the Boardgame-O-Matic? You can find more details, such as the option to revoke your consent at any time, in the <a ${
  privacyExternalPageLink
    ? `href="${privacyExternalPageLink}" target="_blank"`
    : `href="#" onclick="fnShowPrivacy()"`
}>privacy policy</a>.`;

// Results
const TEXT_RESULTS_HEADING = "Deine Top Matches";
const TEXT_RESULTS_SUBHEADING =
  "Mit diesen Brettspielen hast du die größte Übereinstimmung";
const TEXT_LINK_TO_EXTERNAL_PAGE =
  "<i class='bx bx-link-external' ></i> Weitere Infos (BoardGameGeek)";
const TEXT_FINETUNING_HEADING = "Finetuning";
const TEXT_FINETUNING_SUBHEADING =
  "<ul style='text-align: left; font-size: 80%;'><li>Ändere deine Antworten und Gewichtungen</li><li>Schau dir die Werte deiner Brettspiel-Matches zu den Fragen an</li></ul>";
const TEXT_SHOW_PARTY_DESCRIPTION = `<i class='bx bx-chevron-right bx-sm' ></i> Details`;
const TEXT_HIDE_PARTY_DESCRIPTION = `<i class='bx bx-chevron-down bx-sm' ></i> Details`;
const TEXT_SHOW_PARTY_ANSWERS = `<i class='bx bx-chevron-right bx-sm' ></i> Antworten`;
const TEXT_HIDE_PARTY_ANSWERS = `<i class='bx bx-chevron-down bx-sm' ></i> Antworten`;
const TEXT_SHOW_THESIS_ANSWERS =
  "<i class='bx bx-chevron-right bx-sm' ></i> Werte der Brettspiele";
const TEXT_HIDE_THESIS_ANSWERS =
  "<i class='bx bx-chevron-down bx-sm' ></i> Werte der Brettspiele";

const TEXT_SHARE_AND_SAVE_HEADING = "Teile oder speichere deine Ergebnisse";
const TEXT_SHARE_AND_SAVE_SUBHEADING =
  "Generiere einen persönlichen Link, um deine Ergebnisse mit anderen zu teilen oder für dich zu speichern.";

const TEXT_INFO_HEADING =
  "Über den <span style='white-space: nowrap;''>Brettspiel-O-Mat</span>";
const TEXT_INFO_SUBHEADING = "";
// The following words may be used as ALT-Text or headers on the results-page
const TEXT_QUESTION = "Frage";
const TEXT_POSITION_PARTY = "Wert des Spiels";
const TEXT_ANSWER_PARTY = "Wert des Spiels";
const TEXT_ANSWER_USER = "Du";
const TEXT_IMAGE = "Bild";
const TEXT_PARTY = "Brettspiel";
const TEXT_ANSWER_NORMAL = "Frage ist einfach gewichtet";
const TEXT_ANSWER_DOUBLE = "Frage ist doppelt gewichtet";

const TEXT_VOTING_DOUBLE_MODAL_HEADING = "Fragen doppelt gewichten";
const TEXT_VOTING_DOUBLE_MODAL_BODY =
  "<p>Nutze diese Funktion, wenn das Thema der Frage besonders wichtig für dich ist. Aktiviere die Checkbox und wähle dann deine Antwort.</p>";

const HEADING_MODAL_RESULT_DETAILS_FINETUNING = "Brettspiel-Details";
const TEXT_BTN_CLOSE_MODAL_RESULT_DETAILS_FINETUNING = "Schließen";

const TEXT_BTN_PERMALINK_SHARE =
  "<i class='bx bx-sm bx-share-alt' ></i> Ergebnisse teilen";
const TEXT_BTN_PERMALINK_SAVE =
  "<i class='bx bx-sm bx-save' ></i> Ergebnisse speichern";
const DESCRIPTION_PERMALINK_SHARE =
  "Dein Freigabe-Link wurde in deine Zwischenablage kopiert. Sende ihn an andere, damit sie dein Ergebnis anschauen können.";

const DESCRIPTION_PERMALINK_SHARE_ALT =
  "Kopiere den folgenden Link und sende ihn an andere, damit sie dein Ergebnis anschauen können.";
const MESSAGE_SHARE_VIA_WEB_SHARE_API =
  "Schau dir meine Vorschläge vom Brettspiel-O-Maten an!";

const DESCRIPTION_PERMALINK_SAVE =
  "Dein Speicher-Link wurde in deine Zwischenablage kopiert. Sichere ihn an einem Ort deiner Wahl &ndash; er bringt dich zurück zu deiner persönlichen Ergebnis-Seite.";

const DESCRIPTION_PERMALINK_SAVE_ALT =
  "Kopiere den folgenden Link und sichere ihn an einem Ort deiner Wahl &ndash; er bringt dich zurück zu deiner persönlichen Ergebnis-Seite.";

const TEXT_WELCOME_AFTER_PERMALINK_SHARE = `<p><strong>Willkommen!</strong> Das sind die Brettspiel-O-Mat-Ergebnisse von der Person, die dir diesen Link geschickt hat. Um deine eigenen Ergebnisse zu bekommen, kannst du einfach den <a onclick="document.querySelector('#restart').click()">Brettspiel-O-Mat neu starten</a>.</p>`;

const TEXT_WELCOME_AFTER_PERMALINK_SAVE = `<p><strong>Willkommen zurück!</strong> Deine Brettspiel-O-Mat-Ergebnisse haben hier geduldig auf dich gewartet. Sollte sich an deinem Ranking irgendwas geändert haben, liegt das daran, dass sich unsere Sammlung geändert hat.</p>
<p>Wenn dir deine Ergebnisse nicht mehr gefallen, kannst du ganz einfach den <a onclick="document.querySelector('#restart').click()">Brettspiel-O-Mat neu starten</a>.`;

const TEXT_BUTTON_ABOVE_RESULTS_SHORT_CHANGE_ANSWERS =
  "<i class='bx bx-sm bx-slider-alt'></i> Ändere deine Antworten";
const TEXT_BUTTON_ABOVE_RESULTS_SHORT_FILTER_RESULTS =
  "<i class='bx bx-sm bx-filter-alt'></i> Filtere deine Ergebnisse";

const REFRESH_BUTTON_TEXT = `Aktualisierte Ergebnisse anzeigen <i class="bx bx-chevron-right bx-sm"></i>`;

const TEXT_BUTTON_CLOSE_FULLSCREEN_EVENT_DETAILS =
  "<i class='bx bx-chevron-left' ></i> Zurück zur Liste";

const TOOLTIP_FINETUNING = "Finetuning";
const TOOLTIP_RESULTS = "Ergebnisse";
const TOOLTIP_SHARE = "Teilen";
const TOOLTIP_SAVE = "Speichern";
const TOOLTIP_INFO = "Info";
const TOOLTIP_FILTER = "Filter";
const PROMPT_CHANGE_FILTERS_IF_NO_RESULTS_MATCH = "Filter ändern";

const TOOLTIP_FOR_MATCH_TAG_IN_RESULT_DETAILS_SKIPPED = `Du hast diese Frage mit &quot;${TEXT_SKIPPED}&quot; beantwortet bzw. sie übersprungen.`;
const TOOLTIP_FOR_MATCH_TAG_IN_RESULT_DETAILS_NOT_SKIPPED =
  "Die Übereinstimmung mit deiner Antwort %%%placeholder%%% beträgt";
const TOOLTIP_FOR_MATCH_TAG_IN_RESULT_DETAILS_100_PERCENT =
  "Du hast diese Frage genauso beantwortet.";
const TOOLTIP_FOR_DOUBLE_WEIGHTED_TAG_IN_RESULT_DETAILS =
  "Du hast diese Frage doppelt gewichtet.";

const PREFIX_EXAMPLES_HELP_MODAL_FILTER_OPTION = "Z. B.";
