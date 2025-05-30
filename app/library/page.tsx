import ContentLibrary from "@/components/content-library"
import PageHeader from "@/components/page-header"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
      <PageHeader title="Practice Library" subtitle="Comprehensive collection of mindfulness practices" />
      <ContentLibrary />
    </div>
  )
}
