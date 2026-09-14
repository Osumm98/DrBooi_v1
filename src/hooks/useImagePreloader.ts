"use client";

import { useState, useEffect } from "react";

export const useImagePreloader = (folderPath: string, frameCount: number, format: string = "jpg") => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    // Reset state on unmount or folderPath change
    setIsLoaded(false);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameString = i.toString().padStart(3, "0");
      img.src = `${folderPath}/ezgif-frame-${frameString}.${format}`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(imgArray);
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
      };

      imgArray.push(img);
    }

    return () => {
      imgArray.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [folderPath, frameCount, format]);

  return { images, isLoaded };
};
