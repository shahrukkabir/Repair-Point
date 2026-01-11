'use client';

import React from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Rakib Hasan',
    role: 'Master Plumber',
    exp: '15+ years experience',
    img: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg',
  },
  {
    name: 'Sabina Akter',
    role: 'Licensed Electrician',
    exp: 'Master License Certified',
    img: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
  },
  {
    name: 'Md. Saiful Islam',
    role: 'Master Carpenter',
    exp: '20+ years woodworking',
    img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    name: 'Mahmuda Parvin',
    role: 'HVAC Technician',
    exp: 'EPA Certified',
    img: 'https://images.pexels.com/photos/3747435/pexels-photo-3747435.jpeg',
  },
  {
    name: 'Jasim Uddin',
    role: 'Roofing Contractor',
    exp: 'Certified Professional',
    img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
  {
    name: 'Sharmin Sultana',
    role: 'General Handyman',
    exp: '12+ years experience',
    img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
];

const Team = () => {
  return (
    <section className="px-4 py-20 mx-auto max-w-7xl">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <span className="inline-block px-4 py-1 mb-6 text-xs font-semibold tracking-wider text-indigo-700 uppercase rounded-full bg-indigo-100">
          Expert Professionals
        </span>

        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
          Meet Our Certified Home Repair Experts
        </h2>

        <p className="text-gray-600">
          Connect with skilled professionals who bring years of experience and
          expertise to every home repair project.
        </p>
      </div>

      {/* Team Grid */}
      <div className="grid gap-8 mx-auto max-w-6xl sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 transition bg-white border rounded-xl hover:shadow-md"
          >
            {/* Image (NOT circle) */}
            <div className="relative w-24 h-24 shrink-0">
              <Image
                src={member.img}
                alt={member.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <h4 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h4>
              <p className="text-sm text-gray-700">{member.role}</p>
              <p className="text-xs text-gray-500">{member.exp}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
