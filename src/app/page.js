import ServiceCardListClient from "@/components/ServiceCardListClient";
import ClientHeader from "./components/ClientHeader";

export default function Home() {
  return (
    <main className="flex flex-col">
      <ClientHeader />
      <ServiceCardListClient />
    </main>
  );
}
