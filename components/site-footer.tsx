import Link from "next/link"
import { Facebook, Instagram, Linkedin, SendHorizontal, Twitter } from "lucide-react"

import { siteConfig, footerLinks } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer className="bg-muted py-16 border-t">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <h3 className="text-xl font-bold">
              Lucbilt<span className="text-amber-600">Institute</span>
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm mt-4 max-w-xs">
            {siteConfig.description} Established since {aboutData.since}.
          </p>
          <div className="flex space-x-3 pt-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
        </div>

        {footerLinks.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-sm font-bold tracking-wider">{section.title}</h3>
            <ul className="space-y-3">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                    {/* {link.value && ": "}
                    {link.value && <span className="text-xs">{link.value}</span>} */}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-4 lg:col-span-1">
          <h3 className="text-sm font-bold tracking-wider">SUBSCRIBE</h3>
          <p className="text-muted-foreground text-sm">
            Subscribe to our newsletter to get updates about our courses and events.
          </p>
          <div className="flex">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent"
            />
            <Button className="rounded-l-none bg-amber-600 hover:bg-amber-700">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mt-16 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Lucbilt Skills Training Institute. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              href="/privacy-policy" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-of-service" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { aboutData } from "@/lib/constants"