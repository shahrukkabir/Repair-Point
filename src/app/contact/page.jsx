'use client';

import { Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="mt-12 flex min-h-screen items-center justify-center bg-indigo-50 py-12 px-4">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl lg:grid-cols-2 md:p-12">

        {/* Left: Contact Form */}
        <div className="flex flex-col justify-center">
          <h2 className="mb-3 text-2xl font-extrabold text-gray-900">
            Get in Touch with RepairPoint
          </h2>
          <p className="mb-8 max-w-lg text-gray-600">
            Have questions about repairs, bookings, or partnerships?  
            Our RepairPoint team is here to help you.
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us how we can help you..."
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl cursor-pointer bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col space-y-8">
          {/* Contact Info */}
          <div className="rounded-2xl bg-indigo-50 p-6 shadow-inner md:p-8">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-indigo-800">
              <Phone className="h-6 w-6 text-indigo-600" />
              Contact Information
            </h3>

            <ul className="space-y-4 text-gray-700 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <a
                  href="mailto:support@repairpoint.com"
                  className="transition hover:text-indigo-600"
                >
                  support@repairpoint.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <a
                  href="tel:+880123456789"
                  className="transition hover:text-indigo-600"
                >
                  +880 1234 567 89
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-gray-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Careers */}
          <div className="rounded-2xl bg-indigo-50 p-6 shadow-inner md:p-8">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-indigo-800">
              <Briefcase className="h-6 w-6 text-indigo-600" />
              Careers at RepairPoint
            </h3>

            <p className="mb-4 text-sm text-gray-600">
              Want to work with us? We’re always looking for skilled and
              passionate professionals.
            </p>

            <a
              href="mailto:careers@repairpoint.com"
              className="inline-block rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              careers@repairpoint.com
            </a>
          </div>

          {/* Map */}
          <div className="h-48 overflow-hidden rounded-2xl shadow-lg md:h-64">
            <iframe
              title="RepairPoint Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.4125%2C23.8103%2C90.4125%2C23.8103&layer=mapnik"
              className="h-full w-full border-0"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
