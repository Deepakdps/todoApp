"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var image_source_1 = require("tns-core-modules/image-source");
var facedetection_common_1 = require("./facedetection-common");
var utils_1 = require("tns-core-modules/utils/utils");
var MLKitFaceDetection = /** @class */ (function (_super) {
    __extends(MLKitFaceDetection, _super);
    function MLKitFaceDetection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MLKitFaceDetection.prototype.createDetector = function () {
        return getDetector({
            detectionMode: this.detectionMode,
            enableFaceTracking: this.enableFaceTracking,
            minimumFaceSize: this.minimumFaceSize
        });
    };
    MLKitFaceDetection.prototype.createSuccessListener = function () {
        var _this = this;
        return function (faces, error) {
            if (error !== null) {
                console.log(error.localizedDescription);
            }
            else if (faces !== null && faces.count > 0) {
                var result = {
                    faces: []
                };
                for (var i = 0, l = faces.count; i < l; i++) {
                    var face = faces.objectAtIndex(i);
                    console.log(">> face: " + face);
                    result.faces.push({
                        smilingProbability: face.hasSmilingProbability ? face.smilingProbability : undefined,
                        leftEyeOpenProbability: face.hasLeftEyeOpenProbability ? face.leftEyeOpenProbability : undefined,
                        rightEyeOpenProbability: face.hasRightEyeOpenProbability ? face.rightEyeOpenProbability : undefined,
                        trackingId: face.hasTrackingID ? face.trackingID : undefined
                    });
                }
                console.log(">>> notify " + MLKitFaceDetection.scanResultEvent + " with " + JSON.stringify(result.faces));
                _this.notify({
                    eventName: MLKitFaceDetection.scanResultEvent,
                    object: _this,
                    value: result
                });
            }
        };
    };
    MLKitFaceDetection.prototype.rotateRecording = function () {
        return false;
    };
    MLKitFaceDetection.prototype.getVisionOrientation = function (imageOrientation) {
        if (imageOrientation === 0 /* Up */ && !utils_1.ios.isLandscape()) {
            return 6 /* RightTop */;
        }
        else {
            return _super.prototype.getVisionOrientation.call(this, imageOrientation);
        }
    };
    return MLKitFaceDetection;
}(facedetection_common_1.MLKitFaceDetection));
exports.MLKitFaceDetection = MLKitFaceDetection;
function getDetector(options) {
    var firVision = FIRVision.vision();
    var firOptions = FIRVisionFaceDetectorOptions.new();
    firOptions.modeType = options.detectionMode === "accurate" ? 2 /* Accurate */ : 1 /* Fast */;
    firOptions.landmarkType = 2 /* All */; // TODO make configurable
    firOptions.classificationType = 2 /* All */; // TODO make configurable
    firOptions.minFaceSize = options.minimumFaceSize;
    firOptions.isTrackingEnabled = options.enableFaceTracking === true;
    return firVision.faceDetectorWithOptions(firOptions);
}
// TODO somehow this function doesn't work.. probably because of the passed image, but I can't find the cause.. the live camera version works great tho
function detectFacesOnDevice(options) {
    return new Promise(function (resolve, reject) {
        try {
            var faceDetector = getDetector(options);
            faceDetector.detectInImageCompletion(getImage(options), function (faces, error) {
                if (error !== null) {
                    reject(error.localizedDescription);
                }
                else if (faces !== null) {
                    var result = {
                        faces: []
                    };
                    for (var i = 0, l = faces.count; i < l; i++) {
                        var face = faces.objectAtIndex(i);
                        result.faces.push({
                            smilingProbability: face.hasSmilingProbability ? face.smilingProbability : undefined,
                            leftEyeOpenProbability: face.hasLeftEyeOpenProbability ? face.leftEyeOpenProbability : undefined,
                            rightEyeOpenProbability: face.hasRightEyeOpenProbability ? face.rightEyeOpenProbability : undefined,
                            trackingId: face.hasTrackingID ? face.trackingID : undefined
                        });
                    }
                    resolve(result);
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.mlkit.detectFaces: " + ex);
            reject(ex);
        }
    });
}
exports.detectFacesOnDevice = detectFacesOnDevice;
function getImage(options) {
    var image = options.image instanceof image_source_1.ImageSource ? options.image.ios : options.image.imageSource.ios;
    return FIRVisionImage.alloc().initWithImage(image);
}
