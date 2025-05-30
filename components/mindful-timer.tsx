"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Pause, RotateCcw, Clock, Bell, Volume2, VolumeX } from "lucide-react"

const presetDurations = [
  { label: "5 min", minutes: 5, description: "Quick practice" },
  { label: "10 min", minutes: 10, description: "Standard session" },
  { label: "15 min", minutes: 15, description: "Deep practice" },
  { label: "20 min", minutes: 20, description: "Extended session" },
  { label: "30 min", minutes: 30, description: "Long practice" },
  { label: "45 min", minutes: 45, description: "Intensive session" },
]

const endingSounds = [
  { id: "bell", name: "Gentle Bell", description: "Soft chime", url: "/sounds/bell.mp3" },
  { id: "chime", name: "Wind Chime", description: "Peaceful tones", url: "/sounds/chime.mp3" },
  { id: "singing-bowl", name: "Singing Bowl", description: "Resonant bowl", url: "/sounds/singing-bowl.mp3" },
  { id: "nature", name: "Nature Sounds", description: "Birds & water", url: "/sounds/nature.mp3" },
  { id: "silent", name: "Silent", description: "No sound", url: "" },
]

export default function MindfulTimer() {
  const [duration, setDuration] = useState(10) // minutes
  const [timeLeft, setTimeLeft] = useState(600) // seconds
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedSound, setSelectedSound] = useState("bell")
  const [customMinutes, setCustomMinutes] = useState("")
  const [intention, setIntention] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [practiceTitle, setPracticeTitle] = useState("")
  const [practiceDescription, setPracticeDescription] = useState("")

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Load practice details from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const urlTitle = urlParams.get("title")
    const urlDescription = urlParams.get("description")
    const urlDuration = urlParams.get("duration")

    if (urlTitle) {
      setPracticeTitle(decodeURIComponent(urlTitle))
    }
    if (urlDescription) {
      setPracticeDescription(decodeURIComponent(urlDescription))
    }
    if (urlDuration) {
      const minutes = Number.parseInt(urlDuration.replace(/\D/g, "")) || 10
      setDuration(minutes)
      setTimeLeft(minutes * 60)
    }
  }, [])

  useEffect(() => {
    // Create audio element
    if (typeof window !== "undefined") {
      audioRef.current = new Audio()
      const selectedSoundObj = endingSounds.find((sound) => sound.id === selectedSound)
      if (selectedSoundObj && selectedSoundObj.url) {
        audioRef.current.src = selectedSoundObj.url
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [selectedSound])

  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Timer finished
      setIsActive(false)
      setIsPaused(false)
      if (soundEnabled) {
        playEndingSound()
      }
      saveSession()
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, isPaused, timeLeft, soundEnabled])

  const playEndingSound = () => {
    if (audioRef.current && selectedSound !== "silent") {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((error) => {
        console.error("Error playing sound:", error)
      })
    }
  }

  const saveSession = () => {
    const session = {
      date: new Date().toISOString(),
      duration: duration,
      intention: intention,
      completed: true,
      practice: practiceTitle || "Mindful Practice",
    }

    const sessions = JSON.parse(localStorage.getItem("timerSessions") || "[]")
    sessions.push(session)
    localStorage.setItem("timerSessions", JSON.stringify(sessions))
  }

  const startTimer = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const pauseTimer = () => {
    setIsPaused(!isPaused)
  }

  const resetTimer = () => {
    setIsActive(false)
    setIsPaused(false)
    setTimeLeft(duration * 60)
  }

  const setPresetDuration = (minutes: number) => {
    setDuration(minutes)
    setTimeLeft(minutes * 60)
    setIsActive(false)
    setIsPaused(false)
  }

  const setCustomDuration = () => {
    const minutes = Number.parseInt(customMinutes)
    if (minutes > 0 && minutes <= 120) {
      setDuration(minutes)
      setTimeLeft(minutes * 60)
      setIsActive(false)
      setIsPaused(false)
      setCustomMinutes("")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  return (
    <div className="space-y-4">
      {/* Main Timer */}
      <Card className="mindful-card">
        <CardHeader className="text-center pb-4">
          <CardTitle className="tertiary-title flex items-center justify-center">
            <Clock className="w-5 h-5 mr-2 text-sage-500" />
            {practiceTitle || "Mindful Timer"}
          </CardTitle>
          {practiceDescription && <p className="card-description mt-2">{practiceDescription}</p>}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Timer Display */}
          <div className="text-center">
            <div className="relative w-40 h-40 mx-auto mb-3">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-sage-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="text-sage-500 transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl text-taupe-800 font-medium font-mono">{formatTime(timeLeft)}</div>
                  <div className="text-xs text-taupe-600 mt-1">{duration} minute session</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-3">
            {!isActive ? (
              <Button onClick={startTimer} className="mindful-button">
                <Play className="w-4 h-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button onClick={pauseTimer} variant="outline" className="border-taupe-300 text-taupe-700">
                <Pause className="w-4 h-4 mr-2" />
                {isPaused ? "Resume" : "Pause"}
              </Button>
            )}
            <Button onClick={resetTimer} variant="outline" className="border-sage-300 text-taupe-700">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>

          {/* Progress */}
          {isActive && (
            <div className="text-center">
              <div className="w-full bg-sage-100 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-sage-400 to-rose-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-taupe-600">{Math.round(progress)}% complete</p>
            </div>
          )}

          {/* Intention */}
          {!isActive && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-taupe-700">Set an intention (optional)</label>
              <Input
                placeholder="What would you like to focus on?"
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                className="mindful-input"
              />
            </div>
          )}

          {/* Duration Settings - Compact */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-taupe-700 text-center">Duration</h3>
            {/* Preset Durations - Compact Grid */}
            <div className="grid grid-cols-6 gap-1">
              {presetDurations.map((preset) => (
                <button
                  key={preset.minutes}
                  onClick={() => setPresetDuration(preset.minutes)}
                  disabled={isActive}
                  className={`p-2 rounded text-center transition-all duration-200 ${
                    duration === preset.minutes
                      ? "bg-sage-100 border-2 border-sage-300"
                      : "bg-white/60 border border-sage-200/50 hover:bg-sage-50"
                  } ${isActive ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="font-medium text-taupe-800 text-xs">{preset.label}</div>
                </button>
              ))}
            </div>

            {/* Custom Duration - Inline */}
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Custom minutes"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(e.target.value)}
                disabled={isActive}
                className="mindful-input flex-1 text-sm"
                min="1"
                max="120"
              />
              <Button
                onClick={setCustomDuration}
                disabled={!customMinutes || isActive}
                variant="outline"
                className="border-sage-300 text-taupe-700 text-sm"
              >
                Set
              </Button>
            </div>
          </div>

          {/* Sound Settings - Compact */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-taupe-700 flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Ending Sound
              </h3>
              <Button
                onClick={() => setSoundEnabled(!soundEnabled)}
                variant="outline"
                size="sm"
                className="border-taupe-300"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>

            {soundEnabled && (
              <div className="grid grid-cols-3 gap-1">
                {endingSounds.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => {
                      setSelectedSound(sound.id)
                      if (sound.id !== "silent" && sound.url) {
                        // Preview sound
                        if (audioRef.current) {
                          audioRef.current.src = sound.url
                          audioRef.current.currentTime = 0
                          audioRef.current.play().catch((e) => console.error("Error playing sound:", e))
                        }
                      }
                    }}
                    className={`p-2 rounded text-left transition-all duration-200 ${
                      selectedSound === sound.id
                        ? "bg-sage-100 border-2 border-sage-300"
                        : "bg-white/60 border border-sage-200/50 hover:bg-sage-50"
                    }`}
                  >
                    <div className="font-medium text-taupe-800 text-xs">{sound.name}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
