import * as textrecognition from "./textrecognition";
import * as barcodescanning from "./barcodescanning";
import * as facedetection from "./facedetection";
import * as imagelabeling from "./imagelabeling";
import * as landmarkrecognition from "./landmarkrecognition";
import { ImageSource } from "tns-core-modules/image-source";
import { Image } from "tns-core-modules/ui/image";
export interface MLKitOptions {
    image?: Image | ImageSource;
}
export declare type MLKitCloudModelType = "stable" | "latest";
export interface MLKitCloudOptions extends MLKitOptions {
    /**
     * Defaults to "stable".
     */
    modelType?: MLKitCloudModelType;
    /**
     * Defaults to 10.
     */
    maxResults?: number;
}
export interface MLKitResult {
}
export declare class MLKitCameraView {
}
export { textrecognition, barcodescanning, facedetection, imagelabeling, landmarkrecognition };
