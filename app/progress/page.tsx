import PageHeader from "@/components/page-header"
import ProgressStats from "@/components/progress-stats"
import ProgressCalendar from "@/components/progress-calendar"

export default function ProgressPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Your Progress" subtitle="Track your mindfulness journey and celebrate your growth" />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressStats />
          <ProgressCalendar />
        </div>
      </div>
    </div>
  )
}
