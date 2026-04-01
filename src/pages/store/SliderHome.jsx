import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "50% OFF",
    desc: "Limited time deal",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
  },
  {
    title: "New Collection",
    desc: "Explore latest products",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  {
    title: "Mega Sale",
    desc: "Up to 70% discount",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

export default function SliderHome() {
  return (
   <div className="w-full h-[180px] md:h-[500px]">

  <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    pagination={{ clickable: true }}
    loop
    speed={900}
    className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl"
  >
    {slides.map((slide, i) => (
      <SwiperSlide key={i}>
        
        <div className="relative w-full h-full group">

          {/* ✅ IMAGE PERFECT FOR SMALL HEIGHT */}
          <img
            src={slide.img}
            alt="banner"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
          />

          {/* OVERLAY (thoda light kiya for small height) */}
          <div className="absolute inset-0 bg-black/50" />

          {/* ✅ TEXT (SMALL HEIGHT OPTIMIZED) */}
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-4 md:left-20 -translate-y-1/2 text-white z-10"
          >
            {/* SMALL TEXT */}
            <h2 className="text-lg md:text-5xl font-bold">
              {slide.title}
            </h2>

            {/* HIDE DESC ON SMALL HEIGHT */}
            <p className="hidden md:block text-lg mt-2 text-gray-200">
              {slide.desc}
            </p>

            {/* SMALL BUTTON */}
            <Link to="/shop">
              <button className="mt-2 md:mt-6 flex items-center gap-2 bg-white text-black px-3 py-1 md:px-6 md:py-3 rounded-full text-xs md:text-base font-semibold hover:bg-gray-200 transition">
                Shop <ArrowRight size={14} />
              </button>
            </Link>
          </motion.div>

        </div>
      </SwiperSlide>
    ))}
  </Swiper>

</div>
  );
}