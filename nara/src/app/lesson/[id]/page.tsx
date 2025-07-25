"use client";
import type React from "react";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  RotateCcw,
  Check,
  X,
  Play,
  Pause,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const lessonData = {
  title: "Aksara Lontara Ka-Ga-Nga-Pa-Ba",
  videoUrl:
    "/placeholder.svg?height=400&width=600&text=Video+Pembelajaran+Lontara",
  characters: [
    { char: "ᨀ", name: "Ka", sound: "ka" },
    { char: "ᨁ", name: "Ga", sound: "ga" },
    { char: "ᨂ", name: "Nga", sound: "nga" },
    { char: "ᨄ", name: "Pa", sound: "pa" },
    { char: "ᨅ", name: "Ba", sound: "ba" },
  ],
  questions: [
    {
      type: "multiple-choice",
      question: "Pilih aksara yang benar untuk huruf 'KA'",
      options: ["ᨀ", "ᨁ", "ᨂ", "ᨃ"],
      correct: 0,
      explanation:
        "Aksara ᨀ (Ka) adalah aksara dasar untuk bunyi 'ka' dalam tulisan Lontara",
    },
    {
      type: "drawing",
      question: "Gambar aksara 'GA' (ᨁ)",
      targetAksara: "ᨁ",
      explanation:
        "Aksara ᨁ (Ga) memiliki bentuk yang khas dengan garis vertikal dan horizontal",
    },
    {
      type: "multiple-choice",
      question: "Manakah yang merupakan aksara 'NGA'?",
      options: ["ᨀ", "ᨁ", "ᨂ", "ᨃ"],
      correct: 2,
      explanation:
        "Aksara ᨂ (Nga) adalah aksara untuk bunyi 'nga' dalam bahasa Bugis-Makassar",
    },
    {
      type: "multiple-choice",
      question: "Pilih aksara yang benar untuk huruf 'PA'",
      options: ["ᨂ", "ᨃ", "ᨄ", "ᨅ"],
      correct: 2,
      explanation:
        "Aksara ᨄ (Pa) adalah aksara untuk bunyi 'pa' dalam tulisan Lontara",
    },
    {
      type: "drawing",
      question: "Gambar aksara 'BA' (ᨅ)",
      targetAksara: "ᨅ",
      explanation:
        "Aksara ᨅ (Ba) memiliki bentuk yang mirip dengan Pa namun dengan tambahan titik",
    },
  ],
};

