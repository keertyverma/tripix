import { useRouter } from "next/router";
import { useEffect, ReactNode } from "react";

import Loader from "./ui/Loader";
import { useAuth } from "@/providers/auth";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading]);

  if (!user) return <Loader />;

  return <>{children}</>;
};

export default ProtectedRoute;
