"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Home,
  BookOpen,
  Wind,
  Target,
  Settings,
  TrendingUp,
  Trophy,
  Compass,
  Heart,
  Clock,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const mainNavigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Journal", href: "/journal", icon: BookOpen },
  { name: "Breathwork", href: "/breathwork", icon: Wind },
  { name: "Timer", href: "/timer", icon: Clock },
  { name: "Habits", href: "/habits", icon: Target },
  { name: "Challenges", href: "/challenges", icon: Trophy },
  { name: "Affirmations", href: "/affirmations", icon: Heart },
  { name: "Intentions", href: "/intentions", icon: Lightbulb },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
]

const exploreSubmenu = [
  { name: "Categories", href: "/explore/focus" },
  { name: "Topics", href: "/explore/ready" },
  { name: "All Practices", href: "/explore" },
]

export default function CollapsibleSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(pathname?.startsWith("/explore") || false)

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-white/80 backdrop-blur-sm border-r border-sage-200/50 shadow-lg z-40 hidden lg:block transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-6">
        {/* Header with collapse button */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sage-600 to-rose-500 bg-clip-text text-transparent font-display">
                Mindful Focus
              </h1>
              <p className="text-sm text-taupe-600 mt-1">Nurture your mental health</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-taupe-600 hover:text-taupe-800 hover:bg-sage-50"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {/* Explore with submenu */}
          <div>
            <button
              onClick={() => !isCollapsed && setExploreOpen(!exploreOpen)}
              className={cn(
                "flex items-center w-full rounded-xl transition-all duration-200",
                isCollapsed ? "justify-center p-3" : "justify-between px-4 py-3",
                pathname?.startsWith("/explore")
                  ? "bg-gradient-to-r from-sage-100 to-rose-100 text-taupe-800 shadow-sm"
                  : "text-taupe-600 hover:text-taupe-800 hover:bg-sage-50",
              )}
            >
              <div className="flex items-center space-x-3">
                <Compass className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">Explore</span>}
              </div>
              {!isCollapsed && (exploreOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
            </button>

            {/* Submenu */}
            {exploreOpen && !isCollapsed && (
              <div className="ml-9 mt-1 space-y-1">
                {exploreSubmenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-4 py-2 rounded-lg text-sm transition-all duration-200",
                      pathname === item.href
                        ? "bg-sage-100 text-taupe-800"
                        : "text-taupe-600 hover:text-taupe-800 hover:bg-sage-50",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Regular navigation items */}
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center rounded-xl transition-all duration-200",
                  isCollapsed ? "justify-center p-3" : "space-x-3 px-4 py-3",
                  isActive
                    ? "bg-gradient-to-r from-sage-100 to-rose-100 text-taupe-800 shadow-sm"
                    : "text-taupe-600 hover:text-taupe-800 hover:bg-sage-50",
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-gradient-to-r from-sage-50 to-rose-50 rounded-xl border border-sage-200/50">
              <p className="text-xs text-taupe-600 text-center">
                "Peace comes from within. Do not seek it without." - Buddha
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
