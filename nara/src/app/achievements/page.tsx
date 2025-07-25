"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Star, Award, Flame, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/navbar";

const achievementCategories = [
  {
    id: "learning",
    title: "Pembelajaran",
    icon: <BookOpen className="w-5 h-5" />,
    color: "blue",
    achievements: [
      {
        id: 1,
        title: "Langkah Pertama",
        description: "Selesaikan pelajaran pertama",
        progress: 100,
        target: 1,
        earned: true,
        xp: 50,
        icon: "🎯",
      },
      {
        id: 2,
        title: "Penjelajah",
        description: "Buka 5 pelajaran",
        progress: 60,
        target: 5,
        earned: false,
        xp: 100,
        icon: "🗺️",
      },
      {
        id: 3,
        title: "Ahli Aksara",
        description: "Selesaikan 10 pelajaran",
        progress: 20,
        target: 10,
        earned: false,
        xp: 200,
        icon: "📚",
      },
      {
        id: 4,
        title: "Master Jawa",
        description: "Selesaikan semua pelajaran",
        progress: 10,
        target: 25,
        earned: false,
        xp: 500,
        icon: "👑",
      },
    ],
  },
  {
    id: "consistency",
    title: "Konsistensi",
    icon: <Flame className="w-5 h-5" />,
    color: "red",
    achievements: [
      {
        id: 5,
        title: "Konsisten",
        description: "Belajar 7 hari berturut-turut",
        progress: 100,
        target: 7,
        earned: true,
        xp: 75,
        icon: "🔥",
      },
      {
        id: 6,
        title: "Dedikasi",
        description: "Belajar 30 hari berturut-turut",
        progress: 23,
        target: 30,
        earned: false,
        xp: 300,
        icon: "💪",
      },
      {
        id: 7,
        title: "Legenda",
        description: "Belajar 100 hari berturut-turut",
        progress: 7,
        target: 100,
        earned: false,
        xp: 1000,
        icon: "🏆",
      },
    ],
  },
  {
    id: "mastery",
    title: "Penguasaan",
    icon: <Star className="w-5 h-5" />,
    color: "yellow",
    achievements: [
      {
        id: 8,
        title: "Bintang Terang",
        description: "Dapatkan 3 bintang di 5 pelajaran",
        progress: 40,
        target: 5,
        earned: false,
        xp: 150,
        icon: "⭐",
      },
      {
        id: 9,
        title: "Sempurna",
        description: "Dapatkan 100% akurasi di 3 pelajaran",
        progress: 0,
        target: 3,
        earned: false,
        xp: 200,
        icon: "💯",
      },
      {
        id: 10,
        title: "Seniman Aksara",
        description: "Gambar 50 aksara dengan benar",
        progress: 60,
        target: 50,
        earned: false,
        xp: 250,
        icon: "🎨",
      },
    ],
  },
  {
    id: "social",
    title: "Sosial",
    icon: <Trophy className="w-5 h-5" />,
    color: "purple",
    achievements: [
      {
        id: 11,
        title: "Kompetitif",
        description: "Masuk top 10 leaderboard",
        progress: 100,
        target: 1,
        earned: true,
        xp: 100,
        icon: "🥇",
      },
      {
        id: 12,
        title: "Inspirator",
        description: "Ajak 3 teman bergabung",
        progress: 0,
        target: 3,
        earned: false,
        xp: 300,
        icon: "👥",
      },
      {
        id: 13,
        title: "Mentor",
        description: "Bantu 5 teman menyelesaikan pelajaran",
        progress: 0,
        target: 5,
        earned: false,
        xp: 400,
        icon: "🤝",
      },
    ],
  },
];

export default function Achievements() {
  const totalAchievements = achievementCategories.reduce(
    (acc, cat) => acc + cat.achievements.length,
    0
  );
  const earnedAchievements = achievementCategories.reduce(
    (acc, cat) => acc + cat.achievements.filter((a) => a.earned).length,
    0
  );
  const totalXP = achievementCategories.reduce(
    (acc, cat) =>
      acc +
      cat.achievements
        .filter((a) => a.earned)
        .reduce((xpAcc, a) => xpAcc + a.xp, 0),
    0
  );

  const getColorClasses = (color: string, earned: boolean) => {
    const colors = {
      blue: earned
        ? "border-blue-200 bg-blue-50"
        : "border-gray-200 bg-gray-50",
      red: earned ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50",
      yellow: earned
        ? "border-yellow-200 bg-yellow-50"
        : "border-gray-200 bg-gray-50",
      purple: earned
        ? "border-purple-200 bg-purple-50"
        : "border-gray-200 bg-gray-50",
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-orange-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Pencapaian</h1>
            <p className="text-gray-600">
              Lihat semua pencapaianmu dalam belajar aksara Jawa
            </p>
          </div>
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-orange-200 bg-gradient-to-r from-orange-100 to-yellow-100">
            <CardContent className="p-6 text-center">
              <Trophy className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {earnedAchievements}
              </div>
              <div className="text-sm text-gray-600">
                dari {totalAchievements} pencapaian
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-gradient-to-r from-green-100 to-emerald-100">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-600 mb-1">
                {totalXP}
              </div>
              <div className="text-sm text-gray-600">XP dari pencapaian</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100">
            <CardContent className="p-6 text-center">
              <Award className="w-12 h-12 text-purple-500 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {Math.round((earnedAchievements / totalAchievements) * 100)}%
              </div>
              <div className="text-sm text-gray-600">tingkat penyelesaian</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Categories */}
        <div className="space-y-8">
          {achievementCategories.map((category) => (
            <Card key={category.id} className="border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  {category.icon}
                  {category.title}
                  <Badge variant="outline" className="ml-auto">
                    {category.achievements.filter((a) => a.earned).length}/
                    {category.achievements.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={`transition-all hover:shadow-md ${getColorClasses(
                        category.color,
                        achievement.earned
                      )}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`text-2xl ${
                              achievement.earned ? "" : "grayscale opacity-50"
                            }`}
                          >
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-bold text-sm ${
                                achievement.earned
                                  ? "text-gray-800"
                                  : "text-gray-500"
                              }`}
                            >
                              {achievement.title}
                            </h3>
                            <p
                              className={`text-xs ${
                                achievement.earned
                                  ? "text-gray-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.earned && (
                            <Badge className="bg-green-500 text-white text-xs">
                              +{achievement.xp} XP
                            </Badge>
                          )}
                        </div>

                        {!achievement.earned && (
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>
                                {Math.round(
                                  (achievement.progress / achievement.target) *
                                    100
                                )}
                                %
                              </span>
                            </div>
                            <Progress
                              value={
                                (achievement.progress / achievement.target) *
                                100
                              }
                              className="h-2"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              {achievement.progress}/{achievement.target}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* NARA's Encouragement */}
        <Card className="mt-8 border-orange-200 bg-gradient-to-r from-orange-100 to-yellow-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Image
                src="/mascot-nara.png"
                alt="NARA Mascot"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Pesan dari NARA
                </h3>
                <p className="text-gray-700">
                  Wah, kamu sudah meraih {earnedAchievements} pencapaian! Terus
                  semangat belajar ya. Setiap pencapaian adalah bukti dedikasi
                  dan kerja kerasmu dalam menguasai aksara Jawa!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
