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
      id: "javascript",
      description: "Javascript",
      image: "https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "react",
      description: "React",
      image: "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "nextjs",
      description: "Next.js",
      image: "https://www.vectorlogo.zone/logos/nextjs/nextjs-icon.svg",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "tailwind",
      description: "Tailwind CSS",
      image:
        "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "mongodb",
      description: "MongoDB",
      image: "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "vercel",
      description: "Vercel",
      image: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "nextauth",
      description: "NextAuth.js",
      image: "https://next-auth.js.org/img/logo/logo-sm.png",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "typescript",
      description: "TypeScript",
      image:
        "https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "html",
      description: "HTML5",
      image: "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "css",
      description: "CSS3",
      image: "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon~old.svg",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "prettier",
      description: "Prettier",
      image: "https://prettier.io/icon.png",
      className: "h-18 my-4 w-auto",
    },
    {
      id: "eslint",
      description: "ESLint",
      image: "https://www.vectorlogo.zone/logos/eslint/eslint-icon.svg",
      className: "h-18 my-4 w-auto",
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
        <div className="relative mx-auto flex items-center justify-center lg:max-w-screen-xl overflow-hidden bg-accent p-2 rounded-md">
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
