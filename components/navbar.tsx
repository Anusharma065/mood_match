"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would be replaced with actual auth state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-purple-600">MoodMatch</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/" isActive={true}>
                Home
              </NavLink>
              <NavLink href="/about">About</NavLink>
              {isLoggedIn && (
                <>
                  <NavLink href="/mood">Mood Input</NavLink>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                </>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => setIsLoggedIn(false)}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("sm:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          <MobileNavLink href="/" isActive={true}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/about">About</MobileNavLink>
          {isLoggedIn && (
            <>
              <MobileNavLink href="/mood">Mood Input</MobileNavLink>
              <MobileNavLink href="/dashboard">Dashboard</MobileNavLink>
            </>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            {isLoggedIn ? (
              <Button variant="ghost" className="w-full justify-center" onClick={() => setIsLoggedIn(false)}>
                Sign Out
              </Button>
            ) : (
              <div className="w-full space-y-2">
                <Button variant="ghost" className="w-full justify-center" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button className="w-full justify-center" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children, isActive = false }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
        isActive
          ? "border-purple-500 text-gray-900"
          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
      )}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children, isActive = false }) {
  return (
    <Link
      href={href}
      className={cn(
        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
        isActive
          ? "bg-purple-50 border-purple-500 text-purple-700"
          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
      )}
    >
      {children}
    </Link>
  )
}
