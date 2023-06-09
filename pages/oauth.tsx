import { useAuth } from "@/providers/auth";
import { authService } from "@/services";
import { useRouter } from "next/router";
import { useEffect } from "react";

const OAuth = () => {
  // When user sign-in using oauth then set current logged in user in context
  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((res) => {
        setUser({ id: res.$id, name: res.name, email: res.email });
        router.push("/dashboard");
      })
      .catch((err) => router.push("/login"));
  }, []);

  return null;
};

export default OAuth;
