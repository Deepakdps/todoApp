"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color");
var frame_1 = require("tns-core-modules/ui/frame");
var SnackBar = (function () {
    function SnackBar() {
        this._snackCallback = android.support.design.widget.Snackbar.Callback.extend({
            resolve: null,
            onDismissed: function (snackbar, event) {
                if (event !== 1) {
                    this.resolve({
                        command: 'Dismiss',
                        reason: _getReason(event),
                        event: event
                    });
                }
            }
        });
    }
    SnackBar.prototype.simple = function (snackText, textColor, backgroundColor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (!snackText) {
                    reject('Snack text is required.');
                    return;
                }
                _this._snackbar = android.support.design.widget.Snackbar.make(frame_1.topmost().currentPage.android, snackText, 3000);
                if (textColor) {
                    _this._setTextColor(textColor);
                }
                if (backgroundColor) {
                    _this._setBackgroundColor(backgroundColor);
                }
                var callback = new _this._snackCallback();
                callback.resolve = resolve;
                _this._snackbar.setCallback(callback);
                _this._snackbar.show();
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    SnackBar.prototype.action = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                options.actionText = options.actionText ? options.actionText : 'Close';
                options.hideDelay = options.hideDelay ? options.hideDelay : 3000;
                _this._snackbar = android.support.design.widget.Snackbar.make(frame_1.topmost().currentPage.android, options.snackText, options.hideDelay);
                var listener = new android.view.View.OnClickListener({
                    onClick: function (args) {
                        resolve({
                            command: 'Action',
                            reason: _getReason(1),
                            event: args
                        });
                    }
                });
                _this._snackbar.setAction(options.actionText, listener);
                if (options.textColor) {
                    _this._setTextColor(options.textColor);
                }
                if (options.actionTextColor) {
                    var colorIsValid = color_1.Color.isValid(options.actionTextColor);
                    if (colorIsValid) {
                        _this._snackbar.setActionTextColor(new color_1.Color(options.actionTextColor).android);
                    }
                }
                if (options.backgroundColor) {
                    _this._setBackgroundColor(options.backgroundColor);
                }
                var callback = new _this._snackCallback();
                callback.resolve = resolve;
                _this._snackbar.setCallback(callback);
                _this._snackbar.show();
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    SnackBar.prototype.dismiss = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this._snackbar) {
                try {
                    _this._snackbar.dismiss();
                    setTimeout(function () {
                        resolve({
                            action: 'Dismiss',
                            reason: _getReason(3)
                        });
                    }, 200);
                }
                catch (ex) {
                    reject(ex);
                }
            }
            else {
                resolve({
                    action: 'None',
                    message: 'No actionbar to dismiss'
                });
            }
        });
    };
    SnackBar.prototype._setBackgroundColor = function (color) {
        if (color) {
            var sbView = this._snackbar.getView();
            sbView.setBackgroundColor(new color_1.Color(color).android);
        }
    };
    SnackBar.prototype._setTextColor = function (color) {
        if (color) {
            var mainTextView = this._snackbar.getView().findViewById(android.support.design.R.id.snackbar_text);
            mainTextView.setTextColor(new color_1.Color(color).android);
        }
    };
    return SnackBar;
}());
exports.SnackBar = SnackBar;
function _getReason(value) {
    if (value === 1) {
        return 'Action';
    }
    else if (value === 4) {
        return 'Consecutive';
    }
    else if (value === 3) {
        return 'Manual';
    }
    else if (value === 0) {
        return 'Swipe';
    }
    else if (value === 2) {
        return 'Timeout';
    }
}
//# sourceMappingURL=snackbar.js.map