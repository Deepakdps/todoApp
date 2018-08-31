import { MLKitRecognizeTextOnDeviceOptions, MLKitRecognizeTextCloudOptions, MLKitRecognizeTextOnDeviceResult, MLKitRecognizeTextCloudResult } from "./";
import { MLKitTextRecognition as MLKitTextRecognitionBase } from "./textrecognition-common";
export declare class MLKitTextRecognition extends MLKitTextRecognitionBase {
    protected createDetector(): any;
    protected createSuccessListener(): any;
    protected rotateRecording(): boolean;
}
export declare function recognizeTextOnDevice(options: MLKitRecognizeTextOnDeviceOptions): Promise<MLKitRecognizeTextOnDeviceResult>;
export declare function recognizeTextCloud(options: MLKitRecognizeTextCloudOptions): Promise<MLKitRecognizeTextCloudResult>;
