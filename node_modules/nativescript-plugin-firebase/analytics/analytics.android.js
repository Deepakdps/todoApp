"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var appModule = require("tns-core-modules/application");
function logEvent(options) {
    return new Promise(function (resolve, reject) {
        try {
            if (options.key === undefined) {
                reject("Argument 'key' is missing");
                return;
            }
            var bundle = new android.os.Bundle();
            if (options.parameters !== undefined) {
                for (var p in options.parameters) {
                    var param = options.parameters[p];
                    if (param.value !== undefined) {
                        bundle.putString(param.key, param.value);
                    }
                }
            }
            com.google.firebase.analytics.FirebaseAnalytics.getInstance(appModule.android.currentContext || com.tns.NativeScriptApplication.getInstance()).logEvent(options.key, bundle);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.analytics.logEvent: " + ex);
            reject(ex);
        }
    });
}
exports.logEvent = logEvent;
function setUserId(arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (arg.userId === undefined) {
                reject("Argument 'userId' is missing");
                return;
            }
            com.google.firebase.analytics.FirebaseAnalytics.getInstance(appModule.android.currentContext || com.tns.NativeScriptApplication.getInstance()).setUserId(arg.userId);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.analytics.setUserId: " + ex);
            reject(ex);
        }
    });
}
exports.setUserId = setUserId;
function setUserProperty(options) {
    return new Promise(function (resolve, reject) {
        try {
            if (options.key === undefined) {
                reject("Argument 'key' is missing");
                return;
            }
            if (options.value === undefined) {
                reject("Argument 'value' is missing");
                return;
            }
            com.google.firebase.analytics.FirebaseAnalytics.getInstance(appModule.android.currentContext || com.tns.NativeScriptApplication.getInstance()).setUserProperty(options.key, options.value);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.analytics.setUserProperty: " + ex);
            reject(ex);
        }
    });
}
exports.setUserProperty = setUserProperty;
function setScreenName(options) {
    return new Promise(function (resolve, reject) {
        try {
            if (options.screenName === undefined) {
                reject("Argument 'screenName' is missing");
                return;
            }
            com.google.firebase.analytics.FirebaseAnalytics.getInstance(appModule.android.currentContext || com.tns.NativeScriptApplication.getInstance()).setCurrentScreen(appModule.android.foregroundActivity, options.screenName, null);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.analytics.setScreenName: " + ex);
            reject(ex);
        }
    });
}
exports.setScreenName = setScreenName;
