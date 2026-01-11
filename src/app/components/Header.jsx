'use client'
import Link from "next/link";
import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FiTool } from "react-icons/fi";


export default function Header() {
    return (
        <section className="min-h-screen flex items-center relative w-full bg-linear-to-br from-gray-50 via-white to-gray-50 overflow-hidden">

            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-8 left-10 w-72 h-72 bg-red-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            Welcome to RepairPoint
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                            Expert Repair Services
                            <br />

                            <motion.span
                                animate={{
                                    color: ['#4f46e5', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#4f46e5'],
                                    transition: { duration: 4, repeat: Infinity, ease: "linear" },
                                }}
                                className="drop-shadow-lg"
                            >
                                You Can Trust
                            </motion.span>
                            
                        </h1>


                        <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl lg:max-w-none">
                            Connect with skilled professionals, share your expertise, or find the perfect repair service for your needs. Our platform makes booking reliable services simple and secure.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/services" className="inline-flex items-center justify-center mx-10 lg:mx-0 px-6 py-3 bg-linear-to-r bg-[#4640c2] hover:bg-[#3b35a5] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 text-base border-0 hover:scale-105">
                            <FiTool className="mr-2" /> Browse Services
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    <CountUp end={1000} duration={2} separator="," />+
                                </div>
                                <div className="text-gray-600">Services</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    <CountUp end={15000} duration={2.5} separator="," />+
                                </div>
                                <div className="text-gray-600">Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 mb-1">
                                    <CountUp end={24} duration={1.5} />/7
                                </div>
                                <div className="text-gray-600">Support</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                        <div className="relative">
                            <div className="relative w-64 h-64 lg:w-80 lg:h-80 bg-linear-to-br from-blue-50 via-yellow-50 to-red-100 rounded-3xl shadow-2xl p-6 flex items-center justify-center border-2 border-blue-100">
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute top-6 left-8 w-16 h-16 bg-blue-200 rounded-full blur-2xl opacity-40"></div>
                                    <div className="absolute bottom-8 right-8 w-20 h-20 bg-yellow-200 rounded-full blur-2xl opacity-30"></div>
                                    <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-red-100 rounded-full blur-2xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
                                </div>
                                <div className="text-center relative z-10">
                                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-yellow-400 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-blue-700 mb-1">Verified & Trusted</h3>
                                    <p className="text-blue-600 text-sm">All services are checked for quality.</p>
                                </div>
                            </div>

                            {/* Floating elements */}
                            <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                                <span className="text-white font-bold text-lg">★</span>
                            </div>
                            <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-green-400 rounded-2xl shadow-lg flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                                <span className="text-white font-bold text-base">✓</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 w-full">
                <svg className="w-full h-20" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" d="M0,0L48,10C96,20,192,40,288,50C384,60,480,60,576,50C672,40,768,20,864,20C960,20,1056,40,1152,50C1248,60,1344,60,1392,60L1440,60L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
                </svg>
            </div>
        </section>
    );
}