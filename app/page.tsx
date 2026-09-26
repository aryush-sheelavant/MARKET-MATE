"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { useLocation, karnatakaCities } from "@/components/location-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import {
  ShieldCheck,
  Bell,
  MessageCircle,
  CreditCard,
  Users,
  Briefcase,
  TrendingUp,
  Star,
  MapPin,
  Navigation,
  Loader2,
} from "lucide-react"

export default function HomePage() {
  const { t } = useLanguage()
  const { city, loading: locationLoading, requestLocation, setManualLocation } = useLocation()

  const features = [
    {
      icon: ShieldCheck,
      title: t("verifiedProfiles"),
      description: t("verifiedDesc"),
    },
    {
      icon: Bell,
      title: t("realTimeNotifications"),
      description: t("notificationsDesc"),
    },
    {
      icon: MessageCircle,
      title: t("builtInChat"),
      description: t("chatDesc"),
    },
    {
      icon: CreditCard,
      title: t("securePayments"),
      description: t("paymentsDesc"),
    },
  ]

  const stats = [
    { value: "10,000+", label: "Students", icon: Users },
    { value: "2,500+", label: "Businesses", icon: Briefcase },
    { value: "15,000+", label: "Jobs Posted", icon: TrendingUp },
    { value: "4.8/5", label: "Average Rating", icon: Star },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-8">
                <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                  {t("heroTitle")}
                </h1>
                <p className="text-pretty text-lg text-primary-foreground/80 sm:text-xl">{t("heroSubtitle")}</p>

                <Card className="bg-background/95 backdrop-blur border-0 shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground mb-1 block">Your Location</label>
                        <div className="flex gap-2">
                          <Select value={city || ""} onValueChange={setManualLocation}>
                            <SelectTrigger className="flex-1">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <SelectValue placeholder="Select your city" />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {karnatakaCities.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={requestLocation}
                            disabled={locationLoading}
                            title="Detect my location"
                          >
                            {locationLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Navigation className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Button size="lg" className="sm:self-end" asChild>
                        <Link href="/jobs">{city ? `Find Jobs in ${city}` : "Find Jobs"}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/jobs">{t("findJobs")}</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                    asChild
                  >
                    <Link href="/merchant">{t("hireTalent")}</Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src="/students-working-on-laptops-in-modern-coworking-sp.jpg"
                  alt="Students collaborating"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {city && (
          <section className="bg-primary/5 border-b border-primary/10 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Jobs near {city}</p>
                    <p className="text-sm text-muted-foreground">Discover opportunities in your area</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/students">Find Students in {city}</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/jobs">View {city} Jobs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Stats Section */}
        <section className="border-b border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">{t("featuresTitle")}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 transition-colors hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Job Categories */}
        <section className="bg-secondary/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="text-balance text-3xl font-bold sm:text-4xl">Popular Job Categories</h2>
              <p className="mt-4 text-muted-foreground">Find opportunities that match your skills</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Social Media Management", jobs: 245, icon: "📱" },
                { title: "Content Creation", jobs: 189, icon: "✍️" },
                { title: "Digital Advertising", jobs: 156, icon: "📊" },
                { title: "Field Marketing", jobs: 98, icon: "🎯" },
                { title: "Brand Promotions", jobs: 134, icon: "🎨" },
                { title: "Video Production", jobs: 87, icon: "🎬" },
              ].map((category, index) => (
                <Link href="/jobs" key={index}>
                  <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50">
                    <CardContent className="flex items-center gap-4 p-6">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold">{category.title}</h3>
                        <p className="text-sm text-muted-foreground">{category.jobs} jobs available</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of students and businesses already growing together on MARKETMATE
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
