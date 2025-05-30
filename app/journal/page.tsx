import PageHeader from "@/components/page-header"
import JournalEntry from "@/components/journal-entry"
import JournalHistory from "@/components/journal-history"

export default function JournalPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Mindful Journal" subtitle="Reflect on your thoughts and feelings with compassion" />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <JournalEntry />
          <JournalHistory />
        </div>
      </div>
    </div>
  )
}
