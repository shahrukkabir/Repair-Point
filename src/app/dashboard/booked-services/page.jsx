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
        const res = await fetch(`/api/bookings/user?userEmail=${session.user.email}`);
        const data = await res.json();
        if (!data.success) throw new Error(data.error || "Failed to fetch bookings");
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
    <div className="max-w-3xl mx-auto py-12 px-2">
      <h1 className="text-3xl text-center font-bold mb-6 text-blue-800">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-gray-500">No bookings found.</div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative flex w-full max-w-2xl flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg sm:flex-row sm:gap-6 sm:p-6"
            >
              {/* Cancel Button */}
              <button
                className="absolute right-3 cursor-pointer top-3 rounded-lg bg-red-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-600"
                onClick={async () => {
                  const result = await Swal.fire({
                    title: 'Cancel Booking?',
                    text: 'Are you sure you want to cancel this booking?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, cancel it!',
                    cancelButtonText: 'No, keep it',
                    customClass: { popup: 'rounded-2xl p-6' },
                  });
                  if (!result.isConfirmed) return;

                  try {
                    const res = await fetch('/api/bookings', {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ bookingId: booking._id }),
                    });
                    const data = await res.json();

                    if (data.success) {
                      setBookings((prev) =>
                        prev.filter((b) => b._id !== booking._id)
                      );
                      Swal.fire({
                        icon: 'success',
                        title: 'Booking Cancelled',
                        text: 'Your booking has been cancelled.',
                        customClass: { popup: 'rounded-2xl p-6' },
                      });
                    } else {
                      throw new Error(data.error || 'Failed to delete booking');
                    }
                  } catch (err) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Cancel Failed',
                      text: err.message,
                      customClass: { popup: 'rounded-2xl p-6' },
                    });
                  }
                }}
              >
                Cancel
              </button>

              {/* Image */}
              <div className="mx-auto shrink-0 sm:mx-0">
                <Image
                  src={booking.image}
                  alt={booking.title}
                  width={200}
                  height={200}
                  className="rounded-xl object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col justify-center">
                <h2 className="mb-2 text-xl font-bold text-blue-700">
                  {booking.title}
                </h2>

                <p className="mb-1 text-gray-700">
                  Price:{' '}
                  <span className="font-semibold text-gray-900">
                    ${booking.price}
                  </span>
                </p>

                <p className="mb-1 text-gray-600 text-sm">
                  Booking Date:{' '}
                  {booking.createdAt
                    ? new Date(booking.createdAt).toLocaleString()
                    : '-'}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Booking ID: {booking._id}
                </p>
              </div>
            </div>

          ))}
        </div>
      )}
    </div>
  );
}
