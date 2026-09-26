"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="text-xl font-bold">MARKETMATE</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("footerText")}</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">For Students</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/jobs" className="hover:text-foreground">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-foreground">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="/students" className="hover:text-foreground">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">For Businesses</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/merchant" className="hover:text-foreground">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/students" className="hover:text-foreground">
                  Browse Talent
                </Link>
              </li>
              <li>
                <Link href="/merchant" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MARKETMATE. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
