"use client";

import type React from "react";

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
  Volume2,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/navbar";

type PracticeMode = "selection" | "drawing" | "recognition" | "mixed";

type Aksara = {
  aksara: string;
  name: string;
  level: "Basic" | "Intermediate" | "Advanced";
  sound: string;
};

const aksaraList: Aksara[] = [
  { aksara: "ᨕ", name: "A", level: "Basic", sound: "a" },
  { aksara: "ᨀ", name: "Ka", level: "Basic", sound: "ka" },
  { aksara: "ᨁ", name: "Ga", level: "Basic", sound: "ga" },
  { aksara: "ᨂ", name: "Nga", level: "Basic", sound: "nga" },
  { aksara: "ᨄ", name: "Pa", level: "Intermediate", sound: "pa" },
  { aksara: "ᨅ", name: "Ba", level: "Intermediate", sound: "ba" },
  { aksara: "ᨈ", name: "Ta", level: "Advanced", sound: "ta" },
  { aksara: "ᨎ", name: "Nya", level: "Advanced", sound: "nya" },
];

export default function Practice() {
  const [currentSection, setCurrentSection] = useState<
    "selection" | "practice"
  >("selection");
  const [mode, setMode] = useState<PracticeMode>("selection");
  const [currentAksara, setCurrentAksara] = useState<Aksara | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [recognitionOptions, setRecognitionOptions] = useState<Aksara[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const totalQuestions = 10;
  const progress =
    currentSection === "practice"
      ? ((questionsAnswered + 1) / totalQuestions) * 100
      : 0;

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (mode === "drawing" || mode === "mixed") {
      setTimeout(initializeCanvas, 100);
    }
  }, [mode, currentAksara]);

  const startDrawingPractice = () => {
    setCurrentSection("practice");
    setMode("drawing");
    setCurrentAksara(aksaraList[Math.floor(Math.random() * aksaraList.length)]);
    setQuestionsAnswered(0);
    setScore(0);
    setCurrentQuestion(0);
  };

  const startRecognitionPractice = () => {
    setCurrentSection("practice");
    setMode("recognition");
    generateRecognitionQuestion();
    setQuestionsAnswered(0);
    setScore(0);
    setCurrentQuestion(0);
  };

  const startMixedPractice = () => {
    setCurrentSection("practice");
    setMode("mixed");
    setQuestionsAnswered(0);
    setScore(0);
    setCurrentQuestion(0);
    generateMixedQuestion();
  };

  const generateMixedQuestion = () => {
    const questionType = Math.random() > 0.5 ? "drawing" : "recognition";

    if (questionType === "drawing") {
      setCurrentAksara(
        aksaraList[Math.floor(Math.random() * aksaraList.length)]
      );
      setRecognitionOptions([]);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeout(initializeCanvas, 100);
    } else {
      generateRecognitionQuestion();
    }
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
      nextQuestion();
    }, 1500);
  };

  const checkDrawing = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not found");

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not found");

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let hasDrawing = false;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r < 250 || g < 250 || b < 250) {
          hasDrawing = true;
          break;
        }
      }

      if (!hasDrawing) {
        throw new Error("Please draw something on the canvas first");
      }

      const processCanvas = document.createElement("canvas");
      const processCtx = processCanvas.getContext("2d");

      processCanvas.width = 128;
      processCanvas.height = 128;

      if (processCtx) {
        processCtx.fillStyle = "white";
        processCtx.fillRect(0, 0, processCanvas.width, processCanvas.height);
        processCtx.drawImage(
          canvas,
          0,
          0,
          processCanvas.width,
          processCanvas.height
        );
      }

      const blob = await new Promise<Blob>((resolve, reject) => {
        processCanvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to convert canvas to blob"));
          },
          "image/png",
          1.0
        );
      });

      const formData = new FormData();
      formData.append("file", blob, "drawing.png");

      console.log("Sending processed image to Flask API...");
      console.log("Processed image size:", blob.size, "bytes");
      console.log("Target character:", currentAksara?.name.toLowerCase());

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API request failed: ${response.status} - ${errorText}`
        );
      }

      const responseData = await response.json();
      console.log("API Response:", responseData);

      const predicted_class = responseData.predicted_class;
      console.log(
        "Predicted:",
        predicted_class,
        "Expected:",
        currentAksara?.name.toLowerCase()
      );

      const correct = predicted_class === currentAksara?.name.toLowerCase();
      setIsCorrect(correct);
      setShowResult(true);

      if (correct) {
        setScore(score + 1);
      }

      setTimeout(() => {
        nextQuestion();
      }, 1500);
    } catch (error) {
      console.error("Error during prediction:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred while predicting. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const nextQuestion = () => {
    setQuestionsAnswered(questionsAnswered + 1);
    setCurrentQuestion(currentQuestion + 1);

    if (questionsAnswered < totalQuestions - 1) {
      if (mode === "mixed") {
        generateMixedQuestion();
      } else if (mode === "recognition") {
        generateRecognitionQuestion();
      } else if (mode === "drawing") {
        setCurrentAksara(
          aksaraList[Math.floor(Math.random() * aksaraList.length)]
        );
        clearCanvas();
        setShowResult(false);
        setTimeout(initializeCanvas, 100);
      }
    } else {
      setCurrentSection("selection");
    }
  };

  const isCurrentlyDrawing = () => {
    return (
      mode === "drawing" ||
      (mode === "mixed" && recognitionOptions.length === 0)
    );
  };

  const isCurrentlyRecognition = () => {
    return (
      mode === "recognition" ||
      (mode === "mixed" && recognitionOptions.length > 0)
    );
  };

  if (currentSection === "selection") {
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
                Script Practice
              </h1>
              <p className="text-gray-600 text-lg">
                Choose the type of practice you want to do
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
                  Writing Practice
                </h3>
                <p className="text-gray-600 mb-6">
                  Practice writing characters with responsive digital canvas
                </p>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                  Start Writing
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
                  Character Recognition
                </h3>
                <p className="text-gray-600 mb-6">
                  Practice recognizing and identifying characters
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                  Start Recognition
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
                  Mixed Practice
                </h3>
                <p className="text-gray-600 mb-6">
                  Combination of writing and recognition for comprehensive
                  practice
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Start Mixed
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-white" />
                </div>
                Quick Character Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {aksaraList.map((item) => (
                  <Card
                    key={item.name}
                    className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-orange-200 bg-gradient-to-br from-white to-orange-50"
                    onClick={() => {
                      setCurrentAksara(item);
                      setCurrentSection("practice");
                      setMode("drawing");
                      setQuestionsAnswered(0);
                      setScore(0);
                      setCurrentQuestion(0);
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl font-bold text-orange-600 mb-2">
                        {item.aksara}
                      </div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1">
                        /{item.sound}/
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <Navbar
        user={{
          name: "You",
          level: 3,
          xp: 450,
          streak: 7,
          notifications: 2,
        }}
      />

      <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentSection("selection")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">
                {mode === "drawing"
                  ? "Writing Practice"
                  : mode === "recognition"
                  ? "Character Recognition"
                  : "Mixed Practice"}
              </h1>
              <Progress value={progress} className="w-64 mt-1" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-orange-100">
              Question {currentQuestion + 1} of {totalQuestions}
            </p>
            <p className="text-sm text-orange-100">Score: {score}</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="border-orange-200 mb-6">
              <CardContent className="p-6 text-center">
                <Image
                  src="/mascot-nara.png"
                  alt="Practice Mascot"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <div className="bg-orange-100 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    {isCurrentlyDrawing()
                      ? "Draw the character carefully!"
                      : "Choose the correct answer!"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">
                  Character Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {aksaraList.slice(0, 8).map((char, index) => (
                    <div
                      key={index}
                      className="text-center p-2 bg-orange-50 rounded-lg"
                    >
                      <div className="text-2xl text-orange-600 mb-1">
                        {char.aksara}
                      </div>
                      <div className="text-xs text-gray-600">{char.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  {isCurrentlyDrawing()
                    ? `Write the character: ${currentAksara?.name}`
                    : "What character is this?"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isCurrentlyDrawing() ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-lg mb-2">Target character:</p>
                      <div className="text-8xl font-bold text-orange-600 mb-4 p-6 bg-orange-50 rounded-2xl">
                        {currentAksara?.aksara}
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">
                        {currentAksara?.level} • /{currentAksara?.sound}/
                      </Badge>
                    </div>

                    <div className="border-2 border-orange-200 rounded-lg p-4 bg-white">
                      <canvas
                        ref={canvasRef}
                        width={500}
                        height={300}
                        className="border border-gray-300 rounded cursor-crosshair mx-auto block"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                      />
                      <div className="flex justify-center gap-3 mt-4">
                        <Button
                          variant="outline"
                          onClick={clearCanvas}
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Clear
                        </Button>
                        {!showResult && (
                          <Button
                            onClick={checkDrawing}
                            disabled={isLoading}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Checking...
                              </>
                            ) : (
                              "Check Drawing"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-9xl font-bold text-blue-600 mb-6 p-8 bg-blue-50 rounded-2xl">
                        {currentAksara?.aksara}
                      </div>
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
                          {showResult &&
                            option.name === currentAksara?.name && (
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
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-red-800">Error</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                )}

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
                        {isCorrect ? "Correct! Great job!" : "Wrong!"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {isCorrect
                        ? `Well done! The character ${currentAksara?.aksara} is pronounced "${currentAksara?.sound}".`
                        : `The correct answer is "${currentAksara?.name}" (${currentAksara?.aksara}), pronounced "${currentAksara?.sound}".`}
                    </p>
                  </div>
                )}

                {questionsAnswered >= totalQuestions && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Practice Complete!
                    </h3>
                    <p className="text-lg text-gray-700 mb-4">
                      Final Score: {score}/{totalQuestions} (
                      {Math.round((score / totalQuestions) * 100)}%)
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={() => setCurrentSection("selection")}
                        variant="outline"
                        className="border-orange-300 text-orange-600 hover:bg-orange-50"
                      >
                        Try Another Practice
                      </Button>
                      <Link href="/dashboard">
                        <Button className="bg-green-500 hover:bg-green-600">
                          Back to Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
