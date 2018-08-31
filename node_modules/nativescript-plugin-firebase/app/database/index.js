"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("../../firebase");
var NextPushId_1 = require("./util/NextPushId");
var database;
(function (database) {
    var Query = /** @class */ (function () {
        function Query(path) {
            this.path = path;
        }
        Query.prototype.on = function (eventType /* TODO use */, callback, cancelCallbackOrContext, context) {
            var _this = this;
            var onValueEvent = function (result) {
                if (result.error) {
                    callback(result.error);
                }
                else {
                    callback({
                        key: result.key,
                        val: function () {
                            return result.value;
                        }
                    });
                }
            };
            firebase.addValueEventListener(onValueEvent, this.path).then(function (result) {
                if (!Query.registeredListeners.has(_this.path)) {
                    Query.registeredListeners.set(_this.path, []);
                }
                Query.registeredListeners.set(_this.path, Query.registeredListeners.get(_this.path).concat(result.listeners));
            }, function (error) {
                console.log("firebase.database().on error: " + error);
            });
            // remember the callbacks as we may need them for 'query' events
            if (!Query.registeredCallbacks.has(this.path)) {
                Query.registeredCallbacks.set(this.path, []);
            }
            Query.registeredCallbacks.get(this.path).push(callback);
            return null;
        };
        Query.prototype.off = function (eventType, callback, context) {
            var _this = this;
            if (Query.registeredListeners.has(this.path)) {
                firebase.removeEventListeners(Query.registeredListeners.get(this.path), this.path).then(function (result) { return Query.registeredListeners.delete(_this.path); }, function (error) { return console.log("firebase.database().off error: " + error); });
            }
            Query.registeredCallbacks.delete(this.path);
            return null;
        };
        Query.prototype.once = function (eventType, successCallback, failureCallbackOrContext, context) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                firebase.getValue(_this.path).then(function (result) {
                    resolve({
                        key: result.key,
                        val: function () {
                            return result.value;
                        }
                    });
                });
            });
        };
        Query.prototype.getOnValueEventHandler = function () {
            var _this = this;
            return function (result) {
                var callbacks = Query.registeredCallbacks.get(_this.path);
                callbacks && callbacks.map(function (callback) {
                    callback({
                        key: result.key,
                        val: function () {
                            return result.value;
                        }
                    });
                });
            };
        };
        Query.prototype.orderByChild = function (child) {
            firebase.query(this.getOnValueEventHandler(), this.path, {
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: child
                }
            });
            return this;
        };
        Query.prototype.orderByKey = function () {
            firebase.query(this.getOnValueEventHandler(), this.path, {
                orderBy: {
                    type: firebase.QueryOrderByType.KEY
                }
            });
            return this;
        };
        Query.prototype.orderByPriority = function () {
            firebase.query(this.getOnValueEventHandler(), this.path, {
                orderBy: {
                    type: firebase.QueryOrderByType.PRIORITY
                }
            });
            return this;
        };
        Query.prototype.orderByValue = function () {
            firebase.query(this.getOnValueEventHandler(), this.path, {
                orderBy: {
                    type: firebase.QueryOrderByType.VALUE
                }
            });
            return this;
        };
        Query.registeredListeners = new Map();
        Query.registeredCallbacks = new Map();
        return Query;
    }());
    database.Query = Query;
    var Reference = /** @class */ (function (_super) {
        __extends(Reference, _super);
        function Reference() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Reference.prototype.getKey = function () {
            if (!this.path) {
                return null;
            }
            else {
                return this.path.lastIndexOf("/") === -1 ? this.path : this.path.substring(this.path.lastIndexOf("/") + 1);
            }
        };
        Object.defineProperty(Reference.prototype, "key", {
            get: function () {
                return this.getKey();
            },
            enumerable: true,
            configurable: true
        });
        Reference.prototype.set = function (value, onComplete) {
            var _this = this;
            // return firebase.setValue(this.path, value);
            return new Promise(function (resolve, reject) {
                firebase.setValue(_this.path, value).then(function () {
                    onComplete && onComplete(null);
                    resolve(null);
                }).catch(function (err) {
                    onComplete && onComplete(err);
                    // TODO we should extends the default Error object for better compatibility
                    reject(err);
                });
            });
        };
        Reference.prototype.child = function (path) {
            return new Reference(this.path ? this.path + "/" + path : path);
        };
        /*
        private getServerTime(): number {
          const offsetNode = this.infoData_.getNode(
              new Path('.info/serverTimeOffset')
          );
          const offset = (offsetNode.val() as number) || 0;
          return new Date().getTime() + offset;
        }
        */
        Reference.prototype.push = function (value, onComplete) {
            // note that it would be better to use server time here, but no biggy
            // const now = this.getServerTime();
            var now = new Date().getTime();
            var name = NextPushId_1.nextPushId(now);
            // push() returns a ThennableReference whose promise is fulfilled with a regular Reference.
            // We use child() to create handles to two different references. The first is turned into a
            // ThennableReference below by adding then() and catch() methods and is used as the
            // return value of push(). The second remains a regular Reference and is used as the fulfilled
            // value of the first ThennableReference.
            var thennablePushRef = this.child(name);
            var pushRef = this.child(name);
            var promise;
            if (value != null) {
                promise = thennablePushRef.set(value, onComplete).then(function () { return pushRef; });
            }
            else {
                promise = Promise.resolve(pushRef);
            }
            thennablePushRef.then = promise.then.bind(promise);
            thennablePushRef.catch = promise.then.bind(promise, undefined);
            if (typeof onComplete === 'function') {
                promise.catch(function () {
                });
            }
            return thennablePushRef;
        };
        Reference.prototype.remove = function (onComplete) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                firebase.remove(_this.path).then(function () {
                    onComplete && onComplete(null);
                    resolve(null);
                }).catch(function (err) {
                    onComplete && onComplete(err);
                    reject(err);
                });
            });
        };
        return Reference;
    }(Query));
    database.Reference = Reference;
    var Database = /** @class */ (function () {
        function Database() {
        }
        // private authStateChangedHandler;
        // public onAuthStateChanged(handler: (user: User) => void): void {
        //   this.authStateChangedHandler = handler;
        //   console.log(">> added onAuthStateChanged handler");
        // };
        Database.prototype.ref = function (path) {
            return new Reference(path);
        };
        return Database;
    }());
    database.Database = Database;
})(database = exports.database || (exports.database = {}));
