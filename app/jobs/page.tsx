"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { useLocation, karnatakaCities } from "@/components/location-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { jobs } from "@/lib/data"
import { Search, MapPin, Clock, Briefcase, Navigation, Loader2 } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const { t } = useLanguage()
  const { city, loading: locationLoading, requestLocation, setManualLocation } = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    if (city && locationFilter === "all") {
      const matchingCity = ["Bangalore", "Mysore", "Remote"].find((c) => c.toLowerCase() === city.toLowerCase())
      if (matchingCity) {
        setLocationFilter(matchingCity.toLowerCase())
      }
    }
  }, [city, locationFilter])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = locationFilter === "all" || job.location.toLowerCase() === locationFilter.toLowerCase()
    const matchesType = typeFilter === "all" || job.type === typeFilter
    const matchesCategory = categoryFilter === "all" || job.category === categoryFilter
    return matchesSearch && matchesLocation && matchesType && matchesCategory
  })

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(salary)
  }

  const getTimeAgo = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    return `${days} days ago`
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "remote":
        return t("remote")
      case "onsite":
        return t("onsite")
      case "hybrid":
        return t("hybrid")
      default:
        return type
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-primary px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-center text-3xl font-bold text-primary-foreground sm:text-4xl">{t("jobs")}</h1>
            <div className="mx-auto max-w-3xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search jobs or companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 bg-background pl-12 text-base"
                />
              </div>
            </div>
          </div>
        </section>

        {city && (
          <div className="bg-primary/10 border-b border-primary/20">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>
                    Showing jobs near <strong>{city}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setLocationFilter("all")} className="h-7 text-xs">
                    Show all locations
                  </Button>
                  <Select value={city} onValueChange={setManualLocation}>
                    <SelectTrigger className="h-7 w-auto text-xs">
                      <SelectValue placeholder="Change city" />
                    </SelectTrigger>
                    <SelectContent>
                      {karnatakaCities.slice(0, 6).map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Jobs */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Filters */}
            <div className="mb-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="mysore">Mysore</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={requestLocation}
                  disabled={locationLoading}
                  title="Detect my location"
                >
                  {locationLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
                </Button>
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Content Creation">Content Creation</SelectItem>
                  <SelectItem value="Digital Advertising">Digital Advertising</SelectItem>
                  <SelectItem value="Field Marketing">Field Marketing</SelectItem>
                  <SelectItem value="Video Production">Video Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results count */}
            <p className="mb-6 text-muted-foreground">
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
              {city &&
                locationFilter !== "all" &&
                ` in ${locationFilter.charAt(0).toUpperCase() + locationFilter.slice(1)}`}
            </p>

            {/* Job Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.companyLogo || "/placeholder.svg"}
                          alt={job.company}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </Badge>
                      <Badge variant="outline">{getTypeLabel(job.type)}</Badge>
                    </div>

                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{job.description}</p>

                    <div className="mb-4 flex flex-wrap gap-1">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary-foreground/80"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{job.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <div>
                        <span className="text-lg font-bold text-primary">{formatSalary(job.salary)}</span>
                        <span className="text-sm text-muted-foreground">
                          {job.salaryType === "month" ? t("perMonth") : t("perProject")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(job.postedAt)}
                      </div>
                    </div>

                    <Button className="mt-4 w-full" asChild>
                      <Link href={`/jobs/${job.id}/apply`}>{t("applyNow")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="py-12 text-center">
                <Briefcase className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                {locationFilter !== "all" && (
                  <Button variant="link" className="mt-2" onClick={() => setLocationFilter("all")}>
                    Show jobs in all locations
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
