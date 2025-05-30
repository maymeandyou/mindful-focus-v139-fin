import PageHeader from "@/components/page-header"
import AllPracticesLibrary from "@/components/all-practices-library"

export default function AllPracticesPage() {
  return (
    <div className="page-transition">
      <PageHeader
        title="All Practices"
        subtitle="Browse our complete collection of mindfulness practices"
        backTo="/explore"
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <AllPracticesLibrary />
      </div>
    </div>
  )
}
