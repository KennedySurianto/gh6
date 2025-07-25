"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Lock, Play } from "lucide-react";
import Navbar from "@/navbar";

const lessons = [
  {
    id: 1,
    title: "Aksara Dasar Ha-Na-Ca-Ra-Ka",
    completed: true,
    stars: 3,
    xp: 50,
    difficulty: "Mudah",
  },
  {
    id: 2,
    title: "Aksara Da-Ta-Sa-Wa-La",
    completed: true,
    stars: 2,
    xp: 40,
    difficulty: "Mudah",
  },
  {
    id: 3,
    title: "Aksara Pa-Dha-Ja-Ya-Nya",
    completed: false,
    stars: 0,
    xp: 0,
    difficulty: "Sedang",
  },
  {
    id: 4,
    title: "Aksara Ma-Ga-Ba-Tha-Nga",
    completed: false,
    stars: 0,
    xp: 0,
    difficulty: "Sedang",
  },
  {
    id: 5,
    title: "Sandhangan Swara",
    completed: false,
    stars: 0,
    xp: 0,
    difficulty: "Sulit",
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
    // Allow navigation to lesson 3 or any unlocked lesson
    const isUnlocked = lessonId <= completedLessons + 1 || lessonId === 3;

    if (isUnlocked) {
      router.push(`/lesson/${lessonId}`);
    } else {
      alert("Selesaikan pelajaran sebelumnya dulu ya!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        user={{
          name: "Kamu",
          level: currentLevel,
          xp: totalXP,
          streak: currentStreak,
          notifications: 2,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Selamat datang kembali!
          </h2>
          <p className="text-muted-foreground mb-4">
            Kamu sudah belajar {currentStreak} hari berturut-turut. Ayo
            lanjutkan pelajaran berikutnya!
          </p>
          <div className="flex gap-2">
            <Badge className="bg-orange-500 text-white">
              Level {currentLevel}
            </Badge>
            <Badge
              variant="outline"
              className="border-orange-300 text-orange-700"
            >
              {completedLessons}/{lessons.length} Pelajaran Selesai
            </Badge>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Progress Belajar
              </h3>
              <span className="text-sm text-muted-foreground">
                {Math.round(progressPercent)}% Selesai
              </span>
            </div>
            <Progress value={progressPercent} className="h-3" />
          </CardContent>
        </Card>

        {/* Lessons */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">
            Pelajaran Aksara Jawa
          </h3>

          {lessons.map((lesson, index) => {
            const isNextLesson = index === completedLessons || lesson.id === 3;
            return (
              <Card
                key={lesson.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  lesson.completed
                    ? "border-green-200 bg-green-50"
                    : isNextLesson
                    ? "border-orange-300 bg-orange-50 shadow-md ring-2 ring-orange-200"
                    : "border-border bg-muted opacity-60"
                }`}
                onClick={() => handleLessonClick(lesson.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                          lesson.completed
                            ? "bg-green-500"
                            : isNextLesson
                            ? "bg-orange-500"
                            : "bg-muted-foreground"
                        }`}
                      >
                        {lesson.completed ? (
                          <Star className="w-6 h-6 text-white fill-current" />
                        ) : isNextLesson ? (
                          <Play className="w-6 h-6 text-white" />
                        ) : (
                          <Lock className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">
                          {lesson.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              lesson.difficulty === "Mudah"
                                ? "border-green-300 text-green-700"
                                : lesson.difficulty === "Sedang"
                                ? "border-yellow-300 text-yellow-700"
                                : "border-red-300 text-red-700"
                            }`}
                          >
                            {lesson.difficulty}
                          </Badge>
                          {lesson.completed && (
                            <>
                              <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < lesson.stars
                                        ? "text-yellow-400 fill-current"
                                        : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-green-600 font-medium">
                                +{lesson.xp} XP
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      {lesson.completed ? (
                        <Button
                          variant="outline"
                          className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                        >
                          Ulangi
                        </Button>
                      ) : isNextLesson ? (
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          Mulai
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          className="opacity-50 bg-transparent"
                        >
                          Terkunci
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}