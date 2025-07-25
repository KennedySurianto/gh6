"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Lock, Play, Trophy, Flame, Zap } from "lucide-react";
import Navbar from "@/navbar";

type Lesson = {
  id: number;
  title: string;
  completed: boolean;
  stars: number;
  xp: number;
  difficulty: "Easy" | "Medium" | "Hard";
  position: { x: number; y: number };
};

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Basic Script Ha-Na-Ca-Ra-Ka",
    completed: true,
    stars: 3,
    xp: 50,
    difficulty: "Easy",
    position: { x: 50, y: 85 },
  },
  {
    id: 2,
    title: "Script Da-Ta-Sa-Wa-La",
    completed: true,
    stars: 2,
    xp: 40,
    difficulty: "Easy",
    position: { x: 25, y: 70 },
  },
  {
    id: 3,
    title: "Lontara Script: Ka-Ga-Nga-Pa-Nya",
    completed: false,
    stars: 0,
    xp: 0,
    difficulty: "Medium",
    position: { x: 75, y: 55 },
  },
  {
    id: 4,
    title: "Script Ma-Ga-Ba-Tha-Nga",
    completed: false,
    stars: 0,
    xp: 0,
    difficulty: "Medium",
    position: { x: 40, y: 40 },
  },
  {
    id: 5,
    title: "Vowel Sandhangan",
    completed: false,
    stars: 0,
    xp: 0,
    difficulty: "Hard",
    position: { x: 65, y: 25 },
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [currentStreak] = useState(7);
  const [totalXP] = useState(450);
  const [currentLevel] = useState(3);

  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const progressPercent = (completedLessons / lessons.length) * 100;

  const handleLessonClick = (lessonId: number) => {
    const isUnlocked = lessonId <= completedLessons + 1 || lessonId === 3;

    if (isUnlocked) {
      router.push(`/lesson/${lessonId}`);
    } else {
      alert("Complete the previous lesson first!");
    }
  };

  const isNextLesson = (index: number, lesson: Lesson) => {
    return index === completedLessons || lesson.id === 3;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Navbar
        user={{
          name: "You",
          level: currentLevel,
          xp: totalXP,
          streak: currentStreak,
          notifications: 2,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full mb-4 shadow-lg">
            <Trophy className="w-5 h-5" />
            <span className="font-bold">Unit 1</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Learn Now</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Start your journey with Nara, the Aksara Lontara learning platform.
            Explore the basics of Aksara Lontara and unlock your potential.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{currentStreak}</div>
              <div className="text-orange-100">Streaks</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalXP}</div>
              <div className="text-blue-100">Total XP</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {completedLessons}/{lessons.length}
              </div>
              <div className="text-green-100">Course Finished</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Learning Progress
              </h3>
              <Badge className="bg-orange-500 text-white">
                {Math.round(progressPercent)}% Completed
              </Badge>
            </div>
            <Progress value={progressPercent} className="h-4 bg-gray-200" />
          </CardContent>
        </Card>

        {/* Lesson Path */}
        <div className="relative">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
            <CardContent className="p-8">
              <div className="relative h-96 md:h-[500px]">
                {/* Path SVG */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 50 85 Q 25 75 25 70 Q 25 65 75 55 Q 85 50 40 40 Q 30 35 65 25"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                    fill="none"
                    strokeDasharray="2,2"
                  />
                </svg>

                {/* Lesson Nodes */}
                {lessons.map((lesson, index) => {
                  const isNext = isNextLesson(index, lesson);
                  const isUnlocked = lesson.completed || isNext;

                  return (
                    <div
                      key={lesson.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{
                        left: `${lesson.position.x}%`,
                        top: `${lesson.position.y}%`,
                      }}
                      onClick={() => isUnlocked && handleLessonClick(lesson.id)}
                    >
                      {/* Lesson Node */}
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:scale-110 ${
                          lesson.completed
                            ? "bg-gradient-to-br from-green-400 to-green-600 shadow-green-200"
                            : isNext
                            ? "bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-200 ring-4 ring-orange-200"
                            : "bg-gradient-to-br from-gray-300 to-gray-500 shadow-gray-200"
                        }`}
                      >
                        {lesson.completed ? (
                          <Star className="w-8 h-8 text-white fill-current" />
                        ) : isNext ? (
                          <Play className="w-8 h-8 text-white" />
                        ) : (
                          <Lock className="w-8 h-8 text-white" />
                        )}
                      </div>

                      {/* Stars for completed lessons */}
                      {lesson.completed && (
                        <div className="absolute -top-2 -right-2 flex gap-1">
                          {[...Array(lesson.stars)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      )}

                      {/* Tooltip */}
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
                          <div className="font-semibold">{lesson.title}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={`text-xs border-white/30 text-white ${
                                lesson.difficulty === "Easy"
                                  ? "bg-green-500/20"
                                  : lesson.difficulty === "Medium"
                                  ? "bg-yellow-500/20"
                                  : "bg-red-500/20"
                              }`}
                            >
                              {lesson.difficulty}
                            </Badge>
                            {lesson.completed && (
                              <span className="text-xs text-green-300">
                                +{lesson.xp} XP
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
