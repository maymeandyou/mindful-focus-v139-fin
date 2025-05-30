"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock } from "lucide-react"

export default function PracticeCompletePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [nextPractice, setNextPractice] = useState<any>(null)
  const [completedPractice, setCompletedPractice] = useState<any>(null)

  useEffect(() => {
    const practiceId = searchParams.get("completed")
    const practiceTitle = searchParams.get("title")

    if (practiceId && practiceTitle) {
      setCompletedPractice({
        id: practiceId,
        title: decodeURIComponent(practiceTitle),
      })

      // Mark practice as completed
      markPracticeCompleted(practiceId)

      // Find next practice
      findNextPractice(practiceId)
    }
  }, [searchParams])

  const markPracticeCompleted = (practiceId: string) => {
    const today = new Date().toDateString()
    const completedPractices = JSON.parse(localStorage.getItem("completedPractices") || "{}")

    if (!completedPractices[today]) {
      completedPractices[today] = []
    }

    if (!completedPractices[today].includes(practiceId)) {
      completedPractices[today].push(practiceId)
      localStorage.setItem("completedPractices", JSON.stringify(completedPractices))
    }
  }

  const findNextPractice = (completedId: string) => {
    const myPractices = JSON.parse(localStorage.getItem("myPractices") || '{"morning":[],"day":[],"evening":[]}')
    const allPractices = [...myPractices.morning, ...myPractices.day, ...myPractices.evening]

    const currentIndex = allPractices.findIndex((p: any) => p.id === completedId)
    if (currentIndex !== -1 && currentIndex < allPractices.length - 1) {
      setNextPractice(allPractices[currentIndex + 1])
    }
  }

  const startNextPractice = () => {
    if (nextPractice) {
      window.scrollTo(0, 0)
      window.location.href = nextPractice.path
    }
  }

  const goHome = () => {
    router.push("/")
  }

  return (
    <div className="page-transition min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md mx-auto">
        <Card className="mindful-card text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="secondary-title">Practice Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {completedPractice && (
              <p className="text-[#4a4a4a]">
                Great job completing <strong>{completedPractice.title}</strong>
              </p>
            )}

            {nextPractice ? (
              <div className="space-y-4">
                <div className="p-4 bg-sage-50 rounded-lg border border-sage-200">
                  <h4 className="font-medium text-[#4a4a4a] mb-2">Up Next:</h4>
                  <p className="text-sm text-[#4a4a4a] mb-1">{nextPractice.name}</p>
                  <div className="flex items-center justify-center text-xs text-[#4a4a4a]">
                    <Clock className="w-3 h-3 mr-1" />
                    {nextPractice.duration}
                  </div>
                </div>

                <p className="text-sm text-[#4a4a4a]">Would you like to continue with your next practice?</p>

                <div className="flex gap-3">
                  <Button onClick={startNextPractice} className="mindful-button flex-1">
                    Yes, Continue
                  </Button>
                  <Button onClick={goHome} variant="outline" className="flex-1">
                    Later
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[#4a4a4a]">You've completed all your practices for today!</p>
                <Button onClick={goHome} className="mindful-button w-full">
                  Return Home
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
