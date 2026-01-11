"use client";

import Loading from "@/app/loading";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
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

  const services = Array.isArray(data) ? data : [];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  if (isLoading) return <Loading />;
  if (error)
    return <div className="p-8 text-red-600">{error.message}</div>;

  const isServicePage = pathname === "/services";

  let servicesToShow = isServicePage ? services : services.slice(0, 4);

  const heading = isServicePage ? "All Services" : "Featured Services";
  const description = isServicePage
    ? "Find the perfect service for your needs"
    : "Discover our most requested home repair and maintenance services with expert professionals";

  if (isServicePage && search.trim()) {
    const term = search.trim().toLowerCase();
    servicesToShow = servicesToShow.filter(
      (s) =>
        s.title.toLowerCase().includes(term) ||
        (s.city && s.city.toLowerCase().includes(term))
    );
  }

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
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {heading}
        </h2>
        <p className="text-gray-600 max-w-2xl text-center mx-auto text-lg">
          {description}
        </p>
      </div>

      {/* Search */}
      {isServicePage && (
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by service or city..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4640c2]"
          />
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedServices.map((service) => (
          <div
            key={service._id}
            className="group bg-white rounded-sm overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Price */}
              <div className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full text-[#4640c2] font-semibold shadow">
                $ {service.price}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-6 pt-6 pb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>

              {service.city && (
                <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11a3 3 0 100-6 3 3 0 000 6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.5 9c0 7-7.5 11-7.5 11S4.5 16 4.5 9a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {service.city}
                </p>
              )}

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6">
                {service.description}
              </p>

              {/* Button */}
              <Link
                href={`/services/${service._id}`}
                className=" self-end bg-[#4640c2] hover:bg-[#3b35a5] text-white font-semibold px-4 py-2 rounded-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {!isServicePage && (
        <div className="flex justify-center mt-14">
          <Link href="/services"
            className="bg-[#4640c2] hover:bg-[#3b35a5] text-white font-semibold px-10 py-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Show All Services
          </Link>
        </div>
      )}


      {/* Pagination */}
      {isServicePage && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded font-semibold ${page === i + 1
                ? "bg-[#4640c2] text-white"
                : "bg-gray-100 text-gray-700"
                }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 font-semibold disabled:opacity-50"
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
