import ServiceCardListClient from "@/components/ServiceCardListClient";
import ClientHeader from "./components/ClientHeader";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex flex-col">
      <ClientHeader />
      <ServiceCardListClient />
      <Testimonials />
      <Team />
      <WhyChooseUs />
    </main>
  );
}
