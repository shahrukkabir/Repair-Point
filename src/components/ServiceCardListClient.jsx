"use client";
import dynamic from "next/dynamic";
const ServiceCardList = dynamic(() => import("./ServiceCardList"), { ssr: false });

export default function ServiceCardListClient() {
    return <ServiceCardList />;
}
