import { authService } from "@/services";
import { databaseService } from "@/services/databaseService";
import { AppwriteException } from "appwrite";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: false,
});

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    setLoading(true);

    try {
      const res = await authService.getCurrentUser();
      const userId = res.$id;
      const name = res.name;

      setUser({ id: userId, name: name, email: res.email });

      // check and create user profile
      try {
        await databaseService.createProfile({
          name,
          userId,
        });
      } catch (err) {
        const appWriteError = err as AppwriteException;
        if (appWriteError.type === "document_already_exists") {
          console.log("profile exists");
        }
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
