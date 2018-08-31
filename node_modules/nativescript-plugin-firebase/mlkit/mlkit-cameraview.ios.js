"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("tns-core-modules/utils/utils");
var application = require("tns-core-modules/application");
var mlkit_cameraview_common_1 = require("./mlkit-cameraview-common");
// TODO pause/resume handling
var MLKitCameraView = /** @class */ (function (_super) {
    __extends(MLKitCameraView, _super);
    function MLKitCameraView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MLKitCameraView.prototype.disposeNativeView = function () {
        _super.prototype.disposeNativeView.call(this);
        if (this.captureSession) {
            this.captureSession.stopRunning();
            this.captureSession = undefined;
        }
        this.captureDevice = undefined;
        this.previewLayer = undefined;
        this.cameraView = undefined;
        application.off("orientationChanged");
    };
    MLKitCameraView.prototype.createNativeView = function () {
        var v = _super.prototype.createNativeView.call(this);
        if (this.canUseCamera()) {
            this.initView();
        }
        else {
            console.log("There's no Camera on this device :(");
        }
        return v;
    };
    MLKitCameraView.prototype.canUseCamera = function () {
        try {
            return !!AVCaptureDeviceDiscoverySession &&
                AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo) !== null &&
                NSProcessInfo.processInfo.environment.objectForKey("SIMULATOR_DEVICE_NAME") === null;
        }
        catch (ignore) {
            return false;
        }
    };
    MLKitCameraView.prototype.initView = function () {
        // if (this.preferFrontCamera) {
        // this._reader.switchDeviceInput();
        // }
        // find a suitable device
        this.captureDevice = AVCaptureDeviceDiscoverySession.discoverySessionWithDeviceTypesMediaTypePosition([AVCaptureDeviceTypeBuiltInWideAngleCamera], AVMediaTypeVideo, 1 /* Back */).devices.firstObject;
        // begin the session
        this.captureSession = AVCaptureSession.new();
        this.captureSession.sessionPreset = AVCaptureSessionPreset640x480;
        var captureDeviceInput = AVCaptureDeviceInput.deviceInputWithDeviceError(this.captureDevice);
        this.captureSession.addInput(captureDeviceInput);
        this.previewLayer = AVCaptureVideoPreviewLayer.layerWithSession(this.captureSession);
        this.previewLayer.videoGravity = AVLayerVideoGravityResizeAspectFill;
        if (utils_1.ios.isLandscape()) {
            var deviceOrientation = UIDevice.currentDevice.orientation;
            this.previewLayer.connection.videoOrientation = deviceOrientation === 3 /* LandscapeLeft */ ? 3 /* LandscapeRight */ : 4 /* LandscapeLeft */;
        }
        else {
            this.previewLayer.connection.videoOrientation = 1 /* Portrait */;
        }
        // note that when rotating back to portrait, this event fires very late.. not much we can do I think
        application.off("orientationChanged"); // just making sure it was off
        application.on("orientationChanged", this.rotateOnOrientationChange.bind(this));
        if (this.ios) {
            this.ios.layer.addSublayer(this.previewLayer);
        }
        this.captureSession.startRunning();
        this.cameraView = TNSMLKitCameraView.alloc().initWithCaptureSession(this.captureSession);
        this.cameraView.processEveryXFrames = this.processEveryNthFrame;
        // this orientation is how the captured image is rotated (and shown)
        if (this.rotateRecording()) {
            this.cameraView.imageOrientation = 3 /* Right */;
        }
        this.cameraView.delegate = TNSMLKitCameraViewDelegateImpl.createWithOwnerResultCallbackAndOptions(new WeakRef(this), function (data) { }, {});
    };
    MLKitCameraView.prototype.rotateOnOrientationChange = function (args) {
        if (this.previewLayer) {
            if (args.newValue === "landscape") {
                var deviceOrientation = UIDevice.currentDevice.orientation;
                this.previewLayer.connection.videoOrientation = deviceOrientation === 3 /* LandscapeLeft */ ? 3 /* LandscapeRight */ : 4 /* LandscapeLeft */;
            }
            else if (args.newValue === "portrait") {
                this.previewLayer.connection.videoOrientation = 1 /* Portrait */;
            }
        }
    };
    MLKitCameraView.prototype.onLayout = function (left, top, right, bottom) {
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        if (this.ios && this.canUseCamera()) {
            this.previewLayer.frame = this.ios.layer.bounds;
        }
    };
    MLKitCameraView.prototype.getVisionOrientation = function (imageOrientation) {
        if (imageOrientation === 0 /* Up */) {
            return 1 /* TopLeft */;
        }
        else if (imageOrientation === 1 /* Down */) {
            return 3 /* BottomRight */;
        }
        else if (imageOrientation === 2 /* Left */) {
            return 8 /* LeftBottom */;
        }
        else if (imageOrientation === 3 /* Right */) {
            return 6 /* RightTop */;
        }
        else if (imageOrientation === 4 /* UpMirrored */) {
            return 2 /* TopRight */;
        }
        else if (imageOrientation === 5 /* DownMirrored */) {
            return 4 /* BottomLeft */;
        }
        else if (imageOrientation === 6 /* LeftMirrored */) {
            return 5 /* LeftTop */;
        }
        else if (imageOrientation === 7 /* RightMirrored */) {
            return 7 /* RightBottom */;
        }
        else {
            return 1 /* TopLeft */;
        }
    };
    return MLKitCameraView;
}(mlkit_cameraview_common_1.MLKitCameraView));
exports.MLKitCameraView = MLKitCameraView;
var TNSMLKitCameraViewDelegateImpl = /** @class */ (function (_super) {
    __extends(TNSMLKitCameraViewDelegateImpl, _super);
    function TNSMLKitCameraViewDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TNSMLKitCameraViewDelegateImpl.createWithOwnerResultCallbackAndOptions = function (owner, callback, options) {
        var delegate = TNSMLKitCameraViewDelegateImpl.new();
        delegate.owner = owner;
        delegate.options = options;
        delegate.resultCallback = callback;
        delegate.detector = owner.get().createDetector();
        delegate.onSuccessListener = owner.get().createSuccessListener();
        return delegate;
    };
    TNSMLKitCameraViewDelegateImpl.prototype.cameraDidOutputImage = function (image) {
        if (image) {
            var fIRVisionImage = FIRVisionImage.alloc().initWithImage(image);
            var fIRVisionImageMetadata = FIRVisionImageMetadata.new();
            fIRVisionImageMetadata.orientation = this.owner.get().getVisionOrientation(image.imageOrientation);
            fIRVisionImage.metadata = fIRVisionImageMetadata;
            this.detector.detectInImageCompletion(fIRVisionImage, this.onSuccessListener);
        }
    };
    TNSMLKitCameraViewDelegateImpl.ObjCProtocols = [TNSMLKitCameraViewDelegate];
    return TNSMLKitCameraViewDelegateImpl;
}(NSObject));
