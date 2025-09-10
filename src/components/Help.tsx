"use client";

import { motion, px } from "framer-motion";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function useScrollTrigger(threshold = 50) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const isAtTop = scrollY < threshold;

      const isAtBottom = scrollY + windowHeight >= docHeight - 50;
      console.log({ scrollY, windowHeight, docHeight, isAtBottom });

      if (isAtTop || isAtBottom) {
        setIsCollapsed(false); 
      } else {
        setIsCollapsed(true); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isCollapsed;
}

export default function Advice() {
    const isScrolled = useScrollTrigger(50);
    return (
        <div>
        <motion.div
      initial={false}
      animate={isScrolled ? "collapsed" : "expanded"}
      variants={{
        expanded: { width: "180px", borderRadius: "8px" },
        collapsed: { width: 50, borderRadius: "500px" },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed bottom-8 right-5 z-50 bg-green-500 overflow-hidden"
    >
      <Link
        href="/"
        className="flex items-center justify-center px-4 py-2 text-white"
      >

        <motion.div 
          variants={{
            expanded: { opacity: 0, x: -80 }, 
            collapsed: { opacity: 1, x: 85 }, 
          }}
          className="flex-shrink-0"
        >
          <User size={30} />
        </motion.div>


        <motion.span
          className="ml-2 whitespace-nowrap"
          variants={{
            expanded: { opacity: 1, x: -18 },
            collapsed: { opacity: 1, x: 90 },
          }}
          transition={{ duration: 0.2 }}
        >
          Demander à des pros
        </motion.span>
      </Link>
    </motion.div>
  </div>
    );
}