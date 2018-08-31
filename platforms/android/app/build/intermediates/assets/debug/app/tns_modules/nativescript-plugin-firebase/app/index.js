"use strict";
/**
 * This is the firebase.js (web) compatible API.
 * Use 'const firebase = require("nativescript-plugin-firebase/app")'
 */
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("../firebase");
var auth_1 = require("./auth");
var database_1 = require("./database");
var firestore_1 = require("./firestore");
var storage_1 = require("./storage");
function initializeApp(options, name) {
    return firebase.init(options);
}
exports.initializeApp = initializeApp;
var authCache;
function auth(app) {
    if (app) {
        console.log("The 'app' param is ignored at the moment.");
    }
    if (!authCache) {
        authCache = new auth_1.auth.Auth();
    }
    return authCache;
}
exports.auth = auth;
var dbCache;
function database(app) {
    if (app) {
        console.log("The 'app' param is ignored at the moment.");
    }
    if (!dbCache) {
        dbCache = new database_1.database.Database();
    }
    return dbCache;
}
exports.database = database;
var firestoreCache;
function firestore(app) {
    if (app) {
        console.log("The 'app' param is ignored at the moment.");
    }
    if (!firestoreCache) {
        firestoreCache = new firestore_1.firestore.Firestore();
    }
    return firestoreCache;
}
exports.firestore = firestore;
var storageCache;
function storage(app) {
    if (app) {
        console.log("The 'app' param is ignored at the moment.");
    }
    if (!storageCache) {
        storageCache = new storage_1.storage.Storage();
    }
    return storageCache;
}
exports.storage = storage;
