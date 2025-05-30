import PageHeader from "@/components/page-header"
import BreathworkTimer from "@/components/breathwork-timer"

export default function BreathworkPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Breathwork" subtitle="Center yourself with mindful breathing exercises" />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <BreathworkTimer />
      </div>
    </div>
  )
}
