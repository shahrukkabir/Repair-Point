"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaHome, FaListUl, FaInfoCircle, FaEnvelope, FaUser } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = (
        <>
            <Link href="/"
                className={`md:px-2 lg:px-3 py-2 font-medium flex items-center gap-2 ${pathname === "/" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMobileMenuOpen(false)} >
                <FaHome className="text-lg" /> Home
            </Link>

            <Link href="/services"
                className={`md:px-2 lg:px-3 py-2 font-medium flex items-center gap-2 ${pathname === "/services" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMobileMenuOpen(false)} >
                <FaListUl className="text-lg" /> Services
            </Link>

            <Link href="/reviews"
                className={`md:px-2 lg:px-3 py-2 font-medium flex items-center gap-2 ${pathname === "/reviews" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMobileMenuOpen(false)}>
                <MdRateReview className="text-lg mt-1" /> Reviews
            </Link>

            <Link href="/about-us"
                className={`md:px-2 lg:px-3 py-2 font-medium flex items-center gap-2 ${pathname === "/about-us" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMobileMenuOpen(false)} >
                <FaInfoCircle className="text-lg" /> About Us
            </Link>

            <Link href="/contact"
                className={`md:px-2 lg:px-3 py-2 font-medium flex items-center gap-2 ${pathname === "/contact" ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-gray-900"}`}
                onClick={() => setMobileMenuOpen(false)} >
                <FaEnvelope className="text-lg" /> Contact Us
            </Link>
        </>
    );

    return (
        <nav className={`fixed w-full top-0 z-50 bg-white border-b border-gray-200 transition-colors duration-300 ${scrolled ? "shadow-md" : ""}`} >
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    <span className="text-2xl font-extrabold bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-500 text-transparent">
                        RepairPoint
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-4">{navLinks}</div>

                {/* Demo user icon (no login logic) */}
                <div className="hidden md:flex items-center">
                    <FaUser className="text-2xl text-gray-700" />
                </div>

                {/* Mobile Menu Button */}
                <button className="flex md:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="bg-white w-full p-4 shadow border-t">
                    {navLinks}
                    {/* Static user button */}
                    <div className="flex items-center gap-2 mt-4">
                        <FaUser className="text-xl" />
                        <span className="font-medium">Guest User</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
