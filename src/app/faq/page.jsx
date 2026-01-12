'use client';

import React, { useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import {
  FiChevronDown,
  FiChevronUp,
  FiHelpCircle,
} from 'react-icons/fi';

const faqData = [
  {
    question: 'How do I book a repair service?',
    answer:
      "Browse available services, choose the one you need, and click the 'Book Service' button. You’ll receive a confirmation shortly.",
  },
  {
    question: 'Can I cancel or reschedule my booking?',
    answer:
      'Yes. Go to your dashboard and manage your bookings. Cancellation or rescheduling depends on the service policy.',
  },
  {
    question: 'Is my payment and personal data secure?',
    answer:
      'Absolutely. RepairPoint uses secure payment gateways and industry-standard encryption to protect your data.',
  },
  {
    question: 'How can I become a service provider?',
    answer:
      'Sign up as a professional, complete your profile verification, and start accepting repair jobs.',
  },
  {
    question: 'What if I need more help?',
    answer:
      'You can contact our support team anytime via the Contact page or email us at support@repairpoint.com.',
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="mx-auto max-w-3xl px-4 mt-10 py-20">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="mb-4 rounded-full bg-indigo-600 p-4 shadow-lg">
          <FiHelpCircle className="text-3xl text-white" />
        </div>

        <Slide triggerOnce direction="right" delay={200}>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Frequently Asked <span className="text-indigo-800">Questions</span>
          </h2>
        </Slide>

        <Slide triggerOnce direction="left" delay={200}>
          <p className="max-w-xl text-gray-600">
            Everything you need to know about using{' '}
            <span className="font-semibold text-indigo-700">
              RepairPoint
            </span>{' '}
            for booking reliable home repair services.
          </p>
        </Slide>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqData.map((faq, idx) => (
          <div
            key={idx}
            className={`rounded-lg border-l-4 shadow-md transition-all ${
              openIndex === idx
                ? 'border-indigo-600 bg-white'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="flex w-full items-center cursor-pointer justify-between px-6 py-4 text-left"
              aria-expanded={openIndex === idx}
            >
              <span className="text-lg font-semibold text-gray-900">
                {faq.question}
              </span>
              <span className="text-indigo-600">
                {openIndex === idx ? (
                  <FiChevronUp size={22} />
                ) : (
                  <FiChevronDown size={22} />
                )}
              </span>
            </button>

            <div
              className={`px-6 pb-4 text-gray-600 transition-all duration-300 ${
                openIndex === idx
                  ? 'max-h-40 opacity-100'
                  : 'max-h-0 overflow-hidden opacity-0'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
