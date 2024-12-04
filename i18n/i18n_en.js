// DEUTSCHE TEXTE http://www.mat-o-wahl.de

// Buttons
const TEXT_START = "Let's go!";
const TEXT_VOTING_PRO = "Like";
const TEXT_VOTING_NEUTRAL = "Partly";
const TEXT_VOTING_CONTRA = "Dislike";
const TEXT_VOTING_BACK = "<i class='bx bx-skip-previous bx-sm'></i>&nbsp;Back";
const TEXT_VOTING_SKIP =
  "No matter&nbsp;/ Skip <i class='bx bx-skip-next bx-sm'></i>";
const TEXT_VOTING_DOUBLE = "Double-weighted";
const ICON_SKIPPED = "No matter";

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
const TEXT_IMPRINT = "Imprint";
const TEXT_PRIVACY = "Privacy Policy";
const TEXT_RESTART = "<i class='bx bx-revision'></i> Restart";

const TITLE_MATOMO_MODAL = "";
const TEXT_MATOMO_MODAL = `Do you authorise us to collect data about your visit for statistical purposes in order to further develop the Boardgame-O-Matic? You can find more details, such as the option to revoke your consent at any time, in the <a ${
  privacyExternalPageLink
    ? `href="${privacyExternalPageLink}" target="_blank"`
    : `href="#" onclick="fnShowPrivacy()"`
}>privacy policy</a>.`;

// Results
const TEXT_RESULTS_HEADING = "Your Top Matches";
const TEXT_RESULTS_SUBHEADING =
  "With these board games you have the highest match";
const TEXT_LINK_TO_EXTERNAL_PAGE =
  "<i class='bx bx-link-external' ></i> View at BoardGameGeek";
const TEXT_FINETUNING_HEADING = "Finetuning";
const TEXT_FINETUNING_SUBHEADING =
  "<ul style='text-align: left; font-size: 80%;'><li>Change your answers and weightings</li><li>Check out the values of your matching board games for each question</li></ul>";
const TEXT_SHOW_PARTY_DESCRIPTION = `<i class='bx bx-plus bx-sm' ></i> Show details`;
const TEXT_HIDE_PARTY_DESCRIPTION = `<i class='bx bx-minus bx-sm' ></i> Hide details`;
const TEXT_SHOW_PARTY_ANSWERS = `<i class='bx bx-plus bx-sm' ></i> Show answers to questions`;
const TEXT_HIDE_PARTY_ANSWERS = `<i class='bx bx-minus bx-sm' ></i> Hide answers`;
const TEXT_SHOW_THESIS_ANSWERS =
  "<i class='bx bx-plus bx-sm' ></i> Show values of board games";
const TEXT_HIDE_THESIS_ANSWERS =
  "<i class='bx bx-minus bx-sm' ></i> Hide values of board games";

const TEXT_SHARE_AND_SAVE_HEADING = "Share or Save your Results";
const TEXT_SHARE_AND_SAVE_SUBHEADING =
  "Generate a personal link to share your results with others or to save it for yourself";

const TEXT_INFO_HEADING =
  "About the <span style='white-space: nowrap;''>Boardgame-O-Matic</span>";
const TEXT_INFO_SUBHEADING = "";
// The following words may be used as ALT-Text or headers on the results-page
const TEXT_QUESTION = "Question";
const TEXT_POSITION_PARTY = "Position of the game";
const TEXT_ANSWER_PARTY = "Answer of the game";
const TEXT_ANSWER_USER = "Your answer";
const TEXT_IMAGE = "Image";
const TEXT_PARTY = "Board game";
const TEXT_ANSWER_NORMAL = "Question is single-weighted";
const TEXT_ANSWER_DOUBLE = "Question is double-weighted";

const TEXT_VOTING_DOUBLE_MODAL_HEADING = "Double-weighting questions";
const TEXT_VOTING_DOUBLE_MODAL_BODY =
  "<p>Use this option, if the issue of the question is particularly important for you. Activate the checkbox (unless it's already checked by default) and then select your answer.</p>";

const HEADING_MODAL_RESULT_DETAILS_FINETUNING = "Board game details";
const TEXT_BTN_CLOSE_MODAL_RESULT_DETAILS_FINETUNING = "Close";

const TEXT_BTN_PERMALINK_SHARE =
  "<i class='bx bx-sm bx-share-alt' ></i> Share results";
const TEXT_BTN_PERMALINK_SAVE =
  "<i class='bx bx-sm bx-save' ></i> Save results";
const DESCRIPTION_PERMALINK_SHARE =
  "Your share link has been copied to your clipboard. Send it to whoever you want so that they can see your personal results.";
const DESCRIPTION_PERMALINK_SHARE_ALT =
  "Copy the following link and send it to whoever you want so that they can see your personal results.";
const DESCRIPTION_PERMALINK_SAVE =
  "Your store link has been copied to your clipboard. Save it to a location of your choice &ndash; it leads you back to your personal results page.";
const DESCRIPTION_PERMALINK_SAVE_ALT =
  "Copy the following link and save it to a location of your choice &ndash; it leads you back to your personal results page.";

const TEXT_WELCOME_AFTER_PERMALINK_SHARE = `<p><strong>Hello there!</strong> These are the BoardGame-O-Matic results of whoever sent you this link. To get your own results, just <a onclick="document.querySelector('#restart').click()">restart the BoardGame-O-Matic</a>.</p>`;
const TEXT_WELCOME_AFTER_PERMALINK_SAVE = `<p><strong>Welcome back!</strong> Your BoardGame-O-Matic results have patiently waited here for you. If there should be any changes in your ranking, then that's because our collection changed.</p>
                           <p>If you don't like your results anymore, you can simply <a onclick="document.querySelector('#restart').click()">restart the BoardGame-O-Matic</a>`;
