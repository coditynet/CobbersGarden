"use client";

import { useEffect } from "react";
import posthog from 'posthog-js';
import { v4 as uuidv4 } from 'uuid';
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
  useEffect(() => {
    // Generate a unique ID for the visitor if they don't have one
    const visitorId = localStorage.getItem('visitorId') || uuidv4();
    localStorage.setItem('visitorId', visitorId);

    // Identify the user in PostHog
    posthog.identify(visitorId, {
      first_visit: new Date().toISOString(),
      source: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      language: navigator.language,
    });
  }, []);

  return (
    <>
      <Navigation />
      <div>
        <Hero />
        <Benefits />
        <Services />
        <Team />
        <Booking />
        <Contact />
        <BackToTop />
      </div>
      <Footer />
    </>
  );
}
