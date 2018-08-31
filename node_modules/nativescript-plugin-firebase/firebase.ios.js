"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_common_1 = require("./firebase-common");
var application = require("tns-core-modules/application");
var utils_1 = require("tns-core-modules/utils/utils");
var types_1 = require("tns-core-modules/utils/types");
var platform_1 = require("tns-core-modules/platform");
var enums_1 = require("tns-core-modules/ui/enums");
firebase_common_1.firebase._messagingConnected = null;
firebase_common_1.firebase._pendingNotifications = [];
firebase_common_1.firebase._receivedPushTokenCallback = null;
firebase_common_1.firebase._gIDAuthentication = null;
firebase_common_1.firebase._cachedInvitation = null;
firebase_common_1.firebase._cachedDynamicLink = null;
firebase_common_1.firebase._configured = false;
// Note that FIRApp.configure must be called only once, but not here (see https://github.com/EddyVerbruggen/nativescript-plugin-firebase/issues/564)
var invokeOnRunLoop = (function () {
    var runloop = CFRunLoopGetMain();
    return function (func) {
        CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, func);
        CFRunLoopWakeUp(runloop);
    };
})();
firebase_common_1.firebase._addObserver = function (eventName, callback) {
    var queue = utils_1.ios.getter(NSOperationQueue, NSOperationQueue.mainQueue);
    return utils_1.ios.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter).addObserverForNameObjectQueueUsingBlock(eventName, null, queue, callback);
};
var handleRemoteNotification = function (app, userInfo) {
    var userInfoJSON = firebase_common_1.firebase.toJsObject(userInfo);
    var aps = userInfo.objectForKey("aps");
    if (aps !== null) {
        var alrt = aps.objectForKey("alert");
        if (alrt !== null && alrt.objectForKey) {
            userInfoJSON.title = alrt.objectForKey("title");
            userInfoJSON.body = alrt.objectForKey("body");
        }
    }
    firebase_common_1.firebase._pendingNotifications.push(userInfoJSON);
    userInfoJSON.foreground = app.applicationState === 0 /* Active */;
    if (firebase_common_1.firebase._receivedNotificationCallback !== null) {
        firebase_common_1.firebase._processPendingNotifications();
    }
};
function addBackgroundRemoteNotificationHandler(appDelegate) {
    if (typeof (FIRMessaging) !== "undefined") {
        appDelegate.prototype.applicationDidReceiveRemoteNotificationFetchCompletionHandler = function (app, notification, completionHandler) {
            // Pass notification to auth and check if they can handle it (in case phone auth is being used), see https://firebase.google.com/docs/auth/ios/phone-auth
            if (firebase_common_1.firebase._configured && FIRAuth.auth().canHandleNotification(notification)) {
                completionHandler(1 /* NoData */);
                return;
            }
            completionHandler(0 /* NewData */);
            handleRemoteNotification(app, notification);
        };
    }
}
firebase_common_1.firebase.addAppDelegateMethods = function (appDelegate) {
    // we need the launchOptions for this one so it's a bit hard to use the UIApplicationDidFinishLaunchingNotification pattern we're using for other things
    appDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        if (!firebase_common_1.firebase._configured) {
            firebase_common_1.firebase._configured = true;
            FIRApp.configure();
        }
        // If the app was terminated and the iOS is launching it in result of push notification tapped by the user, this will hold the notification data.
        if (launchOptions && typeof (FIRMessaging) !== "undefined") {
            var remoteNotification = launchOptions.objectForKey(UIApplicationLaunchOptionsRemoteNotificationKey);
            if (remoteNotification) {
                handleRemoteNotification(application, remoteNotification);
            }
        }
        // Firebase Facebook authentication
        if (typeof (FBSDKApplicationDelegate) !== "undefined") {
            FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
        }
        return true;
    };
    // there's no notification event to hook into for this one, so using the appDelegate
    if (typeof (FBSDKApplicationDelegate) !== "undefined" || typeof (GIDSignIn) !== "undefined" || typeof (FIRInvites) !== "undefined" || typeof (FIRDynamicLink) !== "undefined") {
        appDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
            var result = false;
            if (typeof (FBSDKApplicationDelegate) !== "undefined") {
                result = FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
            }
            if (typeof (GIDSignIn) !== "undefined") {
                result = result || GIDSignIn.sharedInstance().handleURLSourceApplicationAnnotation(url, sourceApplication, annotation);
            }
            if (typeof (FIRInvites) !== "undefined") {
                var receivedInvite = FIRInvites.handleURLSourceApplicationAnnotation(url, sourceApplication, annotation);
                if (receivedInvite) {
                    console.log("Deep link from " + sourceApplication + ", Invite ID: " + receivedInvite.inviteId + ", App URL: " + receivedInvite.deepLink);
                    firebase_common_1.firebase._cachedInvitation = {
                        deepLink: receivedInvite.deepLink,
                        matchType: receivedInvite.matchType,
                        invitationId: receivedInvite.inviteId
                    };
                    result = true;
                }
            }
            if (typeof (FIRDynamicLink) !== "undefined") {
                var dynamicLink = FIRDynamicLinks.dynamicLinks().dynamicLinkFromCustomSchemeURL(url);
                if (dynamicLink) {
                    console.log(">>> dynamicLink.url.absoluteString: " + dynamicLink.url.absoluteString);
                    firebase_common_1.firebase._cachedDynamicLink = {
                        url: dynamicLink.url.absoluteString,
                        // matchConfidence: dynamicLink.matchConfidence,
                        minimumAppVersion: dynamicLink.minimumAppVersion
                    };
                    result = true;
                }
            }
            return result;
        };
    }
    if (typeof (FBSDKApplicationDelegate) !== "undefined" || typeof (GIDSignIn) !== "undefined" || typeof (FIRDynamicLink) !== "undefined") {
        appDelegate.prototype.applicationOpenURLOptions = function (application, url, options) {
            var result = false;
            if (typeof (FBSDKApplicationDelegate) !== "undefined") {
                result = FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, options.valueForKey(UIApplicationOpenURLOptionsSourceApplicationKey), options.valueForKey(UIApplicationOpenURLOptionsAnnotationKey));
            }
            if (typeof (GIDSignIn) !== "undefined") {
                result = result || GIDSignIn.sharedInstance().handleURLSourceApplicationAnnotation(url, options.valueForKey(UIApplicationOpenURLOptionsSourceApplicationKey), options.valueForKey(UIApplicationOpenURLOptionsAnnotationKey));
            }
            if (typeof (FIRDynamicLink) !== "undefined") {
                var dynamicLinks = FIRDynamicLinks.dynamicLinks();
                var dynamicLink = dynamicLinks.dynamicLinkFromCustomSchemeURL(url);
                if (dynamicLink) {
                    if (dynamicLink.url !== null) {
                        console.log(">>> dynamicLink.url.absoluteString: " + dynamicLink.url.absoluteString);
                        if (firebase_common_1.firebase._dynamicLinkCallback) {
                            firebase_common_1.firebase._dynamicLinkCallback({
                                url: dynamicLink.url.absoluteString,
                                // matchConfidence: dynamicLink.matchConfidence,
                                minimumAppVersion: dynamicLink.minimumAppVersion
                            });
                        }
                        else {
                            firebase_common_1.firebase._cachedDynamicLink = {
                                url: dynamicLink.url.absoluteString,
                                // matchConfidence: dynamicLink.matchConfidence,
                                minimumAppVersion: dynamicLink.minimumAppVersion
                            };
                        }
                        result = true;
                    }
                }
            }
            return result;
        };
    }
    if (typeof (FIRDynamicLink) !== "undefined") {
        appDelegate.prototype.applicationContinueUserActivityRestorationHandler = function (application, userActivity, restorationHandler) {
            var result = false;
            if (userActivity.webpageURL) {
                // check for an email-link-login flow
                var fAuth_1 = FIRAuth.auth();
                if (fAuth_1.isSignInWithEmailLink(userActivity.webpageURL.absoluteString)) {
                    var rememberedEmail_1 = firebase_common_1.firebase.getRememberedEmailForEmailLinkLogin();
                    if (rememberedEmail_1 !== undefined) {
                        if (fAuth_1.currentUser) {
                            var onCompletionLink = function (result, error) {
                                if (error) {
                                    // ignore, and complete the email link sign in flow
                                    fAuth_1.signInWithEmailLinkCompletion(rememberedEmail_1, userActivity.webpageURL.absoluteString, function (authData, error) {
                                        if (!error) {
                                            firebase_common_1.firebase.notifyAuthStateListeners({
                                                loggedIn: true,
                                                user: toLoginResult(authData.user)
                                            });
                                        }
                                    });
                                }
                                else {
                                    // linking successful, so the user can now log in with either their email address, or however he logged in previously
                                    firebase_common_1.firebase.notifyAuthStateListeners({
                                        loggedIn: true,
                                        user: toLoginResult(result.user)
                                    });
                                }
                            };
                            var fIRAuthCredential = FIREmailAuthProvider.credentialWithEmailLink(rememberedEmail_1, userActivity.webpageURL.absoluteString);
                            fAuth_1.currentUser.linkAndRetrieveDataWithCredentialCompletion(fIRAuthCredential, onCompletionLink);
                        }
                        else {
                            fAuth_1.signInWithEmailLinkCompletion(rememberedEmail_1, userActivity.webpageURL.absoluteString, function (authData, error) {
                                if (error) {
                                    console.log(error.localizedDescription);
                                }
                                else {
                                    firebase_common_1.firebase.notifyAuthStateListeners({
                                        loggedIn: true,
                                        user: toLoginResult(authData.user)
                                    });
                                }
                            });
                        }
                    }
                    result = true;
                }
                else {
                    result = FIRDynamicLinks.dynamicLinks().handleUniversalLinkCompletion(userActivity.webpageURL, function (dynamicLink, error) {
                        if (dynamicLink.url !== null) {
                            if (firebase_common_1.firebase._dynamicLinkCallback) {
                                firebase_common_1.firebase._dynamicLinkCallback({
                                    url: dynamicLink.url.absoluteString,
                                    // matchConfidence: dynamicLink.matchConfidence,
                                    minimumAppVersion: dynamicLink.minimumAppVersion
                                });
                            }
                            else {
                                firebase_common_1.firebase._cachedDynamicLink = {
                                    url: dynamicLink.url.absoluteString,
                                    // matchConfidence: dynamicLink.matchConfidence,
                                    minimumAppVersion: dynamicLink.minimumAppVersion
                                };
                            }
                        }
                    });
                }
            }
            return result;
        };
    }
    addBackgroundRemoteNotificationHandler(appDelegate);
};
firebase_common_1.firebase.fetchProvidersForEmail = function (email) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (email) !== "string") {
                reject("A parameter representing an email address is required.");
                return;
            }
            FIRAuth.auth().fetchProvidersForEmailCompletion(email, function (providerNSArray, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve(firebase_common_1.firebase.toJsObject(providerNSArray));
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.fetchProvidersForEmail: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.fetchSignInMethodsForEmail = function (email) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (email) !== "string") {
                reject("A parameter representing an email address is required.");
                return;
            }
            FIRAuth.auth().fetchSignInMethodsForEmailCompletion(email, function (methodsNSArray, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve(firebase_common_1.firebase.toJsObject(methodsNSArray));
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.fetchSignInMethodsForEmail: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.getCurrentPushToken = function () {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            resolve(FIRMessaging.messaging().FCMToken);
        }
        catch (ex) {
            console.log("Error in firebase.getCurrentPushToken: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addOnMessageReceivedCallback = function (callback) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            firebase_common_1.firebase._receivedNotificationCallback = callback;
            firebase_common_1.firebase._registerForRemoteNotifications();
            firebase_common_1.firebase._processPendingNotifications();
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.addOnMessageReceivedCallback: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addOnDynamicLinkReceivedCallback = function (callback) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRDynamicLink) === "undefined") {
                reject("Enable FIRInvites in Podfile first");
                return;
            }
            firebase_common_1.firebase._dynamicLinkCallback = callback;
            // if the app was launched from a dynamic link, process it now
            if (firebase_common_1.firebase._cachedDynamicLink !== null) {
                callback(firebase_common_1.firebase._cachedDynamicLink);
                firebase_common_1.firebase._cachedDynamicLink = null;
            }
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.addOnDynamicLinkReceivedCallback: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addOnPushTokenReceivedCallback = function (callback) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            firebase_common_1.firebase._receivedPushTokenCallback = callback;
            // may already be present
            if (firebase_common_1.firebase._pushToken) {
                callback(firebase_common_1.firebase._pushToken);
            }
            firebase_common_1.firebase._registerForRemoteNotifications();
            firebase_common_1.firebase._processPendingNotifications();
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.addOnPushTokenReceivedCallback: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.unregisterForPushNotifications = function () {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            utils_1.ios.getter(UIApplication, UIApplication.sharedApplication).unregisterForRemoteNotifications();
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.unregisterForPushNotifications: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase._processPendingNotifications = function () {
    var app = utils_1.ios.getter(UIApplication, UIApplication.sharedApplication);
    if (!app) {
        application.on("launch", function () {
            firebase_common_1.firebase._processPendingNotifications();
        });
        return;
    }
    if (firebase_common_1.firebase._receivedNotificationCallback !== null) {
        var _loop_1 = function (p) {
            var userInfoJSON = firebase_common_1.firebase._pendingNotifications[p];
            // move the most relevant properties (if set) so it's according to the TS definition and aligned with Android
            if (userInfoJSON.aps && userInfoJSON.aps.alert) {
                userInfoJSON.title = userInfoJSON.aps.alert.title;
                userInfoJSON.body = userInfoJSON.aps.alert.body;
            }
            // also, to make the ts.d happy copy all properties to a data element
            if (!userInfoJSON.hasOwnProperty('data')) {
                userInfoJSON.data = {};
            }
            Object.keys(userInfoJSON).forEach(function (key) {
                if (key !== 'data')
                    userInfoJSON.data[key] = userInfoJSON[key];
            });
            // cleanup
            userInfoJSON.aps = undefined;
            firebase_common_1.firebase._receivedNotificationCallback(userInfoJSON);
        };
        for (var p in firebase_common_1.firebase._pendingNotifications) {
            _loop_1(p);
        }
        firebase_common_1.firebase._pendingNotifications = [];
        app.applicationIconBadgeNumber = 0;
    }
};
firebase_common_1.firebase._messagingConnectWithCompletion = function () {
    return new Promise(function (resolve, reject) {
        FIRMessaging.messaging().connectWithCompletion(function (error) {
            if (error) {
                // this is not fatal and it scares the hell out of ppl so not logging it
                // console.log("Firebase was unable to connect to FCM. Error: " + error);
                return reject(error);
            }
            firebase_common_1.firebase._messagingConnected = true;
            resolve();
        });
    });
};
firebase_common_1.firebase._onTokenRefreshNotification = function (token) {
    firebase_common_1.firebase._pushToken = token;
    if (firebase_common_1.firebase._receivedPushTokenCallback) {
        firebase_common_1.firebase._receivedPushTokenCallback(token);
    }
    firebase_common_1.firebase._messagingConnectWithCompletion();
};
firebase_common_1.firebase._registerForRemoteNotificationsRanThisSession = false;
firebase_common_1.firebase._registerForRemoteNotifications = function () {
    var app = utils_1.ios.getter(UIApplication, UIApplication.sharedApplication);
    if (!app) {
        application.on("launch", function () {
            firebase_common_1.firebase._registerForRemoteNotifications();
        });
        return;
    }
    if (firebase_common_1.firebase._registerForRemoteNotificationsRanThisSession) {
        // ignore
        // return;
    }
    firebase_common_1.firebase._registerForRemoteNotificationsRanThisSession = true;
    if (parseInt(platform_1.device.osVersion) >= 10) {
        var authorizationOptions = 4 /* Alert */ | 2 /* Sound */ | 1 /* Badge */;
        var curNotCenter = utils_1.ios.getter(UNUserNotificationCenter, UNUserNotificationCenter.currentNotificationCenter);
        curNotCenter.requestAuthorizationWithOptionsCompletionHandler(authorizationOptions, function (granted, error) {
            if (!error) {
                if (app === null) {
                    app = utils_1.ios.getter(UIApplication, UIApplication.sharedApplication);
                }
                if (app !== null) {
                    invokeOnRunLoop(function () {
                        app.registerForRemoteNotifications();
                    });
                }
            }
            else {
                console.log("Error requesting push notification auth: " + error);
            }
        });
        firebase_common_1.firebase._userNotificationCenterDelegate = UNUserNotificationCenterDelegateImpl.new().initWithCallback(function (unnotification) {
            // if the app is in the foreground then this method will receive the notification
            // if the app is in the background, applicationDidReceiveRemoteNotificationFetchCompletionHandler will receive it
            var userInfo = unnotification.request.content.userInfo;
            var userInfoJSON = firebase_common_1.firebase.toJsObject(userInfo);
            userInfoJSON.foreground = true;
            firebase_common_1.firebase._pendingNotifications.push(userInfoJSON);
            if (firebase_common_1.firebase._receivedNotificationCallback !== null) {
                firebase_common_1.firebase._processPendingNotifications();
            }
        });
        curNotCenter.delegate = firebase_common_1.firebase._userNotificationCenterDelegate;
        firebase_common_1.firebase._firebaseRemoteMessageDelegate = FIRMessagingDelegateImpl.new().initWithCallback(function (appDataDictionary) {
            var userInfoJSON = firebase_common_1.firebase.toJsObject(appDataDictionary);
            firebase_common_1.firebase._pendingNotifications.push(userInfoJSON);
            var asJs = firebase_common_1.firebase.toJsObject(appDataDictionary.objectForKey("notification"));
            if (asJs) {
                userInfoJSON.title = asJs.title;
                userInfoJSON.body = asJs.body;
            }
            var app = utils_1.ios.getter(UIApplication, UIApplication.sharedApplication);
            if (app.applicationState === 0 /* Active */) {
                userInfoJSON.foreground = true;
                if (firebase_common_1.firebase._receivedNotificationCallback !== null) {
                    firebase_common_1.firebase._processPendingNotifications();
                }
            }
            else {
                userInfoJSON.foreground = false;
            }
        });
        FIRMessaging.messaging().delegate = firebase_common_1.firebase._firebaseRemoteMessageDelegate;
    }
    else {
        var notificationTypes = 4 /* Alert */ | 1 /* Badge */ | 2 /* Sound */ | 1 /* Background */;
        var notificationSettings = UIUserNotificationSettings.settingsForTypesCategories(notificationTypes, null);
        invokeOnRunLoop(function () {
            app.registerForRemoteNotifications(); // prompts the user to accept notifications
        });
        app.registerUserNotificationSettings(notificationSettings);
    }
};
function getAppDelegate() {
    // Play nice with other plugins by not completely ignoring anything already added to the appdelegate
    if (application.ios.delegate === undefined) {
        var UIApplicationDelegateImpl = /** @class */ (function (_super) {
            __extends(UIApplicationDelegateImpl, _super);
            function UIApplicationDelegateImpl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIApplicationDelegateImpl.ObjCProtocols = [UIApplicationDelegate];
            return UIApplicationDelegateImpl;
        }(UIResponder));
        application.ios.delegate = UIApplicationDelegateImpl;
    }
    return application.ios.delegate;
}
// rather than hijacking the appDelegate for these we'll be a good citizen and listen to the notifications
function prepAppDelegate() {
    if (typeof (FIRMessaging) !== "undefined") {
        // see https://github.com/EddyVerbruggen/nativescript-plugin-firebase/issues/178 for why we're not using a constant here
        firebase_common_1.firebase._addObserver("com.firebase.iid.notif.refresh-token", function (notification) { return firebase_common_1.firebase._onTokenRefreshNotification(notification.object); });
        firebase_common_1.firebase._addObserver(UIApplicationDidFinishLaunchingNotification, function (appNotification) {
            firebase_common_1.firebase._registerForRemoteNotifications();
        });
        firebase_common_1.firebase._addObserver(UIApplicationDidBecomeActiveNotification, function (appNotification) {
            firebase_common_1.firebase._processPendingNotifications();
            if (!firebase_common_1.firebase._messagingConnected) {
                firebase_common_1.firebase._messagingConnectWithCompletion();
            }
        });
        firebase_common_1.firebase._addObserver(UIApplicationDidEnterBackgroundNotification, function (appNotification) {
            // Firebase notifications (FCM)
            if (firebase_common_1.firebase._messagingConnected) {
                FIRMessaging.messaging().disconnect();
            }
        });
        firebase_common_1.firebase._addObserver(UIApplicationWillEnterForegroundNotification, function (appNotification) {
            // Firebase notifications (FCM)
            if (firebase_common_1.firebase._messagingConnected !== null) {
                FIRMessaging.messaging().connectWithCompletion(function (error) {
                    if (!error) {
                        firebase_common_1.firebase._messagingConnected = true;
                    }
                });
            }
        });
    }
    firebase_common_1.firebase.addAppDelegateMethods(getAppDelegate());
}
prepAppDelegate();
firebase_common_1.firebase.toJsObject = function (objCObj) {
    if (objCObj === null || typeof objCObj !== "object") {
        return objCObj;
    }
    var node, key, i, l, oKeyArr = objCObj.allKeys;
    if (oKeyArr === undefined) {
        // array
        node = [];
        for (i = 0, l = objCObj.count; i < l; i++) {
            key = objCObj.objectAtIndex(i);
            node.push(firebase_common_1.firebase.toJsObject(key));
        }
    }
    else {
        // object
        node = {};
        for (i = 0, l = oKeyArr.count; i < l; i++) {
            key = oKeyArr.objectAtIndex(i);
            var val = objCObj.valueForKey(key);
            // Firestore can store nulls
            if (val === null) {
                node[key] = null;
                continue;
            }
            switch (types_1.getClass(val)) {
                case 'NSArray':
                case 'NSMutableArray':
                    node[key] = firebase_common_1.firebase.toJsObject(val);
                    break;
                case 'NSDictionary':
                case 'NSMutableDictionary':
                    node[key] = firebase_common_1.firebase.toJsObject(val);
                    break;
                case 'String':
                    node[key] = String(val);
                    break;
                case 'Boolean':
                    node[key] = val;
                    break;
                case 'Number':
                case 'NSDecimalNumber':
                    node[key] = Number(String(val));
                    break;
                case 'Date':
                    node[key] = new Date(val);
                    break;
                case 'FIRTimestamp':
                    node[key] = val.dateValue();
                    break;
                case 'FIRDocumentReference':
                    var path = val.path;
                    var lastSlashIndex = path.lastIndexOf("/");
                    node[key] = firebase_common_1.firebase.firestore._getDocumentReference(val, path.substring(0, lastSlashIndex), path.substring(lastSlashIndex + 1));
                    break;
                case 'FIRGeoPoint':
                    node[key] = firebase_common_1.firebase.firestore.GeoPoint(val.latitude, val.longitude);
                    break;
                default:
                    console.log("Please report this at https://github.com/EddyVerbruggen/nativescript-plugin-firebase/issues: iOS toJsObject is missing a converter for class '" + types_1.getClass(val) + "'. Casting to String as a fallback.");
                    node[key] = String(val);
            }
        }
    }
    return node;
};
firebase_common_1.firebase.getCallbackData = function (type, snapshot) {
    return {
        type: type,
        key: snapshot.key,
        value: firebase_common_1.firebase.toJsObject(snapshot.value)
    };
};
firebase_common_1.firebase.authStateListener = null;
firebase_common_1.firebase.init = function (arg) {
    return new Promise(function (resolve, reject) {
        if (firebase_common_1.firebase.initialized) {
            reject("Firebase already initialized");
        }
        firebase_common_1.firebase.initialized = true;
        try {
            try {
                // this is only available when the Realtime DB Pod is loaded
                if (typeof (FIRServerValue) !== "undefined") {
                    firebase_common_1.firebase.ServerValue = {
                        TIMESTAMP: FIRServerValue.timestamp()
                    };
                }
            }
            catch (ignore) {
            }
            arg = arg || {};
            // if deeplinks are used, then for this scheme to work the use must have added the bundle as a scheme to their plist (this is in our docs)
            if (FIROptions.defaultOptions() !== null) {
                FIROptions.defaultOptions().deepLinkURLScheme = utils_1.ios.getter(NSBundle, NSBundle.mainBundle).bundleIdentifier;
            }
            if (!firebase_common_1.firebase._configured) {
                firebase_common_1.firebase._configured = true;
                FIRApp.configure();
            }
            if (typeof (FIRDatabase) !== "undefined") {
                if (arg.persist) {
                    FIRDatabase.database().persistenceEnabled = true;
                }
            }
            if (typeof (FIRFirestore) !== "undefined") {
                // Firestore has offline persistence enabled by default
                if (arg.persist === false) {
                    var fIRFirestoreSettings = FIRFirestoreSettings.new();
                    fIRFirestoreSettings.persistenceEnabled = false;
                    fIRFirestoreSettings.timestampsInSnapshotsEnabled = true;
                    FIRFirestore.firestore().settings = fIRFirestoreSettings;
                }
            }
            if (arg.iOSEmulatorFlush) {
                try {
                    // Attempt to sign out before initializing, useful in case previous
                    // project token is cached which leads to following type of error:
                    // "[FirebaseDatabase] Authentication failed: invalid_token ..."
                    FIRAuth.auth().signOut();
                }
                catch (signOutErr) {
                    console.log('Sign out of Firebase error: ' + signOutErr);
                }
            }
            if (arg.onAuthStateChanged) {
                firebase_common_1.firebase.authStateListener = function (auth, user) {
                    arg.onAuthStateChanged({
                        loggedIn: user !== null,
                        user: toLoginResult(user)
                    });
                };
                FIRAuth.auth().addAuthStateDidChangeListener(firebase_common_1.firebase.authStateListener);
            }
            // Listen to auth state changes
            if (!firebase_common_1.firebase.authStateListener) {
                firebase_common_1.firebase.authStateListener = function (auth, user) {
                    firebase_common_1.firebase.notifyAuthStateListeners({
                        loggedIn: user !== null,
                        user: toLoginResult(user)
                    });
                };
                FIRAuth.auth().addAuthStateDidChangeListener(firebase_common_1.firebase.authStateListener);
            }
            // Firebase DynamicLink
            if (arg.onDynamicLinkCallback !== undefined) {
                firebase_common_1.firebase.addOnDynamicLinkReceivedCallback(arg.onDynamicLinkCallback);
            }
            // Facebook Auth
            if (typeof (FBSDKAppEvents) !== "undefined") {
                FBSDKAppEvents.activateApp();
            }
            // Firebase notifications (FCM)
            if (typeof (FIRMessaging) !== "undefined") {
                if (arg.onMessageReceivedCallback !== undefined || arg.onPushTokenReceivedCallback !== undefined) {
                    if (arg.onMessageReceivedCallback !== undefined) {
                        firebase_common_1.firebase.addOnMessageReceivedCallback(arg.onMessageReceivedCallback);
                    }
                    if (arg.onPushTokenReceivedCallback !== undefined) {
                        firebase_common_1.firebase.addOnPushTokenReceivedCallback(arg.onPushTokenReceivedCallback);
                    }
                }
            }
            // Firebase storage
            if (arg.storageBucket) {
                if (typeof (FIRStorage) === "undefined") {
                    reject("Uncomment Storage in the plugin's Podfile first");
                    return;
                }
                firebase_common_1.firebase.storageBucket = FIRStorage.storage().referenceForURL(arg.storageBucket);
            }
            resolve(typeof (FIRDatabase) !== "undefined" ? FIRDatabase.database().reference() : undefined);
        }
        catch (ex) {
            console.log("Error in firebase.init: " + ex);
            reject(ex);
        }
    });
};
// helps global app behavior (ie: orientation handling)
firebase_common_1.firebase.admob.bannerOptions = null;
firebase_common_1.firebase.admob.showBanner = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (GADRequest) === "undefined") {
                reject("Uncomment AdMob in the plugin's Podfile first");
                return;
            }
            if (firebase_common_1.firebase.admob.adView !== null && firebase_common_1.firebase.admob.adView !== undefined) {
                firebase_common_1.firebase.admob.adView.removeFromSuperview();
                firebase_common_1.firebase.admob.adView = null;
            }
            firebase_common_1.firebase.admob.defaults.view = utils_1.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.rootViewController.view;
            var settings = firebase_common_1.firebase.merge(arg, firebase_common_1.firebase.admob.defaults);
            firebase_common_1.firebase.admob.bannerOptions = settings;
            var view = settings.view;
            var bannerType = firebase_common_1.firebase.admob._getBannerType(settings.size);
            var adWidth = bannerType.size.width === 0 ? view.frame.size.width : bannerType.size.width;
            var adHeight = bannerType.size.smartHeight ? bannerType.size.smartHeight : bannerType.size.height;
            var originX = (view.frame.size.width - adWidth) / 2;
            var originY = settings.margins.top > -1 ? settings.margins.top : (settings.margins.bottom > -1 ? view.frame.size.height - adHeight - settings.margins.bottom : 0.0);
            var origin = CGPointMake(originX, originY);
            firebase_common_1.firebase.admob.adView = GADBannerView.alloc().initWithAdSizeOrigin(bannerType, origin);
            firebase_common_1.firebase.admob.adView.adUnitID = settings.iosBannerId;
            var adRequest = GADRequest.request();
            if (settings.testing) {
                var testDevices = [];
                try {
                    testDevices.push(kGADSimulatorID);
                }
                catch (ignore) {
                    // can happen on a real device
                }
                if (settings.iosTestDeviceIds) {
                    testDevices = testDevices.concat(settings.iosTestDeviceIds);
                }
                adRequest.testDevices = testDevices;
            }
            if (settings.keywords !== undefined) {
                adRequest.keywords = settings.keywords;
            }
            firebase_common_1.firebase.admob.adView.rootViewController = utils_1.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.rootViewController;
            // var statusbarFrame = iOSUtils.getter(UIApplication, UIApplication.sharedApplication).statusBarFrame;
            firebase_common_1.firebase.admob.adView.loadRequest(adRequest);
            // TODO consider listening to delegate features like 'ad loaded' (Android resolves when the banner is actually showing)
            // adView.delegate = self;
            view.addSubview(firebase_common_1.firebase.admob.adView);
            // support rotation events
            // tear down first if this had been called already to avoid multiple event bindings
            application.off(application.orientationChangedEvent, firebase_common_1.firebase.admob.orientationHandler);
            application.on(application.orientationChangedEvent, firebase_common_1.firebase.admob.orientationHandler);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.admob.showBanner: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.admob.orientationHandler = function (data) {
    if (firebase_common_1.firebase.admob.adView !== null) {
        firebase_common_1.firebase.admob.hideBanner().then(function (res) {
            try {
                firebase_common_1.firebase.admob.showBanner(firebase_common_1.firebase.admob.bannerOptions || firebase_common_1.firebase.admob.defaults);
            }
            catch (err) {
                console.log("Error in orientationHandler - firebase.admob.showBanner: " + err);
            }
        }, function (err) {
            console.log("Error in orientationHandler - firebase.admob.hideBanner: " + err);
        });
    }
};
firebase_common_1.firebase.admob.showInterstitial = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (GADRequest) === "undefined") {
                reject("Uncomment AdMob in the plugin's Podfile first");
                return;
            }
            var settings = firebase_common_1.firebase.merge(arg, firebase_common_1.firebase.admob.defaults);
            firebase_common_1.firebase.admob.interstitialView = GADInterstitial.alloc().initWithAdUnitID(settings.iosInterstitialId);
            // with interstitials you MUST wait for the ad to load before showing it, so requiring this delegate
            var delegate_1 = GADInterstitialDelegateImpl.new().initWithCallback(function (ad, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    // now we can safely show it
                    firebase_common_1.firebase.admob.interstitialView.presentFromRootViewController(utils_1.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.rootViewController);
                    resolve();
                }
                CFRelease(delegate_1);
                delegate_1 = undefined;
            });
            // we're leaving the app to switch to Google's OAuth screen, so making sure this is retained
            CFRetain(delegate_1);
            firebase_common_1.firebase.admob.interstitialView.delegate = delegate_1;
            var adRequest = GADRequest.request();
            if (settings.testing) {
                var testDevices = [];
                try {
                    testDevices.push(kGADSimulatorID);
                }
                catch (ignore) {
                    // can happen on a real device
                }
                if (settings.iosTestDeviceIds) {
                    testDevices = testDevices.concat(settings.iosTestDeviceIds);
                }
                adRequest.testDevices = testDevices;
            }
            firebase_common_1.firebase.admob.interstitialView.loadRequest(adRequest);
        }
        catch (ex) {
            console.log("Error in firebase.admob.showInterstitial: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.admob.hideBanner = function () {
    return new Promise(function (resolve, reject) {
        try {
            if (firebase_common_1.firebase.admob.adView !== null) {
                // adView.delegate = null;
                firebase_common_1.firebase.admob.adView.removeFromSuperview();
                firebase_common_1.firebase.admob.adView = null;
            }
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.admob.hideBanner: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.admob._getBannerType = function (size) {
    // see nativescript-admob's iOS sourcecode for why we're not using SDK-provided constants here
    if (size === firebase_common_1.firebase.admob.AD_SIZE.BANNER) {
        // return kGADAdSizeBanner;
        return { "size": { "width": 320, "height": 50 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.LARGE_BANNER) {
        // return kGADAdSizeLargeBanner;
        return { "size": { "width": 320, "height": 100 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.MEDIUM_RECTANGLE) {
        // return kGADAdSizeMediumRectangle;
        return { "size": { "width": 300, "height": 250 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.FULL_BANNER) {
        // return kGADAdSizeFullBanner;
        return { "size": { "width": 468, "height": 60 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.LEADERBOARD) {
        // return kGADAdSizeLeaderboard;
        return { "size": { "width": 728, "height": 90 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.SKYSCRAPER) {
        // return kGADAdSizeSkyscraper;
        return { "size": { "width": 120, "height": 600 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.SMART_BANNER || size === firebase_common_1.firebase.admob.AD_SIZE.FLUID) {
        var orientation_1 = utils_1.ios.getter(UIDevice, UIDevice.currentDevice).orientation;
        var isIPad = platform_1.device.deviceType === enums_1.DeviceType.Tablet;
        if (orientation_1 === 1 /* Portrait */ || orientation_1 === 2 /* PortraitUpsideDown */) {
            // return kGADAdSizeSmartBannerPortrait;
            return { "size": { "width": 0, "height": 0, "smartHeight": isIPad ? 90 : 50 }, "flags": 18 };
        }
        else {
            // return kGADAdSizeSmartBannerLandscape;
            return { "size": { "width": 0, "height": 0, "smartHeight": isIPad ? 90 : 32 }, "flags": 26 };
        }
    }
    else {
        // return kGADAdSizeInvalid;
        return { "size": { "width": -1, "height": -1 }, "flags": 0 };
    }
};
firebase_common_1.firebase.getRemoteConfig = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRRemoteConfig) === "undefined") {
                reject("Uncomment RemoteConfig in the plugin's Podfile first");
                return;
            }
            if (arg.properties === undefined) {
                reject("Argument 'properties' is missing");
                return;
            }
            // Get a Remote Config object instance
            var firebaseRemoteConfig_1 = FIRRemoteConfig.remoteConfig();
            // Enable developer mode to allow for frequent refreshes of the cache
            firebaseRemoteConfig_1.configSettings = new FIRRemoteConfigSettings({ developerModeEnabled: arg.developerMode || false });
            var dic = NSMutableDictionary.new();
            for (var p in arg.properties) {
                var prop = arg.properties[p];
                if (prop.default !== undefined) {
                    dic.setObjectForKey(prop.default, prop.key);
                }
            }
            firebaseRemoteConfig_1.setDefaults(dic);
            var onCompletion = function (remoteConfigFetchStatus, error) {
                if (remoteConfigFetchStatus === 1 /* Success */ ||
                    remoteConfigFetchStatus === 3 /* Throttled */) {
                    var activated = firebaseRemoteConfig_1.activateFetched();
                    var result = {
                        lastFetch: firebaseRemoteConfig_1.lastFetchTime,
                        throttled: remoteConfigFetchStatus === 3 /* Throttled */,
                        properties: {}
                    };
                    for (var p in arg.properties) {
                        var prop = arg.properties[p];
                        var key = prop.key;
                        var value = firebaseRemoteConfig_1.configValueForKey(key).stringValue;
                        // we could have the user pass in the type but this seems easier to use
                        result.properties[key] = firebase_common_1.firebase.strongTypeify(value);
                    }
                    resolve(result);
                }
                else {
                    reject(error.localizedDescription);
                }
            };
            // default 12 hours, just like the SDK does
            var expirationDuration = arg.cacheExpirationSeconds || 43200;
            firebaseRemoteConfig_1.fetchWithExpirationDurationCompletionHandler(expirationDuration, onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.getRemoteConfig: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.getCurrentUser = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            var user = fAuth.currentUser;
            if (user) {
                resolve(toLoginResult(user));
            }
            else {
                reject();
            }
        }
        catch (ex) {
            console.log("Error in firebase.getCurrentUser: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.sendEmailVerification = function () {
    return new Promise(function (resolve, reject) {
        try {
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            var user = fAuth.currentUser;
            if (user) {
                var onCompletion = function (error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        resolve(true);
                    }
                };
                user.sendEmailVerificationWithCompletion(onCompletion);
            }
            else {
                reject("Log in first");
            }
        }
        catch (ex) {
            console.log("Error in firebase.sendEmailVerification: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.logout = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            FIRAuth.auth().signOut();
            // also disconnect from Google otherwise ppl can't connect with a different account
            if (typeof (GIDSignIn) !== "undefined") {
                GIDSignIn.sharedInstance().disconnect();
            }
            if (typeof (FBSDKLoginManager) !== "undefined") {
                FBSDKLoginManager.alloc().logOut();
            }
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.logout: " + ex);
            reject(ex);
        }
    });
};
function toLoginResult(user, additionalUserInfo) {
    if (!user) {
        return null;
    }
    var providers = [];
    if (user.providerData) {
        for (var i = 0, l = user.providerData.count; i < l; i++) {
            var firUserInfo = user.providerData.objectAtIndex(i);
            var pid = firUserInfo.valueForKey("providerID");
            // the app may have dropped Facebook support, so check if the native class is still there
            if (pid === 'facebook.com' && typeof (FBSDKAccessToken) !== "undefined") { // FIRFacebookAuthProviderID
                var fbCurrentAccessToken = FBSDKAccessToken.currentAccessToken();
                providers.push({ id: pid, token: fbCurrentAccessToken ? fbCurrentAccessToken.tokenString : null });
            }
            else {
                providers.push({ id: pid });
            }
        }
    }
    var loginResult = {
        uid: user.uid,
        anonymous: user.anonymous,
        isAnonymous: user.anonymous,
        // provider: user.providerID, // always 'Firebase'
        providers: providers,
        profileImageURL: user.photoURL ? user.photoURL.absoluteString : null,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.displayName,
        phoneNumber: user.phoneNumber,
        refreshToken: user.refreshToken,
        metadata: {
            creationTimestamp: user.metadata.creationDate,
            lastSignInTimestamp: user.metadata.lastSignInDate
        }
    };
    if (additionalUserInfo) {
        loginResult.additionalUserInfo = {
            providerId: additionalUserInfo.providerID,
            username: additionalUserInfo.username,
            isNewUser: additionalUserInfo.newUser,
            profile: firebase_common_1.firebase.toJsObject(additionalUserInfo.profile)
        };
    }
    return loginResult;
}
firebase_common_1.firebase.getAuthToken = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            var user = fAuth.currentUser;
            if (user) {
                var onCompletion = function (token, error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        resolve(token);
                    }
                };
                user.getIDTokenForcingRefreshCompletion(arg.forceRefresh, onCompletion);
            }
            else {
                reject("Log in first");
            }
        }
        catch (ex) {
            console.log("Error in firebase.getAuthToken: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.login = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletionWithAuthResult_1 = function (authResult, error) {
                if (error) {
                    // also disconnect from Google otherwise ppl can't connect with a different account
                    if (typeof (GIDSignIn) !== "undefined") {
                        GIDSignIn.sharedInstance().disconnect();
                    }
                    reject(error.localizedDescription);
                }
                else {
                    resolve(toLoginResult(authResult && authResult.user, authResult && authResult.additionalUserInfo));
                    firebase_common_1.firebase.notifyAuthStateListeners({
                        loggedIn: true,
                        user: toLoginResult(authResult.user)
                    });
                }
            };
            var fAuth_2 = FIRAuth.auth();
            if (fAuth_2 === null) {
                reject("Run init() first!");
                return;
            }
            firebase_common_1.firebase.moveLoginOptionsToObjects(arg);
            if (arg.type === firebase_common_1.firebase.LoginType.ANONYMOUS) {
                fAuth_2.signInAnonymouslyWithCompletion(onCompletionWithAuthResult_1);
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.PASSWORD) {
                if (!arg.passwordOptions || !arg.passwordOptions.email || !arg.passwordOptions.password) {
                    reject("Auth type PASSWORD requires an 'passwordOptions.email' and 'passwordOptions.password' argument");
                    return;
                }
                var fIRAuthCredential_1 = FIREmailAuthProvider.credentialWithEmailPassword(arg.passwordOptions.email, arg.passwordOptions.password);
                if (fAuth_2.currentUser) {
                    // link credential, note that you only want to do this if this user doesn't already use fb as an auth provider
                    var onCompletionLink = function (authData, error) {
                        if (error) {
                            // ignore, as this one was probably already linked, so just return the user
                            log("--- linking error: " + error.localizedDescription);
                            fAuth_2.signInAndRetrieveDataWithCredentialCompletion(fIRAuthCredential_1, onCompletionWithAuthResult_1);
                        }
                        else {
                            onCompletionWithAuthResult_1(authData, error);
                        }
                    };
                    fAuth_2.currentUser.linkAndRetrieveDataWithCredentialCompletion(fIRAuthCredential_1, onCompletionLink);
                }
                else {
                    fAuth_2.signInWithEmailPasswordCompletion(arg.passwordOptions.email, arg.passwordOptions.password, onCompletionWithAuthResult_1);
                }
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.EMAIL_LINK) {
                if (!arg.emailLinkOptions || !arg.emailLinkOptions.email) {
                    reject("Auth type EMAIL_LINK requires an 'emailLinkOptions.email' argument");
                    return;
                }
                if (!arg.emailLinkOptions.url) {
                    reject("Auth type EMAIL_LINK requires an 'emailLinkOptions.url' argument");
                    return;
                }
                var firActionCodeSettings = FIRActionCodeSettings.new();
                // This 'continue URL' is what's emailed to the receiver, and the domain must be whitelisted in the Firebase console
                firActionCodeSettings.URL = NSURL.URLWithString(arg.emailLinkOptions.url);
                // The sign-in operation has to always be completed in the app.
                firActionCodeSettings.handleCodeInApp = true;
                firActionCodeSettings.setIOSBundleID(arg.emailLinkOptions.iOS ? arg.emailLinkOptions.iOS.bundleId : NSBundle.mainBundle.bundleIdentifier);
                firActionCodeSettings.setAndroidPackageNameInstallIfNotAvailableMinimumVersion(arg.emailLinkOptions.android ? arg.emailLinkOptions.android.packageName : NSBundle.mainBundle.bundleIdentifier, arg.emailLinkOptions.android ? arg.emailLinkOptions.android.installApp || false : false, arg.emailLinkOptions.android ? arg.emailLinkOptions.android.minimumVersion || "1" : "1");
                fAuth_2.sendSignInLinkToEmailActionCodeSettingsCompletion(arg.emailLinkOptions.email, firActionCodeSettings, function (error) {
                    if (error) {
                        reject(error.localizedDescription);
                        return;
                    }
                    // The link was successfully sent.
                    // Save the email locally so you don't need to ask the user for it again if they open the link on the same device.
                    firebase_common_1.firebase.rememberEmailForEmailLinkLogin(arg.emailLinkOptions.email);
                    resolve();
                });
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.PHONE) {
                // https://firebase.google.com/docs/auth/ios/phone-auth
                if (!arg.phoneOptions || !arg.phoneOptions.phoneNumber) {
                    reject("Auth type PHONE requires a 'phoneOptions.phoneNumber' argument");
                    return;
                }
                FIRPhoneAuthProvider.provider().verifyPhoneNumberUIDelegateCompletion(arg.phoneOptions.phoneNumber, null, function (verificationID, error) {
                    if (error) {
                        reject(error.localizedDescription);
                        return;
                    }
                    firebase_common_1.firebase.requestPhoneAuthVerificationCode(function (userResponse) {
                        var fIRAuthCredential = FIRPhoneAuthProvider.provider().credentialWithVerificationIDVerificationCode(verificationID, userResponse);
                        if (fAuth_2.currentUser) {
                            var onCompletionLink = function (authData, error) {
                                if (error) {
                                    // ignore, as this one was probably already linked, so just return the user
                                    fAuth_2.signInAndRetrieveDataWithCredentialCompletion(fIRAuthCredential, onCompletionWithAuthResult_1);
                                }
                                else {
                                    onCompletionWithAuthResult_1(authData, error);
                                }
                            };
                            fAuth_2.currentUser.linkAndRetrieveDataWithCredentialCompletion(fIRAuthCredential, onCompletionLink);
                        }
                        else {
                            fAuth_2.signInAndRetrieveDataWithCredentialCompletion(fIRAuthCredential, onCompletionWithAuthResult_1);
                        }
                    }, arg.phoneOptions.verificationPrompt);
                });
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.CUSTOM) {
                if (!arg.customOptions || (!arg.customOptions.token && !arg.customOptions.tokenProviderFn)) {
                    reject("Auth type CUSTOM requires a 'customOptions.token' or 'customOptions.tokenProviderFn' argument");
                    return;
                }
                if (arg.customOptions.token) {
                    fAuth_2.signInAndRetrieveDataWithCustomTokenCompletion(arg.customOptions.token, onCompletionWithAuthResult_1);
                }
                else if (arg.customOptions.tokenProviderFn) {
                    arg.customOptions.tokenProviderFn()
                        .then(function (token) {
                        fAuth_2.signInAndRetrieveDataWithCustomTokenCompletion(token, onCompletionWithAuthResult_1);
                    }, function (error) {
                        reject(error);
                    });
                }
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.FACEBOOK) {
                if (typeof (FBSDKLoginManager) === "undefined") {
                    reject("Facebook SDK not installed - see Podfile");
                    return;
                }
                var onFacebookCompletion = function (fbSDKLoginManagerLoginResult, error) {
                    if (error) {
                        console.log("Facebook login error " + error);
                        reject(error.localizedDescription);
                    }
                    else if (fbSDKLoginManagerLoginResult.isCancelled) {
                        reject("login cancelled");
                    }
                    else {
                        // headless facebook auth
                        // var fIRAuthCredential = FIRFacebookAuthProvider.credentialWithAccessToken(fbSDKLoginManagerLoginResult.token.tokenString);
                        var fIRAuthCredential_2 = FIRFacebookAuthProvider.credentialWithAccessToken(FBSDKAccessToken.currentAccessToken().tokenString);
                        if (fAuth_2.currentUser) {
                            // link credential, note that you only want to do this if this user doesn't already use fb as an auth provider
                            var onCompletionLink = function (authData, error) {
                                if (error) {
                                    // ignore, as this one was probably already linked, so just return the user
                                    log("--- linking error: " + error.localizedDescription);
                                    fAuth_2.signInAndRetrieveDataWithCredentialCompletion(fIRAuthCredential_2, onCompletionWithAuthResult_1);
                                }
                                else {
                                    onCompletionWithAuthResult_1(authData);
                                }
                            };
                            fAuth_2.currentUser.linkAndRetrieveDataWithCredentialCompletion(fIRAuthCredential_2, onCompletionLink);
                        }
                        else {
                            fAuth_2.signInAndRetrieveDataWithCredentialCompletion(fIRAuthCredential_2, onCompletionWithAuthResult_1);
                        }
                    }
                };
                // this requires you to set the appid and customurlscheme in app_resources/.plist
                var fbSDKLoginManager = FBSDKLoginManager.new();
                // fbSDKLoginManager.loginBehavior = FBSDKLoginBehavior.Web;
                var scope = ["public_profile", "email"];
                if (arg.facebookOptions && arg.facebookOptions.scope) {
                    scope = arg.facebookOptions.scope;
                }
                fbSDKLoginManager.logInWithReadPermissionsFromViewControllerHandler(scope, null, // the viewcontroller param can be null since by default topmost is taken
                onFacebookCompletion);
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.GOOGLE) {
                if (typeof (GIDSignIn) === "undefined") {
                    reject("Google Sign In not installed - see Podfile");
                    return;
                }
                var sIn = GIDSignIn.sharedInstance();
                // allow custom controller for variety of use cases
                sIn.uiDelegate = arg.ios && arg.ios.controller ? arg.ios.controller : application.ios.rootController;
                sIn.clientID = FIRApp.defaultApp().options.clientID;
                if (arg.googleOptions && arg.googleOptions.hostedDomain) {
                    sIn.hostedDomain = arg.googleOptions.hostedDomain;
                }
                var delegate_2 = GIDSignInDelegateImpl.new().initWithCallback(function (user, error) {
                    if (error === null) {
                        // Get a Google ID token and Google access token from the GIDAuthentication object and exchange them for a Firebase credential
                        firebase_common_1.firebase._gIDAuthentication = user.authentication;
                        var fIRAuthCredential_3 = FIRGoogleAuthProvider.credentialWithIDTokenAccessToken(firebase_common_1.firebase._gIDAuthentication.idToken, firebase_common_1.firebase._gIDAuthentication.accessToken);
                        // Finally, authenticate with Firebase using the credential
                        if (fAuth_2.currentUser) {
                            // link credential, note that you only want to do this if this user doesn't already use Google as an auth provider
                            var onCompletionLink = function (user, error) {
                                if (error) {
                                    // ignore, as this one was probably already linked, so just return the user
                                    fAuth_2.signInAndRetrieveDataWithCredentialCompletion(fIRAuthCredential_3, onCompletionWithAuthResult_1);
                                }
                                else {
                                    onCompletionWithAuthResult_1(user);
                                }
                            };
                            fAuth_2.currentUser.linkAndRetrieveDataWithCredentialCompletion(fIRAuthCredential_3, onCompletionLink);
                        }
                        else {
                            fAuth_2.signInAndRetrieveDataWithCredentialCompletion(fIRAuthCredential_3, onCompletionWithAuthResult_1);
                        }
                    }
                    else {
                        reject(error.localizedDescription);
                    }
                    CFRelease(delegate_2);
                    delegate_2 = undefined;
                });
                CFRetain(delegate_2);
                sIn.delegate = delegate_2;
                sIn.signIn();
            }
            else {
                reject("Unsupported auth type: " + arg.type);
            }
        }
        catch (ex) {
            console.log("Error in firebase.login: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.reauthenticate = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            var user = fAuth.currentUser;
            if (user === null) {
                reject("no current user");
                return;
            }
            firebase_common_1.firebase.moveLoginOptionsToObjects(arg);
            var authCredential = null;
            if (arg.type === firebase_common_1.firebase.LoginType.PASSWORD) {
                if (!arg.passwordOptions || !arg.passwordOptions.email || !arg.passwordOptions.password) {
                    reject("Auth type PASSWORD requires an 'passwordOptions.email' and 'passwordOptions.password' argument");
                    return;
                }
                authCredential = FIREmailAuthProvider.credentialWithEmailPassword(arg.passwordOptions.email, arg.passwordOptions.password);
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.GOOGLE) {
                if (!firebase_common_1.firebase._gIDAuthentication) {
                    reject("Not currently logged in with Google");
                    return;
                }
                authCredential = FIRGoogleAuthProvider.credentialWithIDTokenAccessToken(firebase_common_1.firebase._gIDAuthentication.idToken, firebase_common_1.firebase._gIDAuthentication.accessToken);
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.FACEBOOK) {
                var currentAccessToken = FBSDKAccessToken.currentAccessToken();
                if (!currentAccessToken) {
                    reject("Not currently logged in with Facebook");
                    return;
                }
                authCredential = FIRFacebookAuthProvider.credentialWithAccessToken(currentAccessToken.tokenString);
            }
            if (authCredential === null) {
                reject("arg.type should be one of LoginType.PASSWORD | LoginType.GOOGLE | LoginType.FACEBOOK");
                return;
            }
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            user.reauthenticateWithCredentialCompletion(authCredential, onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.reauthenticate: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.reloadUser = function () {
    return new Promise(function (resolve, reject) {
        try {
            var user = FIRAuth.auth().currentUser;
            if (user === null) {
                reject("no current user");
                return;
            }
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            user.reloadWithCompletion(onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.reloadUser: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.resetPassword = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            if (!arg.email) {
                reject("Resetting a password requires an email argument");
            }
            else {
                FIRAuth.auth().sendPasswordResetWithEmailCompletion(arg.email, onCompletion);
            }
        }
        catch (ex) {
            console.log("Error in firebase.resetPassword: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.changePassword = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            if (!arg.email || !arg.oldPassword || !arg.newPassword) {
                reject("Changing a password requires an email and an oldPassword and a newPassword arguments");
            }
            else {
                var user = FIRAuth.auth().currentUser;
                if (user === null) {
                    reject("no current user");
                }
                else {
                    user.updatePasswordCompletion(arg.newPassword, onCompletion);
                }
            }
        }
        catch (ex) {
            console.log("Error in firebase.changePassword: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.createUser = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (authResult, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve(toLoginResult(authResult.user, authResult.additionalUserInfo));
                }
            };
            if (!arg.email || !arg.password) {
                reject("Creating a user requires an email and password argument");
            }
            else {
                // instance.createUserPasswordWithValueCompletionBlock(arg.email, arg.password, onCompletion);
                FIRAuth.auth().createUserWithEmailPasswordCompletion(arg.email, arg.password, onCompletion);
            }
        }
        catch (ex) {
            console.log("Error in firebase.createUser: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.deleteUser = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var user = FIRAuth.auth().currentUser;
            if (user === null) {
                reject("no current user");
                return;
            }
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            user.deleteWithCompletion(onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.deleteUser: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.updateProfile = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            if (!arg.displayName && !arg.photoURL) {
                reject("Updating a profile requires a displayName and / or a photoURL argument");
            }
            else {
                var user = fAuth.currentUser;
                if (user) {
                    var changeRequest = user.profileChangeRequest();
                    changeRequest.displayName = arg.displayName;
                    changeRequest.photoURL = NSURL.URLWithString(arg.photoURL);
                    changeRequest.commitChangesWithCompletion(onCompletion);
                }
                else {
                    reject();
                }
            }
        }
        catch (ex) {
            console.log("Error in firebase.updateProfile: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase._addObservers = function (to, updateCallback) {
    var listeners = [];
    listeners.push(to.observeEventTypeWithBlock(0 /* ChildAdded */, function (snapshot) {
        updateCallback(firebase_common_1.firebase.getCallbackData('ChildAdded', snapshot));
    }));
    listeners.push(to.observeEventTypeWithBlock(1 /* ChildRemoved */, function (snapshot) {
        updateCallback(firebase_common_1.firebase.getCallbackData('ChildRemoved', snapshot));
    }));
    listeners.push(to.observeEventTypeWithBlock(2 /* ChildChanged */, function (snapshot) {
        updateCallback(firebase_common_1.firebase.getCallbackData('ChildChanged', snapshot));
    }));
    listeners.push(to.observeEventTypeWithBlock(3 /* ChildMoved */, function (snapshot) {
        updateCallback(firebase_common_1.firebase.getCallbackData('ChildMoved', snapshot));
    }));
    return listeners;
};
firebase_common_1.firebase.keepInSync = function (path, switchOn) {
    return new Promise(function (resolve, reject) {
        try {
            var where = FIRDatabase.database().reference().childByAppendingPath(path);
            where.keepSynced(switchOn);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.keepInSync: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addChildEventListener = function (updateCallback, path) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? FIRDatabase.database().reference() : FIRDatabase.database().reference().childByAppendingPath(path);
            resolve({
                path: path,
                listeners: firebase_common_1.firebase._addObservers(where, updateCallback)
            });
        }
        catch (ex) {
            console.log("Error in firebase.addChildEventListener: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addValueEventListener = function (updateCallback, path) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? FIRDatabase.database().reference() : FIRDatabase.database().reference().childByAppendingPath(path);
            var listener = where.observeEventTypeWithBlockWithCancelBlock(4 /* Value */, function (snapshot) {
                updateCallback(firebase_common_1.firebase.getCallbackData('ValueChanged', snapshot));
            }, function (firebaseError) {
                updateCallback({
                    error: firebaseError.localizedDescription
                });
            });
            resolve({
                path: path,
                listeners: [listener]
            });
        }
        catch (ex) {
            console.log("Error in firebase.addChildEventListener: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.getValue = function (path) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? FIRDatabase.database().reference() : FIRDatabase.database().reference().childByAppendingPath(path);
            var listener = where.observeSingleEventOfTypeWithBlockWithCancelBlock(4 /* Value */, function (snapshot) {
                resolve(firebase_common_1.firebase.getCallbackData('ValueChanged', snapshot));
            }, function (firebaseError) {
                reject(firebaseError.localizedDescription);
            });
        }
        catch (ex) {
            console.log("Error in firebase.getValue: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.removeEventListeners = function (listeners, path) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? FIRDatabase.database().reference() : FIRDatabase.database().reference().childByAppendingPath(path);
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                where.removeObserverWithHandle(listener);
            }
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.removeEventListeners: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.push = function (path, val) {
    return new Promise(function (resolve, reject) {
        try {
            var ref_1 = FIRDatabase.database().reference().childByAppendingPath(path).childByAutoId();
            ref_1.setValueWithCompletionBlock(val, function (error, dbRef) {
                error ? reject(error.localizedDescription) : resolve({ key: ref_1.key });
            });
        }
        catch (ex) {
            console.log("Error in firebase.push: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.setValue = function (path, val) {
    return new Promise(function (resolve, reject) {
        try {
            FIRDatabase.database().reference().childByAppendingPath(path).setValueWithCompletionBlock(val, function (error, dbRef) {
                error ? reject(error.localizedDescription) : resolve();
            });
        }
        catch (ex) {
            console.log("Error in firebase.setValue: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.update = function (path, val) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof val === "object") {
                FIRDatabase.database().reference().childByAppendingPath(path).updateChildValuesWithCompletionBlock(val, function (error, dbRef) {
                    error ? reject(error.localizedDescription) : resolve();
                });
            }
            else {
                var lastPartOfPath = path.lastIndexOf("/");
                var pathPrefix = path.substring(0, lastPartOfPath);
                var pathSuffix = path.substring(lastPartOfPath + 1);
                var updateObject = '{"' + pathSuffix + '" : "' + val + '"}';
                FIRDatabase.database().reference().childByAppendingPath(pathPrefix).updateChildValuesWithCompletionBlock(JSON.parse(updateObject), function (error, dbRef) {
                    error ? reject(error.localizedDescription) : resolve();
                });
            }
        }
        catch (ex) {
            console.log("Error in firebase.update: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.query = function (updateCallback, path, options) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? FIRDatabase.database().reference() : FIRDatabase.database().reference().childByAppendingPath(path);
            var query = void 0;
            // orderBy
            if (options.orderBy.type === firebase_common_1.firebase.QueryOrderByType.KEY) {
                query = where.queryOrderedByKey();
            }
            else if (options.orderBy.type === firebase_common_1.firebase.QueryOrderByType.VALUE) {
                query = where.queryOrderedByValue();
            }
            else if (options.orderBy.type === firebase_common_1.firebase.QueryOrderByType.PRIORITY) {
                query = where.queryOrderedByPriority();
            }
            else if (options.orderBy.type === firebase_common_1.firebase.QueryOrderByType.CHILD) {
                if (options.orderBy.value === undefined || options.orderBy.value === null) {
                    reject("When orderBy.type is 'child' you must set orderBy.value as well.");
                    return;
                }
                query = where.queryOrderedByChild(options.orderBy.value);
            }
            else {
                reject("Invalid orderBy.type, use constants like firebase.QueryOrderByType.VALUE");
                return;
            }
            // range
            if (options.range && options.range.type) {
                // https://github.com/EddyVerbruggen/nativescript-plugin-firebase/issues/319
                // if (options.range.value === undefined || options.range.value === null) {
                //   reject("Please set range.value");
                //   return;
                // }
                if (options.range.type === firebase_common_1.firebase.QueryRangeType.START_AT) {
                    query = query.queryStartingAtValue(options.range.value);
                }
                else if (options.range.type === firebase_common_1.firebase.QueryRangeType.END_AT) {
                    query = query.queryEndingAtValue(options.range.value);
                }
                else if (options.range.type === firebase_common_1.firebase.QueryRangeType.EQUAL_TO) {
                    query = query.queryEqualToValue(options.range.value);
                }
                else {
                    reject("Invalid range.type, use constants like firebase.QueryRangeType.START_AT");
                    return;
                }
            }
            // ranges
            if (options.ranges) {
                for (var i = 0; i < options.ranges.length; i++) {
                    var range = options.ranges[i];
                    if (range.value === undefined || range.value === null) {
                        reject("Please set ranges[" + i + "].value");
                        return;
                    }
                    if (range.type === firebase_common_1.firebase.QueryRangeType.START_AT) {
                        query = query.queryStartingAtValue(range.value);
                    }
                    else if (range.type === firebase_common_1.firebase.QueryRangeType.END_AT) {
                        query = query.queryEndingAtValue(range.value);
                    }
                    else if (range.type === firebase_common_1.firebase.QueryRangeType.EQUAL_TO) {
                        query = query.queryEqualToValue(range.value);
                    }
                    else {
                        reject("Invalid ranges[" + i + "].type, use constants like firebase.QueryRangeType.START_AT");
                        return;
                    }
                }
            }
            // limit
            if (options.limit && options.limit.type) {
                if (options.limit.value === undefined || options.limit.value === null) {
                    reject("Please set limit.value");
                    return;
                }
                if (options.limit.type === firebase_common_1.firebase.QueryLimitType.FIRST) {
                    query = query.queryLimitedToFirst(options.limit.value);
                }
                else if (options.limit.type === firebase_common_1.firebase.QueryLimitType.LAST) {
                    query = query.queryLimitedToLast(options.limit.value);
                }
                else {
                    reject("Invalid limit.type, use constants like firebase.queryOptions.limitType.FIRST");
                    return;
                }
            }
            if (options.singleEvent) {
                query.observeSingleEventOfTypeWithBlock(4 /* Value */, function (snapshot) {
                    if (updateCallback)
                        updateCallback(firebase_common_1.firebase.getCallbackData('ValueChanged', snapshot));
                    // resolve promise with data in case of single event, see https://github.com/EddyVerbruggen/nativescript-plugin-firebase/issues/126
                    resolve(firebase_common_1.firebase.getCallbackData('ValueChanged', snapshot));
                });
            }
            else {
                resolve({
                    path: path,
                    listeners: firebase_common_1.firebase._addObservers(query, updateCallback)
                });
            }
        }
        catch (ex) {
            console.log("Error in firebase.query: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.remove = function (path) {
    return new Promise(function (resolve, reject) {
        try {
            FIRDatabase.database().reference().childByAppendingPath(path).setValueWithCompletionBlock(null, function (error, dbRef) {
                error ? reject(error.localizedDescription) : resolve();
            });
        }
        catch (ex) {
            console.log("Error in firebase.remove: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.subscribeToTopic = function (topicName) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            if (topicName.indexOf("/topics/") === -1) {
                topicName = "/topics/" + topicName;
            }
            // TODO there's also (un)subscribeToTopicCompletion (resolve when completed).. perhaps this has been added to Android as well
            FIRMessaging.messaging().subscribeToTopic(topicName);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.subscribeToTopic: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.unsubscribeFromTopic = function (topicName) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            if (topicName.indexOf("/topics/") === -1) {
                topicName = "/topics/" + topicName;
            }
            FIRMessaging.messaging().unsubscribeFromTopic(topicName);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.unsubscribeFromTopic: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.sendCrashLog = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            // TODO generate typings again and see if 'FIRCrashLog' is available
            /*
            if (typeof(FIRCrashLog) === "undefined") {
              reject("Make sure 'Firebase/Crash' is in the plugin's Podfile - and if it is there's currently a problem with this Pod which is outside out span of control :(");
              return;
            }
      
            if (!arg.message) {
              reject("The mandatory 'message' argument is missing");
              return;
            }
      
            if (arg.showInConsole) {
              FIRCrashNSLog(arg.message);
            } else {
              FIRCrashLog(arg.message);
            }
            */
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.sendCrashLog: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.invites.sendInvitation = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRInvites) === "undefined") {
                reject("Make sure 'Firebase/Invites' is in the plugin's Podfile");
                return;
            }
            if (!arg.message || !arg.title) {
                reject("The mandatory 'message' or 'title' argument is missing");
                return;
            }
            // note that this returns the wrong type, so need to use 'performSelector' below
            var inviteDialog = FIRInvites.inviteDialog();
            // A message hint for the dialog. Note this manifests differently depending on the
            // received invitation type. For example, in an email invite this appears as the subject.
            // inviteDialog.setMessage(arg.message);
            inviteDialog.performSelectorWithObject("setMessage:", arg.message);
            // Title for the dialog, this is what the user sees before sending the invites.
            // inviteDialog.setTitle(arg.title);
            inviteDialog.performSelectorWithObject("setTitle:", arg.title);
            if (arg.deepLink) {
                // inviteDialog.setDeepLink(arg.deeplink);
                inviteDialog.performSelectorWithObject("setDeepLink:", arg.deeplink);
            }
            if (arg.callToActionText) {
                // inviteDialog.setCallToActionText(arg.callToActionText);
                inviteDialog.performSelectorWithObject("setCallToActionText:", arg.callToActionText);
            }
            if (arg.customImage) {
                // inviteDialog.setCustomImage(arg.customImage);
                inviteDialog.performSelectorWithObject("setCustomImage:", arg.customImage);
            }
            if (arg.androidClientID) {
                var targetApplication = FIRInvitesTargetApplication.new();
                targetApplication.androidClientID = arg.androidClientID;
                // inviteDialog.setOtherPlatformsTargetApplication(targetApplication);
                inviteDialog.performSelectorWithObject("setOtherPlatformsTargetApplication:", targetApplication);
            }
            var delegate_3 = FIRInviteDelegateImpl.new().initWithCallback(function (invitationIds, error) {
                if (error === null) {
                    var ids = firebase_common_1.firebase.toJsObject(invitationIds);
                    resolve({
                        count: invitationIds.count,
                        invitationIds: ids
                    });
                }
                else {
                    reject(error.localizedDescription);
                }
                CFRelease(delegate_3);
                delegate_3 = undefined;
            });
            // This opens the contact picker UI, so making sure this is retained
            CFRetain(delegate_3);
            // inviteDialog.setInviteDelegate(delegate);
            inviteDialog.performSelectorWithObject("setInviteDelegate:", delegate_3);
            // inviteDialog.open();
            inviteDialog.performSelector("open");
        }
        catch (ex) {
            console.log("Error in firebase.sendInvitation: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.invites.getInvitation = function () {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRInvites) === "undefined") {
                reject("Make sure 'Firebase/Invites' is in the plugin's Podfile");
                return;
            }
            if (firebase_common_1.firebase._cachedInvitation !== null) {
                resolve(firebase_common_1.firebase._cachedInvitation);
                firebase_common_1.firebase.cachedInvitation = null;
            }
            else {
                reject("Not launched by invitation");
            }
        }
        catch (ex) {
            console.log("Error in firebase.getInvitation: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.collection = function (collectionPath) {
    try {
        if (typeof (FIRFirestore) === "undefined") {
            console.log("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
            return null;
        }
        var fIRCollectionReference_1 = FIRFirestore.firestore().collectionWithPath(collectionPath);
        return {
            id: fIRCollectionReference_1.collectionID,
            doc: function (documentPath) { return firebase_common_1.firebase.firestore.doc(collectionPath, documentPath); },
            add: function (document) { return firebase_common_1.firebase.firestore.add(collectionPath, document); },
            get: function () { return firebase_common_1.firebase.firestore.get(collectionPath); },
            where: function (fieldPath, opStr, value) { return firebase_common_1.firebase.firestore.where(collectionPath, fieldPath, opStr, value); },
            orderBy: function (fieldPath, directionStr) { return firebase_common_1.firebase.firestore.orderBy(collectionPath, fieldPath, directionStr, fIRCollectionReference_1); },
            limit: function (limit) { return firebase_common_1.firebase.firestore.limit(collectionPath, limit, fIRCollectionReference_1); },
            onSnapshot: function (callback) { return firebase_common_1.firebase.firestore.onCollectionSnapshot(fIRCollectionReference_1, callback); }
        };
    }
    catch (ex) {
        console.log("Error in firebase.firestore.collection: " + ex);
        return null;
    }
};
firebase_common_1.firebase.firestore.onDocumentSnapshot = function (docRef, callback) {
    var listener = docRef.addSnapshotListener(function (snapshot, error) {
        callback(new firebase_common_1.DocumentSnapshot(snapshot.documentID, snapshot.exists, firebase_common_1.firebase.toJsObject(snapshot.data())));
    });
    // There's a bug resulting this function to be undefined..
    if (listener.remove === undefined) {
        return function () {
            // .. so we're just ignoring anything received from the server (until the callback is set again when 'onSnapshot' is invoked).
            callback = function () {
            };
        };
    }
    else {
        return function () { return listener.remove(); };
    }
};
firebase_common_1.firebase.firestore.onCollectionSnapshot = function (colRef, callback) {
    var listener = colRef.addSnapshotListener(function (snapshot, error) {
        var docSnapshots = [];
        for (var i = 0, l = snapshot.documents.count; i < l; i++) {
            var document_1 = snapshot.documents.objectAtIndex(i);
            docSnapshots.push(new firebase_common_1.DocumentSnapshot(document_1.documentID, true, firebase_common_1.firebase.toJsObject(document_1.data())));
        }
        var snap = new firebase_common_1.QuerySnapshot();
        snap.docSnapshots = docSnapshots;
        callback(snap);
    });
    // There's a bug resulting in this function to be undefined..
    if (listener.remove === undefined) {
        return function () {
            // .. so we're just ignoring anything received from the server (until the callback is set again when 'onSnapshot' is invoked).
            callback = function () {
            };
        };
    }
    else {
        return function () { return listener.remove(); };
    }
};
firebase_common_1.firebase.firestore._getDocumentReference = function (fIRDocumentReference, collectionPath, documentPath) {
    return {
        id: fIRDocumentReference.documentID,
        collection: function (cp) { return firebase_common_1.firebase.firestore.collection(collectionPath + "/" + documentPath + "/" + cp); },
        set: function (data, options) { return firebase_common_1.firebase.firestore.set(collectionPath, fIRDocumentReference.documentID, data, options); },
        get: function () { return firebase_common_1.firebase.firestore.getDocument(collectionPath, fIRDocumentReference.documentID); },
        update: function (data) { return firebase_common_1.firebase.firestore.update(collectionPath, fIRDocumentReference.documentID, data); },
        delete: function () { return firebase_common_1.firebase.firestore.delete(collectionPath, fIRDocumentReference.documentID); },
        onSnapshot: function (callback) { return firebase_common_1.firebase.firestore.onDocumentSnapshot(fIRDocumentReference, callback); },
        ios: fIRDocumentReference
    };
};
firebase_common_1.firebase.firestore.doc = function (collectionPath, documentPath) {
    try {
        if (typeof (FIRFirestore) === "undefined") {
            console.log("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
            return null;
        }
        var fIRCollectionReference = FIRFirestore.firestore().collectionWithPath(collectionPath);
        var fIRDocumentReference = documentPath ? fIRCollectionReference.documentWithPath(documentPath) : fIRCollectionReference.documentWithAutoID();
        return firebase_common_1.firebase.firestore._getDocumentReference(fIRDocumentReference, collectionPath, documentPath);
    }
    catch (ex) {
        console.log("Error in firebase.firestore.doc: " + ex);
        return null;
    }
};
firebase_common_1.firebase.firestore.add = function (collectionPath, document) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            var defaultFirestore = FIRFirestore.firestore();
            var fIRDocumentReference_1 = defaultFirestore
                .collectionWithPath(collectionPath)
                .addDocumentWithDataCompletion(document, function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve({
                        id: fIRDocumentReference_1.documentID,
                        collection: function (cp) { return firebase_common_1.firebase.firestore.collection(cp); },
                        set: function (data, options) { return firebase_common_1.firebase.firestore.set(collectionPath, fIRDocumentReference_1.documentID, data, options); },
                        get: function () { return firebase_common_1.firebase.firestore.getDocument(collectionPath, fIRDocumentReference_1.documentID); },
                        update: function (data) { return firebase_common_1.firebase.firestore.update(collectionPath, fIRDocumentReference_1.documentID, data); },
                        delete: function () { return firebase_common_1.firebase.firestore.delete(collectionPath, fIRDocumentReference_1.documentID); },
                        onSnapshot: function (callback) { return firebase_common_1.firebase.firestore.onDocumentSnapshot(fIRDocumentReference_1, callback); }
                    });
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.add: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.set = function (collectionPath, documentPath, document, options) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            fixSpecialFields(document);
            var docRef = FIRFirestore.firestore()
                .collectionWithPath(collectionPath)
                .documentWithPath(documentPath);
            if (options && options.merge) {
                docRef.setDataMergeCompletion(document, true, function (error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                docRef.setDataCompletion(document, function (error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        resolve();
                    }
                });
            }
        }
        catch (ex) {
            console.log("Error in firebase.firestore.set: " + ex);
            reject(ex);
        }
    });
};
function fixSpecialFields(item) {
    for (var k in item) {
        if (item.hasOwnProperty(k)) {
            if (item[k] === "SERVER_TIMESTAMP") {
                item[k] = FIRFieldValue.fieldValueForServerTimestamp();
            }
            else if (item[k] instanceof firebase_common_1.GeoPoint) {
                var geo = item[k];
                item[k] = new FIRGeoPoint({
                    latitude: geo.latitude,
                    longitude: geo.longitude
                });
            }
        }
    }
}
firebase_common_1.firebase.firestore.update = function (collectionPath, documentPath, document) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            fixSpecialFields(document);
            var docRef = FIRFirestore.firestore()
                .collectionWithPath(collectionPath)
                .documentWithPath(documentPath);
            docRef.updateDataCompletion(document, function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.update: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.delete = function (collectionPath, documentPath) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            var docRef = FIRFirestore.firestore()
                .collectionWithPath(collectionPath)
                .documentWithPath(documentPath);
            docRef.deleteDocumentWithCompletion(function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.delete: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.getCollection = function (collectionPath) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            var defaultFirestore = FIRFirestore.firestore();
            var fIRDocumentReference = defaultFirestore
                .collectionWithPath(collectionPath)
                .getDocumentsWithCompletion(function (snapshot, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    var docSnapshots = [];
                    for (var i = 0, l = snapshot.documents.count; i < l; i++) {
                        var document_2 = snapshot.documents.objectAtIndex(i);
                        docSnapshots.push(new firebase_common_1.DocumentSnapshot(document_2.documentID, true, firebase_common_1.firebase.toJsObject(document_2.data())));
                    }
                    var snap = new firebase_common_1.QuerySnapshot();
                    snap.docSnapshots = docSnapshots;
                    resolve(snap);
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.getCollection: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.get = function (collectionPath) {
    return firebase_common_1.firebase.firestore.getCollection(collectionPath);
};
firebase_common_1.firebase.firestore.getDocument = function (collectionPath, documentPath) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            FIRFirestore.firestore()
                .collectionWithPath(collectionPath)
                .documentWithPath(documentPath)
                .getDocumentWithCompletion(function (snapshot, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    var exists = snapshot.exists;
                    resolve(new firebase_common_1.DocumentSnapshot(exists ? snapshot.documentID : null, exists, firebase_common_1.firebase.toJsObject(snapshot.data())));
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.getDocument: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore._getQuery = function (collectionPath, query) {
    return {
        get: function () { return new Promise(function (resolve, reject) {
            query.getDocumentsWithCompletion(function (snapshot, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    console.log(">> .where, snapshot: " + snapshot);
                    var docSnapshots = [];
                    for (var i = 0, l = snapshot.documents.count; i < l; i++) {
                        var document_3 = snapshot.documents.objectAtIndex(i);
                        docSnapshots.push(new firebase_common_1.DocumentSnapshot(document_3.documentID, true, firebase_common_1.firebase.toJsObject(document_3.data())));
                    }
                    var snap = new firebase_common_1.QuerySnapshot();
                    snap.docSnapshots = docSnapshots;
                    resolve(snap);
                }
            });
        }); },
        where: function (fp, os, v) { return firebase_common_1.firebase.firestore.where(collectionPath, fp, os, v, query); },
        orderBy: function (fp, directionStr) { return firebase_common_1.firebase.firestore.orderBy(collectionPath, fp, directionStr, query); },
        limit: function (limit) { return firebase_common_1.firebase.firestore.limit(collectionPath, limit, query); },
        onSnapshot: function (callback) { return firebase_common_1.firebase.firestore.onCollectionSnapshot(query, callback); }
    };
};
firebase_common_1.firebase.firestore.where = function (collectionPath, fieldPath, opStr, value, query) {
    try {
        if (typeof (FIRFirestore) === "undefined") {
            console.log("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
            return null;
        }
        query = query || FIRFirestore.firestore().collectionWithPath(collectionPath);
        value = value instanceof firebase_common_1.GeoPoint
            ? new FIRGeoPoint({ latitude: value.latitude, longitude: value.longitude })
            : value;
        if (opStr === "<") {
            query = query.queryWhereFieldIsLessThan(fieldPath, value);
        }
        else if (opStr === "<=") {
            query = query.queryWhereFieldIsLessThanOrEqualTo(fieldPath, value);
        }
        else if (opStr === "==") {
            query = query.queryWhereFieldIsEqualTo(fieldPath, value);
        }
        else if (opStr === ">=") {
            query = query.queryWhereFieldIsGreaterThanOrEqualTo(fieldPath, value);
        }
        else if (opStr === ">") {
            query = query.queryWhereFieldIsGreaterThan(fieldPath, value);
        }
        else {
            console.log("Illegal argument for opStr: " + opStr);
            return null;
        }
        return firebase_common_1.firebase.firestore._getQuery(collectionPath, query);
    }
    catch (ex) {
        console.log("Error in firebase.firestore.where: " + ex);
        return null;
    }
};
firebase_common_1.firebase.firestore.orderBy = function (collectionPath, fieldPath, direction, query) {
    query = query.queryOrderedByFieldDescending(fieldPath, direction === "desc");
    return firebase_common_1.firebase.firestore._getQuery(collectionPath, query);
};
firebase_common_1.firebase.firestore.limit = function (collectionPath, limit, query) {
    query = query.queryLimitedTo(limit);
    return firebase_common_1.firebase.firestore._getQuery(collectionPath, query);
};
// see https://developer.apple.com/reference/usernotifications/unusernotificationcenterdelegate?language=objc
var UNUserNotificationCenterDelegateImpl = /** @class */ (function (_super) {
    __extends(UNUserNotificationCenterDelegateImpl, _super);
    function UNUserNotificationCenterDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UNUserNotificationCenterDelegateImpl.new = function () {
        if (UNUserNotificationCenterDelegateImpl.ObjCProtocols.length === 0 && typeof (UNUserNotificationCenterDelegate) !== "undefined") {
            UNUserNotificationCenterDelegateImpl.ObjCProtocols.push(UNUserNotificationCenterDelegate);
        }
        return _super.new.call(this);
    };
    UNUserNotificationCenterDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    UNUserNotificationCenterDelegateImpl.prototype.userNotificationCenterWillPresentNotificationWithCompletionHandler = function (center, notification, completionHandler) {
        this.callback(notification);
    };
    UNUserNotificationCenterDelegateImpl.ObjCProtocols = [];
    return UNUserNotificationCenterDelegateImpl;
}(NSObject));
var FIRInviteDelegateImpl = /** @class */ (function (_super) {
    __extends(FIRInviteDelegateImpl, _super);
    function FIRInviteDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FIRInviteDelegateImpl.new = function () {
        if (FIRInviteDelegateImpl.ObjCProtocols.length === 0 && typeof (FIRInviteDelegate) !== "undefined") {
            FIRInviteDelegateImpl.ObjCProtocols.push(FIRInviteDelegate);
        }
        return _super.new.call(this);
    };
    FIRInviteDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    FIRInviteDelegateImpl.prototype.inviteFinishedWithInvitationsError = function (invitationIds, error) {
        this.callback(invitationIds, error);
    };
    FIRInviteDelegateImpl.ObjCProtocols = [];
    return FIRInviteDelegateImpl;
}(NSObject));
var FIRMessagingDelegateImpl = /** @class */ (function (_super) {
    __extends(FIRMessagingDelegateImpl, _super);
    function FIRMessagingDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FIRMessagingDelegateImpl.new = function () {
        if (FIRMessagingDelegateImpl.ObjCProtocols.length === 0 && typeof (FIRMessagingDelegate) !== "undefined") {
            FIRMessagingDelegateImpl.ObjCProtocols.push(FIRMessagingDelegate);
        }
        return _super.new.call(this);
    };
    FIRMessagingDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    FIRMessagingDelegateImpl.prototype.messagingDidReceiveMessage = function (messaging, remoteMessage) {
        console.log(">> fcm message received");
        this.callback(remoteMessage.appData);
    };
    FIRMessagingDelegateImpl.prototype.messagingDidReceiveRegistrationToken = function (messaging, fcmToken) {
        console.log(">> fcmToken received: " + fcmToken);
        firebase_common_1.firebase._onTokenRefreshNotification(fcmToken);
    };
    FIRMessagingDelegateImpl.ObjCProtocols = [];
    return FIRMessagingDelegateImpl;
}(NSObject));
var GADInterstitialDelegateImpl = /** @class */ (function (_super) {
    __extends(GADInterstitialDelegateImpl, _super);
    function GADInterstitialDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GADInterstitialDelegateImpl.new = function () {
        if (GADInterstitialDelegateImpl.ObjCProtocols.length === 0 && typeof (GADInterstitialDelegate) !== "undefined") {
            GADInterstitialDelegateImpl.ObjCProtocols.push(GADInterstitialDelegate);
        }
        return _super.new.call(this);
    };
    GADInterstitialDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    GADInterstitialDelegateImpl.prototype.interstitialDidReceiveAd = function (ad) {
        this.callback(ad);
    };
    GADInterstitialDelegateImpl.prototype.interstitialDidFailToReceiveAdWithError = function (ad, error) {
        this.callback(ad, error);
    };
    GADInterstitialDelegateImpl.ObjCProtocols = [];
    return GADInterstitialDelegateImpl;
}(NSObject));
var GIDSignInDelegateImpl = /** @class */ (function (_super) {
    __extends(GIDSignInDelegateImpl, _super);
    function GIDSignInDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GIDSignInDelegateImpl.new = function () {
        if (GIDSignInDelegateImpl.ObjCProtocols.length === 0 && typeof (GIDSignInDelegate) !== "undefined") {
            GIDSignInDelegateImpl.ObjCProtocols.push(GIDSignInDelegate);
        }
        return _super.new.call(this);
    };
    GIDSignInDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    GIDSignInDelegateImpl.prototype.signInDidSignInForUserWithError = function (signIn, user, error) {
        this.callback(user, error);
    };
    GIDSignInDelegateImpl.ObjCProtocols = [];
    return GIDSignInDelegateImpl;
}(NSObject));
module.exports = firebase_common_1.firebase;
