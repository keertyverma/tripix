import { authService } from "@/services";
import { useRouter } from "next/router";
import React from "react";

import { useAuth } from "@/providers/auth";

const Logout = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  return (
    <button
      onClick={() => {
        authService.logout().then((res) => {
          setUser(null);
          router.push("/");
        });
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
