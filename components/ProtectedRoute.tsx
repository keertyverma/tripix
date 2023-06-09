import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";

import Loader from "./ui/Loader";
import { useAuth } from "@/providers/auth";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  if (!user) return <Loader />;

  return (
    <>
      <div>Hello - {user?.name}</div>
      {children}
    </>
  );
};

export default ProtectedRoute;
