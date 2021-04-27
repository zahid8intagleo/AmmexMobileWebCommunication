let currentUserId = $A.get("$SObjectType.CurrentUser.Id");
let currentUser = $A.get("$SObjectType.CurrentUser");
window.androidObject = function AndroidClass(){};

// Add this global function for Mobile App WebView
(function() { // Begin scoping function
    // window.androidObject = function AndroidClass(){};
    var userId = currentUserId;

    window.sendUserId = function() {
        window.console.log('GetUserForMobile=' + userId);
        window.console.log('ObjectType.CurrentUser.Id=' + $A.get("$SObjectType.CurrentUser.Id"));

        // window.androidObject.submitToAndroid(userId);

        var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
        var isWKWebView = false;
        if (window.webkit && window.webkit.messageHandlers) {
            isWKWebView = true;
        }
        // if (isWKWebView) {
        // if (typeof window.androidObject.sendSessionData === "function") { 
            // let siteforceB2bBody = document.querySelector('div.siteforceB2bBody');
            // siteforceB2bBody.prepend('<div><b>window.androidObject.sendSessionData was run with ' + userId + '.</b></div>');
            // window.androidObject.sendSessionData(userId);
            webkit.messageHandlers.sumbitToiOS.postMessage(userId);
        // } else {
        //     let siteforceB2bBody = document.querySelector('div.siteforceB2bBody');
        //     siteforceB2bBody.prepend('<div><b>window.androidObject.sendSessionData is not a function.</b></div>');
        //     return 'window.androidObject.sendSessionData is not a function.'
        // }
        // }
    }

    window.restoreUserLoginSession = function(data) {
        window.console.log('GetUserForMobile data passed = ' + data);
        window.console.log('GetUserForMobile userId = ' + userId);
        if (data == userId) {
            return 'userIsCurrentlyLoggedIn';
        } else {
            return 'userCannotVerify';
        }
    }

    window.console.log('localStorage pressedLogIn = ' + localStorage.getItem('pressedLogIn'));
    if (localStorage.getItem('pressedLogIn')) {
        localStorage.removeItem('pressedLogIn');
        sendUserId();
    }

    // function pressedLogIn() {
    //     sendUserId();
    // }

    document.addEventListener('click', function (e) {
        let mytarget = e.target;
        let mytargetParent = e.target.parentNode;
        if (mytarget.innerText.toLowerCase() == 'log in' && mytargetParent.tagName.toLowerCase() == 'button' && mytargetParent.classList.contains('loginButton')) {
            window.console.log('The target button.loginButton is CLICKED.. running sendUserId()');
            // window.androidObject.submitToAndroid('CLICKED');
            localStorage.setItem('pressedLogIn', true);
            sendUserId()
        }
    });

})();  

