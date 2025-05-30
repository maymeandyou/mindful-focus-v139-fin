import PageHeader from "@/components/page-header"
import ProfileStats from "@/components/profile-stats"
import ProfileSettings from "@/components/profile-settings"

export default function ProfilePage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Profile" subtitle="Your mindful journey overview" showBackButton={false} />

      <div className="px-4 space-y-6 max-w-md mx-auto">
        <ProfileStats />
        <ProfileSettings />
      </div>
    </div>
  )
}
