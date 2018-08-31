"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_source_1 = require("tns-core-modules/image-source");
var textrecognition_common_1 = require("./textrecognition-common");
var MLKitTextRecognition = /** @class */ (function (_super) {
    __extends(MLKitTextRecognition, _super);
    function MLKitTextRecognition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MLKitTextRecognition.prototype.createDetector = function () {
        var firVision = FIRVision.vision();
        return firVision.textDetector();
    };
    MLKitTextRecognition.prototype.createSuccessListener = function () {
        var _this = this;
        return function (features, error) {
            if (error !== null) {
                console.log(error.localizedDescription);
            }
            else if (features !== null && features.count > 0) {
                _this.notify({
                    eventName: MLKitTextRecognition.scanResultEvent,
                    object: _this,
                    value: getOnDeviceResult(features)
                });
            }
        };
    };
    MLKitTextRecognition.prototype.rotateRecording = function () {
        return true;
    };
    return MLKitTextRecognition;
}(textrecognition_common_1.MLKitTextRecognition));
exports.MLKitTextRecognition = MLKitTextRecognition;
function getOnDeviceResult(features) {
    var result = {
        blocks: []
    };
    var _loop_1 = function (i, l) {
        var feature = features.objectAtIndex(i);
        var resultFeature = {
            text: feature.text,
            bounds: feature.frame,
            lines: []
        };
        var addLineToResult = function (line) {
            var resultLine = {
                text: feature.text,
                bounds: line.frame,
                elements: []
            };
            for (var a = 0, m = line.elements.count; a < m; a++) {
                var element = line.elements.objectAtIndex(a);
                resultLine.elements.push({
                    text: element.text,
                    bounds: element.frame,
                });
            }
            resultFeature.lines.push(resultLine);
        };
        if (feature instanceof FIRVisionTextBlock) {
            var textBlock = feature;
            for (var j = 0, k = textBlock.lines.count; j < k; j++) {
                addLineToResult(textBlock.lines.objectAtIndex(j));
            }
        }
        if (feature instanceof FIRVisionTextLine) {
            addLineToResult(feature);
        }
        result.blocks.push(resultFeature);
    };
    for (var i = 0, l = features.count; i < l; i++) {
        _loop_1(i, l);
    }
    return result;
}
function recognizeTextOnDevice(options) {
    return new Promise(function (resolve, reject) {
        try {
            var firVision = FIRVision.vision();
            var textDetector = firVision.textDetector();
            textDetector.detectInImageCompletion(getImage(options), function (features, error) {
                if (error !== null) {
                    reject(error.localizedDescription);
                }
                else if (features !== null) {
                    resolve(getOnDeviceResult(features));
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.mlkit.recognizeTextOnDevice: " + ex);
            reject(ex);
        }
    });
}
exports.recognizeTextOnDevice = recognizeTextOnDevice;
function recognizeTextCloud(options) {
    return new Promise(function (resolve, reject) {
        try {
            var fIRVisionCloudDetectorOptions = FIRVisionCloudDetectorOptions.new();
            fIRVisionCloudDetectorOptions.modelType = options.modelType === "latest" ? 1 /* Latest */ : 0 /* Stable */;
            fIRVisionCloudDetectorOptions.maxResults = options.maxResults || 10;
            var firVision = FIRVision.vision();
            var textDetector = firVision.cloudTextDetectorWithOptions(fIRVisionCloudDetectorOptions);
            textDetector.detectInImageCompletion(getImage(options), function (cloudText, error) {
                console.log(">>> recognizeTextCloud error? " + error + ", cloudText? " + cloudText);
                if (error !== null) {
                    reject(error.localizedDescription);
                }
                else if (cloudText !== null) {
                    console.log(">>> recognizeTextCloud result: " + cloudText);
                    resolve({
                        text: cloudText.text
                    });
                }
                else {
                    reject("Unknown error :'(");
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.mlkit.recognizeTextCloud: " + ex);
            reject(ex);
        }
    });
}
exports.recognizeTextCloud = recognizeTextCloud;
function getImage(options) {
    var image = options.image instanceof image_source_1.ImageSource ? options.image.ios : options.image.imageSource.ios;
    return FIRVisionImage.alloc().initWithImage(image);
}
