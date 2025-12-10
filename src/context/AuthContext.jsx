import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config.js"
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import {
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const googleProvider = new GoogleAuthProvider();

    const playStoreLink =
        "https://play.google.com/store/apps/details?id=com.kautilyalaw.android";

    // 🔹 Redirect only if first time login
    const redirectToAppFirstTime = () => {
        const firstLogin = localStorage.getItem("firstLoginDone");

        if (!firstLogin) {
            localStorage.setItem("firstLoginDone", "true");

            setLoading(true); // loader on
            setTimeout(() => {
                window.location.href = playStoreLink;
            }, 2000);
        }
    };

    function getInitials(fullName) {
        if (!fullName) return "";

        const parts = fullName.trim().split(" ");

        const firstLetter = parts[0]?.charAt(0).toUpperCase() || "";
        const lastLetter = parts[parts.length - 1]?.charAt(0).toUpperCase() || "";

        return firstLetter + lastLetter;
    }

    // 🔹 GOOGLE LOGIN
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // 🔥 Check if user exists in Firestore, if not create
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnap = await getDocs(collection(db, 'users'));

            // Check if user document exists
            let userExists = false;
            userDocSnap.forEach((doc) => {
                if (doc.id === user.uid) {
                    userExists = true;
                }
            });

            // If user doesn't exist, create new document
            if (!userExists) {
                try {
                    await setDoc(userDocRef, {
                        uid: user.uid,
                        fullName: user.displayName || 'Google User',
                        email: user.email,
                        createdAt: new Date(),
                        role: 'user',
                        photoURL: user.photoURL || null,
                        emailVerified: user.emailVerified,
                        provider: 'google'
                    });
                } catch (firestoreError) {
                    console.error("Error saving Google user to Firestore:", firestoreError);
                }
            }

            redirectToAppFirstTime();
            return { success: true };

        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    // 🔹 EMAIL LOGIN
    const loginWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            redirectToAppFirstTime();
            return { success: true };

        } catch (err) {
            let errorMessage = "Login failed";

            if (err.code === 'auth/user-not-found') {
                errorMessage = "No account found with this email";
            } else if (err.code === 'auth/wrong-password') {
                errorMessage = "Incorrect password";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address";
            } else if (err.code === 'auth/user-disabled') {
                errorMessage = "This account has been disabled";
            }

            return { success: false, error: errorMessage };
        }
    };

    // 🔹 REGISTER USER - FIXED VERSION WITH FIRESTORE
    const registerUser = async (email, password, fullName) => {
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update user profile with display name
            await updateProfile(userCredential.user, {
                displayName: fullName
            });

            // 🔥 Save user data to Firestore 'users' collection
            try {
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    uid: userCredential.user.uid,
                    fullName: fullName,
                    email: email,
                    createdAt: new Date(),
                    role: 'user', // default role
                    photoURL: userCredential.user.photoURL || null,
                    emailVerified: userCredential.user.emailVerified
                });
            } catch (firestoreError) {
                console.error("Error saving user to Firestore:", firestoreError);
                // Continue even if Firestore save fails
            }

            // 🔥 FIX: Redirect after successful signup
            redirectToAppFirstTime();

            return { success: true };
        } catch (error) {
            let errorMessage = "Registration failed";

            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already registered";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "Password must be at least 6 characters";
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMessage = "Email/password sign-up is not enabled";
            }

            return { success: false, error: errorMessage };
        }
    };

    // 🔹 LOGOUT
    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem("firstLoginDone");
    };

    // 🔹 AUTH LISTENING
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginWithGoogle,
                loginWithEmail,
                registerUser,
                logout,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);