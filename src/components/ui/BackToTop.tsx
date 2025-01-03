"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
      
      const button = document.querySelector('#back-to-top-btn');
      const footer = document.querySelector('footer');
      
      if (button && footer) {
        const buttonRect = button.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        
        setIsOverFooter(buttonRect.bottom > footerRect.top);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      id="back-to-top-btn"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-4 rounded-full bg-garden-primary/90 text-white shadow-lg hover:bg-garden-accent transition-all duration-300 transform hover:scale-110 backdrop-blur-sm aspect-square w-14 h-14 flex items-center justify-center ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      } ${
        isOverFooter 
          ? 'bg-garden-primary/80 hover:bg-garden-primary/90 border-2 border-garden-accent/70 shadow-[0_0_10px_rgba(144,238,144,0.3)]' 
          : 'bg-garden-primary/90 hover:bg-garden-accent'
      }`}
      aria-label="Zurück nach oben">
      <Image 
        src="/assets/img/cobbers_tree.png" 
        alt="Back to top"
        width={13}
        height={13}
        className="invert brightness-0 invert"
      />
    </button>
  );
};

export default BackToTop;
