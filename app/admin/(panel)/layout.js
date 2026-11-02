import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return (
    <div className="min-h-screen md:flex">
      <Sidebar email={admin.email} />
      <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
    </div>
  );
}
