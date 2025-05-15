"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  size: "medium" | "large";
  index: number;
  images?: string[];
  longDescription?: string;
  contributions?: React.ReactNode;
}

export function ProjectCard({
  title,
  description,
  link,
  size,
  index,
  images,
  longDescription = "A more detailed description of this project will be added soon.",
  contributions,
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(link);
  };

  const CardContent = () => (
    <div className="absolute inset-0">
      {images && images.length > 0 && (
        <div className="absolute inset-0">
          <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2 p-2">
            {images.slice(0, 4).map((image, i) => (
              <div
                key={i}
                className="relative w-full h-full overflow-hidden rounded-xl border border-white/[0.08] bg-black/50"
              >
                <Image
                  src={image}
                  alt={`${title} screenshot ${i + 1}`}
                  fill
                  className="object-cover brightness-[0.6] md:brightness-[0.85]"
                />
              </div>
            ))}
            {Array.from({ length: Math.max(0, 4 - (images?.length || 0)) }).map(
              (_, i) => (
                <div
                  key={`placeholder-${i}`}
                  className="rounded-xl border border-white/[0.08] bg-black/50"
                />
              )
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/40" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] to-transparent opacity-30" />
      <div className="absolute inset-0 bg-radial-gradient opacity-40" />

      <div className="absolute inset-0 px-6 py-1 md:p-8 flex flex-col justify-end">
        <div>
          <h3 className="text-xl md:text-2xl text-white/95 font-mono mb-2 md:mb-3">
            {title}
          </h3>
          <p className="text-sm text-white/90 font-mono max-w-[90%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  const BackContent = () => (
    <div className="h-full flex flex-col p-6 overflow-hidden">
      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-white/90 font-mono">{title}</h3>
          <button
            onClick={handleLinkClick}
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm font-mono"
          >
            {link.includes('github') ? 'View Github' : 'View Project'} <ArrowUpRight size={14} />
          </button>
        </div>
        <p className="text-white/60 font-mono text-xs leading-relaxed">
          {longDescription}
        </p>
        {contributions && (
          <div className="space-y-2">
            <h4 className="text-white/80 font-mono text-xs">Overview:</h4>
            <div className="text-white/60 font-mono text-xs leading-relaxed">
              {contributions}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`group ${size === "large" ? "md:col-span-2" : ""}`}>
      <div className="md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <div className="relative w-full cursor-pointer">
              <div className="relative rounded-3xl overflow-hidden border border-white/[0.08]">
                <div
                  className={`relative overflow-hidden rounded-3xl ${
                    size === "large" ? "aspect-[16/10]" : "aspect-[16/10]"
                  } bg-[#0A0A0B]`}
                >
                  <CardContent />
                </div>
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <DrawerTitle className="text-xl font-mono text-white/90">
                    {title}
                  </DrawerTitle>
                  <button
                    onClick={handleLinkClick}
                    className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm font-mono"
                  >
                    {link.includes('github') ? 'View Github' : 'View Project'} <ArrowUpRight size={14} />
                  </button>
                </div>
                <p className="text-white/60 font-mono text-xs leading-relaxed">
                  {longDescription}
                </p>
              </DrawerHeader>
              <div className="px-4 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                {contributions && (
                  <div className="space-y-2">
                    <h4 className="text-white/80 font-mono text-xs">Overview:</h4>
                    <div className="text-white/60 font-mono text-xs leading-relaxed">
                      {contributions}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:block">
        <motion.div
          onClick={handleClick}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 70,
            damping: 15,
          }}
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full cursor-pointer"
        >
          <div
            className={`w-full ${isFlipped ? "pointer-events-none" : ""}`}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              position: isFlipped ? "absolute" : "relative",
              top: 0,
              left: 0,
            }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.08]">
              <div
                className={`relative overflow-hidden rounded-3xl ${
                  size === "large" ? "aspect-[16/10]" : "aspect-[16/10]"
                } bg-[#0A0A0B]`}
              >
                <CardContent />
              </div>
            </div>
          </div>

          <div
            className={`w-full ${!isFlipped ? "pointer-events-none" : ""}`}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: !isFlipped ? "absolute" : "relative",
              top: 0,
              left: 0,
            }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.08]">
              <div
                className={`relative overflow-hidden rounded-3xl ${
                  size === "large" ? "aspect-[16/10]" : "aspect-[16/10]"
                } bg-[#0A0A0B]`}
              >
                <BackContent />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
