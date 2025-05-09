import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Shield, Key, CheckCircle } from "lucide-react";
import Logo from "@/public/TheLogo.png";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-400 via-primary to-slate-400 z-0" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-violet-600/20 blur-3xl transform -translate-y-1/2 rounded-full z-0" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/20 blur-3xl transform translate-x-1/3 translate-y-1/3 rounded-full z-0" />
      <div className="container relative z-10 px-4 py-16 mx-auto lg:py-24 max-w-screen-xl mt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center text-center md:items-start md:text-start">
          {/* Left column - Content */}
          <div className="flex flex-col max-w-xl items-center text-center md:items-start md:text-start">
            <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm font-medium rounded-full w-fit bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">
              <Shield className="w-4 h-4 mr-2" />
              <span>Bank-level encryption</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Never forget a{" "}
              <span className="relative">
                <span className="text-secondary">password</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-secondary/40 dark:bg-secondary/40 -z-10 rounded-lg"></span>
              </span>{" "}
              again
            </h1>

            <p className="mb-8 text-lg text-white">
              Secure, simple, and synchronized across all your devices. Our
              password manager keeps your digital life protected with
              military-grade encryption while making access effortless.
            </p>

            <div className="space-y-4 mb-8 items-center text-center md:items-start md:text-start">
              <div className="flex items-start">
                <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-white" />
                <p className="text-white">
                  Store unlimited passwords with end-to-end encryption
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-white" />
                <p className="text-white">
                  Auto-fill logins on any website or app with one click
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-white" />
                <p className="text-white">
                  Sync across all your devices - desktop, mobile, and browsers
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white"
              >
                Join Us
              </Button>
              <Button variant="link" size="lg" className="h-12 px-8 text-white">
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right column - Visual */}
          <div className="relative flex items-center justify-center">
            {/* Background glow effect */}
            <div className="absolute w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl" />

            {/* Password manager interface mockup */}
            <div className="relative z-10 w-full max-w-md overflow-hidden bg-white rounded-xl shadow-2xl dark:bg-slate-800">
              {/* App header */}
              <div className="flex items-center justify-between p-4">
                <h1 className="text-sm">Dashboard</h1>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                </div>
              </div>

              {/* App content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    MY PASSWORDS
                  </h3>
                  <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full dark:bg-teal-900/30">
                    <Key className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>

                {/* Password entries */}
                {[
                  {
                    site: "Google",
                    email: "user@example.com",
                    strength: "strong",
                  },
                  {
                    site: "Amazon",
                    email: "user@example.com",
                    strength: "medium",
                  },
                  {
                    site: "Netflix",
                    email: "user@example.com",
                    strength: "strong",
                  },
                  {
                    site: "Twitter",
                    email: "user@example.com",
                    strength: "weak",
                  },
                  {
                    site: "Bank of America",
                    email: "user@example.com",
                    strength: "strong",
                  },
                ].map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 mb-2 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 text-white rounded-md bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800">
                        {entry.site[0]}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {entry.site}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {entry.email}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-16 h-1.5 rounded-full ${
                        entry.strength === "strong"
                          ? "bg-green-500"
                          : entry.strength === "medium"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>
                ))}

                <Button className="w-full">Add New Password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Hero };
