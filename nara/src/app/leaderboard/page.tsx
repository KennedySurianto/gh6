"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Trophy,
  Medal,
  Award,
  Crown,
  Flame,
  Star,
  TrendingUp,
  Calendar,
  Users,
  Target,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/navbar";

type LeaderboardUser = {
  rank: number;
  name: string;
  xp: number;
  streak: number;
  level: number;
  weeklyXP: number;
  monthlyXP: number;
  weekendXP: number;
  change: number;
  initials: string;
};

type TimeFilter = "all" | "weekly" | "monthly" | "weekend";

const leaderboardData: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Sari Dewi",
    xp: 1250,
    streak: 15,
    level: 8,
    weeklyXP: 280,
    monthlyXP: 850,
    weekendXP: 120,
    change: 0,
    initials: "SD",
  },
  {
    rank: 2,
    name: "Budi Santoso",
    xp: 1180,
    streak: 12,
    level: 7,
    weeklyXP: 250,
    monthlyXP: 780,
    weekendXP: 110,
    change: 1,
    initials: "BS",
  },
  {
    rank: 3,
    name: "Andi Pratama",
    xp: 950,
    streak: 8,
    level: 6,
    weeklyXP: 220,
    monthlyXP: 650,
    weekendXP: 95,
    change: -1,
    initials: "AP",
  },
  {
    rank: 4,
    name: "You",
    xp: 450,
    streak: 7,
    level: 3,
    weeklyXP: 180,
    monthlyXP: 420,
    weekendXP: 85,
    change: 1,
    initials: "YU",
  },
  {
    rank: 5,
    name: "Dewi Sartika",
    xp: 380,
    streak: 5,
    level: 3,
    weeklyXP: 150,
    monthlyXP: 350,
    weekendXP: 70,
    change: -1,
    initials: "DS",
  },
  {
    rank: 6,
    name: "Angel Putri",
    xp: 320,
    streak: 3,
    level: 2,
    weeklyXP: 120,
    monthlyXP: 290,
    weekendXP: 60,
    change: 2,
    initials: "AP",
  },
  {
    rank: 7,
    name: "Matthew",
    xp: 280,
    streak: 4,
    level: 2,
    weeklyXP: 100,
    monthlyXP: 250,
    weekendXP: 45,
    change: 0,
    initials: "MT",
  },
  {
    rank: 8,
    name: "Jeki Pratama",
    xp: 150,
    streak: 2,
    level: 1,
    weeklyXP: 80,
    monthlyXP: 140,
    weekendXP: 35,
    change: -2,
    initials: "JP",
  },
];

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const currentUser = leaderboardData.find((user) => user.name === "You");

  const getSortedData = () => {
    const sorted = [...leaderboardData];
    if (timeFilter === "weekly") {
      return sorted
        .sort((a, b) => b.weeklyXP - a.weeklyXP)
        .map((user, index) => ({ ...user, rank: index + 1 }));
    } else if (timeFilter === "monthly") {
      return sorted
        .sort((a, b) => b.monthlyXP - a.monthlyXP)
        .map((user, index) => ({ ...user, rank: index + 1 }));
    } else if (timeFilter === "weekend") {
      return sorted
        .sort((a, b) => b.weekendXP - a.weekendXP)
        .map((user, index) => ({ ...user, rank: index + 1 }));
    }
    return sorted;
  };

  const getDisplayXP = (user: LeaderboardUser) => {
    if (timeFilter === "weekly") return user.weeklyXP;
    if (timeFilter === "monthly") return user.monthlyXP;
    if (timeFilter === "weekend") return user.weekendXP;
    return user.xp;
  };

  const getFilterLabel = () => {
    switch (timeFilter) {
      case "weekly":
        return "This Week";
      case "monthly":
        return "This Month";
      case "weekend":
        return "This Weekend";
      default:
        return "All Time";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-500" />;
      case 3:
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return <span className="font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const sortedData = getSortedData();
  const currentUserData = sortedData.find((user) => user.name === "You");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Navbar
        user={{
          name: "You",
          level: 3,
          xp: 450,
          streak: 7,
          notifications: 2,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="hover:bg-orange-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <p className="text-gray-600 text-lg">
              See your position among other learners
            </p>
          </div>
        </div>

        {/* Time Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={timeFilter === "all" ? "default" : "outline"}
            onClick={() => setTimeFilter("all")}
            className={
              timeFilter === "all"
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                : ""
            }
          >
            <Trophy className="w-4 h-4 mr-2" />
            All Time
          </Button>
          <Button
            variant={timeFilter === "weekly" ? "default" : "outline"}
            onClick={() => setTimeFilter("weekly")}
            className={
              timeFilter === "weekly"
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                : ""
            }
          >
            <Calendar className="w-4 h-4 mr-2" />
            Weekly
          </Button>
          <Button
            variant={timeFilter === "monthly" ? "default" : "outline"}
            onClick={() => setTimeFilter("monthly")}
            className={
              timeFilter === "monthly"
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                : ""
            }
          >
            <Users className="w-4 h-4 mr-2" />
            Monthly
          </Button>
          <Button
            variant={timeFilter === "weekend" ? "default" : "outline"}
            onClick={() => setTimeFilter("weekend")}
            className={
              timeFilter === "weekend"
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                : ""
            }
          >
            <Star className="w-4 h-4 mr-2" />
            Weekend
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top 3 Podium */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  Top 3 Learners - {getFilterLabel()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {sortedData.slice(0, 3).map((user, index) => (
                    <Card
                      key={user.name}
                      className={`text-center border-2 ${getRankBadgeColor(
                        index + 1
                      )} bg-white`}
                    >
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <div
                            className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${getRankBadgeColor(
                              index + 1
                            )}`}
                          >
                            {getRankIcon(index + 1)}
                          </div>
                          <Avatar className="w-16 h-16 mx-auto mb-3">
                            <AvatarFallback className="text-lg font-bold bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-1">
                          {user.name}
                        </h3>
                        <p className="text-2xl font-bold text-orange-600 mb-2">
                          {getDisplayXP(user)} XP
                        </p>
                        <Badge className="bg-orange-100 text-orange-800">
                          Level {user.level}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Full Leaderboard */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  All Rankings - {getFilterLabel()}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {sortedData.map((user) => (
                    <div
                      key={user.name}
                      className={`flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0 transition-all hover:bg-gray-50 ${
                        user.name === "You"
                          ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${getRankBadgeColor(
                            user.rank
                          )}`}
                        >
                          {user.rank <= 3 ? getRankIcon(user.rank) : user.rank}
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3
                            className={`font-bold text-lg ${
                              user.name === "You"
                                ? "text-orange-700"
                                : "text-gray-800"
                            }`}
                          >
                            {user.name}
                          </h3>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1">
                              <Flame className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-gray-600">
                                {user.streak} days
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp
                                className={`w-4 h-4 ${
                                  user.change > 0
                                    ? "text-green-500"
                                    : user.change < 0
                                    ? "text-red-500"
                                    : "text-gray-400"
                                }`}
                              />
                              <span
                                className={`text-sm ${
                                  user.change > 0
                                    ? "text-green-600"
                                    : user.change < 0
                                    ? "text-red-600"
                                    : "text-gray-600"
                                }`}
                              >
                                {user.change > 0
                                  ? `+${user.change}`
                                  : user.change === 0
                                  ? "="
                                  : user.change}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-800">
                          {getDisplayXP(user)}
                        </p>
                        <Badge variant="outline" className="text-sm">
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
            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-100 to-yellow-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-bold text-xl text-orange-800 mb-4">
                    Your Rank
                  </h3>
                  <div className="text-5xl font-bold text-orange-600 mb-3">
                    #{currentUserData?.rank}
                  </div>
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                      {currentUserData?.initials}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-bold text-lg text-gray-800">
                    {currentUserData?.name}
                  </p>
                  <p className="text-gray-600">
                    {getDisplayXP(currentUserData!)} XP • Level{" "}
                    {currentUserData?.level}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">XP This Week</span>
                    <span className="font-bold text-green-600">
                      +{currentUserData?.weeklyXP}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">XP This Month</span>
                    <span className="font-bold text-blue-600">
                      {currentUserData?.monthlyXP}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Weekend XP</span>
                    <span className="font-bold text-purple-600">
                      {currentUserData?.weekendXP}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rank Change</span>
                    <Badge
                      className={`${
                        currentUserData && currentUserData.change > 0
                          ? "bg-green-500"
                          : currentUserData && currentUserData.change < 0
                          ? "bg-red-500"
                          : "bg-gray-500"
                      } text-white`}
                    >
                      {currentUserData && currentUserData.change > 0
                        ? `↑ +${currentUserData.change}`
                        : currentUserData && currentUserData.change < 0
                        ? `↓ ${currentUserData.change}`
                        : "="}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-purple-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Recent Achievements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Top 5 Player</p>
                      <p className="text-xs text-gray-500">
                        Reached top 5 on leaderboard
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-center">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Streak Master</p>
                      <p className="text-xs text-gray-500">7 days in a row</p>
                    </div>
                  </div>
                </div>
                <Link href="/achievements">
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    View All Achievements
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Competition */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-blue-800 mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Monthly Competition
                </h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600">
                    12 Days
                  </div>
                  <p className="text-blue-700 text-sm">remaining</p>
                </div>
                <p className="text-blue-700 text-sm mb-4 text-center">
                  Earn as much XP as possible to win exciting prizes!
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  Join Competition
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
