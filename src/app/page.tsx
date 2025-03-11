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
      <Developers/>
      <AboutUs/>      
    </>
  );
}
