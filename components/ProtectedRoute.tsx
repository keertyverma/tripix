import { useRouter } from "next/router";
import { useEffect, useState, ReactNode } from "react";

import Loader from "./ui/Loader";
import { authService } from "@/services";

interface Props {
  children: ReactNode;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

const ProtectedRoute = ({ children }: Props) => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    // get currently logged in user data
    authService
      .getCurrentUser()
      .then((res) => {
        setUser({ id: res.$id, name: res.name, email: res.email });
      })
      .catch((err) => {
        router.push("/login");
      });
  }, [router, user]);

  if (!user) return <Loader />;

  return (
    <>
      <div>Hello - {user.name}</div>
      {children}
    </>
  );
};

export default ProtectedRoute;
