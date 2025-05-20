"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"

import { siteConfig, navigationLinks } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-background/90 backdrop-blur-md py-3 shadow-md" 
        : "bg-transparent py-5"
    )}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/01.png"
              alt="Lucbilt Institute Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              Lucbilt
              <span className="text-amber-600 ml-1">Institute</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link 
            href="/"
            className="text-sm font-medium hover:text-amber-600 transition-colors"
          >
            Home
          </Link>
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-amber-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a 
            href={`tel:${siteConfig.contact.phone}`}
            className="hidden lg:flex items-center gap-2 text-sm font-medium hover:text-amber-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.contact.phone}
          </a>
          <ThemeToggle />
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/enroll">Enroll Now</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-background z-50 md:hidden">
            <div className="container flex flex-col h-full">
              <div className="flex items-center justify-between py-5">
                <Link 
                  href="/" 
                  className="text-xl font-bold tracking-tight"
                  onClick={() => setIsOpen(false)}
                >
                  Lucbilt<span className="text-amber-600">Institute</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col items-start gap-6 mt-8">
                <Link 
                  href="/"
                  className="text-lg font-medium hover:text-amber-600 transition-colors w-full py-3 border-b"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-amber-600 transition-colors w-full py-3 border-b"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <a 
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-2 text-lg font-medium hover:text-amber-600 transition-colors w-full py-3 border-b"
                >
                  <Phone className="h-5 w-5" />
                  {siteConfig.contact.phone}
                </a>
                <Button 
                  asChild 
                  className="bg-amber-600 hover:bg-amber-700 w-full mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/enroll">Enroll Now</Link>
                </Button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}