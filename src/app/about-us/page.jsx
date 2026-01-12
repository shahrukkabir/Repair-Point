'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
// import PageHelmet from '@/app/components/PageHelmet';
import header from '../../../public/header.jpg';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

const AboutUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <>
      {/* <PageHelmet title="About Us | RepairPoint" /> */}

      <motion.section
        ref={ref}
        className="relative flex min-h-[50vh] items-center justify-center overflow-hidden lg:min-h-[calc(100vh-80px)]"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 z-0"
          variants={imageVariants}
        >
          <Image
            src={header}
            alt="About RepairPoint"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 text-center md:px-14 lg:px-28">
          <motion.h1
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
            variants={fadeInUpVariants}
          >
            About Us
          </motion.h1>

          <motion.p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-200 md:text-md"
            variants={fadeInUpVariants}
          >
            RepairPoint is dedicated to connecting you with skilled professionals
            for all your home repair needs. Our platform ensures reliable,
            high-quality service and a seamless experience—whether you’re
            booking a repair or offering your expertise. Trust, transparency,
            and customer satisfaction are at the heart of everything we do.
          </motion.p>
        </div>
      </motion.section>
    </>
  );
};

export default AboutUs;
