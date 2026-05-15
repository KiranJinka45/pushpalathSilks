'use client';

import { MapPin, Phone, MessageCircle, Clock, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="bg-black min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 uppercase tracking-[0.2em]">Connect with Us</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed font-light">
            Have questions about our sarees or need help with your order? We&apos;re here to help you find the perfect drape.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-primary/10 transition-all hover:border-primary/30"
            >
              <a 
                href="https://www.google.com/maps/search/?api=1&query=14.425160598079037,77.73109127589137"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 transition-colors group-hover:bg-primary group-hover:text-black">
                  <MapPin size={28} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-widest group-hover:text-secondary transition-colors">Visit Our Store</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
                  4-415-1, Siva Nagar, Dharmavaram,<br />
                  Andhra Pradesh 515671
                </p>
                <div className="inline-flex items-center space-x-2 text-secondary font-black uppercase tracking-widest text-[10px] border-b border-secondary/30 pb-1">
                  <span>View on Maps</span>
                </div>
              </a>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-primary/10 transition-all hover:border-primary/30"
            >
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-widest">Store Hours</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                Opens daily at 10:00 AM
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mt-2 font-medium italic opacity-70">
                Available for enquiry on WhatsApp 24/7
              </p>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-primary/10 transition-all hover:border-primary/30"
            >
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-widest">Call Support</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-medium">
                Give us a call for immediate assistance.
              </p>
              <div className="flex flex-col space-y-4">
                <a href="tel:08886851521" className="text-2xl font-black text-primary hover:text-secondary transition-colors tracking-tighter">
                  +91 88868 51521
                </a>
                <a href="tel:08886851131" className="text-2xl font-black text-primary hover:text-secondary transition-colors tracking-tighter">
                  +91 88868 51131
                </a>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-primary/10 transition-all hover:border-primary/30"
            >
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-[#25D366] mb-8">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-widest">WhatsApp Order</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-medium">
                Directly message us to view more designs or place orders.
              </p>
              <a
                href="https://wa.me/918886851131"
                className="w-full py-4 bg-[#25D366] text-white rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-3 hover:opacity-90 transition-all shadow-xl hover:shadow-[#25D366]/20"
              >
                <span className="whitespace-nowrap">Chat Now</span>
                <MessageCircle size={20} />
              </a>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-neutral-900/50 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl border border-primary/10 transition-all hover:border-primary/30 h-full"
            >
              <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <Camera size={28} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-widest">Social Media</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-medium">
                Follow us for the latest collections, weaving videos, and direct support.
              </p>
              <div className="flex flex-col space-y-5">
                <a
                  href="https://www.instagram.com/pushpalatha_silk_sarees?igsh=YnB5djM4ZjJ3d3Qx&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-primary font-black uppercase tracking-widest text-xs hover:text-white transition-colors"
                >
                  <span className="h-1 w-6 bg-primary/30" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://youtube.com/@pushpalathasilks?si=RUZDneAgD3Wikhby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-primary font-black uppercase tracking-widest text-xs hover:text-white transition-colors"
                >
                  <span className="h-1 w-6 bg-primary/30" />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://wa.me/918886851131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-primary font-black uppercase tracking-widest text-xs hover:text-white transition-colors"
                >
                  <span className="h-1 w-6 bg-primary/30" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Google Maps Section */}
        <div className="mt-20 h-[550px] bg-neutral-900 rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10 relative group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3862.636605!2d77.7285163!3d14.4251606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDI1JzMwLjYiTiA3N8KwNDMnNTEuOSJF!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-1000"
          ></iframe>
          <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-xl p-8 rounded-3xl shadow-3xl border border-primary/20 max-w-sm pointer-events-none transition-all duration-500 group-hover:opacity-0 group-hover:translate-x-[-20px]">
            <h3 className="text-xl font-bold text-primary mb-2 uppercase tracking-widest">Pushpalatha Silks</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium opacity-80">4-415-1, Siva Nagar, Dharmavaram, Andhra Pradesh 515671</p>
          </div>
        </div>
      </div>
    </div>
  );
}
