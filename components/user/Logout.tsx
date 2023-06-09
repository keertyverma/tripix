import { authService } from "@/services";
import { useRouter } from "next/router";
import React from "react";

const Logout = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        authService.logout();
        router.push("/");
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
