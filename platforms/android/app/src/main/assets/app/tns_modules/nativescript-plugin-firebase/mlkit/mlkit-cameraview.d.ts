import { MLKitCameraView as MLKitCameraViewBase } from "./mlkit-cameraview-common";
export declare abstract class MLKitCameraView extends MLKitCameraViewBase {
    private surfaceView;
    private bytesToByteBuffer;
    private pendingFrameData;
    protected rotation: any;
    protected lastVisionImage: any;
    private detector;
    private camera;
    disposeNativeView(): void;
    createNativeView(): Object;
    private hasCamera();
    private initView();
    protected abstract createDetector(): any;
    protected abstract createSuccessListener(): any;
    private createFailureListener();
    private generateValidPreviewSizeList(camera);
    private selectSizePair(camera, desiredWidth, desiredHeight);
    private createPreviewBuffer(previewSize);
    private setRotation(camera, parameters, cameraId);
}
