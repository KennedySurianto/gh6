"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Trophy,
  Flame,
  Star,
  Calendar,
  Target,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import useFirebaseUser from "@/hooks/useFirebaseUser";

const profileData = {
  name: "Kamu",
  level: 3,
  xp: 450,
  xpToNext: 550,
  streak: 7,
  longestStreak: 12,
  lessonsCompleted: 8,
  totalLessons: 25,
  joinDate: "15 Januari 2024",
  achievements: [
    {
      id: 1,
      name: "Pemula",
      description: "Selesaikan pelajaran pertama",
      earned: true,
      icon: "🎯",
    },
    {
      id: 2,
      name: "Konsisten",
      description: "Belajar 7 hari berturut-turut",
      earned: true,
      icon: "🔥",
    },
    {
      id: 3,
      name: "Rajin",
      description: "Selesaikan 10 pelajaran",
      earned: false,
      icon: "📚",
    },
    {
      id: 4,
      name: "Ahli Aksara",
      description: "Dapatkan 3 bintang di 5 pelajaran",
      earned: false,
      icon: "⭐",
    },
  ],
  weeklyProgress: [
    { day: "Sen", completed: true },
    { day: "Sel", completed: true },
    { day: "Rab", completed: false },
    { day: "Kam", completed: true },
    { day: "Jum", completed: true },
    { day: "Sab", completed: true },
    { day: "Min", completed: false },
  ],
};

export default function Profile() {
  const user = useFirebaseUser();
  const progressToNext = (profileData.xp / profileData.xpToNext) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Profil</h1>
              <p className="text-orange-100">Lihat progres belajarmu</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Overview */}
        <Card className="mb-6 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Image
                  src="/mascot-nara.png"
                  alt="Profile Avatar"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-orange-300"
                />
                <Badge className="absolute -bottom-2 -right-2 bg-orange-500">
                  Level {profileData.level}
                </Badge>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {user ? user.displayName : ""}
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700">{profileData.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700">
                      {profileData.streak} hari streak
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">
                      {profileData.lessonsCompleted} pelajaran
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">
                      Bergabung {profileData.joinDate}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress ke Level {profileData.level + 1}</span>
                    <span>
                      {profileData.xp}/{profileData.xpToNext} XP
                    </span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Progress */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                Progress Mingguan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {profileData.weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-600 mb-1">{day.day}</div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        day.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {day.completed ? "✓" : "○"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Streak terpanjang:</strong>{" "}
                  {profileData.longestStreak} hari
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                Statistik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Pelajaran Selesai</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (profileData.lessonsCompleted /
                          profileData.totalLessons) *
                        100
                      }
                      className="w-20 h-2"
                    />
                    <span className="font-bold">
                      {profileData.lessonsCompleted}/{profileData.totalLessons}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Tingkat Akurasi</span>
                  <span className="font-bold text-green-600">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Waktu Belajar Total</span>
                  <span className="font-bold">12 jam 30 menit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Rata-rata per Hari</span>
                  <span className="font-bold">15 menit</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="mt-6 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-orange-500" />
              Pencapaian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-2xl ${
                        achievement.earned ? "" : "grayscale opacity-50"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div>
                      <h3
                        className={`font-bold ${
                          achievement.earned
                            ? "text-green-800"
                            : "text-gray-500"
                        }`}
                      >
                        {achievement.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          achievement.earned
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* NARA's Message */}
        <Card className="mt-6 border-orange-200 bg-gradient-to-r from-orange-100 to-yellow-100">
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
                  Wah, kamu sudah belajar selama {profileData.streak} hari
                  berturut-turut! Terus pertahankan semangat belajarmu. Setiap
                  hari adalah kesempatan untuk menjadi lebih baik dalam
                  menguasai aksara Jawa!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
