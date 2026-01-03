"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Image from "next/image";
import Loading from "@/app/loading";

export default function ServiceDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchService() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/services/${id}`);
        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || "Failed to fetch service");
        }
        setService(data.service);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchService();
  }, [id]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-red-600 font-semibold">{error}</p>
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white"
          onClick={() => router.push("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!service) return null;

  return (
    <section className="mt-16 min-h-screen bg-linear-to-br from-blue-50 via-yellow-50 to-blue-100 px-4 py-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            Service Details
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore professional repair and maintenance services tailored for you.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="p-8">
              <Image
                src={service.image}
                alt={service.title}
                width={800}
                height={600}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                priority
              />
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-blue-700 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                <span>{service.city}</span>
              </div>

              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                {service.title}
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <p className="text-3xl font-bold text-blue-900 mb-6">
                ${service.price}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  onClick={() =>
                    Swal.fire({
                      icon: "info",
                      title: "Contact Service Provider",
                      text: "Please contact us to proceed with this service.",
                    })
                  }
                >
                  Book This Service
                </button>

                <button
                  className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
                  onClick={() => router.push("/services")}
                >
                  Back to Services
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Service ID: {service._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
