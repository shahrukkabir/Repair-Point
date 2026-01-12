"use client";

import Loading from "@/app/loading";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2";

function ServicesTable() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch services");
      }
      return data.services;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This service will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const res = await fetch(`/api/services/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();

        if (result.success) {
          Swal.fire(
            "Deleted!",
            "Service deleted successfully.",
            "success"
          );
          queryClient.invalidateQueries(["services"]);
        } else {
          throw new Error(result.error || "Delete failed");
        }
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    });
  };

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="p-8 text-red-600">
        {error.message}
      </div>
    );

  return (
    <section className="p-8">
      <h1 className="mb-6 text-3xl font-bold text-blue-700">
        All Services
      </h1>

      <div className="overflow-x-auto rounded-xl bg-white shadow-xl">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-50 text-blue-900">
              <th className="px-6 py-3 text-left font-bold">
                Title
              </th>
              <th className="px-6 py-3 text-left font-bold">
                City
              </th>
              <th className="px-6 py-3 text-left font-bold">
                Price
              </th>
              <th className="px-6 py-3 text-left font-bold">
                Available
              </th>
              <th className="px-6 py-3 text-center font-bold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {services.map((service, idx) => (
              <tr
                key={service._id}
                className={`transition ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="px-6 py-4 font-semibold text-gray-800">
                  {service.title}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {service.city}
                </td>

                <td className="px-6 py-4 font-bold text-blue-700">
                  ৳ {service.price}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      service.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {service.available ? "Yes" : "No"}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/dashboard/all-services/edit/${service._id}`}
                      className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(service._id)
                      }
                      className="rounded-full cursor-pointer bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function AllServicesPage() {
  return <ServicesTable />;
}
