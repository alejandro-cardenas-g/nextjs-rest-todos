import { WidgetItem } from "@/dashboard/components";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Connected user server side">
        <span>{session.user?.email}</span>
        <span>{session.user?.image}</span>
        <span>{session.user?.name}</span>
      </WidgetItem>
    </div>
  );
}
