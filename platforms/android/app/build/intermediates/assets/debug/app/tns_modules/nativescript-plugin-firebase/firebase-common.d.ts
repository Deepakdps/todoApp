import { firestore } from "./firebase";
export declare class FieldValue {
    serverTimestamp: () => string;
}
export declare class GeoPoint {
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number);
}
export declare const firebase: any;
export declare class DocumentSnapshot implements firestore.DocumentSnapshot {
    id: string;
    exists: boolean;
    data: () => firestore.DocumentData;
    constructor(id: string, exists: boolean, documentData: firestore.DocumentData);
}
export declare class QuerySnapshot implements firestore.QuerySnapshot {
    docSnapshots: firestore.DocumentSnapshot[];
    forEach(callback: (result: firestore.DocumentSnapshot) => void, thisArg?: any): void;
}
