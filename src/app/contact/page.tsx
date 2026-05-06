'use client';

import { MapPin, Phone, MessageCircle, Clock, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="bg-[#FFFDF0] min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 uppercase tracking-[0.2em]">Connect with Us</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Have questions about our sarees or need help with your order? We&apos;re here to help you find the perfect drape.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-muted"
            >
              <a 
                href="https://www.google.com/maps/search/?api=1&query=14.425160598079037,77.73109127589137"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 transition-colors group-hover:bg-primary group-hover:text-white">
                  <MapPin size={24} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 uppercase tracking-wide group-hover:text-secondary transition-colors">Visit Our Store</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  4-415-1, Siva Nagar, Dharmavaram,<br />
                  Andhra Pradesh 515671
                </p>
                <p className="text-xs text-secondary font-bold">Location Code: CPFJ+X7</p>
              </a>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-muted"
            >
              <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 uppercase tracking-wide">Store Hours</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Opens daily at 10:00 AM
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2">
                Available for enquiry on WhatsApp 24/7
              </p>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-muted"
            >
              <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 uppercase tracking-wide">Call Support</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Give us a call for immediate assistance.
              </p>
              <a href="tel:08886851521" className="text-xl font-bold text-primary hover:text-secondary transition-colors">
                +91 88868 51521
              </a>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-muted"
            >
              <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-[#25D366] mb-6">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 uppercase tracking-wide">WhatsApp Order</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Directly message us to view more designs or place orders.
              </p>
              <a
                href="https://wa.me/918886851521"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg"
              >
                <span>Chat Now</span>
                <MessageCircle size={18} />
              </a>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-muted h-full"
            >
              <div className="h-12 w-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Camera size={24} />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 uppercase tracking-wide">Social Media</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Follow us for the latest collections, weaving videos, and direct support.
              </p>
              <div className="flex flex-col space-y-4">
                <a
                  href="https://www.instagram.com/pushpalatha_silk_sarees?igsh=YnB5djM4ZjJ3d3Qx&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:text-secondary transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://youtube.com/@pushpalathasilks?si=RUZDneAgD3Wikhby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:text-secondary transition-colors"
                >
                  YouTube
                </a>
                <a
                  href="https://wa.me/918886851521"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:text-secondary transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Google Maps Section */}
        <div className="mt-16 h-[500px] bg-white rounded-3xl overflow-hidden shadow-sm border border-muted relative group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3862.636605!2d77.7285163!3d14.4251606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDI1JzMwLjYiTiA3N8KwNDMnNTEuOSJF!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-muted max-w-xs pointer-events-none transition-opacity group-hover:opacity-0">
            <h3 className="text-lg font-bold text-primary mb-1 uppercase tracking-wide">Pushpalatha Silks</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">4-415-1, Siva Nagar, Dharmavaram, Andhra Pradesh 515671</p>
          </div>
        </div>
      </div>
    </div>
  );
}
