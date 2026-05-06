import { Heart, ShieldCheck, MapPin, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-[0.2em]">Our Story</h1>
          <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto italic">
            Preserving the legacy of South Indian silk weaving since generations.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/placeholder-saree.jpg" 
                  alt="Traditional Saree Weaving"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-secondary p-10 rounded-2xl shadow-xl hidden lg:block">
                <p className="text-white text-5xl font-bold mb-2">100%</p>
                <p className="text-white/80 font-bold uppercase tracking-widest text-sm">Authentic Silk</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8 uppercase tracking-widest leading-tight">
                Authentic Dharmavaram & <br />Kanchipuram Heritage
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Pushpalatha Silks is a trusted saree shop located in the historic weaving town of Dharmavaram, Andhra Pradesh. We specialize in the finest hand-woven silk sarees that reflect the rich cultural heritage of South India.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                Every saree in our collection is a masterpiece, crafted by skilled artisans who have perfected the art of silk weaving over decades. From the vibrant colors of Kanchipuram to the heavy gold borders of Dharmavaram, we bring you the soul of tradition.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-muted rounded-xl text-primary flex-shrink-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-sm">Crafted with Love</h4>
                    <p className="text-sm text-muted-foreground">Every thread is woven with passion and precision.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-muted rounded-xl text-primary flex-shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2 uppercase tracking-wide text-sm">Verified Quality</h4>
                    <p className="text-sm text-muted-foreground">We guarantee the purity of our silk and zari.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Bar */}
      <section className="py-12 bg-muted/30 border-y border-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=14.425160598079037,77.73109127589137"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
            >
              <MapPin size={28} className="text-primary" />
              <div>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">Our Presence</p>
                <p className="text-muted-foreground">Siva Nagar, Dharmavaram, Andhra Pradesh</p>
              </div>
            </a>
            <div className="flex items-center space-x-4">
              <Truck size={28} className="text-primary" />
              <div>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">Delivery Status</p>
                <p className="text-muted-foreground">Available across India & International</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
