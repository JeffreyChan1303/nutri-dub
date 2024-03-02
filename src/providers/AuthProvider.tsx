import { FIREBASE_AUTH } from '@/firebase.config';
import { User, onAuthStateChanged } from 'firebase/auth';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

type AuthData = {
  loading: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthData>({
  loading: false,
  user: null
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
