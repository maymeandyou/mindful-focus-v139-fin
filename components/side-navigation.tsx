"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Home,
  Calendar,
  Compass,
  BookOpen,
  Target,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  Activity,
  Heart,
  Wind,
  Sparkles,
  Timer,
  Users,
  Trophy,
  FileText,
  CheckCircle,
} from "lucide-react"
import { useSidebar } from "@/contexts/sidebar-context"

const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Daily Routine",
    href: "/daily-routine",
    icon: Calendar,
    submenu: [
      { title: "Build Routine", href: "/daily-routine", icon: Calendar },
      { title: "My Routine", href: "/my-routine", icon: CheckCircle },
    ],
  },
  {
    title: "Explore",
    href: "/explore",
    icon: Compass,
    submenu: [
      { title: "Focus Areas", href: "/explore/focus", icon: Target },
      { title: "Ready to Go", href: "/explore/ready", icon: Sparkles },
      { title: "All Practices", href: "/all-practices", icon: BookOpen },
    ],
  },
  {
    title: "Practices",
    icon: Activity,
    submenu: [
      { title: "Meditation", href: "/explore/category/meditation", icon: Heart },
      { title: "Breathwork", href: "/breathwork", icon: Wind },
      { title: "Exercises", href: "/exercises", icon: Activity },
      { title: "Affirmations", href: "/affirmations", icon: Sparkles },
      { title: "Timer", href: "/timer", icon: Timer },
    ],
  },
  {
    title: "Personal",
    icon: Users,
    submenu: [
      { title: "Journal", href: "/journal", icon: FileText },
      { title: "Habits", href: "/habits", icon: Target },
      { title: "Intentions", href: "/intentions", icon: Heart },
      { title: "Challenges", href: "/challenges", icon: Trophy },
    ],
  },
  {
    title: "Progress",
    href: "/progress",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export default function SideNavigation() {
  const pathname = usePathname()
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (pathname.startsWith("/explore")) {
      setOpenMenus((prev) => ({ ...prev, Explore: true }))
    }
    if (pathname.startsWith("/daily-routine") || pathname.startsWith("/my-routine")) {
      setOpenMenus((prev) => ({ ...prev, "Daily Routine": true }))
    }
  }, [pathname])

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const isParentActive = (item: any) => {
    if (item.href && isActive(item.href)) {
      return true
    }
    if (item.submenu) {
      return item.submenu.some((subItem: any) => isActive(subItem.href))
    }
    return false
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white transition-all duration-300 z-50 ${
        isSidebarCollapsed ? "w-16" : "w-64"
      }`}
      style={{ borderRight: `1px solid #dde5d4` }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="header-container" style={{ borderBottom: `1px solid #dde5d4` }}>
          <div className="flex items-center">
            {!isSidebarCollapsed && (
              <h1 className="nav-text flex-1" style={{ paddingLeft: "12px" }}>
                Mindful Focus
              </h1>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="h-8 w-8 p-0"
              style={{ marginLeft: isSidebarCollapsed ? "4px" : "auto", marginRight: "12px" }}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              if (item.submenu) {
                return (
                  <Collapsible
                    key={item.title}
                    open={openMenus[item.title]}
                    onOpenChange={() => toggleMenu(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start h-10 ${isSidebarCollapsed ? "px-2" : "px-3"} body-text ${
                          isParentActive(item)
                            ? "text-gray-800 border-r-2"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        style={{
                          backgroundColor: isParentActive(item) ? "#dde5d4" : "transparent",
                          borderRightColor: isParentActive(item) ? "#dde5d4" : "transparent",
                        }}
                      >
                        <item.icon className={`h-4 w-4 ${isSidebarCollapsed ? "" : "mr-3"}`} />
                        {!isSidebarCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item.title}</span>
                            {openMenus[item.title] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    {!isSidebarCollapsed && (
                      <CollapsibleContent className="space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link key={subItem.href} href={subItem.href}>
                            <Button
                              variant="ghost"
                              className={`w-full justify-start h-9 pl-10 form-text ${
                                isActive(subItem.href)
                                  ? "text-gray-800 border-r-2"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                              }`}
                              style={{
                                backgroundColor: isActive(subItem.href) ? "#dde5d4" : "transparent",
                                borderRightColor: isActive(subItem.href) ? "#dde5d4" : "transparent",
                              }}
                            >
                              <subItem.icon className="h-3 w-3 mr-2" />
                              {subItem.title}
                            </Button>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                )
              }

              return (
                <Link key={item.href} href={item.href!}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-10 ${isSidebarCollapsed ? "px-2" : "px-3"} body-text ${
                      isActive(item.href!)
                        ? "text-gray-800 border-r-2"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                    style={{
                      backgroundColor: isActive(item.href!) ? "#dde5d4" : "transparent",
                      borderRightColor: isActive(item.href!) ? "#dde5d4" : "transparent",
                    }}
                  >
                    <item.icon className={`h-4 w-4 ${isSidebarCollapsed ? "" : "mr-3"}`} />
                    {!isSidebarCollapsed && <span>{item.title}</span>}
                  </Button>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
