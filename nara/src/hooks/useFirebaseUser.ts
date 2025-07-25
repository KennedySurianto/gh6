import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase"; // <-- Your Firebase initialization file

export default function useFirebaseUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // `null` if not logged in
    });

    return () => unsubscribe();
  }, []);

  return user;
}
