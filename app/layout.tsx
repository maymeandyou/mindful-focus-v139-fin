import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import BottomNavigation from "@/components/bottom-navigation"
import SideNavigation from "@/components/side-navigation"
import { CategoryProvider } from "@/contexts/category-context"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"

const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Mindful Focus",
  description: "Nurture your mental health with daily mindful practices",
  manifest: "/manifest.json",
  themeColor: "#DDEADE",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useSidebar()

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sage-50 to-stone-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SideNavigation />
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 pb-20 lg:pb-0 transition-all duration-300 ${isSidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}`}
      >
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Livvic:ital,wght@1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body">
        <SidebarProvider>
          <CategoryProvider>
            <LayoutContent>{children}</LayoutContent>
          </CategoryProvider>
        </SidebarProvider>
      </body>
    </html>
  )
}
