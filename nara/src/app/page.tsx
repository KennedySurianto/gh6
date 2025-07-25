"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Users,
  User,
  BookOpen,
  Trophy,
  ArrowRight,
  Play,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero";
import useFirebaseUser from "@/hooks/useFirebaseUser";

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-orange-500" />,
    title: "Pelajaran Interaktif",
    description:
      "Belajar aksara Jawa dengan metode yang menyenangkan dan mudah dipahami",
  },
  {
    icon: <Play className="w-8 h-8 text-blue-500" />,
    title: "Latihan Menulis",
    description: "Berlatih menulis aksara dengan canvas digital yang responsif",
  },
  {
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    title: "Sistem Gamifikasi",
    description: "Dapatkan XP, badge, dan naik level sambil belajar",
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "Kompetisi Sehat",
    description: "Bersaing dengan teman di leaderboard dan tantangan harian",
  },
];

const testimonials = [
  {
    name: "Sari Dewi",
    role: "Pelajar SMA",
    content:
      "Aplikasi ini sangat membantu saya memahami aksara Jawa. NARA sangat lucu dan memotivasi!",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Guru Bahasa Jawa",
    content:
      "Metode pembelajaran yang inovatif. Siswa saya jadi lebih antusias belajar aksara Jawa.",
    rating: 5,
  },
  {
    name: "Maya Putri",
    role: "Mahasiswa",
    content:
      "Fitur gamifikasi membuat belajar jadi tidak membosankan. Highly recommended!",
    rating: 5,
  },
];

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const user = useFirebaseUser();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full shadow-md flex items-center justify-center">
                <Image
                  src="/mascot-nara.png"
                  alt="NARA"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Nenek Nusantara
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-orange-600 poppins-reguler flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Practice
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-orange-600 poppins-reguler flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-gray-700 hover:text-orange-600 poppins-reguler"
                    >
                      Masuk
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg">
                      Daftar Gratis
                    </Button>
                  </Link>
                </>
              )}
            </div>  
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">
                🎉 Platform Pembelajaran #1 di Indonesia
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Belajar{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                  Aksara Jawa
                </span>{" "}
                dengan Mudah
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Bergabunglah dengan ribuan pelajar yang sudah menguasai aksara
                Jawa bersama NARA, maskot AI yang akan memandu perjalanan
                belajarmu dengan cara yang menyenangkan!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    Mulai Belajar Gratis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    Lihat Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Pelajar Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">25+</div>
                  <div className="text-sm text-gray-600">Pelajaran</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl blur-3xl opacity-20"></div>
                <Card className="relative bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <Image
                          src="/mascot-nara.png"
                          alt="NARA Mascot"
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Halo! Aku NARA
                      </h3>
                      <p className="text-gray-600">
                        Aku akan membantu kamu belajar aksara Jawa dengan cara
                        yang menyenangkan!
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-700">
                          Pelajaran interaktif dan mudah dipahami
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-700">
                          Latihan menulis dengan teknologi AI
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-purple-500" />
                        <span className="text-sm text-gray-700">
                          Sistem reward dan achievement
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih Aksara Jawa?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform pembelajaran aksara Jawa yang dirancang khusus untuk
              generasi digital dengan teknologi terdepan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-xl text-gray-600">
              Ribuan pelajar sudah merasakan manfaatnya
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    {testimonial.content}
                  </p>
                  <div>
                    <div className="font-bold text-gray-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Siap Memulai Perjalanan Belajarmu?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Bergabunglah dengan ribuan pelajar lainnya dan kuasai aksara Jawa
            hari ini juga!
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Daftar Sekarang - Gratis!
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <Image
                    src="/mascot-nara.png"
                    alt="NARA"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-2xl">Nenek Nusantara</h1>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Platform pembelajaran aksara Jawa terdepan di Indonesia
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produk</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white">
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Harga
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-white">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Dukungan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Bantuan
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    Tentang
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privasi
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Syarat
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Nenek Nusantara. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// import { Hero } from "@/components/hero";

// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
//       <Hero />
//     </main>
//   );
// }
