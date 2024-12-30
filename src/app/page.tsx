"use client";

import Benefits from "@/components/landing/Benefits";
import Booking from "@/components/landing/Booking";
import Contact from "@/components/landing/Contact";
import Hero from "@/components/landing/Hero";
import Team from "@/components/landing/Team";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
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
  );
}
