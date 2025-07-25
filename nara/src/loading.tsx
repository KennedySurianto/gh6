"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 flex items-center justify-center">
      <div className="text-center">
        {/* Animated NARA Logo */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center animate-bounce">
            <Image
              src="/mascot-nara.png"
              alt="NARA Mascot"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-300 rounded-full animate-ping"></div>
        </div>

        {/* App Title */}
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Aksara Jawa
        </h1>
        <p className="text-xl text-orange-100 mb-8 drop-shadow">
          Belajar bersama NARA
        </p>

        {/* Loading Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-white/30 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div
              className="bg-gradient-to-r from-white to-yellow-200 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white mt-4 font-medium">{progress}%</p>
        </div>

        {/* Loading Messages */}
        <div className="mt-8">
          <p className="text-orange-100 animate-pulse">
            {progress < 30 && "Memuat aksara Jawa..."}
            {progress >= 30 && progress < 60 && "Menyiapkan pelajaran..."}
            {progress >= 60 && progress < 90 && "Mengaktifkan NARA..."}
            {progress >= 90 && "Siap belajar!"}
          </p>
        </div>
      </div>
    </div>
  );
}
