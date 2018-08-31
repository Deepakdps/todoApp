import { MLKitRecognizeTextOnDeviceOptions, MLKitRecognizeTextOnDeviceResult } from "./";
import { MLKitTextRecognition as MLKitTextRecognitionBase } from "./textrecognition-common";
import { MLKitRecognizeTextCloudOptions, MLKitRecognizeTextCloudResult } from "./index";
export declare class MLKitTextRecognition extends MLKitTextRecognitionBase {
    protected createDetector(): any;
    protected createSuccessListener(): any;
}
export declare function recognizeTextOnDevice(options: MLKitRecognizeTextOnDeviceOptions): Promise<MLKitRecognizeTextOnDeviceResult>;
export declare function recognizeTextCloud(options: MLKitRecognizeTextCloudOptions): Promise<MLKitRecognizeTextCloudResult>;
