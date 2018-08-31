"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var content_view_1 = require("tns-core-modules/ui/content-view");
var properties_1 = require("tns-core-modules/ui/core/properties");
var view_base_1 = require("tns-core-modules/ui/core/view-base");
exports.processEveryNthFrameProperty = new properties_1.Property({
    name: "processEveryNthFrame",
    defaultValue: 10,
});
exports.preferFrontCameraProperty = new properties_1.Property({
    name: "preferFrontCamera",
    defaultValue: false,
    valueConverter: view_base_1.booleanConverter
});
var MLKitCameraView = /** @class */ (function (_super) {
    __extends(MLKitCameraView, _super);
    function MLKitCameraView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MLKitCameraView.prototype[exports.processEveryNthFrameProperty.setNative] = function (value) {
        this.processEveryNthFrame = value;
    };
    MLKitCameraView.prototype[exports.preferFrontCameraProperty.setNative] = function (value) {
        this.preferFrontCamera = value;
    };
    MLKitCameraView.scanResultEvent = "scanResult";
    return MLKitCameraView;
}(content_view_1.ContentView));
exports.MLKitCameraView = MLKitCameraView;
exports.processEveryNthFrameProperty.register(MLKitCameraView);
exports.preferFrontCameraProperty.register(MLKitCameraView);
