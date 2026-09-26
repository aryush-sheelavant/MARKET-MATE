"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Globe,
  Calendar,
  Users,
  Briefcase,
  Star,
  Clock,
  ExternalLink,
  Phone,
  Mail,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { jobs } from "@/lib/data"

// Mock business data - would be fetched from Supabase
const mockBusiness = {
  id: "1",
  name: "TechStart Cafe",
  logo: "/cafe-logo.png",
  coverImage: "/modern-cafe-interior-with-laptops.jpg",
  summary:
    "TechStart Cafe is Bangalore's premier co-working cafe, blending artisanal coffee with a productive workspace. We're passionate about supporting the local startup ecosystem and providing a space where students and entrepreneurs can connect, collaborate, and create.",
  mission:
    "To create a vibrant community space that fuels innovation with great coffee and provides opportunities for students to gain real-world experience.",
  industry: "Food & Beverage / Co-working",
  foundedYear: 2020,
  teamSize: "11-50",
  website: "https://techstartcafe.com",
  phone: "+91 98765 43210",
  email: "hello@techstartcafe.com",
  rating: 4.8,
  reviewCount: 45,
  totalHires: 12,
  location: {
    address: "123 MG Road, Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560038",
    lat: 12.9716,
    lng: 77.5946,
  },
  offerings: [
    {
      id: "1",
      name: "Specialty Coffee",
      description: "Hand-crafted espresso drinks using locally roasted beans",
      priceRange: "₹150 - ₹350",
      image: "/specialty-coffee-latte-art.jpg",
      isFeatured: true,
    },
    {
      id: "2",
      name: "Co-working Space",
      description: "High-speed WiFi, power outlets, and comfortable seating",
      priceRange: "₹200/hour",
      image: "/modern-coworking-space.png",
      isFeatured: true,
    },
    {
      id: "3",
      name: "Meeting Rooms",
      description: "Private meeting rooms for client calls and team meetings",
      priceRange: "₹500/hour",
      image: "/modern-meeting-room.png",
      isFeatured: false,
    },
  ],
  gallery: [
    { id: "1", url: "/cafe-interior-with-wooden-tables.jpg", caption: "Our cozy interior", type: "shop" },
    { id: "2", url: "/barista-making-coffee.jpg", caption: "Expert baristas at work", type: "team" },
    { id: "3", url: "/latte-art-coffee.jpg", caption: "Our signature latte art", type: "product" },
    { id: "4", url: "/people-working-on-laptops-in-cafe.jpg", caption: "Productive workspace", type: "shop" },
    { id: "5", url: "/cafe-team-photo-smiling.jpg", caption: "Meet our team", type: "team" },
  ],
  openJobs: jobs.filter((j) => j.company === "TechStart Cafe"),
}

