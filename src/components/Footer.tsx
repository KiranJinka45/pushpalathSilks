import Link from 'next/link';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-white/20 shadow-lg transition-transform group-hover:scale-105">
                <img src="/logo.jpg" alt="Logo" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight">Pushpalatha</span>
                <span className="text-xs uppercase tracking-[0.3em] text-secondary font-bold">Silks</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
              Authentic Dharmavaram and Kanchipuram silk sarees. Crafting elegance and tradition since years.
            </p>
            <div className="flex items-center space-x-6">
              <a 
                href="https://www.instagram.com/pushpalatha_silk_sarees?igsh=YnB5djM4ZjJ3d3Qx&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium hover:text-secondary transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://youtube.com/@pushpalathasilks?si=RUZDneAgD3Wikhby" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium hover:text-secondary transition-colors"
              >
                YouTube
              </a>
              <a 
                href="https://wa.me/918886851131" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-medium hover:text-secondary transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary font-bold uppercase tracking-wider text-sm mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li><Link href="/products?category=Dharmavaram" className="hover:text-white transition-colors">Dharmavaram Silk</Link></li>
              <li><Link href="/products?category=Kanchipuram" className="hover:text-white transition-colors">Kanchipuram Silk</Link></li>
              <li><Link href="/products?category=Bridal" className="hover:text-white transition-colors">Bridal Collection</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Sarees</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-secondary font-bold uppercase tracking-wider text-sm mb-6">Information</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-secondary font-bold uppercase tracking-wider text-sm mb-6">Visit Us</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=14.425160598079037,77.73109127589137"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 hover:text-white transition-colors"
                >
                  <MapPin size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                  <span>4-415-1, Siva Nagar, Dharmavaram, Andhra Pradesh 515671</span>
                </a>
              </li>
              <li className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-secondary flex-shrink-0" />
                  <span>+91 88868 51521</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-secondary flex-shrink-0" />
                  <span>+91 88868 51131</span>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Clock size={18} className="text-secondary flex-shrink-0" />
                <span>Opens at 10:00 AM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-primary-foreground/60 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Pushpalatha Silks. All rights reserved.</p>
          <p>Designed with ❤️ for Traditional Elegance</p>
        </div>
      </div>
    </footer>
  );
}
