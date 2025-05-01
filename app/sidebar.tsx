"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Heart, Music, Film, Gamepad, Settings, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  const isActive = (path) => pathname === path

  return (
    <>
      {isMobile && (
        <div className="flex items-center p-4">
          <SidebarTrigger />
          <span className="ml-2 text-xl font-bold">MoodMatch</span>
        </div>
      )}

      <Sidebar>
        <SidebarHeader className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center">
            <Heart className="h-6 w-6 text-purple-600 mr-2" />
            <span className="text-xl font-bold">MoodMatch</span>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/")}>
                <Link href="/">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/mood")}>
                <Link href="/mood">
                  <Heart className="h-5 w-5" />
                  <span>Mood Input</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                <Link href="/dashboard">
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/recommendations")}>
                <Link href="/recommendations">
                  <Music className="h-5 w-5" />
                  <span>Recommendations</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="mt-6">
            <h3 className="px-4 text-sm font-medium text-gray-500">Content Types</h3>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/content/music">
                    <Music className="h-5 w-5" />
                    <span>Music</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/content/videos">
                    <Film className="h-5 w-5" />
                    <span>Videos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/content/games">
                    <Gamepad className="h-5 w-5" />
                    <span>Games</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
