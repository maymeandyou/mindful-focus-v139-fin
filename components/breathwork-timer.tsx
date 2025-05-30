"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"

export default function BreathworkTimer() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale")
  const [timeLeft, setTimeLeft] = useState(4)
  const [cycles, setCycles] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Phase durations in seconds (4-4-4-4 pattern)
  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 4,
    pause: 4,
  }

  const phaseInstructions = {
    inhale: "Breathe In",
    hold: "Hold",
    exhale: "Breathe Out",
    pause: "Rest",
  }

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            setPhase((currentPhase) => {
              const phases: Array<"inhale" | "hold" | "exhale" | "pause"> = ["inhale", "hold", "exhale", "pause"]
              const currentIndex = phases.indexOf(currentPhase)
              const nextPhase = phases[(currentIndex + 1) % phases.length]

              if (nextPhase === "inhale") {
                setCycles((c) => c + 1)
              }

              return nextPhase
            })
            return phaseDurations[phase]
          }
          return prev - 1
        })
      }, 1000)
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
  }, [isActive, phase])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setPhase("inhale")
    setTimeLeft(4)
    setCycles(0)
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  // Calculate circle scale based on phase
  const getCircleScale = () => {
    const progress = (phaseDurations[phase] - timeLeft) / phaseDurations[phase]

    switch (phase) {
      case "inhale":
        return 1 + progress * 0.3 // Scale from 1 to 1.3
      case "hold":
        return 1.3 // Stay at maximum
      case "exhale":
        return 1.3 - progress * 0.3 // Scale from 1.3 to 1
      case "pause":
        return 1 // Stay at minimum
      default:
        return 1
    }
  }

  return (
    <Card className="mindful-card max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="tertiary-title">4-4-4-4 Breathing</CardTitle>
        <p className="card-description">Box breathing for calm and focus</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Breathing Circle */}
        <div className="flex justify-center">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div
              className="w-32 h-32 rounded-full bg-sage-200 transition-transform duration-1000 ease-in-out flex items-center justify-center"
              style={{
                transform: `scale(${getCircleScale()})`,
              }}
            >
              <div className="text-center">
                <div className="timer-digits">{timeLeft}</div>
                <div className="form-text">{phaseInstructions[phase]}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center space-y-2">
          <div className="body-text">Cycles Completed: {cycles}</div>
          <div className="form-text">Current Phase: {phaseInstructions[phase]}</div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button onClick={toggleTimer} className="mindful-button" size="lg">
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <Button
            onClick={resetTimer}
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            onClick={toggleSound}
            variant="outline"
            size="lg"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-sage-50 p-4 rounded-lg">
          <h4 className="form-text font-medium mb-2">How to Practice:</h4>
          <ul className="form-text space-y-1">
            <li>• Inhale for 4 seconds</li>
            <li>• Hold for 4 seconds</li>
            <li>• Exhale for 4 seconds</li>
            <li>• Rest for 4 seconds</li>
            <li>• Repeat the cycle</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
