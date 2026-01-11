"use client";

import Image from "next/image";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMapPin, FiPhone, FiMail, FiShield, FiArrowUp, FiZap, FiDroplet, FiHome, FiSettings } from "react-icons/fi";
import logo from "../../../public/logo.png";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-white border-t border-gray-200 overflow-hidden">
            {/* Subtle background shapes */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 border border-[#4640c2] rounded-full" />
                <div className="absolute bottom-10 right-10 w-16 h-16 border border-[#4640c2] rounded-full" />
            </div>

            {/* Trusted badge (small & subtle) */}
            <div className="absolute top-5 right-5 flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border shadow-sm text-xs font-medium">
                <FiShield className="text-green-500 text-sm" />
                Trusted & Secure
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand */}
                <div >
                    <Link  href="/" className="flex items-center mb-4 hover:scale-[1.02] transition-transform" >
                        
                        <span className="text-xl font-bold tracking-tight">
                            <span className="text-base-content">Repair Point</span>
                        </span>
                    </Link>

                    <p className="text-gray-600 leading-relaxed text-sm">
                        Your trusted partner for professional repair services. Connecting
                        you with verified experts for all your home maintenance needs.
                    </p>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-base font-semibold mb-4">Our Services</h3>
                    <ul className="space-y-3 text-gray-600 text-sm">
                        <li className="flex items-center gap-2 hover:text-[#4640c2]">
                            <FiZap /> Electrical Repair
                        </li>
                        <li className="flex items-center gap-2 hover:text-[#4640c2]">
                            <FiDroplet /> Plumbing Services
                        </li>
                        <li className="flex items-center gap-2 hover:text-[#4640c2]">
                            <FiHome /> Home Maintenance
                        </li>
                        <li className="flex items-center gap-2 hover:text-[#4640c2]">
                            <FiSettings /> General Repairs
                        </li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-base font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-gray-600 text-sm">
                        <li>
                            <Link href="/services" className="hover:text-[#4640c2]">
                                All Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-[#4640c2]">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/faqs" className="hover:text-[#4640c2]">
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-[#4640c2]">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-base font-semibold mb-4">Contact Us</h3>
                    <div className="space-y-4 text-gray-600 text-sm">
                        <div className="flex items-start gap-3">
                            <FiMapPin className="text-[#4640c2] mt-1" />
                            <span>123 Repair Street, Fix City, FC 12345</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FiPhone className="text-[#4640c2]" />
                            +1 (555) 123-4567
                        </div>
                        <div className="flex items-center gap-3">
                            <FiMail className="text-[#4640c2]" />
                            support@repairpoint.com
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-200 py-6 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-sm">
                        © {new Date().getFullYear()} RepairPoint. Made with ❤️ by SRK
                    </p>

                    <div className="flex items-center gap-4">
                        <a className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:text-blue-500">
                            <FiFacebook />
                        </a>
                        <a className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:text-sky-400">
                            <FiTwitter />
                        </a>
                        <a className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:text-pink-500">
                            <FiInstagram />
                        </a>
                        <a className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:text-blue-600">
                            <FiLinkedin />
                        </a>

                        <button
                            onClick={scrollToTop}
                            className="w-9 h-9 bg-[#4640c2]/20 rounded-lg cursor-pointer flex items-center justify-center hover:bg-[#4640c2] hover:text-white transition"
                        >
                            <FiArrowUp />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
