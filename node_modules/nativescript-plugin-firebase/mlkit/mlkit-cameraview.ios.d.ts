import { MLKitCameraView as MLKitCameraViewBase } from "./mlkit-cameraview-common";
export declare abstract class MLKitCameraView extends MLKitCameraViewBase {
    private captureSession;
    private captureDevice;
    private previewLayer;
    private cameraView;
    disposeNativeView(): void;
    createNativeView(): Object;
    private canUseCamera();
    private initView();
    private rotateOnOrientationChange(args);
    onLayout(left: number, top: number, right: number, bottom: number): void;
    abstract rotateRecording(): boolean;
    getVisionOrientation(imageOrientation: UIImageOrientation): FIRVisionDetectorImageOrientation;
    abstract createDetector(): any;
    abstract createSuccessListener(): any;
}
