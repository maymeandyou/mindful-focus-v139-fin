"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useCategoryContext } from "@/contexts/category-context"
import { CheckCircle, Clock, ArrowRight, BookOpen, Heart, Wind, Target } from "lucide-react"

// Sample affirmations for each category
const categoryAffirmations = {
  meditation: [
    "I am present and at peace in this moment.",
    "My mind is calm and my thoughts are clear.",
    "I release all tension and sink into deep awareness.",
  ],
  breathwork: [
    "With each breath, I invite calm and release tension.",
    "My breath is my anchor to the present moment.",
    "I breathe in peace and breathe out stress.",
  ],
  gratitude: [
    "I am grateful for all the abundance in my life.",
    "My heart is open to receive and appreciate life's gifts.",
    "Gratitude transforms my perspective and brings me joy.",
  ],
  mindfulness: [
    "I am fully present in this moment.",
    "I observe my thoughts without judgment.",
    "Each moment is a fresh opportunity for awareness.",
  ],
  mood: [
    "I choose my emotional state with awareness.",
    "My feelings are valid messengers, not my identity.",
    "I can shift my mood through conscious awareness.",
  ],
  nature: [
    "I am connected to the healing power of the natural world.",
    "Nature's wisdom flows through me and restores my balance.",
    "I am part of nature's beautiful, intelligent design.",
  ],
  "self-awareness": [
    "I am committed to knowing myself more deeply each day.",
    "Self-awareness is my path to freedom and growth.",
    "I observe my patterns with compassion and curiosity.",
  ],
  exercise: [
    "My body is energized through mindful movement.",
    "I honor my body's wisdom through conscious exercise.",
    "Movement is a celebration of my body's capabilities.",
  ],
  challenge: [
    "I embrace challenges as opportunities for growth.",
    "Stepping outside my comfort zone expands my potential.",
    "Each new experience teaches me something valuable.",
  ],
}

// Sample journal prompts for each category
const categoryJournalPrompts = {
  meditation: [
    "What sensations did you notice during your meditation practice today?",
    "How has your meditation practice affected your daily life?",
    "What insights arose during your moments of stillness?",
  ],
  breathwork: [
    "How did your breath change throughout your practice today?",
    "What emotions or thoughts surfaced during your breathwork?",
    "How does conscious breathing affect your mental state?",
  ],
  gratitude: [
    "What are three specific things you're grateful for today?",
    "How has practicing gratitude shifted your perspective?",
    "What unexpected gift or blessing did you notice today?",
  ],
  mindfulness: [
    "What did you notice when you brought full awareness to a routine activity today?",
    "How does being present change your experience of daily life?",
    "What patterns of thought did you observe today?",
  ],
  mood: [
    "How would you describe your emotional weather today?",
    "What triggered shifts in your mood, and how did you respond?",
    "How does naming your emotions change your relationship to them?",
  ],
  nature: [
    "What elements of nature captured your attention today?",
    "How does connecting with nature affect your sense of wellbeing?",
    "What wisdom or metaphor from nature resonates with your life right now?",
  ],
  "self-awareness": [
    "What pattern or habit did you notice about yourself today?",
    "How do your values align with your actions recently?",
    "What part of yourself are you currently discovering or rediscovering?",
  ],
  exercise: [
    "How did mindful movement change your relationship with your body today?",
    "What sensations did you notice during physical activity?",
    "How does your body communicate with you during exercise?",
  ],
  challenge: [
    "What comfort zone did you step outside of recently?",
    "How did facing a challenge change your perception of yourself?",
    "What did you learn from doing something differently?",
  ],
}

// Sample challenges for each category
const categoryChallenges = {
  meditation: [
    "Meditate for 5 minutes every day this week",
    "Practice a different meditation style each day",
    "Create a dedicated meditation space in your home",
  ],
  breathwork: [
    "Practice box breathing for 5 minutes, three times today",
    "Try alternate nostril breathing before a stressful situation",
    "Use breath awareness to center yourself before meals",
  ],
  gratitude: [
    "Write down 3 new things you're grateful for each day this week",
    "Express appreciation directly to someone different each day",
    "Take photos of 5 things you appreciate in your daily life",
  ],
  mindfulness: [
    "Eat one meal mindfully each day with no distractions",
    "Practice the 5-4-3-2-1 grounding exercise twice daily",
    "Take three mindful pauses throughout your workday",
  ],
  mood: [
    "Track your mood at three set times each day this week",
    "Practice a mood-shifting technique when you notice negativity",
    "Create a playlist that helps shift your emotional state",
  ],
  nature: [
    "Spend 20 minutes outside in nature each day this week",
    "Bring an element of nature into your home or workspace",
    "Watch a sunrise or sunset with full presence",
  ],
  "self-awareness": [
    "Journal about a recurring pattern you've noticed in yourself",
    "Ask for feedback from someone you trust about your blind spots",
    "Observe your self-talk for a day without judgment",
  ],
  exercise: [
    "Try a new form of mindful movement this week",
    "Practice 10 minutes of gentle stretching each morning",
    "Take mindful walks with focus on your body sensations",
  ],
  challenge: [
    "Take a different route to a familiar destination",
    "Strike up a conversation with someone new",
    "Try something you've been avoiding out of fear",
  ],
}

