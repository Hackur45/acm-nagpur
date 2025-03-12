import HeroSection from "@/components/HeroSection";
import EventsSection from "@/components/EventSection";
import ChapterCarousel from "@/components/ChapterCarousel";
import AboutUs from "@/components/AboutUs";
import Developers from "@/components/Developer";
export default function Home() {
  return (
    <>
      <HeroSection />
      <EventsSection/>
      <ChapterCarousel/>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>

      <Developers/>
      <AboutUs/>      
    </>
  );
}
