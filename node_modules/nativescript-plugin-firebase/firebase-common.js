"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var application_settings_1 = require("tns-core-modules/application-settings");
var analytics = require("./analytics/analytics");
var storage = require("./storage/storage");
var mlkit = require("./mlkit");
// note that this implementation is overridden for iOS
var FieldValue = /** @class */ (function () {
    function FieldValue() {
        this.serverTimestamp = function () { return "SERVER_TIMESTAMP"; };
    }
    return FieldValue;
}());
exports.FieldValue = FieldValue;
var GeoPoint = /** @class */ (function () {
    function GeoPoint(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
    return GeoPoint;
}());
exports.GeoPoint = GeoPoint;
exports.firebase = {
    initialized: false,
    instance: null,
    firebaseRemoteConfig: null,
    authStateListeners: [],
    _receivedNotificationCallback: null,
    _dynamicLinkCallback: null,
    analytics: analytics,
    storage: storage,
    mlkit: mlkit,
    firestore: {
        FieldValue: {
            serverTimestamp: function () { return "SERVER_TIMESTAMP"; }
        },
        GeoPoint: function (latitude, longitude) { return new GeoPoint(latitude, longitude); }
    },
    invites: {
        MATCH_TYPE: {
            WEAK: 0,
            STRONG: 1
        }
    },
    dynamicLinks: {
        MATCH_CONFIDENCE: {
            WEAK: 0,
            STRONG: 1
        }
    },
    admob: {
        AD_SIZE: {
            SMART_BANNER: "SMART",
            LARGE_BANNER: "LARGE",
            BANNER: "BANNER",
            MEDIUM_RECTANGLE: "MEDIUM",
            FULL_BANNER: "FULL",
            LEADERBOARD: "LEADERBOARD",
            SKYSCRAPER: "SKYSCRAPER",
            FLUID: "FLUID"
        },
        defaults: {
            margins: {
                top: -1,
                bottom: -1
            },
            testing: false,
            size: "SMART"
        }
    },
    LoginType: {
        ANONYMOUS: "anonymous",
        PASSWORD: "password",
        PHONE: "phone",
        CUSTOM: "custom",
        FACEBOOK: "facebook",
        GOOGLE: "google",
        EMAIL_LINK: "emailLink"
    },
    QueryOrderByType: {
        KEY: "key",
        VALUE: "value",
        CHILD: "child",
        PRIORITY: "priority"
    },
    QueryLimitType: {
        FIRST: "first",
        LAST: "last"
    },
    QueryRangeType: {
        START_AT: "startAt",
        END_AT: "endAt",
        EQUAL_TO: "equalTo"
    },
    addAuthStateListener: function (listener) {
        if (exports.firebase.authStateListeners.indexOf(listener) === -1) {
            exports.firebase.authStateListeners.push(listener);
        }
        return true;
    },
    removeAuthStateListener: function (listener) {
        var index = exports.firebase.authStateListeners.indexOf(listener);
        if (index >= 0) {
            exports.firebase.authStateListeners.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    },
    hasAuthStateListener: function (listener) {
        return exports.firebase.authStateListeners.indexOf(listener) >= 0;
    },
    notifyAuthStateListeners: function (data) {
        exports.firebase.authStateListeners.forEach(function (listener) {
            try {
                if (listener.thisArg) {
                    listener.onAuthStateChanged.call(listener.thisArg, data);
                }
                else {
                    listener.onAuthStateChanged(data);
                }
            }
            catch (ex) {
                console.error("Firebase AuthStateListener failed to trigger", listener, ex);
            }
        });
    },
    rememberEmailForEmailLinkLogin: function (email) {
        application_settings_1.setString("FirebasePlugin.EmailLinkLogin", email);
    },
    getRememberedEmailForEmailLinkLogin: function () {
        return application_settings_1.getString("FirebasePlugin.EmailLinkLogin");
    },
    strongTypeify: function (value) {
        if (value === "true") {
            value = true;
        }
        else if (value === "false") {
            value = false;
        }
        else if (parseFloat(value) === value) {
            value = parseFloat(value);
        }
        else if (parseInt(value) === value) {
            value = parseInt(value);
        }
        return value;
    },
    requestPhoneAuthVerificationCode: function (onUserResponse, verificationPrompt) {
        dialogs_1.prompt(verificationPrompt || "Verification code").then(function (promptResult) {
            if (!promptResult.result) {
                return;
            }
            onUserResponse(promptResult.text);
        });
    },
    // for backward compatibility, because plugin version 4.0.0 moved the params to per-logintype objects
    moveLoginOptionsToObjects: function (loginOptions) {
        if (loginOptions.email) {
            console.log("Please update your code: the 'email' property is deprecated and now expected at 'passwordOptions.email'");
            if (!loginOptions.passwordOptions) {
                loginOptions.passwordOptions = {};
            }
            if (!loginOptions.passwordOptions.email) {
                loginOptions.passwordOptions.email = loginOptions.email;
            }
        }
        if (loginOptions.password) {
            console.log("Please update your code: the 'password' property is deprecated and now expected at 'passwordOptions.password'");
            if (!loginOptions.passwordOptions) {
                loginOptions.passwordOptions = {};
            }
            if (!loginOptions.passwordOptions.password) {
                loginOptions.passwordOptions.password = loginOptions.password;
            }
        }
        if (loginOptions.token) {
            console.log("Please update your code: the 'token' property is deprecated and now expected at 'customOptions.token'");
            if (!loginOptions.customOptions) {
                loginOptions.customOptions = {};
            }
            if (!loginOptions.customOptions.token) {
                loginOptions.customOptions.token = loginOptions.token;
            }
        }
        if (loginOptions.tokenProviderFn) {
            console.log("Please update your code: the 'tokenProviderFn' property is deprecated and now expected at 'customOptions.tokenProviderFn'");
            if (!loginOptions.customOptions) {
                loginOptions.customOptions = {};
            }
            if (!loginOptions.customOptions.tokenProviderFn) {
                loginOptions.customOptions.tokenProviderFn = loginOptions.tokenProviderFn;
            }
        }
        if (loginOptions.scope) {
            console.log("Please update your code: the 'scope' property is deprecated and now expected at 'facebookOptions.scope'");
            if (!loginOptions.facebookOptions) {
                loginOptions.facebookOptions = {};
            }
            if (!loginOptions.facebookOptions.scope) {
                loginOptions.facebookOptions.scope = loginOptions.scope;
            }
        }
    },
    merge: function (obj1, obj2) {
        var result = {}; // return result
        for (var i in obj1) { // for every property in obj1
            if ((i in obj2) && (typeof obj1[i] === "object") && (i !== null)) {
                result[i] = exports.firebase.merge(obj1[i], obj2[i]); // if it's an object, merge
            }
            else {
                result[i] = obj1[i]; // add it to result
            }
        }
        for (var i in obj2) { // add the remaining properties from object 2
            if (i in result) { // conflict
                continue;
            }
            result[i] = obj2[i];
        }
        return result;
    }
};
var DocumentSnapshot = /** @class */ (function () {
    function DocumentSnapshot(id, exists, documentData) {
        this.id = id;
        this.exists = exists;
        this.data = function () { return exists ? documentData : undefined; };
    }
    return DocumentSnapshot;
}());
exports.DocumentSnapshot = DocumentSnapshot;
var QuerySnapshot = /** @class */ (function () {
    function QuerySnapshot() {
    }
    QuerySnapshot.prototype.forEach = function (callback, thisArg) {
        this.docSnapshots.map(function (snapshot) { return callback(snapshot); });
    };
    return QuerySnapshot;
}());
exports.QuerySnapshot = QuerySnapshot;