// Sample breathwork for each category
const categoryBreathwork = {
  meditation: {
    name: "Meditation Breath",
    description: "Simple breath awareness to center your meditation",
    instructions: "Breathe naturally and notice the sensation of breath at your nostrils or belly",
    duration: "5 minutes",
  },
  breathwork: {
    name: "Box Breathing",
    description: "Equal counts for inhale, hold, exhale, and hold",
    instructions: "Inhale for 4, hold for 4, exhale for 4, hold for 4, and repeat",
    duration: "8 minutes",
  },
  gratitude: {
    name: "Gratitude Breath",
    description: "Cultivate appreciation with each breath cycle",
    instructions: "Inhale what you're grateful to receive, exhale what you're grateful to release",
    duration: "5 minutes",
  },
  mindfulness: {
    name: "Mindful Breath",
    description: "Anchor your awareness in present-moment breathing",
    instructions: "Follow your natural breath with curious attention to every sensation",
    duration: "10 minutes",
  },
  mood: {
    name: "Mood-Shifting Breath",
    description: "Use breath to influence your emotional state",
    instructions: "Longer exhales than inhales to calm, equal parts to balance, longer inhales to energize",
    duration: "7 minutes",
  },
  nature: {
    name: "Nature Connection Breath",
    description: "Harmonize your breath with the natural world",
    instructions: "Imagine breathing with the rhythm of waves, wind in trees, or the earth itself",
    duration: "8 minutes",
  },
  "self-awareness": {
    name: "Self-Inquiry Breath",
    description: "Use breath as a tool for inner exploration",
    instructions: "With each exhale, ask 'Who am I?' and rest in the spaciousness that follows",
    duration: "12 minutes",
  },
  exercise: {
    name: "Movement Preparation Breath",
    description: "Energize and prepare your body with breath",
    instructions: "Deep inhales through nose, powerful exhales through mouth to awaken energy",
    duration: "5 minutes",
  },
  challenge: {
    name: "Courage Breath",
    description: "Build confidence and readiness through breath",
    instructions: "Inhale courage, exhale fear, with strong, intentional breath cycles",
    duration: "6 minutes",
  },
}

// Theme mappings to content
const themeContent = {
  happy: {
    affirmation: "I choose joy in this moment and attract more reasons to be happy.",
    journalPrompt: "What brought you joy today, and how can you invite more of that into your life?",
    challenge: "Do one thing purely for joy each day this week, without any productive purpose.",
    breathwork: {
      name: "Joy Breath",
      description: "Cultivate feelings of happiness and lightness",
      instructions: "Inhale through nose imagining drawing in light, exhale with a gentle smile",
      duration: "7 minutes",
    },
  },
  calm: {
    affirmation: "I am calm, centered, and peaceful regardless of external circumstances.",
    journalPrompt:
      "What helps you feel most calm and centered, and how can you incorporate more of this into your daily routine?",
    challenge: "Create a 5-minute calming ritual to practice before potentially stressful situations.",
    breathwork: {
      name: "Calming Breath",
      description: "Soothe your nervous system with extended exhales",
      instructions: "Inhale for 4, exhale for 6, focusing on the relaxation with each out-breath",
      duration: "8 minutes",
    },
  },
  stress: {
    affirmation: "I release tension and embrace ease in my mind, body, and spirit.",
    journalPrompt: "Where do you feel stress in your body, and what message might it have for you?",
    challenge: "Identify three stress triggers and create a specific response plan for each.",
    breathwork: {
      name: "Stress Release Breath",
      description: "Let go of tension with audible exhales",
      instructions: "Inhale deeply through nose, exhale through mouth with a sighing sound",
      duration: "6 minutes",
    },
  },
  energy: {
    affirmation: "I am filled with vibrant energy that flows through every cell of my being.",
    journalPrompt: "What activities energize you, and which ones deplete your energy?",
    challenge: "Start each day with 2 minutes of energizing movement before checking your phone.",
    breathwork: {
      name: "Energizing Breath",
      description: "Awaken your energy with stimulating breath cycles",
      instructions: "Quick, sharp inhales through nose and forceful exhales through mouth",
      duration: "5 minutes",
    },
  },
  growth: {
    affirmation: "I embrace change as an opportunity for expansion and evolution.",
    journalPrompt: "What area of your life is calling for growth, and what first step can you take?",
    challenge: "Learn something new each day this week, even if it's small.",
    breathwork: {
      name: "Expansion Breath",
      description: "Open to new possibilities through breath",
      instructions: "Inhale fully to expand in all directions, hold briefly to integrate, exhale completely",
      duration: "10 minutes",
    },
  },
  connection: {
    affirmation: "I am deeply connected to myself, others, and the world around me.",
    journalPrompt: "When did you feel most connected recently, and what created that experience?",
    challenge: "Have a meaningful conversation with someone different each day this week.",
    breathwork: {
      name: "Heart Connection Breath",
      description: "Breathe into your heart center to foster connection",
      instructions: "Inhale into your heart area, imagining it expanding with light and warmth",
      duration: "8 minutes",
    },
  },
}

