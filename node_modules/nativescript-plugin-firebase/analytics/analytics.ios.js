"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logEvent(options) {
    return new Promise(function (resolve, reject) {
        try {
            if (options.key === undefined) {
                reject("Argument 'key' is missing");
                return;
            }
            var dic = NSMutableDictionary.new();
            if (options.parameters !== undefined) {
                for (var p in options.parameters) {
                    var param = options.parameters[p];
                    if (param.value !== undefined) {
                        dic.setObjectForKey(param.value, param.key);
                    }
                }
            }
            FIRAnalytics.logEventWithNameParameters(options.key, dic);
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
            FIRAnalytics.setUserID(arg.userId);
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
            FIRAnalytics.setUserPropertyStringForName(options.value, options.key);
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
            FIRAnalytics.setScreenNameScreenClass(options.screenName, null);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.analytics.setScreenName: " + ex);
            reject(ex);
        }
    });
}
exports.setScreenName = setScreenName;
