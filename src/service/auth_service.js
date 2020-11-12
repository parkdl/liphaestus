import { firebaseAuth, googleProvider } from "./firebase";

class AuthService {
    emailSignUp(email, password) {
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
    }

    emailSignIn(email, password) {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    }

    googleLogin() {
        const provider = googleProvider;
        return firebaseAuth.signInWithPopup(provider);
    }

    onAuthChange(onUserChanged) {
        firebaseAuth.onAuthStateChanged(user => {
            onUserChanged(user);
        });
    }

    logout() {
        firebaseAuth.signOut();
    }
}

export default AuthService;