export default function GuidedFlow() {
  const { guidedFlow, setGuidedFlow } = useCategoryContext()
  const [activeTab, setActiveTab] = useState("affirmation")
  const [journalEntry, setJournalEntry] = useState("")
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null)

  // Reset state when flow changes
  useEffect(() => {
    if (guidedFlow.isOpen) {
      setActiveTab("affirmation")
      setJournalEntry("")
      setCompletedSteps([])
      setSelectedChallenge(null)
    }
  }, [guidedFlow.isOpen])

  const handleClose = () => {
    setGuidedFlow({
      isOpen: false,
      suggestion: null,
      theme: null,
      category: null,
    })
  }

  const markStepComplete = (step: string) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step])
    }
  }

  const moveToNextStep = () => {
    markStepComplete(activeTab)

    const steps = ["affirmation", "journal", "challenge", "breathwork"]
    const currentIndex = steps.indexOf(activeTab)

    if (currentIndex < steps.length - 1) {
      setActiveTab(steps[currentIndex + 1])
    }
  }

  // Get content based on category or theme
  const getContent = () => {
    if (guidedFlow.theme && themeContent[guidedFlow.theme]) {
      return {
        affirmations: [themeContent[guidedFlow.theme].affirmation],
        journalPrompts: [themeContent[guidedFlow.theme].journalPrompt],
        challenges: [themeContent[guidedFlow.theme].challenge],
        breathwork: themeContent[guidedFlow.theme].breathwork,
      }
    } else if (guidedFlow.category) {
      return {
        affirmations: categoryAffirmations[guidedFlow.category] || [],
        journalPrompts: categoryJournalPrompts[guidedFlow.category] || [],
        challenges: categoryChallenges[guidedFlow.category] || [],
        breathwork: categoryBreathwork[guidedFlow.category] || {},
      }
    } else if (guidedFlow.suggestion) {
      const category = guidedFlow.suggestion.category
      return {
        affirmations: categoryAffirmations[category] || [],
        journalPrompts: categoryJournalPrompts[category] || [],
        challenges: categoryChallenges[category] || [],
        breathwork: categoryBreathwork[category] || {},
      }
    }

    return {
      affirmations: [],
      journalPrompts: [],
      challenges: [],
      breathwork: {},
    }
  }

  const content = getContent()

  // Always include gratitude prompt
  const allJournalPrompts = [...content.journalPrompts, "What are you grateful for today?"]

  const getTitle = () => {
    if (guidedFlow.theme) {
      return `${guidedFlow.theme.charAt(0).toUpperCase() + guidedFlow.theme.slice(1)} Practice`
    } else if (guidedFlow.category) {
      return `${guidedFlow.category.charAt(0).toUpperCase() + guidedFlow.category.slice(1)} Practice`
    } else if (guidedFlow.suggestion) {
      return guidedFlow.suggestion.title
    }
    return "Guided Practice"
  }

  if (!guidedFlow.isOpen) {
    return null
  }

  return (
    <Dialog open={guidedFlow.isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-taupe-800">{getTitle()}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="affirmation" className="relative">
              Affirmation
              {completedSteps.includes("affirmation") && (
                <CheckCircle className="w-3 h-3 absolute top-1 right-1 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="journal" className="relative">
              Journal
              {completedSteps.includes("journal") && (
                <CheckCircle className="w-3 h-3 absolute top-1 right-1 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="challenge" className="relative">
              Challenge
              {completedSteps.includes("challenge") && (
                <CheckCircle className="w-3 h-3 absolute top-1 right-1 text-green-500" />
              )}
            </TabsTrigger>
            <TabsTrigger value="breathwork" className="relative">
              Breathwork
              {completedSteps.includes("breathwork") && (
                <CheckCircle className="w-3 h-3 absolute top-1 right-1 text-green-500" />
              )}
            </TabsTrigger>
          </TabsList>

          {/* Affirmation Tab */}
          <TabsContent value="affirmation">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-taupe-800">
                  <Heart className="w-5 h-5 mr-2 text-rose-400" />
                  Daily Affirmation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-amber-50 to-stone-50 p-6 rounded-xl border border-amber-200/50 text-center">
                  <p className="text-taupe-800 font-serif text-lg leading-relaxed italic">
                    "{content.affirmations[0] || "I am present and at peace in this moment."}"
                  </p>
                </div>

                <div className="text-sm text-taupe-600">
                  <p>Take a moment to breathe deeply and repeat this affirmation to yourself three times.</p>
                  <p className="mt-2">Notice how it feels in your body and mind as you say these words.</p>
                </div>

                <Button
                  onClick={moveToNextStep}
                  className="w-full bg-gradient-to-r from-sage-400 to-rose-400 hover:from-sage-500 hover:to-rose-500 text-white"
                >
                  Continue to Journal <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Journal Tab */}
          <TabsContent value="journal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-taupe-800">
                  <BookOpen className="w-5 h-5 mr-2 text-amber-500" />
                  Mindful Journal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-stone-50 to-sage-50 p-4 rounded-xl border border-sage-200/50">
                  <p className="text-taupe-700 font-medium mb-1">Today's Prompt:</p>
                  <p className="text-taupe-600 italic">{allJournalPrompts[0] || "What are you grateful for today?"}</p>
                </div>

                <Textarea
                  placeholder="Write your thoughts here..."
                  className="min-h-[150px] border-sage-200"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                />

                <Button
                  onClick={moveToNextStep}
                  className="w-full bg-gradient-to-r from-sage-400 to-rose-400 hover:from-sage-500 hover:to-rose-500 text-white"
                  disabled={journalEntry.trim().length < 5}
                >
                  Continue to Challenge <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Challenge Tab */}
          <TabsContent value="challenge">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-taupe-800">
                  <Target className="w-5 h-5 mr-2 text-amber-500" />
                  Daily Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {content.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedChallenge === challenge
                          ? "bg-gradient-to-r from-sage-100 to-rose-100 border-sage-300"
                          : "bg-white border-sage-200 hover:bg-sage-50"
                      }`}
                      onClick={() => setSelectedChallenge(challenge)}
                    >
                      <p className="text-taupe-800">{challenge}</p>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={moveToNextStep}
                  className="w-full bg-gradient-to-r from-sage-400 to-rose-400 hover:from-sage-500 hover:to-rose-500 text-white"
                  disabled={!selectedChallenge}
                >
                  Continue to Breathwork <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Breathwork Tab */}
          <TabsContent value="breathwork">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-taupe-800">
                  <Wind className="w-5 h-5 mr-2 text-blue-400" />
                  {content.breathwork.name || "Mindful Breathing"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-sage-50 p-4 rounded-xl border border-blue-200/50">
                  <p className="text-taupe-700 font-medium mb-1">
                    {content.breathwork.description || "Simple breath awareness practice"}
                  </p>
                  <p className="text-taupe-600 text-sm mt-2">
                    {content.breathwork.instructions || "Breathe naturally and notice the sensation of breath"}
                  </p>
                  <div className="flex items-center mt-3 text-sm text-taupe-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{content.breathwork.duration || "5 minutes"}</span>
                  </div>
                </div>

                <div className="h-40 flex items-center justify-center bg-gradient-to-br from-blue-50 to-sage-50 rounded-xl border border-blue-100">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/80 flex items-center justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-400 animate-pulse"></div>
                    </div>
                    <p className="text-taupe-600 text-sm">Breathe with the circle</p>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    markStepComplete("breathwork")
                    // In a real app, this would save the practice data
                  }}
                  className="w-full bg-gradient-to-r from-sage-400 to-rose-400 hover:from-sage-500 hover:to-rose-500 text-white"
                >
                  Complete Practice <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex-1 text-xs text-taupe-500">{completedSteps.length}/4 steps completed</div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} className="border-sage-200">
              Save & Exit
            </Button>
            <Button
              onClick={() => {
                // In a real app, this would start the full guided sequence
                setActiveTab("affirmation")
              }}
              className="bg-gradient-to-r from-sage-400 to-rose-400 hover:from-sage-500 hover:to-rose-500 text-white"
            >
              Do All Now
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
