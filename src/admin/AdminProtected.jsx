import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config";
import CenterLoader from "../Components/Loader/CenterLoader";


export default function AdminProtected({ children }) {
    const [checking, setChecking] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currUser) => {
            setUser(currUser);
            setChecking(false); // 🔥 auth check complete
        });

        return unsub;
    }, []);

    // ⏳ auth check still running -> show loader
    if (checking) {
        return <CenterLoader />;
    }

    // ❌ user not logged in -> go to admin login page
    if (!user) {
        return <Navigate to="/admin" />;
    }

    // ✔️ logged in -> allow access
    return children;
}
