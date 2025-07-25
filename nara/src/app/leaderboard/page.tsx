"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Crown,
  Flame,
  Star,
} from "lucide-react";
import Link from "next/link";
import ModernNavbar from "@/modern-navbar";

const leaderboardData = [
  {
    rank: 1,
    name: "Sari Dewi",
    xp: 1250,
    avatar: "👩",
    streak: 15,
    level: 8,
    weeklyXP: 280,
  },
  {
    rank: 2,
    name: "Budi Santoso",
    xp: 1180,
    avatar: "👨",
    streak: 12,
    level: 7,
    weeklyXP: 250,
  },
  {
    rank: 3,
    name: "Andi Pratama",
    xp: 950,
    avatar: "👦",
    streak: 8,
    level: 6,
    weeklyXP: 220,
  },
  {
    rank: 4,
    name: "Kamu",
    xp: 450,
    avatar: "🧑",
    streak: 7,
    level: 3,
    weeklyXP: 180,
  },
  {
    rank: 5,
    name: "Dewi Sartika",
    xp: 380,
    avatar: "👧",
    streak: 5,
    level: 3,
    weeklyXP: 150,
  },
  {
    rank: 6,
    name: "Rudi Hartono",
    xp: 320,
    avatar: "👨‍🦱",
    streak: 3,
    level: 2,
    weeklyXP: 120,
  },
  {
    rank: 7,
    name: "Maya Sari",
    xp: 280,
    avatar: "👩‍🦰",
    streak: 4,
    level: 2,
    weeklyXP: 100,
  },
  {
    rank: 8,
    name: "Joko Widodo",
    xp: 150,
    avatar: "👴",
    streak: 2,
    level: 1,
    weeklyXP: 80,
  },
];

const categories = [
  { id: "all", label: "Semua Waktu", active: true },
  { id: "weekly", label: "Mingguan", active: false },
  { id: "monthly", label: "Bulanan", active: false },
];

export default function Leaderboard() {
  const currentUser = leaderboardData.find((user) => user.name === "Kamu");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50">
      <ModernNavbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Papan Peringkat
            </h1>
            <p className="text-gray-600">
              Lihat posisimu di antara pelajar lain
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={category.active ? "default" : "outline"}
              className={
                category.active
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                  : ""
              }
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top 3 */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  Top 3 Pelajar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {leaderboardData.slice(0, 3).map((user, index) => (
                    <Card
                      key={user.rank}
                      className={`text-center border-2 ${
                        index === 0
                          ? "border-yellow-300 bg-yellow-50"
                          : index === 1
                          ? "border-gray-300 bg-gray-50"
                          : "border-orange-300 bg-orange-50"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="mb-3">
                          {index === 0 && (
                            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                          )}
                          {index === 1 && (
                            <Medal className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                          )}
                          {index === 2 && (
                            <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                          )}
                        </div>
                        <div className="text-3xl mb-2">{user.avatar}</div>
                        <h3 className="font-bold text-sm">{user.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {user.xp} XP
                        </p>
                        <Badge
                          className={`text-xs ${
                            index === 0
                              ? "bg-yellow-500 text-white"
                              : index === 1
                              ? "bg-gray-500 text-white"
                              : "bg-orange-500 text-white"
                          }`}
                        >
                          Level {user.level}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Full Leaderboard */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  Semua Peringkat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {leaderboardData.map((user, index) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 transition-colors ${
                        user.name === "Kamu"
                          ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                            user.rank === 1
                              ? "bg-yellow-500 text-white"
                              : user.rank === 2
                              ? "bg-gray-400 text-white"
                              : user.rank === 3
                              ? "bg-orange-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {user.rank}
                        </div>
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <h3
                            className={`font-semibold ${
                              user.name === "Kamu"
                                ? "text-orange-700"
                                : "text-gray-800"
                            }`}
                          >
                            {user.name}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1">
                              <Flame className="w-3 h-3 text-red-500" />
                              <span className="text-xs text-gray-600">
                                {user.streak} hari
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs text-gray-600">
                                +{user.weeklyXP} minggu ini
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">
                          {user.xp}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          Level {user.level}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Rank */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-100 to-yellow-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-bold text-lg text-orange-800 mb-2">
                    Peringkatmu
                  </h3>
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    #{currentUser?.rank}
                  </div>
                  <div className="text-2xl mb-2">{currentUser?.avatar}</div>
                  <p className="font-bold text-gray-800">{currentUser?.name}</p>
                  <p className="text-gray-600 text-sm">
                    {currentUser?.xp} XP • Level {currentUser?.level}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">
                  Progress Mingguan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">XP Minggu Ini</span>
                    <span className="font-bold text-green-600">
                      +{currentUser?.weeklyXP}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">
                      Posisi Minggu Lalu
                    </span>
                    <span className="font-bold text-blue-600">#5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Perubahan</span>
                    <Badge className="bg-green-500 text-white text-xs">
                      ↑ +1
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-purple-800 mb-4">
                  Pencapaian Terbaru
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <div className="text-xl">🏆</div>
                    <div>
                      <p className="font-semibold text-sm">Top 5 Player</p>
                      <p className="text-xs text-gray-500">
                        Masuk 5 besar leaderboard
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg">
                    <div className="text-xl">🔥</div>
                    <div>
                      <p className="font-semibold text-sm">Streak Master</p>
                      <p className="text-xs text-gray-500">
                        7 hari berturut-turut
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/achievements">
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                  >
                    Lihat Semua
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Competition */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-blue-800 mb-4">
                  Kompetisi Bulanan
                </h3>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600">
                    12 Hari
                  </div>
                  <p className="text-blue-700 text-sm">tersisa</p>
                </div>
                <p className="text-blue-700 text-sm mb-4">
                  Raih XP sebanyak-banyaknya untuk memenangkan hadiah menarik!
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  Ikut Kompetisi
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
