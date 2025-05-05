import { Cpu, User, Zap } from "lucide-react";
import Image from "next/image";
import { Marquee3D } from "./magicui/marquee3d";

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="container mx-auto max-w-screen-xl space-y-8 px-6 md:space-y-16">
        <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm font-medium rounded-full w-fit bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          <User className="w-4 h-4 mr-2" />
          <span>Testimonials</span>
        </div>
        <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
          Hear what our users are saying.
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative space-y-4 max-w-xl">
            <p className="text-muted-foreground">
              Our community spans developers, creators, and businesses.{" "}
              <span className="text-accent-foreground font-bold">
                Their voices shape our journey
              </span>{" "}
              and their feedback drives our growth.
            </p>
            <p className="text-muted-foreground">
              Here's what they have to say about working with GoVault — from the
              tools they love to the impact we've helped create.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-6 sm:gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="size-4" />
                  <h3 className="text-sm font-medium">Lightning Fast</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  “The performance blew us away. Everything feels instant.”
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="size-4" />
                  <h3 className="text-sm font-medium">Super Capable</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  “GoVault's tools let us scale without compromising on
                  quality.”
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-6 sm:mt-0 overflow-hidden">
            <Marquee3D />
          </div>
        </div>
      </div>
    </section>
  );
}
