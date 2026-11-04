
import { ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <section className="bg-[#f4f4f1] min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Hero Text */}
        <div>
          <p className="uppercase tracking-[0.3em] text-sm font-semibold text-gray-500 mb-6">
            Step Into Your Style
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
            WALK YOUR
            <br />
            OWN <span className="text-gray-400">WAY.</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-md leading-relaxed">
            Discover footwear that matches your personality.
            Fresh styles, everyday comfort and confidence in
            every step.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#shop"
              className="inline-flex items-center gap-3 rounded-full bg-[#b78b5d] px-6 py-3 text-sm font-semibold tracking-[0.12em] text-white uppercase shadow-lg shadow-[#b78b5d]/25 transition hover:-translate-y-0.5 hover:bg-[#9d7448]"
            >
              Shop Collection
              <ArrowRight size={17} />
            </a>

            <a
              href="#categories"
              className="inline-flex items-center rounded-full border border-[#b78b5d]/30 bg-[#f7f2ec] px-6 py-3 text-sm font-semibold tracking-[0.12em] text-[#3f2e22] uppercase shadow-sm transition hover:-translate-y-0.5 hover:border-[#b78b5d] hover:bg-[#efe3d6]"
            >
              Explore Categories
            </a>
          </div>

          <div className="mt-12 flex gap-10">
            <div>
              <h3 className="text-2xl font-bold">Style</h3>
              <p className="text-sm text-gray-500">Everyday fashion</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Comfort</h3>
              <p className="text-sm text-gray-500">Made for movement</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="bg-[#e7e7e2] rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000"
              alt="Red Nike-style sneaker"
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
          </div>

          <div className="absolute bottom-6 left-6 bg-white px-6 py-4 shadow-lg">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              JEYLEY COLLECTION
            </p>
            <p className="font-bold mt-1">Street Style. Everyday Confidence.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
