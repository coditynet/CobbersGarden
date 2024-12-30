"use client";

import Benefits from "@/components/landing/Benefits";
import Booking from "@/components/landing/Booking";
import Contact from "@/components/landing/Contact";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <Benefits />
      <Services />
      <HowItWorks />
      <Booking />
      <Testimonials />
      <Contact />
    </div>
  );
}
