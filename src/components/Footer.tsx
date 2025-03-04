'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-[#002147] text-white py-12 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-8">
        
        {/* Contact Us Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="flex items-center gap-2"><MapPin size={20} /> Nagpur, India</p>
          <p className="flex items-center gap-2"><Phone size={20} /> +91 12345 67890</p>
          <p className="flex items-center gap-2"><Mail size={20} /> contact@acmnagpur.com</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link href="/developers" className="hover:underline">Developers</Link></li>
            <li><Link href="/local-chapter" className="hover:underline">Local Chapter</Link></li>
            <li><Link href="/events" className="hover:underline">Events</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/admin" className="hover:underline">Admin</Link></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4">
            <Link href="https://facebook.com" target="_blank"><Facebook size={24} className="hover:text-blue-400 transition" /></Link>
            <Link href="https://instagram.com" target="_blank"><Instagram size={24} className="hover:text-pink-400 transition" /></Link>
            <Link href="https://linkedin.com" target="_blank"><Linkedin size={24} className="hover:text-blue-500 transition" /></Link>
            <Link href="https://twitter.com" target="_blank"><Twitter size={24} className="hover:text-blue-300 transition" /></Link>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
          <p className="text-gray-300 text-sm mb-4">Subscribe to get the latest updates</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input type="email" placeholder="Enter your email" className="text-black" />
            <Button className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 transition">
  Subscribe
</Button>


          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} ACM Nagpur. All rights reserved.
      </div>
    </footer>
  );
}