export default function BusinessProfilePage() {
  const params = useParams()
  const business = mockBusiness // In production, fetch by params.id
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % business.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + business.gallery.length) % business.gallery.length)
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(salary)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Cover Image */}
        <div className="relative h-48 sm:h-64 lg:h-80 bg-gradient-to-r from-primary/20 to-primary/5">
          <img
            src={business.coverImage || "/placeholder.svg"}
            alt={`${business.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Business Header */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img
                  src={business.logo || "/placeholder.svg"}
                  alt={business.name}
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl border-4 border-background shadow-lg object-cover bg-background"
                />
              </div>

              {/* Business Info */}
              <div className="flex-1 pt-2 sm:pt-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">{business.name}</h1>
                    <p className="text-muted-foreground">{business.industry}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{business.rating}</span>
                        <span className="text-sm text-muted-foreground">({business.reviewCount} reviews)</span>
                      </div>
                      <Badge variant="secondary">
                        <Users className="h-3 w-3 mr-1" />
                        {business.teamSize} employees
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        Since {business.foundedYear}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => setIsSaved(!isSaved)}>
                      <Heart className={`h-4 w-4 ${isSaved ? "fill-destructive text-destructive" : ""}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button asChild>
                      <Link href={`/jobs?company=${business.id}`}>
                        <Briefcase className="h-4 w-4 mr-2" />
                        View Jobs ({business.openJobs.length})
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="about" className="space-y-6 pb-12">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="offerings">Products & Services</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="jobs">Open Jobs</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold mb-4">About Us</h2>
                      <p className="text-muted-foreground whitespace-pre-line">{business.summary}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-lg font-semibold mb-4">Our Mission</h2>
                      <p className="text-muted-foreground">{business.mission}</p>
                    </CardContent>
                  </Card>

                  {/* Stats */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary">{business.totalHires}</div>
                        <p className="text-sm text-muted-foreground">Students Hired</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary">{business.openJobs.length}</div>
                        <p className="text-sm text-muted-foreground">Open Positions</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary">{business.rating}</div>
                        <p className="text-sm text-muted-foreground">Average Rating</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Info */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        {business.website && (
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Globe className="h-4 w-4 text-primary" />
                            {business.website.replace("https://", "")}
                            <ExternalLink className="h-3 w-3 ml-auto" />
                          </a>
                        )}
                        {business.phone && (
                          <a
                            href={`tel:${business.phone}`}
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Phone className="h-4 w-4 text-primary" />
                            {business.phone}
                          </a>
                        )}
                        {business.email && (
                          <a
                            href={`mailto:${business.email}`}
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Mail className="h-4 w-4 text-primary" />
                            {business.email}
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Location</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-primary mt-0.5" />
                          <div className="text-sm text-muted-foreground">
                            <p>{business.location.address}</p>
                            <p>
                              {business.location.city}, {business.location.state}
                            </p>
                            <p>{business.location.postalCode}</p>
                          </div>
                        </div>
                        {/* Map Placeholder */}
                        <div className="mt-4 rounded-lg overflow-hidden border">
                          <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${business.location.address}, ${business.location.city}`)}`}
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Business Location"
                          />
                        </div>
                        <Button variant="outline" className="w-full bg-transparent" asChild>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${business.location.lat},${business.location.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            Get Directions
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Offerings Tab */}
            <TabsContent value="offerings" className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Products & Services</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {business.offerings.map((offering) => (
                    <Card key={offering.id} className="overflow-hidden">
                      <img
                        src={offering.image || "/placeholder.svg"}
                        alt={offering.name}
                        className="h-40 w-full object-cover"
                      />
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold">{offering.name}</h3>
                          {offering.isFeatured && <Badge variant="secondary">Featured</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{offering.description}</p>
                        <p className="text-primary font-medium mt-2">{offering.priceRange}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-6">
              {/* Featured Image */}
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={business.gallery[currentImageIndex]?.url || "/placeholder.svg"}
                    alt={business.gallery[currentImageIndex]?.caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button variant="secondary" size="icon" onClick={prevImage}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={nextImage}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-medium">{business.gallery[currentImageIndex]?.caption}</p>
                    <p className="text-white/70 text-sm capitalize">{business.gallery[currentImageIndex]?.type}</p>
                  </div>
                </div>
              </Card>

              {/* Thumbnails */}
              <div className="grid grid-cols-5 gap-2">
                {business.gallery.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-primary" : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.caption}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Gallery by Type */}
              <div className="space-y-6">
                {["shop", "team", "product"].map((type) => {
                  const images = business.gallery.filter((img) => img.type === type)
                  if (images.length === 0) return null
                  return (
                    <div key={type}>
                      <h3 className="font-semibold mb-3 capitalize">{type} Photos</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((image) => (
                          <div key={image.id} className="aspect-square rounded-lg overflow-hidden">
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.caption}
                              className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                              onClick={() => setCurrentImageIndex(business.gallery.findIndex((g) => g.id === image.id))}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Open Positions</h2>
                <Badge variant="secondary">{business.openJobs.length} jobs</Badge>
              </div>

              {business.openJobs.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-1">No open positions</h3>
                    <p className="text-sm text-muted-foreground text-center">Check back later for new opportunities</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {business.openJobs.map((job) => (
                    <Card key={job.id} className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {job.location}
                              </span>
                              <Badge variant="outline">{job.type}</Badge>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {Math.floor((Date.now() - job.postedAt.getTime()) / (1000 * 60 * 60 * 24))}d ago
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {job.skills.slice(0, 4).map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="font-semibold text-primary">
                              {formatSalary(job.salary)}
                              <span className="text-sm font-normal text-muted-foreground">/{job.salaryType}</span>
                            </span>
                            <Button asChild>
                              <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
