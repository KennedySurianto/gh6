"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Pencil,
  MousePointer,
  Shuffle,
  RotateCcw,
  Check,
  X,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/navbar";

type PracticeMode = "selection" | "drawing" | "recognition" | "mixed";

type Aksara = {
  aksara: string;
  name: string;
  level: "Basic" | "Intermediate" | "Advanced";
};

const aksaraList: Aksara[] = [
  { aksara: "ᨕ", name: "A", level: "Basic" },
  { aksara: "ᨎ", name: "Nya", level: "Basic" },
  { aksara: "ᨀ", name: "Ka", level: "Basic" },
  { aksara: "ᨁ", name: "Ga", level: "Basic" },
  { aksara: "ᨂ", name: "Nga", level: "Basic" },
  { aksara: "ᨄ", name: "Pa", level: "Intermediate" },
  { aksara: "ᨅ", name: "Ba", level: "Intermediate" },
  { aksara: "ᨈ", name: "Ta", level: "Intermediate" },
];

export default function Practice() {
  const [mode, setMode] = useState<PracticeMode>("selection");
  const [currentAksara, setCurrentAksara] = useState<Aksara | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [recognitionOptions, setRecognitionOptions] = useState<Aksara[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCanvasDrawing, setIsCanvasDrawing] = useState(false);

  const startDrawingPractice = () => {
    setMode("drawing");
    setCurrentAksara(aksaraList[Math.floor(Math.random() * aksaraList.length)]);
    setQuestionsAnswered(0);
    setScore(0);
  };

  const startRecognitionPractice = () => {
    setMode("recognition");
    generateRecognitionQuestion();
    setQuestionsAnswered(0);
    setScore(0);
  };

  const startMixedPractice = () => {
    setMode("mixed");
    if (Math.random() > 0.5) {
      generateRecognitionQuestion();
    } else {
      setCurrentAksara(
        aksaraList[Math.floor(Math.random() * aksaraList.length)]
      );
    }
    setQuestionsAnswered(0);
    setScore(0);
  };

  const generateRecognitionQuestion = () => {
    const correct = aksaraList[Math.floor(Math.random() * aksaraList.length)];
    const options = [correct];

    while (options.length < 4) {
      const option = aksaraList[Math.floor(Math.random() * aksaraList.length)];
      if (!options.find((o) => o.name === option.name)) {
        options.push(option);
      }
    }

    setRecognitionOptions(options.sort(() => Math.random() - 0.5));
    setCurrentAksara(correct);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleRecognitionAnswer = (selectedName: string) => {
    setSelectedAnswer(selectedName);
    const correct = selectedName === currentAksara?.name;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setQuestionsAnswered(questionsAnswered + 1);
      if (questionsAnswered < 9) {
        generateRecognitionQuestion();
      } else {
        setMode("selection");
      }
    }, 1500);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const nextDrawingQuestion = () => {
    setQuestionsAnswered(questionsAnswered + 1);
    if (questionsAnswered < 9) {
      setCurrentAksara(
        aksaraList[Math.floor(Math.random() * aksaraList.length)]
      );
      clearCanvas();
    } else {
      setMode("selection");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      setIsCanvasDrawing(true);
      const rect = canvas.getBoundingClientRect();
      const x =
        "touches" in e
          ? e.touches[0].clientX - rect.left
          : e.clientX - rect.left;
      const y =
        "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isCanvasDrawing) return;

      const rect = canvas.getBoundingClientRect();
      const x =
        "touches" in e
          ? e.touches[0].clientX - rect.left
          : e.clientX - rect.left;
      const y =
        "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      setIsCanvasDrawing(false);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
    };
  }, [isCanvasDrawing]);

  if (mode === "selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <Navbar
          user={{
            name: "Kamu",
            level: 3,
            xp: 450,
            streak: 7,
            notifications: 2,
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-orange-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Latihan Aksara Jawa
              </h1>
              <p className="text-gray-600 text-lg">
                Pilih jenis latihan yang ingin kamu lakukan
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent
                className="p-8 text-center"
                onClick={startDrawingPractice}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Pencil className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-3">
                  Latihan Menulis
                </h3>
                <p className="text-gray-600 mb-6">
                  Berlatih menulis aksara Jawa dengan canvas digital yang
                  responsif
                </p>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                  Mulai Menulis
                </Button>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent
                className="p-8 text-center"
                onClick={startRecognitionPractice}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <MousePointer className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-3">
                  Pengenalan Aksara
                </h3>
                <p className="text-gray-600 mb-6">
                  Latihan mengenali dan mengidentifikasi aksara Jawa
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  Mulai Mengenali
                </Button>
              </CardContent>
            </Card>

            <Card className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent
                className="p-8 text-center"
                onClick={startMixedPractice}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shuffle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-2xl text-gray-800 mb-3">
                  Latihan Campuran
                </h3>
                <p className="text-gray-600 mb-6">
                  Kombinasi menulis dan mengenali untuk latihan menyeluruh
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Mulai Campuran
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-white" />
                </div>
                Latihan Cepat Aksara
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {aksaraList.map((item) => (
                  <Card
                    key={item.name}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-orange-200 bg-gradient-to-br from-white to-orange-50"
                    onClick={() => {
                      setCurrentAksara(item);
                      setMode("drawing");
                      setQuestionsAnswered(0);
                      setScore(0);
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl font-bold text-orange-600 mb-2">
                        {item.aksara}
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`text-xs mt-1 ${
                          item.level === "Basic"
                            ? "border-green-300 text-green-700"
                            : item.level === "Intermediate"
                            ? "border-yellow-300 text-yellow-700"
                            : "border-red-300 text-red-700"
                        }`}
                      >
                        {item.level}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (mode === "drawing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <Navbar
          user={{
            name: "Kamu",
            level: 3,
            xp: 450,
            streak: 7,
            notifications: 2,
          }}
        />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMode("selection")}
              className="hover:bg-orange-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">
                Latihan Menulis
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <Progress
                  value={(questionsAnswered / 10) * 100}
                  className="flex-1 h-2"
                />
                <span className="text-sm text-gray-600">
                  {questionsAnswered}/10
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-center">
                  Tulis Aksara:{" "}
                  <span className="text-orange-600">{currentAksara?.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-8xl font-bold text-orange-600 mb-6 p-8 bg-orange-50 rounded-2xl">
                  {currentAksara?.aksara}
                </div>
                <Badge className="bg-orange-100 text-orange-800">
                  {currentAksara?.level}
                </Badge>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Canvas Menulis
                  <Button variant="outline" size="sm" onClick={clearCanvas}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Hapus
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={300}
                  className="border-2 border-dashed border-orange-300 rounded-lg w-full bg-white cursor-crosshair"
                />
                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={clearCanvas}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Ulangi
                  </Button>
                  <Button
                    onClick={nextDrawingQuestion}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    Selanjutnya
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "recognition") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <Navbar
          user={{
            name: "Kamu",
            level: 3,
            xp: 450,
            streak: 7,
            notifications: 2,
          }}
        />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMode("selection")}
              className="hover:bg-blue-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">
                Pengenalan Aksara
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <Progress
                  value={(questionsAnswered / 10) * 100}
                  className="flex-1 h-2"
                />
                <span className="text-sm text-gray-600">
                  {questionsAnswered}/10
                </span>
                <span className="text-sm font-semibold text-green-600">
                  Skor: {score}
                </span>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Aksara apakah ini?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-9xl font-bold text-blue-600 mb-8 p-8 bg-blue-50 rounded-2xl">
                {currentAksara?.aksara}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {recognitionOptions.map((option) => (
                  <Button
                    key={option.name}
                    variant="outline"
                    size="lg"
                    className={`p-6 text-lg font-semibold transition-all ${
                      showResult
                        ? option.name === currentAksara?.name
                          ? "bg-green-500 text-white border-green-500"
                          : option.name === selectedAnswer
                          ? "bg-red-500 text-white border-red-500"
                          : "opacity-50"
                        : "hover:bg-blue-50 hover:border-blue-300"
                    }`}
                    onClick={() =>
                      !showResult && handleRecognitionAnswer(option.name)
                    }
                    disabled={showResult}
                  >
                    {showResult && option.name === currentAksara?.name && (
                      <Check className="w-5 h-5 mr-2" />
                    )}
                    {showResult &&
                      option.name === selectedAnswer &&
                      option.name !== currentAksara?.name && (
                        <X className="w-5 h-5 mr-2" />
                      )}
                    {option.name}
                  </Button>
                ))}
              </div>

              {showResult && (
                <div
                  className={`mt-6 p-4 rounded-lg ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isCorrect
                    ? "Benar! Hebat!"
                    : `Salah. Jawaban yang benar adalah "${currentAksara?.name}"`}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
