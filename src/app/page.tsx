import Booking from "@/components/landing/Booking";
import Contact from "@/components/landing/Contact";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Booking />
      <Contact />
    </div>
  );
}
