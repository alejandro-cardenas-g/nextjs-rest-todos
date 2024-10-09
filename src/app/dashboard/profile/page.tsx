"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { data, status } = useSession();
  if (status === "unauthenticated") redirect("/api/auth/signin");
  if (status === "loading") return <span>...loading</span>;

  return (
    <div>
      <h1>Profile page</h1>
      <div className="flex flex-col">
        <span>{data?.user?.email}</span>
        <span>{data?.user?.name}</span>
        <span>{data?.user?.image}</span>
        <span>{data?.user?.roles?.join(";")}</span>
      </div>
    </div>
  );
}
