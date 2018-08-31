import { ContentView } from "tns-core-modules/ui/content-view";
import { Property } from "tns-core-modules/ui/core/properties";
export declare const processEveryNthFrameProperty: any;
export declare const preferFrontCameraProperty: Property<MLKitCameraView, boolean>;
export declare abstract class MLKitCameraView extends ContentView {
    static scanResultEvent: string;
    protected lastVisionImage: any;
    protected processEveryNthFrame: number;
    protected preferFrontCamera: boolean;
}
