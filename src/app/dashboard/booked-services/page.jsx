"use client";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function BookingPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      if (!session || !session.user) return setLoading(false);
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `/api/bookings/user?userEmail=${session.user.email}`
        );
        const data = await res.json();
        if (!data.success)
          throw new Error(data.error || "Failed to fetch bookings");
        setBookings(data.bookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [session]);

  if (loading) return <Loading />;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 via-white to-blue-100 py-14 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-12">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No bookings found.
          </div>
        ) : (
          <div className="space-y-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center"
              >
                {/* Cancel Button */}
                <button
                  className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold transition"
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: "Cancel Booking?",
                      text: "Are you sure you want to cancel this booking?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes, cancel it!",
                      cancelButtonText: "No, keep it",
                      customClass: { popup: "rounded-2xl p-6" },
                    });
                    if (!result.isConfirmed) return;

                    try {
                      const res = await fetch("/api/bookings", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ bookingId: booking._id }),
                      });
                      const data = await res.json();
                      if (data.success) {
                        setBookings((prev) =>
                          prev.filter((b) => b._id !== booking._id)
                        );
                        Swal.fire({
                          icon: "success",
                          title: "Booking Cancelled",
                          text: "Your booking has been cancelled.",
                          customClass: { popup: "rounded-2xl p-6" },
                        });
                      } else {
                        throw new Error(
                          data.error || "Failed to cancel booking"
                        );
                      }
                    } catch (err) {
                      Swal.fire({
                        icon: "error",
                        title: "Cancel Failed",
                        text: err.message,
                        customClass: { popup: "rounded-2xl p-6" },
                      });
                    }
                  }}
                >
                  Cancel
                </button>

                {/* Image */}
                <Image
                  width={160}
                  height={160}
                  src={booking.image}
                  alt={booking.title}
                  className="w-40 h-40 object-cover rounded-2xl border"
                />

                {/* Details */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-blue-700 mb-3">
                    {booking.title}
                  </h2>

                  <p className="text-gray-600 mb-2">
                    Price:{" "}
                    <span className="font-semibold text-gray-800">
                      ${booking.price}
                    </span>
                  </p>

                  <p className="text-gray-600 mb-2">
                    Booking Date:{" "}
                    <span className="font-medium">
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleString()
                        : "-"}
                    </span>
                  </p>

                  <p className="text-gray-400 text-sm">
                    Booking ID: {booking._id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
