"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";

interface SceneCanvasProps {
  folderPath: string;
  frameCount: number;
  scrollYProgress: MotionValue<number>;
  fallbackColor?: string;
}

export function SceneCanvas({ folderPath, frameCount, scrollYProgress, fallbackColor = "#020617" }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, isLoaded } = useImagePreloader(folderPath, frameCount, "jpg");

  // Map 0 -> 1 scroll progress to 0 -> frameCount-1
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useEffect(() => {
    if (!isLoaded || images.length === 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Helper to draw current frame
    const renderFrame = (index: number) => {
      const img = images[Math.floor(index)];
      if (!img) return;
      
      // Calculate responsive sizing (cover behavior)
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgAspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.fillStyle = fallbackColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndex.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial render

    // Subscribe to scroll updates
    const unsubscribe = frameIndex.on("change", (latest) => {
      requestAnimationFrame(() => renderFrame(latest));
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [images, isLoaded, frameIndex, fallbackColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
    />
  );
}
