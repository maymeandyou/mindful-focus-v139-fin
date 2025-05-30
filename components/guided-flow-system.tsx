"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, CheckCircle, ArrowRight, Clock, Heart } from "lucide-react"

interface FlowStep {
  id: string
  title: string
  description: string
  duration: number
  instructions: string[]
  type: "breathing" | "movement" | "meditation" | "reflection"
}

const guidedFlows = {
  morning: {
    title: "Morning Awakening Flow",
    description: "Start your day with intention and energy",
    duration: 15,
    steps: [
      {
        id: "wake-breath",
        title: "Awakening Breath",
        description: "Gentle breathing to energize your body",
        duration: 3,
        instructions: [
          "Take 5 deep breaths, extending your exhale",
          "Feel your body awakening with each breath",
          "Set an intention for your day",
        ],
        type: "breathing" as const,
      },
      {
        id: "morning-stretch",
        title: "Gentle Stretching",
        description: "Wake up your body with mindful movement",
        duration: 5,
        instructions: [
          "Stretch your arms overhead",
          "Gentle neck rolls",
          "Spinal twists while seated",
          "Feel gratitude for your body",
        ],
        type: "movement" as const,
      },
      {
        id: "intention-setting",
        title: "Intention Setting",
        description: "Connect with your purpose for the day",
        duration: 4,
        instructions: [
          "Place hand on heart",
          "Ask: What do I want to cultivate today?",
          "Choose one word or phrase as your intention",
          "Visualize carrying this intention through your day",
        ],
        type: "reflection" as const,
      },
      {
        id: "gratitude-moment",
        title: "Gratitude Practice",
        description: "Appreciate the gift of a new day",
        duration: 3,
        instructions: [
          "Think of 3 things you're grateful for",
          "Feel the warmth of appreciation in your heart",
          "Send gratitude to your future self",
        ],
        type: "meditation" as const,
      },
    ],
  },
  stress: {
    title: "Stress Relief Flow",
    description: "Find calm in the midst of overwhelm",
    duration: 10,
    steps: [
      {
        id: "calming-breath",
        title: "Calming Breath",
        description: "Activate your relaxation response",
        duration: 3,
        instructions: ["Breathe in for 4 counts", "Hold for 4 counts", "Exhale for 6 counts", "Repeat 5 times"],
        type: "breathing" as const,
      },
      {
        id: "tension-release",
        title: "Tension Release",
        description: "Release physical stress from your body",
        duration: 4,
        instructions: [
          "Tense your shoulders, then release",
          "Clench your fists, then open",
          "Scrunch your face, then relax",
          "Feel the contrast between tension and relaxation",
        ],
        type: "movement" as const,
      },
      {
        id: "peaceful-visualization",
        title: "Peaceful Place",
        description: "Visit your inner sanctuary",
        duration: 3,
        instructions: [
          "Imagine a place where you feel completely safe",
          "Notice the colors, sounds, and sensations",
          "Breathe in the peace of this place",
          "Know you can return here anytime",
        ],
        type: "meditation" as const,
      },
    ],
  },
  evening: {
    title: "Evening Wind-Down Flow",
    description: "Transition peacefully into rest",
    duration: 12,
    steps: [
      {
        id: "day-reflection",
        title: "Day Reflection",
        description: "Honor your day's experiences",
        duration: 3,
        instructions: [
          "Think of one thing that went well today",
          "Acknowledge any challenges with compassion",
          "Appreciate your efforts and growth",
        ],
        type: "reflection" as const,
      },
      {
        id: "gentle-release",
        title: "Gentle Release",
        description: "Let go of the day's tensions",
        duration: 4,
        instructions: [
          "Gentle neck and shoulder rolls",
          "Soft spinal twists",
          "Imagine releasing the day with each movement",
        ],
        type: "movement" as const,
      },
      {
        id: "gratitude-practice",
        title: "Evening Gratitude",
        description: "End with appreciation",
        duration: 2,
        instructions: [
          "Name 3 things you're grateful for from today",
          "Feel appreciation in your heart",
          "Send gratitude to those who supported you",
        ],
        type: "meditation" as const,
      },
      {
        id: "sleep-preparation",
        title: "Sleep Preparation",
        description: "Prepare your mind and body for rest",
        duration: 3,
        instructions: [
          "Take slow, deep breaths",
          "Relax each part of your body",
          "Set an intention for peaceful sleep",
          "Trust in your body's wisdom to rest and restore",
        ],
        type: "breathing" as const,
      },
    ],
  },
}

