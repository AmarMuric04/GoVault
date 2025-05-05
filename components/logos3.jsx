// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";
import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Computer } from "lucide-react";

const Logos3 = ({
  subheading = "Technology",
  heading = "Built with these open-source technologies",

  logos = [
    {
      id: "react",
      description: "React",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg",
      className: "h-12 w-auto",
    },
    {
      id: "nextjs",
      description: "Next.js",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
      className: "h-12 w-auto",
    },
    {
      id: "tailwind",
      description: "Tailwind CSS",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain-wordmark.svg",
      className: "h-30 w-auto",
    },
    {
      id: "mongodb",
      description: "MongoDB",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg",
      className: "h-12 w-auto",
    },
    {
      id: "nodejs",
      description: "Node.js",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg",
      className: "h-12 w-auto",
    },
    {
      id: "express",
      description: "Express.js",
      image:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg",
      className: "h-12 w-auto",
    },
    {
      id: "vercel",
      description: "Vercel",
      image: "https://shadcnblocks.com/images/block/logos/vercel-wordmark.svg",
      className: "h-7 w-auto",
    },
  ],
}) => {
  return (
    <section className="py-20 pb-48 container mx-auto max-w-screen-xl flex flex-col">
      <div className="container flex flex-col items-center text-center md:items-start md:text-start">
        <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm font-medium rounded-full w-fit bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
          <Computer className="w-4 h-4 mr-2" />
          <span>{subheading}</span>
        </div>
        <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">{heading}</h2>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-screen-xl overflow-hidden bg-white p-2 rounded-md">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div>
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={logo.className}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
