import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export interface IAuthUser {
  email: string;
  photoURL: string;
  displayName: string;
  uid: string;
  accessToken: string;
}

export interface AuthContextType {
  user: IAuthUser | null;
  authLoaded: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginError: string | null;
  setLoginError: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authLoaded: false,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  registerWithEmail: async () => {},
  loginWithEmail: async () => {},
  loginError: null,
  setLoginError: () => {},
});

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [authLoaded, setLoaded] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        const authUser: IAuthUser = {
          email: u.email!,
          photoURL: u.photoURL || "",
          displayName: u.displayName || "",
          uid: u.uid,
          accessToken: (u as any).accessToken,
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoaded(true);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = React.useCallback(async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      toast.success("Successfully signed in with Google!");
      navigate("/settings");
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  }, [navigate]);

  const signOut = React.useCallback(async () => {
    await auth.signOut();
    navigate("/");
  }, [navigate]);

  const registerWithEmail = React.useCallback(
    async (email: string, password: string) => {
      try {
        setLoginError(null);
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Registration successful!");
        navigate("/settings");
      } catch (error: any) {
        setLoginError(error.message);
        toast.error(`Registration failed: ${error.message}`);
      }
    },
    [navigate]
  );

  const loginWithEmail = React.useCallback(
    async (email: string, password: string) => {
      try {
        setLoginError(null);
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful!");
        navigate("/settings");
      } catch (error: any) {
        setLoginError(error.message);
        toast.error(`Login failed: ${error.message}`);
      }
    },
    [navigate]
  );

  const contextValue: AuthContextType = React.useMemo(
    () => ({
      user,
      authLoaded,
      signInWithGoogle,
      signOut,
      registerWithEmail,
      loginWithEmail,
      loginError,
      setLoginError,
    }),
    [
      user,
      authLoaded,
      signInWithGoogle,
      signOut,
      registerWithEmail,
      loginWithEmail,
      loginError,
      setLoginError,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
