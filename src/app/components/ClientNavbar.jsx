"use client";

import dynamic from "next/dynamic";

const NavbarVisibility = dynamic(
  () => import("./NavbarVisibility"),
  { ssr: false }
);

export default function ClientNavbar() {
  return <NavbarVisibility />;
}
