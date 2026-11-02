import { connectDB } from "@/lib/db";
import Client from "@/models/Client";
import ClientsManager from "@/components/admin/ClientsManager";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  await connectDB();
  const items = JSON.parse(JSON.stringify(await Client.find().sort({ order: 1, createdAt: -1 }).lean()));
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold">Clients</h1>
      <p className="mt-1 text-ink-soft">Companies shown in the &ldquo;Trusted by&rdquo; strip on the home page. Changes go live within a minute.</p>
      <ClientsManager initial={items} />
    </div>
  );
}
