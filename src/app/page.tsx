import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import FeaturedCollections from "@/components/FeaturedCollections";
import CategorySection from "@/components/CategorySection";
import ReviewSection from "@/components/ReviewSection";
import Link from "next/link";
import { CheckCircle, Truck, Star, ShieldCheck, MapPin, Phone, Camera } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Hero />
      <BestSellers />
      <FeaturedCollections />
      
      {/* Why Choose Us */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6 border border-secondary/30">
                <ShieldCheck size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">100% Authentic</h3>
              <p className="text-sm text-primary-foreground/70">Pure silk with traditional handloom craftsmanship.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6 border border-secondary/30">
                <Truck size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Pan India Delivery</h3>
              <p className="text-sm text-primary-foreground/70">Safe and fast delivery to your doorstep.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6 border border-secondary/30">
                <Star size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">5-Star Rated</h3>
              <p className="text-sm text-primary-foreground/70">Trusted by hundreds of happy customers.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6 border border-secondary/30">
                <CheckCircle size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Local Tradition</h3>
              <p className="text-sm text-primary-foreground/70">Located in the heart of Dharmavaram.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase tracking-[0.2em] mb-4">Our Legacy & Achievements</h2>
            <div className="h-1 bg-secondary w-24 mx-auto mb-8" />
          </div>
          
          <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-muted">
            <img 
              src="/silk-mark-cert.jpg" 
              alt="Silk Mark Certificate" 
              className="w-full h-[400px] md:h-[600px] object-contain bg-white transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
              <div className="p-8 md:p-12 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-wider text-secondary">Crafting Excellence Since Generations</h3>
                <p className="max-w-2xl text-lg text-white/90 leading-relaxed">
                  Pushpalatha Silks represents the pinnacle of Dharmavaram handloom tradition. Our commitment to quality and authenticity has made us a trusted name for pure silk sarees across India and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategorySection />

      {/* Featured Products Call to Action */}
      <section className="py-24 bg-[#FFFDF0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8 leading-tight">
            Ready to find your <br />
            <span className="text-secondary italic">Perfect Saree?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Browse our complete catalog of authentic silk sarees and experience the luxury of traditional Indian craftsmanship.
          </p>
          <Link 
            href="/products" 
            className="inline-block px-12 py-5 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-accent transition-all shadow-2xl hover:shadow-primary/30 transform hover:-translate-y-1"
          >
            Shop the Collection
          </Link>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </section>

      <ReviewSection />

      {/* Visit Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8 uppercase tracking-widest">Visit Our Store</h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-lg mb-1">Our Address</h4>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=14.425160598079037,77.73109127589137"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground leading-relaxed hover:text-secondary transition-colors"
                    >
                      4-415-1, Siva Nagar, Dharmavaram,<br />
                      Andhra Pradesh 515671
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                    <Phone size={24} />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="font-bold text-primary text-lg mb-1">Call / WhatsApp</h4>
                    <a 
                      href="tel:08886851521" 
                      className="text-muted-foreground leading-relaxed hover:text-secondary transition-colors"
                    >
                      +91 88868 51521
                    </a>
                    <a 
                      href="tel:08886851131" 
                      className="text-muted-foreground leading-relaxed hover:text-secondary transition-colors"
                    >
                      +91 88868 51131
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                    <Camera size={24} />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="font-bold text-primary text-lg mb-1">Follow Us</h4>
                    <a 
                      href="https://www.instagram.com/pushpalatha_silk_sarees?igsh=YnB5djM4ZjJ3d3Qx&utm_source=qr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground leading-relaxed hover:text-secondary transition-colors"
                    >
                      Instagram
                    </a>
                    <a 
                      href="https://youtube.com/@pushpalathasilks?si=RUZDneAgD3Wikhby" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground leading-relaxed hover:text-secondary transition-colors"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[400px] bg-white rounded-3xl overflow-hidden shadow-sm border border-muted relative group">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
