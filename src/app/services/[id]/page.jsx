"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Image from "next/image";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";

export default function ServiceDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const [alreadyBooked, setAlreadyBooked] = useState(false);


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

  useEffect(() => {
    async function checkAlreadyBooked() {
      if (!session || !session.user || !id) {
        setAlreadyBooked(false);
        return;
      }
      try {
        const res = await fetch(`/api/bookings/check?serviceId=${id}&userEmail=${session.user.email}`);
        const data = await res.json();
        setAlreadyBooked(data.booked === true);
      }
      catch (error) {
        setAlreadyBooked(false);
      }
    }

    checkAlreadyBooked();
  }, [session, id]);
console.log(alreadyBooked);

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
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Explore professional repair and maintenance services tailored to your needs, ensuring expert craftsmanship, reliable service, and seamless solutions designed to keep your essentials running perfectly.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="p-8">
              <div className="relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={800}
                  height={600}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  priority
                />

                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-bold shadow-lg ${service.available
                      ? "bg-yellow-400 text-blue-900"
                      : "bg-blue-300 text-yellow-900"
                      }`}
                  >
                    {service.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-8 flex flex-col justify-center">
              {/* City */}
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{service.city}</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-blue-800 mb-4">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-blue-900">
                  ${service.price || '0.00'}
                  <span className="text-base font-normal text-gray-500"> / day</span>
                </p>
              </div>

              {/* Action Buttons */}
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Book Service Button */}
                <button
                  className={`flex-1 cursor-pointer bg-blue-600 border-2 border-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-center
      ${alreadyBooked
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-blue-700 hover:border-blue-700"
                    }`}
                  disabled={alreadyBooked}
                  onClick={async () => {
                    if (alreadyBooked) return;

                    if (!session || !session.user) {
                      Swal.fire({
                        icon: "warning",
                        title: "Login Required",
                        text: "Please login to book this service.",
                        confirmButtonText: "Login",
                        preConfirm: () => router.push("/login"),
                        customClass: { popup: "rounded-2xl p-6" },
                      });
                      return;
                    }

                    try {
                      const res = await fetch("/api/bookings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          serviceId: service._id,
                          userEmail: session.user.email,
                          title: service.title,
                          price: service.price,
                          image: service.image,
                        }),
                      });

                      const data = await res.json();

                      if (data.success) {
                        Swal.fire({
                          icon: "success",
                          title: "Booking Successful!",
                          text: `Your booking for ${service.title} is confirmed.`,
                          customClass: { popup: "rounded-2xl p-6" },
                        });
                        setAlreadyBooked(true);
                      } else {
                        throw new Error(data.error || "Booking failed");
                      }
                    } catch (err) {
                      Swal.fire({
                        icon: "error",
                        title: "Booking Failed",
                        text: err.message,
                        customClass: { popup: "rounded-2xl p-6" },
                      });
                    }
                  }}
                >
                  {alreadyBooked ? "Booked" : "Book Service"}
                </button>
                
                

                <button
                  className="flex-1 cursor-pointer border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50"
                  onClick={() => router.push("/services")}
                >
                  Back to Services
                </button>
              </div>


              {/* Service ID */}
              <p className="text-xs text-gray-400 mt-4">
                Service ID: {service._id}
              </p>
            </div>
          </div>
        </div>

        {/* Back to All Services Link */}
        <div className="text-center mt-10 ">
          <button
            onClick={() => router.push("/services")}
            className="inline-flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to All Services
          </button>
        </div>
      </div>
    </section>
  );
}
