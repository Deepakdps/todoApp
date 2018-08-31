"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var utils = require("tns-core-modules/utils/utils");
var mlkit_cameraview_common_1 = require("./mlkit-cameraview-common");
var CAMERA_PERMISSION_REQUEST_CODE = 502;
var SizePair = /** @class */ (function () {
    function SizePair() {
    }
    return SizePair;
}());
// TODO pause/resume handling
var MLKitCameraView = /** @class */ (function (_super) {
    __extends(MLKitCameraView, _super);
    function MLKitCameraView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bytesToByteBuffer = new Map();
        _this.pendingFrameData = null;
        return _this;
    }
    MLKitCameraView.prototype.disposeNativeView = function () {
        _super.prototype.disposeNativeView.call(this);
        this.surfaceView = null;
        if (this.camera != null) {
            this.camera.stopPreview();
            this.camera.setPreviewCallbackWithBuffer(null);
            try {
                this.camera.setPreviewDisplay(null);
            }
            catch (e) {
                console.log("Error cleaning up the ML Kit camera (you can probably ignore this): " + e);
            }
            this.camera.release();
            this.camera = null;
        }
        this.bytesToByteBuffer.clear();
        if (this.detector) {
            this.detector.close();
            this.detector = undefined;
        }
        this.lastVisionImage = null;
        this.pendingFrameData = null;
    };
    MLKitCameraView.prototype.createNativeView = function () {
        var _this = this;
        var v = _super.prototype.createNativeView.call(this);
        if (this.hasCamera()) {
            var permissionCb_1 = function (args) {
                if (args.requestCode === CAMERA_PERMISSION_REQUEST_CODE) {
                    application.android.off(application.AndroidApplication.activityRequestPermissionsEvent, permissionCb_1);
                    for (var i = 0; i < args.permissions.length; i++) {
                        if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_DENIED) {
                            console.log("Camera permission denied");
                            return;
                        }
                    }
                    _this.initView();
                }
            };
            // grab the permission dialog result
            application.android.on(application.AndroidApplication.activityRequestPermissionsEvent, permissionCb_1);
            // invoke the permission dialog
            android.support.v4.app.ActivityCompat.requestPermissions(application.android.foregroundActivity || application.android.startActivity, [android.Manifest.permission.CAMERA], CAMERA_PERMISSION_REQUEST_CODE);
        }
        else {
            console.log("There's no Camera on this device :(");
        }
        return v;
    };
    MLKitCameraView.prototype.hasCamera = function () {
        return !!utils.ad
            .getApplicationContext()
            .getPackageManager()
            .hasSystemFeature("android.hardware.camera");
    };
    MLKitCameraView.prototype.initView = function () {
        // if (this.preferFrontCamera) {
        // this._reader.switchDeviceInput();
        // }
        var _this = this;
        this.surfaceView = new android.view.SurfaceView(utils.ad.getApplicationContext());
        this.nativeView.addView(this.surfaceView);
        // Note that surfacview callbacks didn't see to work, so using a good old timeout (https://github.com/firebase/quickstart-android/blob/0f4c86877fc5f771cac95797dffa8bd026dd9dc7/mlkit/app/src/main/java/com/google/firebase/samples/apps/mlkit/CameraSourcePreview.java#L47)
        setTimeout(function () {
            var surfaceHolder = _this.surfaceView.getHolder();
            var cameraFacingRequested = android.hardware.Camera.CameraInfo.CAMERA_FACING_BACK;
            var cameraInfo = new android.hardware.Camera.CameraInfo();
            var requestedCameraId = android.hardware.Camera.CameraInfo.CAMERA_FACING_BACK; // use this as the default
            for (var i = 0; i < android.hardware.Camera.getNumberOfCameras(); ++i) {
                android.hardware.Camera.getCameraInfo(i, cameraInfo);
                if (cameraInfo.facing === cameraFacingRequested) {
                    requestedCameraId = i;
                    break;
                }
            }
            _this.camera = android.hardware.Camera.open(requestedCameraId);
            var sizePair = _this.selectSizePair(_this.camera, 800, 600); // TODO based on wrapping frame
            if (!sizePair) {
                console.log("Could not find suitable preview size.");
                return;
            }
            var pictureSize = sizePair.pictureSize;
            var previewSize = sizePair.previewSize;
            var parameters = _this.camera.getParameters();
            if (pictureSize) {
                parameters.setPictureSize(pictureSize.width, pictureSize.height);
            }
            parameters.setPreviewSize(previewSize.width, previewSize.height);
            parameters.setPreviewFormat(android.graphics.ImageFormat.NV21);
            _this.setRotation(_this.camera, parameters, requestedCameraId);
            if (parameters.getSupportedFocusModes().contains(android.hardware.Camera.Parameters.FOCUS_MODE_CONTINUOUS_VIDEO)) {
                parameters.setFocusMode(android.hardware.Camera.Parameters.FOCUS_MODE_CONTINUOUS_VIDEO);
                console.log("Camera auto focus is supported.");
            }
            else {
                console.log("Camera auto focus is not supported on this device.");
            }
            // TODO this setter seems odd, but it's part of the example: https://github.com/firebase/quickstart-android/blob/0f4c86877fc5f771cac95797dffa8bd026dd9dc7/mlkit/app/src/main/java/com/google/firebase/samples/apps/mlkit/CameraSource.java#L312
            _this.camera.setParameters(parameters);
            _this.detector = _this.createDetector();
            var onSuccessListener = _this.createSuccessListener();
            var onFailureListener = _this.createFailureListener();
            var metadata = new com.google.firebase.ml.vision.common.FirebaseVisionImageMetadata.Builder()
                .setFormat(com.google.firebase.ml.vision.common.FirebaseVisionImageMetadata.IMAGE_FORMAT_NV21)
                .setWidth(previewSize.width)
                .setHeight(previewSize.height)
                .setRotation(_this.rotation)
                .build();
            var throttle = 0;
            _this.camera.setPreviewCallbackWithBuffer(new android.hardware.Camera.PreviewCallback({
                onPreviewFrame: function (byteArray, camera) {
                    if (_this.pendingFrameData !== null) {
                        camera.addCallbackBuffer(_this.pendingFrameData.array());
                        _this.pendingFrameData = null;
                    }
                    if (!_this.bytesToByteBuffer.has(byteArray)) {
                        console.log("Skipping frame");
                        return;
                    }
                    _this.pendingFrameData = _this.bytesToByteBuffer.get(byteArray);
                    if (throttle++ % _this.processEveryNthFrame !== 0) {
                        return;
                    }
                    var data = _this.pendingFrameData;
                    // pendingFrameData = null;
                    _this.lastVisionImage = com.google.firebase.ml.vision.common.FirebaseVisionImage.fromByteBuffer(data, metadata);
                    _this.detector
                        .detectInImage(_this.lastVisionImage)
                        .addOnSuccessListener(onSuccessListener)
                        .addOnFailureListener(onFailureListener);
                }
            }));
            _this.camera.addCallbackBuffer(_this.createPreviewBuffer(previewSize));
            _this.camera.addCallbackBuffer(_this.createPreviewBuffer(previewSize));
            _this.camera.addCallbackBuffer(_this.createPreviewBuffer(previewSize));
            _this.camera.addCallbackBuffer(_this.createPreviewBuffer(previewSize));
            _this.camera.setPreviewDisplay(surfaceHolder);
            _this.camera.startPreview();
        }, 500); // TODO 500 works fine on my device, but would be wise to explore the boundaries
    };
    MLKitCameraView.prototype.createFailureListener = function () {
        return new com.google.android.gms.tasks.OnFailureListener({
            onFailure: function (exception) { return console.log(exception.getMessage()); }
        });
    };
    ;
    MLKitCameraView.prototype.generateValidPreviewSizeList = function (camera) {
        var parameters = camera.getParameters();
        var supportedPreviewSizes = parameters.getSupportedPreviewSizes();
        var supportedPictureSizes = parameters.getSupportedPictureSizes();
        var validPreviewSizes = [];
        for (var i = 0; i < supportedPreviewSizes.size(); i++) {
            var previewSize = supportedPreviewSizes.get(i);
            var previewAspectRatio = previewSize.width / previewSize.height;
            // By looping through the picture sizes in order, we favor the higher resolutions.
            // We choose the highest resolution in order to support taking the full resolution
            // picture later.
            for (var j = 0; j < supportedPictureSizes.size(); j++) {
                var pictureSize = supportedPictureSizes.get(j);
                var pictureAspectRatio = pictureSize.width / pictureSize.height;
                if (Math.abs(previewAspectRatio - pictureAspectRatio) < 0.01 /* ASPECT_RATIO_TOLERANCE */) {
                    validPreviewSizes.push({ previewSize: previewSize, pictureSize: pictureSize });
                    break;
                }
            }
        }
        // If there are no picture sizes with the same aspect ratio as any preview sizes, allow all
        // of the preview sizes and hope that the camera can handle it.  Probably unlikely, but we
        // still account for it.
        if (validPreviewSizes.length === 0) {
            console.log("No preview sizes have a corresponding same-aspect-ratio picture size");
            for (var i = 0; i < supportedPreviewSizes.size(); i++) {
                var previewSize = supportedPreviewSizes.get(i);
                // The null picture size will let us know that we shouldn't set a picture size.
                validPreviewSizes.push({ previewSize: previewSize, pictureSize: null });
            }
        }
        return validPreviewSizes;
    };
    MLKitCameraView.prototype.selectSizePair = function (camera, desiredWidth, desiredHeight) {
        var validPreviewSizes = this.generateValidPreviewSizeList(camera);
        // The method for selecting the best size is to minimize the sum of the differences between
        // the desired values and the actual values for width and height.  This is certainly not the
        // only way to select the best size, but it provides a decent tradeoff between using the
        // closest aspect ratio vs. using the closest pixel area.
        var selectedPair = null;
        var minDiff = java.lang.Integer.MAX_VALUE;
        for (var i = 0; i < validPreviewSizes.length; i++) {
            var sizePair = validPreviewSizes[i];
            var size = sizePair.previewSize;
            var diff = Math.abs(size.width - desiredWidth) + Math.abs(size.height - desiredHeight);
            if (diff < minDiff) {
                selectedPair = sizePair;
                minDiff = diff;
            }
        }
        return selectedPair;
    };
    MLKitCameraView.prototype.createPreviewBuffer = function (previewSize) {
        var bitsPerPixel = android.graphics.ImageFormat.getBitsPerPixel(android.graphics.ImageFormat.NV21);
        var sizeInBits = previewSize.height * previewSize.width * bitsPerPixel;
        var bufferSize = Math.ceil(sizeInBits / 8.0) + 1;
        var byteArray = Array.create('byte', bufferSize);
        var buffer = java.nio.ByteBuffer.wrap(byteArray);
        if (!buffer.hasArray() || (buffer.array() !== byteArray)) {
            console.log("Failed to create valid buffer for camera source.");
        }
        else {
            this.bytesToByteBuffer.set(byteArray, buffer);
            return byteArray;
        }
    };
    MLKitCameraView.prototype.setRotation = function (camera, parameters, cameraId) {
        var windowManager = (application.android.foregroundActivity || application.android.startActivity).getSystemService(android.content.Context.WINDOW_SERVICE);
        var degrees = 0;
        var deviceRotation = windowManager.getDefaultDisplay().getRotation();
        switch (deviceRotation) {
            case android.view.Surface.ROTATION_0:
                degrees = 0;
                break;
            case android.view.Surface.ROTATION_90:
                degrees = 90;
                break;
            case android.view.Surface.ROTATION_180:
                degrees = 180;
                break;
            case android.view.Surface.ROTATION_270:
                degrees = 270;
                break;
            default:
                console.log("Bad rotation value: " + deviceRotation);
        }
        var cameraInfo = new android.hardware.Camera.CameraInfo();
        android.hardware.Camera.getCameraInfo(cameraId, cameraInfo);
        var angle;
        var displayAngle;
        if (cameraInfo.facing === android.hardware.Camera.CameraInfo.CAMERA_FACING_FRONT) {
            angle = (cameraInfo.orientation + degrees) % 360;
            displayAngle = (360 - angle) % 360; // compensate for it being mirrored
        }
        else { // back-facing
            angle = (cameraInfo.orientation - degrees + 360) % 360;
            displayAngle = angle;
        }
        // This corresponds to the rotation constants.
        this.rotation = angle / 90;
        camera.setDisplayOrientation(displayAngle);
        parameters.setRotation(angle);
    };
    return MLKitCameraView;
}(mlkit_cameraview_common_1.MLKitCameraView));
exports.MLKitCameraView = MLKitCameraView;