export default function LontaraLessonPage({
  params,
}: {
  params: { id: string };
}) {
  const [currentSection, setCurrentSection] = useState<"video" | "practice">(
    "video"
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const question = lessonData.questions[currentQuestion];
  const progress =
    currentSection === "practice"
      ? ((currentQuestion + 1) / lessonData.questions.length) * 100
      : 0;

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#dc2626";
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const checkAnswer = async () => {
    setError(null); // Clear any previous errors
    if (question.type === "multiple-choice") {
      const correct = selectedAnswer === question.correct;
      setIsCorrect(correct);
      if (correct) setScore(score + 1);
      setShowResult(true);
    } else {
      setIsLoading(true); // Start loading
      try {
        const canvas = canvasRef.current;
        if (!canvas) throw new Error("Canvas not found");

        // Convert canvas to Blob
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!));
        });

        // Prepare FormData for API request
        const formData = new FormData();
        formData.append("file", blob, "drawing.png");

        // Send POST request to Flask API
        const response = await fetch("http://localhost:5000/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Prediction failed");
        }

        const data = await response.json();
        const prediction = data.prediction;
        const correct = prediction === question.targetAksara;
        setIsCorrect(correct);
        if (correct) setScore(score + 1);
        setShowResult(true);
      } catch (error) {
        console.error("Error during prediction:", error);
        setError("Terjadi kesalahan saat memprediksi. Silakan coba lagi.");
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < lessonData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setError(null);
      clearCanvas();
    }
  };

  const startPractice = () => {
    setCurrentSection("practice");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
              <h1 className="text-xl font-bold">{lessonData.title}</h1>
              {currentSection === "practice" && (
                <Progress value={progress} className="w-64 mt-1" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant={currentSection === "video" ? "secondary" : "ghost"}
              onClick={() => setCurrentSection("video")}
              className={`hover:bg-white/20 ${
                currentSection === "video" ? "text-black" : "text-white"
              }`}
            >
              Video Pembelajaran
            </Button>

            <Button
              variant={currentSection === "practice" ? "secondary" : "ghost"}
              onClick={startPractice}
              className={`hover:bg-white/20 ${
                currentSection === "practice" ? "text-black" : "text-white"
              }`}
            >
              Latihan
            </Button>

            {currentSection === "practice" && (
              <div className="text-right">
                <p className="text-sm text-red-100">
                  Pertanyaan {currentQuestion + 1} dari{" "}
                  {lessonData.questions.length}
                </p>
                <p className="text-sm text-red-100">Skor: {score}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {currentSection === "video" ? (
          // Video Learning Section
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    Video Pembelajaran Aksara Lontara
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                    <video
                      src="/video_aksara_lontara.mp4"
                      className="w-full h-auto"
                      controls={isVideoPlaying}
                      autoPlay={isVideoPlaying}
                    />
                    {!isVideoPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="lg"
                          onClick={() => setIsVideoPlaying(true)}
                          className="bg-red-500 hover:bg-red-600 rounded-full w-16 h-16"
                        >
                          <Play className="w-8 h-8 ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">
                      Tentang Video Ini:
                    </h3>
                    <p className="text-sm text-gray-700">
                      Video ini menjelaskan sejarah dan cara penulisan aksara
                      Lontara, sistem tulisan tradisional suku Bugis dan
                      Makassar dari Sulawesi Selatan.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Character Reference */}
            <div className="lg:col-span-1">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">
                    Aksara yang Dipelajari
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {lessonData.characters.map((char, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-red-50 rounded-lg"
                      >
                        <div className="text-4xl font-bold text-red-600 w-12 text-center">
                          {char.char}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {char.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            /{char.sound}/
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-orange-100 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Tips:</strong> Aksara Lontara ditulis dari kiri ke
                      kanan, sama seperti huruf Latin. Setiap aksara mewakili
                      satu suku kata.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Practice Section
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Mascot */}
            <div className="lg:col-span-1">
              <Card className="border-red-200">
                <CardContent className="p-6 text-center">
                  <Image
                    src="/mascot-nara.png"
                    alt="Mascot Lontara"
                    width={120}
                    height={120}
                    className="mx-auto mb-4"
                  />
                  <div className="bg-red-100 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      {question.type === "drawing"
                        ? "Gambar aksara dengan hati-hati ya!"
                        : "Pilih jawaban yang tepat!"}
                    </p>
                  </div>

                  {/* Character Reference for Practice */}
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      Referensi:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {lessonData.characters.slice(0, 4).map((char, index) => (
                        <div key={index} className="text-center">
                          <div className="text-lg text-red-600">
                            {char.char}
                          </div>
                          <div className="text-gray-600">{char.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Question */}
            <div className="lg:col-span-2">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    {question.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {question.type === "multiple-choice" ? (
                    <div className="grid grid-cols-2 gap-4">
                      {question.options?.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedAnswer === index ? "default" : "outline"
                          }
                          className={`h-20 text-4xl ${
                            selectedAnswer === index
                              ? "bg-red-500 hover:bg-red-600"
                              : "border-red-200 hover:bg-red-50"
                          }`}
                          onClick={() => setSelectedAnswer(index)}
                          disabled={showResult}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-lg mb-2">Target aksara:</p>
                        <div className="text-6xl font-bold text-red-600 mb-4">
                          {question.targetAksara}
                        </div>
                      </div>
                      <div className="border-2 border-red-200 rounded-lg p-4 bg-white">
                        <canvas
                          ref={canvasRef}
                          width={400}
                          height={300}
                          className="border border-gray-300 rounded cursor-crosshair mx-auto block"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                        />
                        <div className="flex justify-center mt-4">
                          <Button
                            variant="outline"
                            onClick={clearCanvas}
                            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Result */}
                  {showResult && (
                    <div
                      className={`mt-6 p-4 rounded-lg ${
                        isCorrect
                          ? "bg-green-100 border border-green-200"
                          : "bg-red-100 border border-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                        <span
                          className={`font-bold ${
                            isCorrect ? "text-green-800" : "text-red-800"
                          }`}
                        >
                          {isCorrect ? "Benar!" : "Salah!"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {question.explanation}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentSection("video")}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Kembali ke Video
                    </Button>
                    <div className="space-x-2">
                      {!showResult ? (
                        <Button
                          onClick={checkAnswer}
                          disabled={
                            question.type === "multiple-choice"
                              ? selectedAnswer === null
                              : false
                          }
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Periksa
                        </Button>
                      ) : (
                        <>
                          {currentQuestion < lessonData.questions.length - 1 ? (
                            <Button
                              onClick={nextQuestion}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Lanjut
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                onClick={startPractice}
                                variant="outline"
                                className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                              >
                                Ulangi Latihan
                              </Button>
                              <Link href="/">
                                <Button className="bg-green-500 hover:bg-green-600">
                                  Selesai (Skor: {score}/
                                  {lessonData.questions.length})
                                </Button>
                              </Link>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
