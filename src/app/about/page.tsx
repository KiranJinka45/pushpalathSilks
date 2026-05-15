import { Heart, ShieldCheck, MapPin, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <section className="py-32 bg-neutral-950 text-center relative overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 bg-[url('/placeholder-saree.jpg')] opacity-10 bg-cover bg-center grayscale" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-[0.3em] text-primary">Our Story</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light italic leading-relaxed">
            &quot;Preserving the legacy of South Indian silk weaving since generations.&quot;
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-3xl border border-primary/10 group-hover:border-primary/30 transition-all duration-700">
                <img 
                  src="/placeholder-saree.jpg" 
                  alt="Traditional Saree Weaving"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 bg-neutral-900 p-12 rounded-[2rem] shadow-3xl border-2 border-primary/20 hidden xl:block backdrop-blur-xl">
                <p className="text-primary text-6xl font-black mb-2 tracking-tighter">100%</p>
                <p className="text-muted-foreground font-black uppercase tracking-[0.2em] text-xs">Authentic Handloom Silk</p>
              </div>
            </div>
            
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 uppercase tracking-widest leading-tight">
                  Authentic Heritage <br />& Artistry
                </h2>
                <div className="h-1.5 w-24 bg-secondary mb-10" />
                <p className="text-muted-foreground text-xl leading-relaxed mb-8 font-light">
                  Pushpalatha Silks is a trusted saree sanctuary located in the historic weaving heart of <span className="text-primary font-medium">Dharmavaram</span>. We specialize in the finest hand-woven silk sarees that define the rich cultural soul of South India.
                </p>
                <p className="text-muted-foreground text-xl leading-relaxed font-light">
                  Every saree in our collection is a masterpiece, meticulously crafted by master weavers who have perfected the art of silk across decades. From the vibrant shades of Kanchipuram to the heavy gold borders of Dharmavaram, we bring you the pinnacle of tradition.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10 border-t border-primary/10">
                <div className="flex items-start space-x-5">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary flex-shrink-0 border border-primary/20">
                    <Heart size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-primary mb-2 uppercase tracking-widest text-xs">Crafted with Love</h4>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">Every thread is woven with passion and technical precision.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-5">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary flex-shrink-0 border border-primary/20">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-primary mb-2 uppercase tracking-widest text-xs">Verified Purity</h4>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">We guarantee the absolute purity of our silk and gold zari.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Bar */}
      <section className="py-20 bg-neutral-900/50 backdrop-blur-md border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0 text-center md:text-left">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=14.425160598079037,77.73109127589137"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-6 group"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition-all">
                <MapPin size={32} />
              </div>
              <div>
                <p className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-1">Visit Our Legacy</p>
                <p className="text-muted-foreground text-lg font-light tracking-wide">Siva Nagar, Dharmavaram, Andhra Pradesh</p>
              </div>
            </a>
            <div className="flex items-center space-x-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                <Truck size={32} />
              </div>
              <div>
                <p className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-1">Global Shipping</p>
                <p className="text-muted-foreground text-lg font-light tracking-wide">Serving Elegance Across India & Internationally</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
