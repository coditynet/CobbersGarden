"use client";
import { useState } from "react";
import Image from "next/image";

const BlurImage = ({ src, alt, ...props }: any) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      className={`
        duration-700 ease-in-out
        ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
        ${props.className || ''}
      `}
      onLoadingComplete={() => setLoading(false)}
    />
  );
};

export default BlurImage; 