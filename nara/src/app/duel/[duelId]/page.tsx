"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Clock,
  Crown,
  RotateCcw,
  BarChart2,
  Loader2,
  Home,
  Hourglass,
  CheckCircle,
  XCircle,
  Target,
} from "lucide-react";
import Link from "next/link";
import Pusher from "pusher-js";

const INITIAL_TIME = 120;

type BaseQuestion = {
  id: string;
  question: string;
  type: "multiple-choice" | "drawing";
};

type MultipleChoiceQuestion = BaseQuestion & {
  type: "multiple-choice";
  options: string[];
  correct: string;
};

type DrawingQuestion = BaseQuestion & {
  type: "drawing";
  correct?: string; // if applicable
};

type Question = MultipleChoiceQuestion | DrawingQuestion;


export default function DuelPage() {
  const params = useParams();
  const router = useRouter();
  const duelId = params.duelId as string;

  const [quizData, setQuizData] = useState<{ questions: Question[] }>({
    questions: [],
  });

  const [gameState, setGameState] = useState<
    "connecting" | "countdown" | "playing" | "waiting_for_finish" | "finished"
  >("connecting");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [countdown, setCountdown] = useState(3);
  const [winner, setWinner] = useState<"player" | "opponent" | "tie" | null>(
    null
  );

  const [playerStats, setPlayerStats] = useState({
    score: 0,
    progress: 0,
    correct: 0,
    incorrect: 0,
    avgAccuracy: 0,
    accuracyScores: [] as number[],
    finishTime: null as number | null,
  });
  const [opponentStats, setOpponentStats] = useState({
    score: 0,
    progress: 0,
    correct: 0,
    incorrect: 0,
    avgAccuracy: 0,
    accuracyScores: [] as number[],
    finishTime: null as number | null,
  });

  const [playerPerformanceScore, setPlayerPerformanceScore] = useState(0);
  const [opponentPerformanceScore, setOpponentPerformanceScore] = useState(0);
  const [pusher, setPusher] = useState<Pusher | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalQuestions = quizData.questions.length;
  const currentQuestionData = quizData.questions[currentQuestion];

  useEffect(() => {
    const savedQuiz = sessionStorage.getItem("currentDuelQuiz");
    if (savedQuiz) {
      setQuizData(JSON.parse(savedQuiz));
    } else {
      router.push("/duel");
    }

    const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      authEndpoint: "/api/pusher/auth",
    });
    setPusher(pusherInstance);

    const channelName = `private-duel-${duelId}`;
    const channel = pusherInstance.subscribe(channelName);

    channel.bind("pusher:subscription_succeeded", () => {
      fetch("/api/pusher/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: channelName,
          event: "client-ready",
          data: {},
        }),
      });
    });

    channel.bind("client-ready", () => {
      setGameState("countdown");
    });

    channel.bind(
      "answer-submitted",
      (data: { senderSocketId: string; stats: typeof opponentStats }) => {
        if (pusherInstance.connection.socket_id !== data.senderSocketId) {
          setOpponentStats(data.stats);
        }
      }
    );

    return () => {
      pusherInstance.unsubscribe(channelName);
      pusherInstance.disconnect();
    };
  }, [duelId, router]);

  useEffect(() => {
    if (gameState === "countdown" && countdown > 0) {
      const timerId = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timerId);
    }
    if (gameState === "countdown" && countdown === 0) {
      setGameState("playing");
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    }
  }, [gameState, countdown]);

  const submitPlayerAnswer = async (answer?: string) => {
    if (selectedAnswer !== null || !pusher) return;

    let isCorrect = false;
    let accuracy = 0;

    if (currentQuestionData.type === "multiple-choice") {
      if (!answer) return;
      isCorrect = answer === currentQuestionData.correct;
    } else if (currentQuestionData.type === "drawing" && hasDrawn) {
      isCorrect = true;
      accuracy = 0.75 + Math.random() * 0.25;
    }
    setSelectedAnswer(answer ?? "drawing_submission");

    setPlayerStats((prev) => {
      const newAccuracyScores =
        accuracy > 0 ? [...prev.accuracyScores, accuracy] : prev.accuracyScores;
      const totalAccuracy = newAccuracyScores.reduce(
        (sum, acc) => sum + acc,
        0
      );
      const newAvgAccuracy =
        newAccuracyScores.length > 0
          ? totalAccuracy / newAccuracyScores.length
          : 0;
      const newProgress = prev.progress + 1;

      const newStats = {
        ...prev,
        progress: newProgress,
        score: prev.score + (isCorrect ? 1 : 0),
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
        accuracyScores: newAccuracyScores,
        avgAccuracy: newAvgAccuracy,
        finishTime: newProgress >= totalQuestions ? timeLeft : prev.finishTime,
      };

      fetch("/api/pusher/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: `private-duel-${duelId}`,
          event: "answer-submitted",
          data: {
            stats: newStats,
            senderSocketId: pusher.connection.socket_id,
          },
        }),
      });

      return newStats;
    });

    setTimeout(() => {
      const nextProgress = playerStats.progress + 1;
      if (nextProgress >= totalQuestions) {
        if (opponentStats.progress < totalQuestions) {
          setGameState("waiting_for_finish");
        }
      } else {
        setCurrentQuestion((q) => q + 1);
        setSelectedAnswer(null);
        clearCanvas();
        setHasDrawn(false);
      }
    }, 800);
  };

  const endGame = () => {
    if (gameState === "finished") return;
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);
    setGameState("finished");
  };

  useEffect(() => {
    if (totalQuestions === 0 || gameState !== "playing") return;
    if (timeLeft === 0) endGame();
    if (
      playerStats.progress >= totalQuestions &&
      opponentStats.progress >= totalQuestions
    )
      endGame();
  }, [timeLeft, playerStats.progress, opponentStats.progress]);

  useEffect(() => {
    if (gameState === "finished") {
      const calculatePerformanceScore = (stats: typeof playerStats) => {
        if (stats.progress === 0) return 0;
        const timeTaken =
          stats.finishTime !== null
            ? INITIAL_TIME - stats.finishTime
            : INITIAL_TIME;
        const accuracyBonus = stats.avgAccuracy > 0 ? 1 + stats.avgAccuracy : 1;
        return (
          (Math.pow(stats.score, 2) * stats.progress * 1000 * accuracyBonus) /
          Math.max(timeTaken, 1)
        );
      };

      const playerPerf = calculatePerformanceScore(playerStats);
      const opponentPerf = calculatePerformanceScore(opponentStats);

      setPlayerPerformanceScore(Math.round(playerPerf));
      setOpponentPerformanceScore(Math.round(opponentPerf));

      if (playerPerf > opponentPerf) setWinner("player");
      else if (opponentPerf > playerPerf) setWinner("opponent");
      else setWinner("tie");
    }
  }, [gameState, playerStats, opponentStats]);

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || selectedAnswer !== null) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedAnswer !== null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  if (gameState === "connecting") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
        <div>
          <Loader2 className="w-12 h-12 mx-auto animate-spin text-orange-500" />
          <p className="mt-4 text-lg text-gray-700">Connecting to duel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            <h1 className="text-xl font-bold">Aksara Duel</h1>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        {gameState === "countdown" && (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto border-orange-200 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Get Ready...
                </h2>
                <div className="text-8xl font-bold text-orange-500 mb-4">
                  {countdown}
                </div>
                <p className="text-gray-600">The duel begins!</p>
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "playing" && currentQuestionData && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Card className="w-fit px-6 py-2 bg-slate-800 text-white shadow-lg border-2 border-yellow-400">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <span className="text-2xl font-bold tracking-wider">
                    {timeLeft}s
                  </span>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🧑</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-800">You</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={(playerStats.progress / totalQuestions) * 100}
                          className="flex-1 h-2 [&>*]:bg-blue-500"
                        />
                        <span className="text-sm text-blue-600 font-bold">
                          {playerStats.progress}/{totalQuestions}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {playerStats.score}
                      </div>
                      <div className="text-xs text-blue-500">points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🤖</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-red-800">Opponent</h3>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={
                            (opponentStats.progress / totalQuestions) * 100
                          }
                          className="flex-1 h-2 [&>*]:bg-red-500"
                        />
                        <span className="text-sm text-red-600 font-bold">
                          {opponentStats.progress}/{totalQuestions}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">
                        {opponentStats.score}
                      </div>
                      <div className="text-xs text-red-500">points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-center md:text-left text-gray-800">
                  Question {currentQuestion + 1}: {currentQuestionData.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {currentQuestionData.type === "multiple-choice" ? (
                  <div className="grid grid-cols-2 gap-4">
                    {currentQuestionData.options.map(
                      (option: string, index: number) => (
                        <Button
                          key={index}
                          variant="outline"
                          className={`h-24 text-5xl transition-all duration-300 disabled:opacity-100 ${
                            selectedAnswer !== null
                              ? currentQuestionData.correct === option
                                ? "bg-green-200 border-green-400"
                                : selectedAnswer === option
                                ? "bg-red-200 border-red-400"
                                : "bg-gray-100"
                              : "hover:bg-orange-50"
                          }`}
                          onClick={() => submitPlayerAnswer(option)}
                          disabled={selectedAnswer !== null}
                        >
                          {option}
                        </Button>
                      )
                    )}
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="inline-block border-2 border-dashed border-orange-300 rounded-lg bg-white p-2 shadow-inner">
                      <canvas
                        ref={canvasRef}
                        width={400}
                        height={200}
                        className="rounded cursor-crosshair"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                      />
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button
                        variant="outline"
                        onClick={clearCanvas}
                        disabled={selectedAnswer !== null}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" /> Clear
                      </Button>
                      <Button
                        onClick={() => submitPlayerAnswer()}
                        disabled={!hasDrawn || selectedAnswer !== null}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        Submit Drawing
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "waiting_for_finish" && (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto border-orange-200 shadow-lg">
              <CardContent className="p-8">
                <Hourglass className="w-12 h-12 mx-auto text-orange-500 animate-spin mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Quiz Finished!
                </h2>
                <p className="text-gray-600">
                  Waiting for your opponent to complete the duel. The results
                  will be shown shortly.
                </p>
                <div className="mt-6">
                  <Progress
                    value={(opponentStats.progress / totalQuestions) * 100}
                    className="h-2 [&>*]:bg-red-500"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {`Opponent's Progress: ${opponentStats.progress}/${totalQuestions}`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "finished" && (
          <div className="text-center py-12">
            <Card className="max-w-lg mx-auto border-orange-200 shadow-lg">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">
                  {winner === "player"
                    ? "🏆"
                    : winner === "opponent"
                    ? "😔"
                    : "🤝"}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {winner === "player"
                    ? "You Win!"
                    : winner === "opponent"
                    ? "You Lose!"
                    : "It's a Tie!"}
                </h2>
                <p className="text-gray-600 mb-6">
                  {winner === "player"
                    ? "Great! Your accuracy and speed led to victory!"
                    : winner === "opponent"
                    ? "A tough opponent! Try again!"
                    : "What a close match!"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left text-sm">
                  <div
                    className={`p-4 rounded-lg space-y-3 ${
                      winner === "player"
                        ? "bg-green-100 border-2 border-green-300"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="font-bold text-base">🧑 You</div>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Correct Answers
                        </span>{" "}
                        <span className="font-semibold">
                          {playerStats.correct}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-red-500" />
                          Incorrect Answers
                        </span>{" "}
                        <span className="font-semibold">
                          {playerStats.incorrect}
                        </span>
                      </div>
                      {playerStats.avgAccuracy > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1.5">
                            <Target className="w-4 h-4 text-blue-500" />
                            Avg. Drawing Accuracy
                          </span>{" "}
                          <span className="font-semibold">
                            {(playerStats.avgAccuracy * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-500" />
                          Finish Time
                        </span>{" "}
                        <span className="font-semibold">
                          {playerStats.finishTime !== null
                            ? `${INITIAL_TIME - playerStats.finishTime}s`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between items-center">
                      <span className="flex items-center gap-1.5 font-bold">
                        <BarChart2 className="w-4 h-4 text-blue-600" />
                        Perf. Score
                      </span>{" "}
                      <span className="font-bold text-blue-600 text-base">
                        {playerPerformanceScore.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-lg space-y-3 ${
                      winner === "opponent"
                        ? "bg-green-100 border-2 border-green-300"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="font-bold text-base">🤖 Opponent</div>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          Correct Answers
                        </span>{" "}
                        <span className="font-semibold">
                          {opponentStats.correct}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-red-500" />
                          Incorrect Answers
                        </span>{" "}
                        <span className="font-semibold">
                          {opponentStats.incorrect}
                        </span>
                      </div>
                      {opponentStats.avgAccuracy > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1.5">
                            <Target className="w-4 h-4 text-blue-500" />
                            Avg. Drawing Accuracy
                          </span>{" "}
                          <span className="font-semibold">
                            {(opponentStats.avgAccuracy * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-500" />
                          Finish Time
                        </span>{" "}
                        <span className="font-semibold">
                          {opponentStats.finishTime !== null
                            ? `${INITIAL_TIME - opponentStats.finishTime}s`
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between items-center">
                      <span className="flex items-center gap-1.5 font-bold">
                        <BarChart2 className="w-4 h-4 text-red-600" />
                        Perf. Score
                      </span>{" "}
                      <span className="font-bold text-red-600 text-base">
                        {opponentPerformanceScore.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => router.push("/duel")}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    Play Again
                  </Button>
                  <Link href="/leaderboard" passHref>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Crown className="w-4 h-4 mr-2" />
                      View Leaderboard
                    </Button>
                  </Link>
                  <Link href="/dashboard" passHref>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Home className="w-4 h-4 mr-2" />
                      Back to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
