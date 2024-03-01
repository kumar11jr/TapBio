'use client'
import React, { useEffect } from "react";
import useAuth from "@/context/auth/useAuth";
import { useRouter } from "next/navigation";

const Logout = () => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("tapbio-token");
    auth.setAuthStatus(false);
    router.replace('/')
  });
  return <div>Logging out....</div>;
};

export default Logout;
