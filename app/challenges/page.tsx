import PageHeader from "@/components/page-header"
import ChallengeExplorer from "@/components/challenge-explorer"
import TodaysChallenge from "@/components/todays-challenge"

export default function ChallengesPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Mindful Challenges" subtitle="Gentle activities to expand your awareness and growth" />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Today's Challenge */}
          <div className="lg:col-span-1">
            <TodaysChallenge />
          </div>

          {/* Right Column - Challenge Explorer */}
          <div className="lg:col-span-2">
            <ChallengeExplorer />
          </div>
        </div>
      </div>
    </div>
  )
}
