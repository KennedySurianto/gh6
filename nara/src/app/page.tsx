"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Users,
  BookOpen,
  Trophy,
  ArrowRight,
  Play,
  CheckCircle,
  Sparkles,
  Target,
  Award,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-orange-500" />,
    title: "Pelajaran Interaktif",
    description:
      "Belajar aksara Jawa dengan metode yang menyenangkan dan mudah dipahami",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Play className="w-8 h-8 text-blue-500" />,
    title: "Latihan Menulis",
    description: "Berlatih menulis aksara dengan canvas digital yang responsif",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Trophy className="w-8 h-8 text-yellow-500" />,
    title: "Sistem Gamifikasi",
    description: "Dapatkan XP, badge, dan naik level sambil belajar",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "Kompetisi Sehat",
    description: "Bersaing dengan teman di leaderboard dan tantangan harian",
    color: "from-green-500 to-emerald-500",
  },
];

const testimonials = [
  {
    name: "Sari Dewi",
    role: "Pelajar SMA",
    content:
      "Aplikasi ini sangat membantu saya memahami aksara Jawa. NARA sangat lucu dan memotivasi!",
    rating: 5,
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    name: "Budi Santoso",
    role: "Guru Bahasa Jawa",
    content:
      "Metode pembelajaran yang inovatif. Siswa saya jadi lebih antusias belajar aksara Jawa.",
    rating: 5,
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    name: "Maya Putri",
    role: "Mahasiswa",
    content:
      "Fitur gamifikasi membuat belajar jadi tidak membosankan. Highly recommended!",
    rating: 5,
    avatar: "/placeholder.svg?height=48&width=48",
  },
];

const stats = [
  {
    number: "15K+",
    label: "Pelajar Aktif",
    icon: <Users className="w-6 h-6" />,
  },
  { number: "50+", label: "Pelajaran", icon: <BookOpen className="w-6 h-6" /> },
  { number: "4.9★", label: "Rating", icon: <Star className="w-6 h-6" /> },
  {
    number: "98%",
    label: "Tingkat Keberhasilan",
    icon: <Target className="w-6 h-6" />,
  },
];

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl shadow-lg flex items-center justify-center">
                <Image
                  src="/mascot-nara.png"
                  alt="NARA"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Aksara Jawa
                </h1>
                <p className="text-xs text-gray-500">dengan NARA AI</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/features"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Fitur
              </Link>
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Harga
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-orange-600 transition-colors"
              >
                Tentang
              </Link>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-orange-600"
                >
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Daftar Gratis
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/features"
                  className="text-gray-700 hover:text-orange-600"
                >
                  Fitur
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-700 hover:text-orange-600"
                >
                  Harga
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-orange-600"
                >
                  Tentang
                </Link>
                <Link href="/login">
                  <Button variant="ghost" className="justify-start">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                    Daftar Gratis
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0 mb-6 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Platform Pembelajaran #1 di Indonesia
              </Badge>

              <h1 className="text-4xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Belajar{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600">
                  Aksara Jawa
                </span>{" "}
                dengan{" "}
                <span className="relative">
                  AI
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg blur opacity-25"></div>
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Revolusi pembelajaran aksara Jawa dengan teknologi AI terdepan.
                Bergabunglah dengan{" "}
                <span className="font-semibold text-orange-600">
                  15,000+ pelajar
                </span>{" "}
                yang sudah menguasai warisan budaya Indonesia bersama NARA AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg"
                  >
                    <Sparkles className="mr-2 w-5 h-5" />
                    Mulai Belajar Gratis
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 bg-white/80 backdrop-blur-sm px-8 py-4 text-lg"
                  >
                    <Play className="mr-2 w-5 h-5" />
                    Lihat Demo
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2 text-orange-500">
                      {stat.icon}
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
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
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
                <Card className="relative bg-white/90 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-32 h-32 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse opacity-75"></div>
                        <Image
                          src="/mascot-nara.png"
                          alt="NARA Mascot"
                          width={80}
                          height={80}
                          className="rounded-full relative z-10"
                        />
                      </div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-3">
                        Halo! Aku NARA AI
                      </h3>
                      <p className="text-gray-600 text-lg">
                        Asisten AI yang akan memandu perjalanan belajarmu dengan
                        teknologi terdepan!
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          Pembelajaran adaptif dengan AI
                        </span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          Feedback real-time dan personal
                        </span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">
                          Sistem reward yang memotivasi
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-4">
              <Trophy className="w-4 h-4 mr-2" />
              Fitur Unggulan
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Mengapa Memilih{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                Aksara Jawa?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Platform pembelajaran aksara Jawa yang dirancang khusus untuk
              generasi digital dengan teknologi AI terdepan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 overflow-hidden"
              >
                <CardContent className="p-8 text-center relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>
                  <div className="relative z-10">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mb-4">
              <Star className="w-4 h-4 mr-2" />
              Testimoni
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Apa Kata{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                Mereka?
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Ribuan pelajar sudah merasakan transformasi belajar yang luar
              biasa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 transform hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    {`"${testimonial.content}"`}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-600/20"></div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Siap Memulai{" "}
            <span className="relative">
              Perjalanan
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white/30 rounded-full"></div>
            </span>{" "}
            Belajarmu?
          </h2>
          <p className="text-xl lg:text-2xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan pelajar lainnya dan kuasai aksara Jawa
            dengan teknologi AI terdepan!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 px-10 py-4 text-lg font-semibold"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Daftar Sekarang - Gratis!
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-10 py-4 text-lg font-semibold bg-transparent"
              >
                <Play className="mr-2 w-5 h-5" />
                Coba Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center">
                  <Image
                    src="/mascot-nara.png"
                    alt="NARA"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Aksara Jawa
                  </h3>
                  <p className="text-gray-400">dengan NARA AI</p>
                </div>
              </div>
              <p className="text-gray-400 text-lg max-w-md">
                Platform pembelajaran aksara Jawa terdepan di Indonesia dengan
                teknologi AI yang revolusioner.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Produk</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    href="/features"
                    className="hover:text-white transition-colors"
                  >
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Harga
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="hover:text-white transition-colors"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg">Perusahaan</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    Tentang
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-white transition-colors"
                  >
                    Bantuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Aksara Jawa. Semua hak dilindungi. Dibuat dengan ❤️
              untuk melestarikan budaya Indonesia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
