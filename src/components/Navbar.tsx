'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function for smooth scrolling
  const handleScrollTo = (e: any, id: any) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu on click
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjusted for navbar height
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 flex items-center justify-between px-2 md:px-12 py-4 transition-all font-sans',
        scrolled ? 'bg-blue-800/90 shadow-lg backdrop-blur-md' : 'bg-blue-900/80'
      )}
    >
      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-lg font-semibold text-white">
        <Link href="/developers" className="hover:text-gray-300 transition">Developers</Link>
        <Link href="/local-chapter" className="hover:text-gray-300 transition">Local Chapter</Link>
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Center Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-300">
        <a href='#top'>
           <Image
            src="/acm-logo.png" 
            alt="ACM Nagpur Logo"
            width={60}
            height={60}
            className="rounded-full"
            priority
            />
        </a>
        
      </div>

      {/* Desktop Navigation - Right Section */}
      <nav className="hidden md:flex gap-6 text-lg font-semibold text-white">
        <a href="#events" className="hover:text-gray-300 transition" onClick={(e) => handleScrollTo(e, 'events')}>Events</a>
        <a href="#about" className="hover:text-gray-300 transition" onClick={(e) => handleScrollTo(e, 'about')}>About</a>
        <Link href="/admin" className="hover:text-gray-300 transition">Admin</Link>
      </nav>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-blue-900 text-white flex flex-col items-center py-4 md:hidden"
          >
            <Link href="/developers" className="py-2 text-lg" onClick={() => setIsOpen(false)}>Developers</Link>
            <Link href="/local-chapter" className="py-2 text-lg" onClick={() => setIsOpen(false)}>Local Chapter</Link>
            <a href="#events" className="py-2 text-lg" onClick={(e) => handleScrollTo(e, 'events')}>Events</a>
            <a href="#about" className="py-2 text-lg" onClick={(e) => handleScrollTo(e, 'about')}>About</a>
            <Link href="/admin" className="py-2 text-lg" onClick={() => setIsOpen(false)}>Admin</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
