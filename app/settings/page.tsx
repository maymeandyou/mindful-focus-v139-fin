import PageHeader from "@/components/page-header"
import SettingsForm from "@/components/settings-form"
import DataManagement from "@/components/data-management"

export default function SettingsPage() {
  return (
    <div className="page-transition">
      <PageHeader title="Settings" subtitle="Customize your mindful experience" />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SettingsForm />
          <DataManagement />
        </div>
      </div>
    </div>
  )
}
