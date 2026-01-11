'use client';
import Image from "next/image";
import React from "react";

const testimonials = [
  {
    name: "Ayesha Rahman",
    feedback: "Excellent service! The team was professional and very responsive.",
    role: "Customer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Tanvir Hasan",
    feedback: "Booking was easy and the service exceeded my expectations.",
    role: "Customer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Shamima Akter",
    feedback: "Highly recommended! Fast, reliable, and friendly staff.",
    role: "Customer",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const Testimonials = () => (
  <section className="py-12 bg-base-100">
    <div className="container mx-auto px-4 md:px-14 lg:px-28">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#4640c2]">What Our Customers Say</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-base-200 rounded-xl shadow p-6 flex flex-col items-center">
             <Image
                src={t.avatar}
                alt={t.name}
                width={96}
                height={96}
                className="mx-auto mb-6 rounded-full border-4 border-primary object-cover"
              />
            <p className="text-base-content/80 italic mb-4 text-center">{t.feedback}</p>
            <div className="font-semibold text-base-content">{t.name}</div>
            <div className="text-sm text-base-content/60">{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;