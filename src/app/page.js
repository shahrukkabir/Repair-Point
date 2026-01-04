import ServiceCardListClient from "@/components/ServiceCardListClient";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Header />
      <ServiceCardListClient />
    </main>
  )
}