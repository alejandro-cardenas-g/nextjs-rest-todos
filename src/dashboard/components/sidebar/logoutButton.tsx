"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { CiLogout } from "react-icons/ci";

const text: Record<ReturnType<typeof useSession>["status"], string> = {
  authenticated: "Logout",
  loading: "...loading",
  unauthenticated: "Iniciar sesión",
};

export const LogoutButton = () => {
  const { status } = useSession();
  const handleSession = () => {
    if (status === "authenticated") return signOut();
    else if (status === "unauthenticated") return signIn();
  };

  return (
    <button
      onClick={handleSession}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      <CiLogout />
      <span className="group-hover:text-gray-700">{text[status]}</span>
    </button>
  );
};
