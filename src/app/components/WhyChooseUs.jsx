'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiShield,
  FiClock,
  FiAward,
  FiThumbsUp,
  FiZap,
  FiCheckCircle,
} from 'react-icons/fi';

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const features = [
    {
      icon: FiShield,
      title: 'Verified Professionals',
      description:
        'All service providers are background-checked and verified for your safety and peace of mind.',
    },
    {
      icon: FiClock,
      title: '24/7 Support',
      description:
        'Round-the-clock customer support to help you with any questions or issues you may encounter.',
    },
    {
      icon: FiAward,
      title: 'Quality Guarantee',
      description:
        'We guarantee the quality of work performed by our professionals with our satisfaction promise.',
    },
    {
      icon: FiThumbsUp,
      title: 'Easy Booking',
      description:
        'Simple and intuitive booking process that gets you connected with the right professional quickly.',
    },
    {
      icon: FiZap,
      title: 'Fast Response',
      description:
        'Quick turnaround times with most service requests being matched within 24 hours.',
    },
    {
      icon: FiCheckCircle,
      title: 'Secure Payments',
      description:
        'Safe and secure payment processing with multiple payment options for your convenience.',
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="bg-white py-24"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div className="mb-20 text-center" variants={itemVariants}>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
            <FiZap />
            Why Choose Us
          </span>

          <h2 className="mx-auto mb-6 max-w-3xl text-4xl font-bold text-gray-900">
            <span className="text-indigo-600">Professional</span> repair services
            you can trust
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Experience reliable, high-quality repair services with verified
            professionals who care about your satisfaction.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>

              <h4 className="mb-3 text-lg font-semibold text-gray-900">
                {feature.title}
              </h4>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
