"use client";

import Benefits from "@/components/landing/Benefits";
import Booking from "@/components/landing/Booking";
import Contact from "@/components/landing/Contact";
import Hero from "@/components/landing/Hero";
import Team from "@/components/landing/Team";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";
import BackToTop from "@/components/ui/BackToTop";
import Navigation from "@/components/global/Navigation";
import Footer from "@/components/global/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
    <div>
      <Hero />
      <Benefits />
      <Services />
      <Team />
      <Booking />
      <Testimonials />
      <Contact />
      <BackToTop />
    </div>
    <Footer />
    </>
  );
}
