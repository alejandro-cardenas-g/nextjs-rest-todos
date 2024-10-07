import { TabBar } from "@/dashboard/components";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Cookies page",
};

export default function CookiesPage() {
  const cookiesStore = cookies();
  const cookieTab = cookiesStore.get("selectedTab");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="tex-3xl">Tabs</span>
        <TabBar currentTab={Number(cookieTab?.value ?? "1")} />
      </div>
    </div>
  );
}
