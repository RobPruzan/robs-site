"use client"

import Image from "next/image";

export const IntegrationsGrid = () => {
  const images = [
    {
      src: "/devlog/6/bolt-int.png",
      alt: "Bolt integration",
      title: "Bolt"
    },
    {
      src: "/devlog/6/lovable-int.png",
      alt: "Lovable integration",
      title: "Lovable"
    },
    {
      src: "/devlog/6/same-int.png",
      alt: "Same integration",
      title: "Same"
    },
    {
      src: "/devlog/6/v0-int.png",
      alt: "V0 integration",
      title: "V0"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-6">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col border-2 border-[#333333] rounded-md overflow-hidden bg-black">
          <div className="bg-[#222222] text-white font-medium py-1 px-2 text-center">
            {image.title}
          </div>
          <div className="relative flex items-center justify-center p-2 h-[180px] sm:h-[220px]">
            <Image
              src={image.src}
              alt={image.alt}
              className="object-contain max-h-full max-w-full"
              width={400}
              height={200}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
