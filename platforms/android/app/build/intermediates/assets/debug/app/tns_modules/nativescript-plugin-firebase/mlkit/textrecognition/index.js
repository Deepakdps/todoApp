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
        return com.google.firebase.ml.vision.FirebaseVision.getInstance().getVisionTextDetector();
    };
    MLKitTextRecognition.prototype.createSuccessListener = function () {
        var _this = this;
        return new com.google.android.gms.tasks.OnSuccessListener({
            onSuccess: function (textBlocks) {
                if (textBlocks.getBlocks().size() > 0) {
                    _this.notify({
                        eventName: MLKitTextRecognition.scanResultEvent,
                        object: _this,
                        value: getOnDeviceResult(textBlocks.getBlocks())
                    });
                }
            }
        });
    };
    return MLKitTextRecognition;
}(textrecognition_common_1.MLKitTextRecognition));
exports.MLKitTextRecognition = MLKitTextRecognition;
function boundingBoxToBounds(rect) {
    return {
        origin: {
            x: rect.left,
            y: rect.top
        },
        size: {
            width: rect.width(),
            height: rect.height()
        }
    };
}
// see https://github.com/firebase/quickstart-android/blob/0f4c86877fc5f771cac95797dffa8bd026dd9dc7/mlkit/app/src/main/java/com/google/firebase/samples/apps/mlkit/textrecognition/TextRecognitionProcessor.java#L62
function getOnDeviceResult(blocks) {
    var blks = [];
    for (var i = 0; i < blocks.size(); i++) {
        var block = blocks.get(i);
        var lines = block.getLines();
        var lns = [];
        for (var j = 0; j < lines.size(); j++) {
            var line = lines.get(j);
            var elements = line.getElements();
            var elms = [];
            for (var k = 0; k < elements.size(); k++) {
                var element = elements.get(k);
                elms.push({
                    text: element.getText(),
                    bounds: boundingBoxToBounds(element.getBoundingBox())
                });
            }
            lns.push({
                text: line.getText(),
                bounds: boundingBoxToBounds(line.getBoundingBox()),
                elements: elms
            });
        }
        blks.push({
            text: block.getText(),
            bounds: boundingBoxToBounds(block.getBoundingBox()),
            lines: lns
        });
    }
    return {
        blocks: blks
    };
}
function recognizeTextOnDevice(options) {
    return new Promise(function (resolve, reject) {
        try {
            var firebaseVisionTextDetector_1 = com.google.firebase.ml.vision.FirebaseVision.getInstance().getVisionTextDetector();
            var onSuccessListener = new com.google.android.gms.tasks.OnSuccessListener({
                onSuccess: function (textBlocks) {
                    resolve(getOnDeviceResult(textBlocks.getBlocks()));
                    firebaseVisionTextDetector_1.close();
                }
            });
            var onFailureListener = new com.google.android.gms.tasks.OnFailureListener({
                onFailure: function (exception) { return reject(exception.getMessage()); }
            });
            firebaseVisionTextDetector_1
                .detectInImage(getImage(options))
                .addOnSuccessListener(onSuccessListener)
                .addOnFailureListener(onFailureListener);
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
            var cloudDetectorOptions = new com.google.firebase.ml.vision.cloud.FirebaseVisionCloudDetectorOptions.Builder()
                .setModelType(options.modelType === "latest" ? com.google.firebase.ml.vision.cloud.FirebaseVisionCloudDetectorOptions.LATEST_MODEL : com.google.firebase.ml.vision.cloud.FirebaseVisionCloudDetectorOptions.STABLE_MODEL)
                .setMaxResults(options.maxResults || 10)
                .build();
            var firebaseVisionCloudTextDetector_1 = com.google.firebase.ml.vision.FirebaseVision.getInstance().getVisionCloudTextDetector(cloudDetectorOptions);
            var onSuccessListener = new com.google.android.gms.tasks.OnSuccessListener({
                onSuccess: function (firebaseVisionCloudText) {
                    resolve({
                        text: firebaseVisionCloudText ? firebaseVisionCloudText.getText() : null
                    });
                    firebaseVisionCloudTextDetector_1.close();
                }
            });
            var onFailureListener = new com.google.android.gms.tasks.OnFailureListener({
                onFailure: function (exception) { return reject(exception.getMessage()); }
            });
            firebaseVisionCloudTextDetector_1
                .detectInImage(getImage(options))
                .addOnSuccessListener(onSuccessListener)
                .addOnFailureListener(onFailureListener);
        }
        catch (ex) {
            console.log("Error in firebase.mlkit.recognizeTextCloud: " + ex);
            reject(ex);
        }
    });
}
exports.recognizeTextCloud = recognizeTextCloud;
function getImage(options) {
    var image = options.image instanceof image_source_1.ImageSource ? options.image.android : options.image.imageSource.android;
    return com.google.firebase.ml.vision.common.FirebaseVisionImage.fromBitmap(image);
}
