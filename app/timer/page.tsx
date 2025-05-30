import PageHeader from "@/components/page-header"
import MindfulTimer from "@/components/mindful-timer"

export default function TimerPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Mindful Timer" subtitle="Set intentions and practice with gentle time guidance" />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <MindfulTimer />
      </div>
    </div>
  )
}