export default function GuidedFlowSystem() {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const currentFlowData = selectedFlow ? guidedFlows[selectedFlow as keyof typeof guidedFlows] : null
  const currentStepData = currentFlowData?.steps[currentStep]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsActive(false)
            if (currentStepData) {
              setCompletedSteps((prev) => [...prev, currentStepData.id])
            }
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeRemaining, currentStepData])

  const startStep = () => {
    if (currentStepData) {
      setTimeRemaining(currentStepData.duration * 60)
      setIsActive(true)
    }
  }

  const pauseStep = () => {
    setIsActive(false)
  }

  const resetStep = () => {
    setIsActive(false)
    if (currentStepData) {
      setTimeRemaining(currentStepData.duration * 60)
    }
  }

  const nextStep = () => {
    if (currentFlowData && currentStep < currentFlowData.steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setIsActive(false)
      setTimeRemaining(0)
    }
  }

  const selectFlow = (flowKey: string) => {
    setSelectedFlow(flowKey)
    setCurrentStep(0)
    setIsActive(false)
    setTimeRemaining(0)
    setCompletedSteps([])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case "breathing":
        return "bg-blue-500"
      case "movement":
        return "bg-green-500"
      case "meditation":
        return "bg-purple-500"
      case "reflection":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!selectedFlow) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Guided Flow System</h1>
          <p className="text-gray-600 dark:text-gray-300">Choose a guided practice flow to support your wellbeing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(guidedFlows).map(([key, flow]) => (
            <Card
              key={key}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => selectFlow(key)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {flow.title}
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{flow.duration}min</span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{flow.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{flow.steps.length} steps</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Button variant="outline" onClick={() => setSelectedFlow(null)} className="mb-4">
          ← Back to Flows
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentFlowData?.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{currentFlowData?.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flow Progress */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Flow Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentFlowData?.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      index === currentStep ? "bg-blue-50 dark:bg-blue-950/20" : ""
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${getStepTypeColor(step.type)}`} />
                    <span className={`text-sm ${completedSteps.includes(step.id) ? "line-through text-gray-500" : ""}`}>
                      {step.title}
                    </span>
                    {completedSteps.includes(step.id) && <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Step */}
        <div className="lg:col-span-2">
          {currentStepData && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${getStepTypeColor(currentStepData.type)}`} />
                    <span>{currentStepData.title}</span>
                  </CardTitle>
                  <Badge variant="outline">
                    Step {currentStep + 1} of {currentFlowData?.steps.length}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{currentStepData.description}</p>
              </CardHeader>
              <CardContent>
                {/* Timer */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {formatTime(timeRemaining || currentStepData.duration * 60)}
                  </div>
                  <Progress
                    value={
                      timeRemaining
                        ? ((currentStepData.duration * 60 - timeRemaining) / (currentStepData.duration * 60)) * 100
                        : 0
                    }
                    className="w-full mb-4"
                  />

                  <div className="flex items-center justify-center space-x-2">
                    {!isActive ? (
                      <Button onClick={startStep} className="flex items-center space-x-2">
                        <Play className="h-4 w-4" />
                        <span>Start</span>
                      </Button>
                    ) : (
                      <Button onClick={pauseStep} variant="outline" className="flex items-center space-x-2">
                        <Pause className="h-4 w-4" />
                        <span>Pause</span>
                      </Button>
                    )}

                    <Button onClick={resetStep} variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4" />
                    </Button>

                    {currentStep < (currentFlowData?.steps.length || 0) - 1 && (
                      <Button onClick={nextStep} variant="outline">
                        Next Step
                      </Button>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Instructions:</h4>
                  <ul className="space-y-2">
                    {currentStepData.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Heart className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
