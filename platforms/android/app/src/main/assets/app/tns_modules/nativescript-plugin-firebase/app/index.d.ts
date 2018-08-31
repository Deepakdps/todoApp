/**
 * This is the firebase.js (web) compatible API.
 * Use 'const firebase = require("nativescript-plugin-firebase/app")'
 */
import * as firebase from "../firebase";
import { auth as firebaseAuthModule } from "./auth";
import { database as firebaseDatabaseModule } from "./database";
import { firestore as firebaseFirestoreModule } from "./firestore";
import { storage as firebaseStorageModule } from "./storage";
export declare function initializeApp(options?: firebase.InitOptions, name?: string): Promise<any>;
export declare function auth(app?: any): firebaseAuthModule.Auth;
export declare function database(app?: any): firebaseDatabaseModule.Database;
export declare function firestore(app?: any): firebaseFirestoreModule.Firestore;
export declare function storage(app?: any): firebaseStorageModule.Storage;
