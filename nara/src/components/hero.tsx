"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Upload,
  Map,
  Sparkles,
  FlameIcon as Fire,
  BookOpen,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentGradient, setCurrentGradient] = useState(0);

  const gradients = [
    "from-amber-900/40 via-yellow-900/30 to-amber-800/40",
    "from-yellow-900/40 via-amber-900/30 to-yellow-800/40",
    "from-amber-800/40 via-yellow-800/30 to-amber-900/40",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-screen batik background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat batik-bg"
        style={{
          backgroundImage: "url(/images/batik-pattern-brown.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-amber-900/20 to-black/40" />

      {/* Enhanced Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[currentGradient]} transition-all duration-2000`}
      />

      {/* Text readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Enhanced floating elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${8 + i * 0.8}s`,
            }}
          >
            <div className="w-12 h-12 relative">
              <Image
                src="/images/logo.svg"
                alt="Floating Nenek"
                width={48}
                height={48}
                className="w-full h-full object-contain opacity-60"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Javanese script floating elements */}
      <div className="absolute inset-0">
        {["ꦲ", "ꦤ", "ꦕ", "ꦫ", "ꦏ", "ꦢ", "ꦠ", "ꦱ", "ꦮ", "ꦭ"].map((char, i) => (
          <div
            key={char}
            className="absolute text-2xl font-bold text-amber-200/15 animate-float cursor-hover indonesiana-decorative"
            style={{
              left: `${10 + i * 9}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${6 + i * 0.3}s`,
            }}
          >
            {char}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div
          className={`mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Enhanced Logo and Title Section with better contrast */}
          <div className="relative inline-block mb-12">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="relative w-40 h-40 group">
                <Image
                  src="/images/logo.svg"
                  alt="Nara Logo"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                />
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/50 to-yellow-500/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />

                {/* Pulsing ring effect */}
                <div className="absolute inset-0 border-4 border-amber-400/40 rounded-full animate-ping" />
                <div className="absolute inset-4 border-2 border-yellow-400/30 rounded-full animate-pulse" />
              </div>

              <div className="text-left">
                {/* <div className="relative">
                  <h1
                    className="text-8xl md:text-9xl font-bold mb-4 tracking-tight animate-gradient drop-shadow-2xl indonesiana-title"
                    style={{
                      background:
                        "linear-gradient(135deg, #f7e6a3 0%, #d4af37 25%, #b8860b 50%, #8b4513 75%, #654321 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow:
                        "2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(212, 175, 55, 0.5)",
                      filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.8))",
                    }}
                  >
                    Nara
                  </h1>
                  <h1
                    className="absolute top-0 left-0 text-8xl md:text-9xl font-bold mb-4 tracking-tight indonesiana-title"
                    style={{
                      WebkitTextStroke: "2px #8b4513",
                      WebkitTextFillColor: "transparent",
                      zIndex: -1,
                    }}
                  >
                    Nara
                  </h1>
                </div> */}
                <h1
                  className="text-8xl md:text-9xl font-bold mb-4 tracking-tight animate-gradient drop-shadow-2xl indonesiana-title"
                  style={{
                    background:
                      "linear-gradient(135deg, #f5deb3 0%, #deb887 25%, #d2b48c 50%, #c19a6b 75%, #a0522d 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Nara
                </h1>

                <p
                  className="text-3xl md:text-4xl font-medium animate-fade-in-up drop-shadow-lg nusantara-subtitle text-amber-100 mb-2"
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  nenek nusantara
                </p>
                {/* Javanese script subtitle with better contrast */}
                <p
                  className="text-xl font-medium mt-2 text-amber-200 drop-shadow-lg indonesiana-decorative"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                >
                  ꦤꦫ - ꦤꦺꦤꦺꦏ꧀ ꦤꦸꦱꦤ꧀ꦠꦫ
                </p>
              </div>
            </div>

            {/* Enhanced floating decorations */}
            <div className="absolute -top-8 -right-8">
              <Sparkles className="w-12 h-12 text-yellow-400 animate-pulse drop-shadow-lg" />
            </div>
            <div className="absolute -bottom-4 -left-4">
              <Fire className="w-10 h-10 text-amber-500 animate-bounce drop-shadow-lg" />
            </div>
          </div>

          {/* Enhanced description with better contrast */}
          <div className="max-w-4xl mx-auto mb-12">
            <p
              className="text-xl md:text-2xl leading-relaxed animate-fade-in-up animation-delay-200 mb-6 poppins-light text-amber-100"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
            >
              Preserving the rich tapestry of Indonesian oral traditions through
              the wisdom of our grandmothers and the power of modern technology
            </p>

            {/* New gamification teaser with brown theme */}
            <div className="bg-amber-50/95 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-800 shadow-2xl inline-block">
              <div className="flex items-center gap-4 text-amber-900">
                <BookOpen className="w-8 h-8 text-amber-800" />
                <div className="text-left">
                  <p className="font-bold text-lg">Learn Javanese Scripts</p>
                  <p className="text-sm poppins-regular">
                    Interactive gamified learning experience
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-700 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced feature cards with brown theme */}
        {/* <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            {
              icon: Mic,
              label: "Record Stories",
              color: "from-amber-600 to-yellow-700",
              javanese: "ꦫꦺꦏꦩ꧀",
            },
            {
              icon: Upload,
              label: "Upload Audio",
              color: "from-yellow-700 to-amber-800",
              javanese: "ꦲꦥ꧀ꦭꦺꦴꦢ꧀",
            },
            {
              icon: BookOpen,
              label: "Learn Scripts",
              color: "from-amber-800 to-yellow-600",
              javanese: "ꦱꦶꦤꦸ",
            },
            {
              icon: Map,
              label: "Explore Map",
              color: "from-yellow-600 to-amber-700",
              javanese: "ꦗꦗꦃ",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group bg-amber-50/95 backdrop-blur-sm rounded-2xl p-8 border-2 border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-medium text-amber-900 group-hover:text-yellow-800 transition-colors mb-2 poppins-medium">
                {item.label}
              </p>
              <p className="text-xs text-amber-700 font-medium indonesiana-decorative">
                {item.javanese}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
