"use client";

import { useState, useEffect } from "react";
import posthog from 'posthog-js';
import { v4 as uuidv4 } from 'uuid';
import Benefits from "@/components/landing/Benefits";
import Booking from "@/components/landing/Booking";
import Contact from "@/components/landing/Contact";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import BackToTop from "@/components/ui/BackToTop";
import Navigation from "@/components/global/Navigation";
import Footer from "@/components/global/Footer";
import Testimonials from "@/components/landing/Testimonials";
import Team from "@/components/landing/Team";
import AdminBanner from "@/components/global/AdminBanner";
import News from "@/components/landing/News";

export default function Home() {
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    const visitorId = localStorage.getItem('visitorId') || uuidv4();
    localStorage.setItem('visitorId', visitorId);

    posthog.identify(visitorId, {
      first_visit: new Date().toISOString(),
      source: document.referrer || 'direct',
      userAgent: navigator.userAgent,
      language: navigator.language,
    });
    
    setIsPageReady(true);
  }, []);

  useEffect(() => {
    if (isPageReady) {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    }
  }, [isPageReady]); 

  return (
    <>
      <AdminBanner />
      <Navigation />
      <div>
        <Hero />
        <Benefits />
        <Services />
        <News />
        <Booking />
        <Team />
        <Testimonials />
        <Contact />
        <BackToTop />
      </div>
      <Footer />
    </>
  );
}
