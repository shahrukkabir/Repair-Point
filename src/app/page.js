import ServiceCardListClient from "@/components/ServiceCardListClient";
import ClientHeader from "./components/ClientHeader";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col">
      <ClientHeader />
      <ServiceCardListClient />
      <Team />
      <Testimonials />
    </main>
  );
}
