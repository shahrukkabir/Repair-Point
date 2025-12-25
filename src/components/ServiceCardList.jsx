"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const queryClient = new QueryClient();

function ServiceCardListInner() {
  const pathname = usePathname();

  const { data, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to fetch services");
      }
      return json.services;
    },
  });

  // Always safe array
  const services = Array.isArray(data) ? data : [];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // if (isLoading) return <Loading />;

  if (error) {
    return <div className="p-8 text-red-600">{error.message}</div>;
  }

  // Detect services page
  const isServicePage = pathname === "/services";

  // Featured (home) vs all (services page)
  let servicesToShow = isServicePage ? services : services.slice(0, 4);

  const heading = isServicePage ? "All Services" : "Featured Services";

  // Search filter (only on services page)
  if (isServicePage && search.trim()) {
    const term = search.trim().toLowerCase();
    servicesToShow = servicesToShow.filter(
      (s) =>
        s.title.toLowerCase().includes(term) ||
        (s.city && s.city.toLowerCase().includes(term))
    );
  }

  // Pagination (only on services page)
  let paginatedServices = servicesToShow;
  let totalPages = 1;

  if (isServicePage) {
    totalPages = Math.ceil(servicesToShow.length / pageSize) || 1;
    paginatedServices = servicesToShow.slice(
      (page - 1) * pageSize,
      page * pageSize
    );
  }

  return (
    <section className="py-10 px-4 mt-12 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-800 mb-10 tracking-tight drop-shadow-lg">
        {heading}
      </h2>

      {isServicePage && (
        <div className="flex justify-center mb-8">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by service or city..." className="w-full max-w-md px-4 py-2 border border-blue-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {paginatedServices.map((service) => (
          <div key={service._id} className="relative bg-gradient-to-br from-blue-50 via-white to-red-50 rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:ring-2 hover:ring-blue-400">
            {/* Image */}
            <div className="relative overflow-hidden">
              <Image src={service.image} alt={service.title} width={400} height={300} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-blue-900 font-semibold text-lg mb-2 line-clamp-2 text-center">
                {service.title}
              </h3>

              <p className="text-blue-700 font-bold text-xl mb-3 text-center">
                ${service.price}
              </p>

              <Link href={`/services/${service._id}`} className="w-full bg-gradient-to-r from-blue-500 to-yellow-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-200 text-center block shadow">
                VIEW DETAILS
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {isServicePage && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded font-semibold ${page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-blue-700"
                }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}

export default function ServiceCardList() {
  return (
    <QueryClientProvider client={queryClient}>
      <ServiceCardListInner />
    </QueryClientProvider>
  );
}
