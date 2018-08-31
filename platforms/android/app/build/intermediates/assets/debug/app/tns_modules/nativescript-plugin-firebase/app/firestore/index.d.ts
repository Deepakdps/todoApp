import * as firebase from "../../firebase";
export declare module firestore {
    class Firestore {
        collection(collectionPath: string): firebase.firestore.CollectionReference;
        FieldValue(): firebase.firestore.FieldValue;
        GeoPoint(latitude: number, longitude: number): firebase.firestore.GeoPoint;
    }
}
