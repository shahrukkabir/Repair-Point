"use client";

import { useParams } from "next/navigation";
import EditServiceForm from "../EditServiceForm";

export default function EditServicePage() {
  const params = useParams();
  const { id } = params;

  return <EditServiceForm serviceId={id} />;
}
