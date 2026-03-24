import HeroSection from "@/components/home/HeroSection";
import ProductSection from "@/components/home/ProductSection";
import { PromoBannerDual, PromoBannerWide } from "@/components/home/PromoBanners";
import CategoriesSection from "@/components/home/CategoriesSection";
import BlogSection from "@/components/home/BlogSection";
import Newsletter from "@/components/home/Newsletter";
export default function Home() {
    return (<>
      <HeroSection />
      <ProductSection title="Featured Products" limit={5}/>
      <PromoBannerDual />
      <ProductSection title="Best Sellers" filter={(p) => p.rating >= 4.5} limit={5}/>
      <PromoBannerWide />
      <CategoriesSection />
      <ProductSection title="New Products" filter={(p) => p.badge === "New" || p.badge === "Hot"} limit={5}/>
      <BlogSection />
      <Newsletter />
    </>);
}
