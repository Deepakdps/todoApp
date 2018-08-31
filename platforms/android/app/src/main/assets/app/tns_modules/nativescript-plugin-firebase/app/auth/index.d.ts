import { FirebaseEmailLinkActionCodeSettings, User } from "../../firebase";
export declare module auth {
    class Auth {
        private authStateChangedHandler;
        currentUser: User;
        onAuthStateChanged(handler: (user: User) => void): void;
        signOut(): Promise<any>;
        signInWithEmailAndPassword(email: string, password: string): Promise<any>;
        sendSignInLinkToEmail(email: string, actionCodeSettings: FirebaseEmailLinkActionCodeSettings): Promise<any>;
        createUserWithEmailAndPassword(email: string, password: string): Promise<User>;
        signInAnonymously(): Promise<any>;
        fetchProvidersForEmail(email: string): Promise<any>;
        fetchSignInMethodsForEmail(email: string): Promise<any>;
    }
}
