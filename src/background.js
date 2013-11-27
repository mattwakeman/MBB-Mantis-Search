// root URL used for all new Tabs and Windows
var MANTISURL = "https://bugtracker.businessproducts.vodafone.com/mantis/", returnTab, alert, chrome;

// Set the badge text 
chrome.browserAction.setBadgeText({
    text: 'MBB'
});

// Checks if a string is text or a number 
function checknumber(string) {
    var anum = /(^\d+$)|(^\d+\.\d+$)/, testresult;
    if (anum.test(string)) {
        testresult = true;
    } else {
        alert("This is not a number - Please input a valid ID number!");
        testresult = false;
    }
    return (testresult);
}

// Set the background colour of the badge overlay
chrome.browserAction.setBadgeBackgroundColor({
    color: [0, 200, 0, 100]
});

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function (tab) {
    // Launch the Vodafone Mantis system
    chrome.tabs.create({
        url: MANTISURL + 'view_all_bug_page.php'
    }, function (tab) {
        returnTab = tab; // put the returntab object inside the variable if we want to use it later
    });
});
// Set the default string used once Omnibox is enabled
chrome.omnibox.setDefaultSuggestion({
    description: 'Search Mantis for <match>%s</match>'
});

// Take the string added to Omnibox and send to Mantis.
chrome.omnibox.onInputEntered.addListener(
    function (text) {
        if (checknumber(text)) {
            chrome.tabs.create({
                url: MANTISURL + 'view.php?id=' + text
            }, function (tab) {
                returnTab = tab; // put the returntab object inside the variable if we want to use it later
            });
        }
    }
);
