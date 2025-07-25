"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, RotateCcw, Check, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const lessonData = {
  title: "Aksara Pa-Dha-Ja-Ya-Nya",
  questions: [
    {
      type: "multiple-choice",
      question: "Pilih aksara yang benar untuk huruf 'PA'",
      options: ["ꦥ", "ꦦ", "ꦧ", "ꦨ"],
      correct: 0,
      explanation: "Aksara ꦥ (PA) adalah aksara dasar untuk bunyi 'pa'",
    },
    {
      type: "drawing",
      question: "Gambar aksara 'DHA' (ꦝ)",
      targetAksara: "ꦝ",
      explanation:
        "Aksara ꦝ (DHA) memiliki bentuk yang khas dengan garis melengkung",
    },
    {
      type: "multiple-choice",
      question: "Manakah yang merupakan aksara 'JA'?",
      options: ["ꦗ", "ꦘ", "ꦙ", "ꦚ"],
      correct: 0,
      explanation: "Aksara ꦗ (JA) adalah aksara untuk bunyi 'ja'",
    },
  ],
};

export default function LessonPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const question = lessonData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / lessonData.questions.length) * 100;

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
      ctx.strokeStyle = "#f97316";
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
              <h1 className="text-xl font-bold">{lessonData.title}</h1>
              <Progress value={progress} className="w-64 mt-1" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-orange-100">
              Pertanyaan {currentQuestion + 1} dari{" "}
              {lessonData.questions.length}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mascot */}
          <div className="lg:col-span-1">
            <Card className="border-orange-200">
              <CardContent className="p-6 text-center">
                <Image
                  src="/mascot-nara.png"
                  alt="NARA Mascot"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <div className="bg-orange-100 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    {question.type === "drawing"
                      ? "Gambar aksara dengan hati-hati ya!"
                      : "Pilih jawaban yang tepat!"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question */}
          <div className="lg:col-span-2">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Display error if it exists */}
                {error && (
                  <Alert className="border-red-200 bg-red-50 mb-4">
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

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
                            ? "bg-orange-500 hover:bg-orange-600"
                            : "border-orange-200 hover:bg-orange-50"
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
                      <div className="text-6xl font-bold text-orange-600 mb-4">
                        {question.targetAksara}
                      </div>
                    </div>
                    <div className="border-2 border-orange-200 rounded-lg p-4 bg-white">
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
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
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
                  <div></div>
                  <div className="space-x-2">
                    {!showResult ? (
                      <Button
                        onClick={checkAnswer}
                        disabled={
                          (question.type === "multiple-choice" &&
                            selectedAnswer === null) ||
                          isLoading
                        }
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        {isLoading ? "Memproses..." : "Periksa"}
                      </Button>
                    ) : (
                      <>
                        {currentQuestion < lessonData.questions.length - 1 ? (
                          <Button
                            onClick={nextQuestion}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            Lanjut
                          </Button>
                        ) : (
                          <Link href="/">
                            <Button className="bg-green-500 hover:bg-green-600">
                              Selesai
                            </Button>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
