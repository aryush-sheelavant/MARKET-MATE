"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { useNotifications } from "./notification-provider"
import { useLocation, karnatakaCities } from "./location-provider"
import { Button } from "@/components/ui/button"
import { Bell, Menu, X, Globe, ArrowLeft, User, LogOut, MapPin, Navigation, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface HeaderProps {
  showBack?: boolean
  onBack?: () => void
}

export function Header({ showBack, onBack }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()
  const { notifications, markAsRead, unreadCount } = useNotifications()
  const { city, loading: locationLoading, requestLocation, setManualLocation } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userType, setUserType] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        console.log("[v0] Header getSession:", { session: session?.user?.email })
        setUser(session?.user ?? null)

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("user_type")
            .eq("id", session.user.id)
            .single()

          console.log("[v0] Header profile:", profile)
          setUserType(profile?.user_type || null)
        }
      } catch (err) {
        console.log("[v0] Header getSession error:", err)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] Header auth state change:", { event, user: session?.user?.email })
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data: profile } = await supabase.from("profiles").select("user_type").eq("id", session.user.id).single()

        setUserType(profile?.user_type || null)
      } else {
        setUserType(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setUserType(null)
    window.location.href = "/"
  }

  const getUserInitials = () => {
    if (!user) return "U"
    const name = user.user_metadata?.full_name || user.email || ""
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return user.email?.slice(0, 2).toUpperCase() || "U"
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {showBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">{t("back")}</span>
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-xl font-bold tracking-tight">MARKETMATE</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t("home")}
          </Link>
          <Link
            href="/jobs"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("jobs")}
          </Link>
          <Link
            href="/students"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("students")}
          </Link>
          <Link
            href="/merchant"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("businesses")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm hidden sm:flex">
                {locationLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4 text-primary" />
                )}
                <span className="max-w-[100px] truncate">{city || "Set Location"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-2">Select your city</p>
              </div>
              <DropdownMenuItem onClick={requestLocation} className="gap-2 cursor-pointer">
                <Navigation className="h-4 w-4" />
                Detect my location
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {karnatakaCities.slice(0, 8).map((c) => (
                <DropdownMenuItem
                  key={c}
                  onClick={() => setManualLocation(c)}
                  className={`cursor-pointer ${city === c ? "bg-primary/10 text-primary" : ""}`}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Location Button */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden relative"
            onClick={requestLocation}
            disabled={locationLoading}
          >
            {locationLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <MapPin className="h-5 w-5 text-primary" />
            )}
            {city && (
              <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-primary text-primary-foreground rounded px-1">
                {city.slice(0, 3).toUpperCase()}
              </span>
            )}
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "kn" : "en")}
            className="relative"
          >
            <Globe className="h-5 w-5" />
            <span className="absolute -bottom-1 -right-1 text-[10px] font-bold uppercase">{language}</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
              ) : (
                notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start gap-1 p-3"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">{notification.title}</span>
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <span className="text-xs text-muted-foreground">{notification.message}</span>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden items-center gap-2 md:flex">
            {loading ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.user_metadata?.full_name || "User"}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={userType === "business" ? "/merchant" : "/jobs"} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      {userType === "business" ? "Dashboard" : "Browse Jobs"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("logout") || "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">{t("login")}</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">{t("signup")}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {user && (
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.user_metadata?.full_name || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{city || "No location set"}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={requestLocation} className="gap-2 cursor-pointer">
                    <Navigation className="h-4 w-4" />
                    Detect location
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {karnatakaCities.slice(0, 6).map((c) => (
                    <DropdownMenuItem key={c} onClick={() => setManualLocation(c)} className="cursor-pointer">
                      {c}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link href="/" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("home")}
            </Link>
            <Link href="/jobs" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("jobs")}
            </Link>
            <Link href="/students" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("students")}
            </Link>
            <Link href="/merchant" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              {t("businesses")}
            </Link>
            <div className="flex gap-2 pt-2">
              {user ? (
                <Button variant="outline" className="flex-1 text-destructive bg-transparent" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout") || "Logout"}
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/login">{t("login")}</Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/signup">{t("signup")}</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
