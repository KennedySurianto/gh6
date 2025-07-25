"use client"

import { useState, useEffect, useRef, MouseEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Clock, Zap, Crown, Target, RotateCcw, BarChart2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/navbar"

const quizData = {
  questions: [
    {
      type: "multiple-choice",
      question: "Select the correct script for the letter 'KA'",
      options: ["ꦏ", "ꦐ", "ꦑ", "ꦒ"],
      correct: 0,
    },
    {
      type: "drawing",
      question: "Draw the script for 'DHA' (ꦝ)",
      targetAksara: "ꦝ",
    },
    {
      type: "multiple-choice",
      question: "Which one is the script for 'GA'?",
      options: ["ꦒ", "ꦓ", "ꦔ", "ꦕ"],
      correct: 0,
    },
    {
      type: "drawing",
      question: "Draw the script for 'YA' (ꦪ)",
      targetAksara: "ꦪ",
    },
    {
      type: "multiple-choice",
      question: "Choose the appropriate script for 'SA'",
      options: ["ꦱ", "ꦲ", "꦳", "ꦴ"],
      correct: 0,
    },
    {
      type: "multiple-choice",
      question: "What is the script for the letter 'MA'?",
      options: ["ꦩ", "ꦪ", "ꦫ", "ꦬ"],
      correct: 0,
    },
  ],
}

const INITIAL_TIME = 120

export default function MatchmakingPage() {
  const [gameState, setGameState] = useState<"waiting" | "countdown" | "playing" | "finished">("waiting")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [playerProgress, setPlayerProgress] = useState(0)
  const [opponentProgress, setOpponentProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)
  const [countdown, setCountdown] = useState(3)
  const [winner, setWinner] = useState<"player" | "opponent" | "tie" | null>(null)
  const [playerFinishTime, setPlayerFinishTime] = useState<number | null>(null)
  const [opponentFinishTime, setOpponentFinishTime] = useState<number | null>(null)
  const [playerPerformanceScore, setPlayerPerformanceScore] = useState(0)
  const [opponentPerformanceScore, setOpponentPerformanceScore] = useState(0)
  const [opponentCurrentQuestion, setOpponentCurrentQuestion] = useState(0)
  const [opponentIsThinking, setOpponentIsThinking] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const gameTimerRef = useRef<NodeJS.Timeout | null>(null)
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null)

  const totalQuestions = quizData.questions.length
  const currentQuestionData = quizData.questions[currentQuestion]

  // --- Drawing Canvas Functions (unchanged) ---
  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas || selectedAnswer !== null) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    setIsDrawing(true)
    setHasDrawn(true)
    const rect = canvas.getBoundingClientRect()
    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }
  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedAnswer !== null) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    ctx.lineWidth = 5
    ctx.lineCap = "round"
    ctx.strokeStyle = "#000000"
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }
  const stopDrawing = () => setIsDrawing(false)
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  // --- Game Flow Functions (unchanged logic) ---
  const startMatchmaking = () => {
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    setGameState("countdown")
    setCountdown(3)
    countdownTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current!)
          startGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const startGame = () => {
    if (gameTimerRef.current) clearInterval(gameTimerRef.current);  

    setGameState("playing")
    setTimeLeft(INITIAL_TIME)
    setPlayerScore(0)
    setPlayerProgress(0)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setOpponentScore(0)
    setOpponentProgress(0)
    setOpponentCurrentQuestion(0)
    setWinner(null)
    clearCanvas()
    setPlayerFinishTime(null)
    setOpponentFinishTime(null)
    setPlayerPerformanceScore(0)
    setOpponentPerformanceScore(0)
    gameTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const submitPlayerAnswer = (answerIndex?: number) => {
    if (selectedAnswer !== null) return
    if (currentQuestionData.type === "multiple-choice" && typeof answerIndex !== "number") return
    setSelectedAnswer(answerIndex ?? 0)
    setTimeout(() => {
      if (currentQuestionData.type === "multiple-choice" && answerIndex === currentQuestionData.correct) {
        setPlayerScore((prev) => prev + 1)
      }
      const newProgress = currentQuestion + 1
      setPlayerProgress(newProgress)
      if (newProgress >= totalQuestions && playerFinishTime === null) {
        setTimeLeft((currentTime) => {
          setPlayerFinishTime(currentTime)
          return currentTime
        })
      }
      if (newProgress < totalQuestions) {
        setCurrentQuestion(newProgress)
        setSelectedAnswer(null)
        clearCanvas()
        setHasDrawn(false)
      }
    }, 800)
  }

  const endGame = () => {
    if (gameState === "finished") return
    clearInterval(gameTimerRef.current!)
    setGameState("finished")
  }

  // --- Game Logic Effects (unchanged) ---
  useEffect(() => {
    if (gameState !== "playing" || opponentCurrentQuestion >= totalQuestions) return
    setOpponentIsThinking(true)
    const currentQ = quizData.questions[opponentCurrentQuestion]
    const thinkingTime = currentQ.type === "drawing" ? 4000 + Math.random() * 3000 : 2000 + Math.random() * 2000
    const thinkingTimer = setTimeout(() => {
      if (currentQ.type === "multiple-choice") {
        if (Math.random() > 0.25) setOpponentScore((prev) => prev + 1)
      }
      setOpponentIsThinking(false)
      const newOpponentProgress = opponentProgress + 1
      setOpponentProgress(newOpponentProgress)
      if (newOpponentProgress >= totalQuestions && opponentFinishTime === null) {
        setTimeLeft((currentTime) => {
          setOpponentFinishTime(currentTime)
          return currentTime
        })
      }
      const nextQuestionTimer = setTimeout(() => {
        if (opponentCurrentQuestion + 1 < totalQuestions) {
          setOpponentCurrentQuestion((prev) => prev + 1)
        }
      }, 1500)
      return () => clearTimeout(nextQuestionTimer)
    }, thinkingTime)
    return () => clearTimeout(thinkingTimer)
  }, [gameState, opponentCurrentQuestion])

  useEffect(() => {
    if (gameState !== "playing") return
    if (playerProgress >= totalQuestions && opponentProgress >= totalQuestions) {
      endGame()
    }
  }, [playerProgress, opponentProgress, gameState])

  useEffect(() => {
    if (gameState === "finished") {
      const calculatePerformanceScore = (score: number, progress: number, finishTime: number | null) => {
        if (progress === 0) return 0
        const timeTaken = finishTime !== null ? INITIAL_TIME - finishTime : INITIAL_TIME
        return (Math.pow(score, 2) * progress * 1000) / Math.max(timeTaken, 1)
      }
      const playerPerf = calculatePerformanceScore(playerScore, playerProgress, playerFinishTime)
      const opponentPerf = calculatePerformanceScore(opponentScore, opponentProgress, opponentFinishTime)
      setPlayerPerformanceScore(Math.round(playerPerf))
      setOpponentPerformanceScore(Math.round(opponentPerf))
      if (playerPerf > opponentPerf) setWinner("player")
      else if (opponentPerf > playerPerf) setWinner("opponent")
      else setWinner("tie")
    }
  }, [gameState, playerScore, playerProgress, playerFinishTime, opponentScore, opponentProgress, opponentFinishTime])

  useEffect(() => {
    return () => {
      clearInterval(gameTimerRef.current!)
      clearInterval(countdownTimerRef.current!)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {gameState === "waiting" && (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto border-orange-200 shadow-lg">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">⚔️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready for a Duel?</h2>
                <p className="text-gray-600 mb-6">Challenge another player in a fast-paced script quiz! Who is the fastest and most accurate?</p>
                <Button onClick={startMatchmaking} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Duel
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "countdown" && (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto border-orange-200 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Get Ready...</h2>
                <div className="text-8xl font-bold text-orange-500 mb-4">{countdown}</div>
                <p className="text-gray-600">The duel begins in...</p>
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "playing" && currentQuestionData && (
          <div className="space-y-6">
            {/* ## TIMER MOVED HERE ## */}
            <div className="flex justify-center">
              <Card className="w-fit px-6 py-2 bg-slate-800 text-white shadow-lg border-2 border-yellow-400">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <span className="text-2xl font-bold tracking-wider">{timeLeft}s</span>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🧑</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-800">You</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={(playerProgress / totalQuestions) * 100} className="flex-1 h-2 [&>*]:bg-blue-500" />
                        <span className="text-sm text-blue-600 font-bold">{playerProgress}/{totalQuestions}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{playerScore}</div>
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
                        {opponentIsThinking && <Badge className="bg-yellow-500 text-white text-xs animate-pulse">Thinking...</Badge>}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={(opponentProgress / totalQuestions) * 100} className="flex-1 h-2 [&>*]:bg-red-500" />
                        <span className="text-sm text-red-600 font-bold">{opponentProgress}/{totalQuestions}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-600">{opponentScore}</div>
                      <div className="text-xs text-red-500">points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Question {currentQuestion + 1}: {currentQuestionData.question}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {currentQuestionData.type === "multiple-choice" ? (
                  <div className="grid grid-cols-2 gap-4">
                    {currentQuestionData.options?.map((option, index) => (
                      <Button key={index} variant="outline" className={`h-24 text-5xl transition-all duration-300 disabled:opacity-100 ${selectedAnswer !== null ? (currentQuestionData.correct === index ? "bg-green-200" : (selectedAnswer === index ? "bg-red-200" : "bg-gray-100")) : "hover:bg-orange-50"}`} onClick={() => submitPlayerAnswer(index)} disabled={selectedAnswer !== null}>
                        {option}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="inline-block border-2 border-dashed border-orange-300 rounded-lg bg-white p-2 shadow-inner">
                      <canvas ref={canvasRef} width={400} height={200} className="rounded cursor-crosshair" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}/>
                    </div>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" onClick={clearCanvas} disabled={selectedAnswer !== null}>
                        <RotateCcw className="w-4 h-4 mr-2" /> Clear
                      </Button>
                      <Button onClick={() => submitPlayerAnswer()} disabled={!hasDrawn || selectedAnswer !== null} className="bg-green-500 hover:bg-green-600">
                        Submit Drawing
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {gameState === "finished" && (
          <div className="text-center py-12">
            <Card className="max-w-lg mx-auto border-orange-200 shadow-lg">
              <CardContent className="p-8">
                <div className="text-6xl mb-4">{winner === "player" ? "🏆" : winner === "opponent" ? "😔" : "🤝"}</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{winner === "player" ? "You Win!" : winner === "opponent" ? "You Lose!" : "It's a Tie!"}</h2>
                <p className="text-gray-600 mb-6">{winner === "player" ? "Great! Your accuracy and speed led to victory!" : winner === "opponent" ? "A tough opponent! Try again!" : "What a close match!"}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
                  <div className={`p-4 rounded-lg space-y-2 ${winner === "player" ? "bg-green-100 border-2 border-green-300" : "bg-gray-100"}`}>
                    <div className="flex justify-between items-center">
                      <div className="font-bold">🧑 You</div>
                      <div className="text-lg font-bold text-blue-600">{playerScore} pts</div>
                    </div>
                    {playerFinishTime !== null ? (<div className="text-xs text-gray-600 flex items-center"><Clock className="w-3 h-3 mr-1" />Finished in {INITIAL_TIME - playerFinishTime}s</div>) : (<div className="text-xs text-gray-500 mt-2">Did not finish</div>)}
                    <div className="text-sm font-bold text-gray-800 flex items-center"><BarChart2 className="w-4 h-4 mr-1 text-blue-600" />Perf. Score: {playerPerformanceScore.toLocaleString()}</div>
                  </div>
                  <div className={`p-4 rounded-lg space-y-2 ${winner === "opponent" ? "bg-green-100 border-2 border-green-300" : "bg-gray-100"}`}>
                    <div className="flex justify-between items-center">
                      <div className="font-bold">🤖 Opponent</div>
                      <div className="text-lg font-bold text-red-600">{opponentScore} pts</div>
                    </div>
                    {opponentFinishTime !== null ? (<div className="text-xs text-gray-600 flex items-center"><Clock className="w-3 h-3 mr-1" />Finished in {INITIAL_TIME - opponentFinishTime}s</div>) : (<div className="text-xs text-gray-500 mt-2">Did not finish</div>)}
                     <div className="text-sm font-bold text-gray-800 flex items-center"><BarChart2 className="w-4 h-4 mr-1 text-red-600" />Perf. Score: {opponentPerformanceScore.toLocaleString()}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button onClick={() => window.location.reload()} className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">Play Again</Button>
                  <Link href="/leaderboard">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Crown className="w-4 h-4 mr-2" />View Leaderboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}