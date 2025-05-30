import PageHeader from "@/components/page-header"
import ReadyToGoThemes from "@/components/ready-to-go-themes"

export default function ReadyToGoPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Ready to Go" subtitle="Quick mindfulness themes for immediate practice and transformation" />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <ReadyToGoThemes />
      </div>
    </div>
  )
}
