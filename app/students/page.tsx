"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { useLocation, karnatakaCities } from "@/components/location-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { students, reviews } from "@/lib/data"
import { Search, Star, CheckCircle, Briefcase, MapPin, Navigation, Loader2, Filter, X } from 'lucide-react'
import Link from "next/link"
// <CHANGE> Added Sheet component for mobile-friendly filters
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export default function StudentsPage() {
  const { t } = useLanguage()
  const { city, loading: locationLoading, requestLocation, setManualLocation } = useLocation()
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  
  // <CHANGE> Added new filter states for enhanced filtering
  const [degreeFilter, setDegreeFilter] = useState<string[]>([])
  const [majorFilter, setMajorFilter] = useState("")
  const [skillsFilter, setSkillsFilter] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [minJobs, setMinJobs] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // <CHANGE> Common degree types
  const degreeTypes = ["Bachelor's", "Master's", "PhD", "Diploma", "Certificate"]
  
  // <CHANGE> Common majors/fields
  const commonMajors = [
    "Marketing",
    "Business Administration",
    "Computer Science",
    "Communications",
    "Design",
    "Media Studies",
    "Journalism",
    "Engineering"
  ]
  
  // <CHANGE> Skill categories for filtering
  const skillCategories = {
    "Social Media": ["Instagram", "Facebook", "Twitter", "LinkedIn", "TikTok", "Snapchat"],
    "Content Creation": ["Content Writing", "Copywriting", "Blogging", "Photography", "Video Editing"],
    "Design": ["Canva", "Photoshop", "Illustrator", "Figma", "UI/UX"],
    "Digital Marketing": ["Google Ads", "Meta Ads", "SEO", "Email Marketing", "Analytics"],
    "Video Production": ["Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro"],
    "Programming": ["HTML/CSS", "JavaScript", "Python", "React", "WordPress"]
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      student.college.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLocation = locationFilter === "all" || student.location?.toLowerCase() === locationFilter.toLowerCase()
    
    // <CHANGE> Added skill-based filtering
    const matchesSkills = skillsFilter.length === 0 || 
      skillsFilter.some(filterSkill => 
        student.skills.some(studentSkill => 
          studentSkill.toLowerCase().includes(filterSkill.toLowerCase())
        )
      )
    
    // <CHANGE> Added rating filter
    const matchesRating = student.rating >= minRating
    
    // <CHANGE> Added completed jobs filter
    const matchesJobs = student.completedJobs >= minJobs
    
    // <CHANGE> Added verified filter
    const matchesVerified = !verifiedOnly || student.verified
    
    return matchesSearch && matchesLocation && matchesSkills && matchesRating && matchesJobs && matchesVerified
  })

  const getStudentReviews = (studentId: string) => {
    return reviews.filter((r) => r.studentId === studentId)
  }

  // <CHANGE> Added function to clear all filters
  const clearAllFilters = () => {
    setSearchQuery("")
    setLocationFilter("all")
    setDegreeFilter([])
    setMajorFilter("")
    setSkillsFilter([])
    setMinRating(0)
    setMinJobs(0)
    setVerifiedOnly(false)
  }

  // <CHANGE> Count active filters
  const activeFiltersCount = 
    (locationFilter !== "all" ? 1 : 0) +
    degreeFilter.length +
    (majorFilter ? 1 : 0) +
    skillsFilter.length +
    (minRating > 0 ? 1 : 0) +
    (minJobs > 0 ? 1 : 0) +
    (verifiedOnly ? 1 : 0)

  // <CHANGE> Added FilterPanel component
  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Verification Status */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Verification Status</Label>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="verified" 
            checked={verifiedOnly}
            onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
          />
          <label
            htmlFor="verified"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show only verified students
          </label>
        </div>
      </div>

      {/* Skills Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Skills</Label>
        <div className="space-y-2">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category} className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">{category}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={skillsFilter.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (skillsFilter.includes(skill)) {
                        setSkillsFilter(skillsFilter.filter(s => s !== skill))
                      } else {
                        setSkillsFilter([...skillsFilter, skill])
                      }
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Major/Field Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Field of Study</Label>
        <Select value={majorFilter} onValueChange={setMajorFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All fields" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All fields</SelectItem>
            {commonMajors.map((major) => (
              <SelectItem key={major} value={major}>{major}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Degree Filter */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold">Education Level</Label>
        <div className="space-y-2">
          {degreeTypes.map((degree) => (
            <div key={degree} className="flex items-center space-x-2">
              <Checkbox 
                id={degree}
                checked={degreeFilter.includes(degree)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setDegreeFilter([...degreeFilter, degree])
                  } else {
                    setDegreeFilter(degreeFilter.filter(d => d !== degree))
                  }
                }}
              />
              <label
                htmlFor={degree}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {degree}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Minimum Rating</Label>
          <span className="text-sm text-muted-foreground">{minRating.toFixed(1)}+</span>
        </div>
        <Slider
          value={[minRating]}
          onValueChange={(value) => setMinRating(value[0])}
          max={5}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>5.0</span>
        </div>
      </div>

      {/* Completed Jobs Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold">Minimum Jobs Completed</Label>
          <span className="text-sm text-muted-foreground">{minJobs}+</span>
        </div>
        <Slider
          value={[minJobs]}
          onValueChange={(value) => setMinJobs(value[0])}
          max={20}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>20+</span>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button 
          variant="outline" 
          className="w-full"
          onClick={clearAllFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Clear all filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-primary px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-center text-3xl font-bold text-primary-foreground sm:text-4xl">{t("students")}</h1>
            <p className="mb-6 text-center text-primary-foreground/80">
              Browse verified student talent ready to help grow your business
            </p>
            <div className="mx-auto max-w-3xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, skills, or college..."
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
                    Finding students near <strong>{city}</strong>
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

        {/* Students Grid with Filters */}
        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-8">
              {/* <CHANGE> Desktop Filters Sidebar */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-4 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Filters</h3>
                    {activeFiltersCount > 0 && (
                      <Badge variant="secondary">{activeFiltersCount}</Badge>
                    )}
                  </div>
                  <FilterPanel />
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  {/* <CHANGE> Mobile Filter Button */}
                  <Sheet open={showFilters} onOpenChange={setShowFilters}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge variant="secondary" className="ml-2">{activeFiltersCount}</Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80 overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Filter Students</SheetTitle>
                        <SheetDescription>
                          Refine your search with advanced filters
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterPanel />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-2">
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="mysore">Mysore</SelectItem>
                        <SelectItem value="hubli">Hubli</SelectItem>
                        <SelectItem value="mangalore">Mangalore</SelectItem>
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

                  <p className="text-muted-foreground">
                    Showing {filteredStudents.length} {filteredStudents.length === 1 ? "student" : "students"}
                    {locationFilter !== "all" && ` in ${locationFilter.charAt(0).toUpperCase() + locationFilter.slice(1)}`}
                  </p>
                </div>

                {/* <CHANGE> Active Filters Display */}
                {activeFiltersCount > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {verifiedOnly && (
                      <Badge variant="secondary" className="gap-1">
                        Verified Only
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setVerifiedOnly(false)} />
                      </Badge>
                    )}
                    {skillsFilter.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setSkillsFilter(skillsFilter.filter(s => s !== skill))} 
                        />
                      </Badge>
                    ))}
                    {minRating > 0 && (
                      <Badge variant="secondary" className="gap-1">
                        Rating {minRating}+
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setMinRating(0)} />
                      </Badge>
                    )}
                    {minJobs > 0 && (
                      <Badge variant="secondary" className="gap-1">
                        {minJobs}+ jobs
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setMinJobs(0)} />
                      </Badge>
                    )}
                  </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredStudents.map((student) => {
                    const studentReviews = getStudentReviews(student.id)
                    return (
                      <Card
                        key={student.id}
                        className="overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
                      >
                        <CardContent className="p-6">
                          <div className="mb-4 flex items-start gap-4">
                            <img
                              src={student.avatar || "/placeholder.svg"}
                              alt={student.name}
                              className="h-16 w-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{student.name}</h3>
                                {student.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                              </div>
                              <p className="text-sm text-muted-foreground">{student.college}</p>
                              {student.location && (
                                <div className="flex items-center gap-1 mt-1">
                                  <MapPin className="h-3 w-3 text-primary" />
                                  <span className="text-xs text-muted-foreground">{student.location}</span>
                                </div>
                              )}
                              <div className="mt-1 flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 fill-primary text-primary" />
                                  <span className="text-sm font-medium">{student.rating}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">({student.reviewCount} reviews)</span>
                              </div>
                            </div>
                          </div>

                          <p className="mb-4 text-sm text-muted-foreground">{student.bio}</p>

                          <div className="mb-4 flex flex-wrap gap-1">
                            {student.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{student.completedJobs} jobs completed</span>
                            </div>
                          </div>

                          {/* Recent Review */}
                          {studentReviews.length > 0 && (
                            <div className="mb-4 rounded-lg bg-secondary/50 p-3">
                              <p className="text-xs font-medium text-muted-foreground">Recent Review</p>
                              <p className="mt-1 text-sm italic">"{studentReviews[0].comment.slice(0, 80)}..."</p>
                              <p className="mt-1 text-xs text-muted-foreground">- {studentReviews[0].merchantName}</p>
                            </div>
                          )}

                          <Button className="w-full" asChild>
                            <Link href={`/chat/${student.id}`}>Contact Student</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {filteredStudents.length === 0 && (
                  <div className="py-12 text-center">
                    <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">No students found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                    {activeFiltersCount > 0 && (
                      <Button variant="link" className="mt-2" onClick={clearAllFilters}>
                        Clear all filters
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
