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
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose the Lontara Script?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A Lontara script learning platform specially designed for the
              digital generation with cutting-edge technology
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
              What Do They Say?{" "}
              <span className="indonesiana-decorative text-amber-700">
                ᨀᨈ ᨆᨙᨁᨑ?
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Thousands of learners have already experienced the benefits
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
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of other learners and master the Lontara script
            today!
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Sign Up Now - Free!
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
                  <h1 className="text-2xl">
                    Nenek Nusantara{" "}
                    <span className="indonesiana-decorative text-amber-500">
                      ᨊᨊᨙᨀᨛ ᨊᨘᨔᨊᨈᨑ
                    </span>
                  </h1>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Leading Lontara script learning platform in Indonesia
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
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
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
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
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              &copy; 2025 Nenek Nusantara{" "}
              <span className="indonesiana-decorative text-amber-500">
                ᨊᨊᨙᨀᨛ ᨊᨘᨔᨊᨈᨑ
              </span>
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
