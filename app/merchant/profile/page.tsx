"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Building2,
  MapPin,
  ImageIcon,
  ShoppingBag,
  Plus,
  Upload,
  Trash2,
  Edit,
  Save,
  Eye,
  Globe,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"

interface Offering {
  id: string
  name: string
  description: string
  priceRange: string
  image?: string
  isFeatured: boolean
}

interface GalleryImage {
  id: string
  url: string
  caption: string
  type: "shop" | "team" | "product" | "event" | "other"
}

export default function MerchantProfilePage() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "TechStart Cafe",
    logo: "/cafe-logo.png",
    coverImage: "",
    summary: "TechStart Cafe is Bangalore's premier co-working cafe...",
    mission: "To create a vibrant community space...",
    industry: "Food & Beverage",
    foundedYear: "2020",
    teamSize: "11-50",
    website: "https://techstartcafe.com",
    phone: "+91 98765 43210",
    email: "hello@techstartcafe.com",
  })

  const [location, setLocation] = useState({
    addressLine1: "123 MG Road",
    addressLine2: "Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560038",
  })

  const [offerings, setOfferings] = useState<Offering[]>([
    {
      id: "1",
      name: "Specialty Coffee",
      description: "Hand-crafted espresso drinks",
      priceRange: "₹150 - ₹350",
      isFeatured: true,
    },
  ])

  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [showOfferingDialog, setShowOfferingDialog] = useState(false)
  const [newOffering, setNewOffering] = useState<Partial<Offering>>({})

  // Calculate profile completion
  const completionScore =
    [
      businessInfo.name,
      businessInfo.summary,
      businessInfo.logo,
      location.addressLine1,
      offerings.length > 0,
      gallery.length > 0,
    ].filter(Boolean).length * 17

  const handleSaveBasicInfo = () => {
    console.log("Saving business info:", businessInfo)
    // Save to Supabase
  }

  const handleSaveLocation = () => {
    console.log("Saving location:", location)
    // Save to Supabase
  }

  const handleAddOffering = () => {
    if (newOffering.name) {
      setOfferings([...offerings, { ...newOffering, id: Date.now().toString(), isFeatured: false } as Offering])
      setNewOffering({})
      setShowOfferingDialog(false)
    }
  }

  const handleDeleteOffering = (id: string) => {
    setOfferings(offerings.filter((o) => o.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-secondary/20">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Business Profile</h1>
              <p className="text-muted-foreground">Manage how your business appears to students</p>
            </div>
            <Button variant="outline" asChild>
              <Link href={`/business/1`}>
                <Eye className="mr-2 h-4 w-4" />
                Preview Public Profile
              </Link>
            </Button>
          </div>

          {/* Profile Completion */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold">Profile Completion</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete profiles get 3x more applications from students
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={completionScore} className="w-32" />
                  <span className="font-semibold">{completionScore}%</span>
                </div>
              </div>
              {completionScore < 100 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {!businessInfo.summary && <Badge variant="outline">Add business summary</Badge>}
                  {!businessInfo.logo && <Badge variant="outline">Upload logo</Badge>}
                  {offerings.length === 0 && <Badge variant="outline">Add products/services</Badge>}
                  {gallery.length === 0 && <Badge variant="outline">Add photos</Badge>}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic" className="gap-2">
                <Building2 className="h-4 w-4 hidden sm:block" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="location" className="gap-2">
                <MapPin className="h-4 w-4 hidden sm:block" />
                Location
              </TabsTrigger>
              <TabsTrigger value="offerings" className="gap-2">
                <ShoppingBag className="h-4 w-4 hidden sm:block" />
                Offerings
              </TabsTrigger>
              <TabsTrigger value="gallery" className="gap-2">
                <ImageIcon className="h-4 w-4 hidden sm:block" />
                Gallery
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo & Cover */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Business Logo</Label>
                      <div className="flex items-center gap-4">
                        <img
                          src={businessInfo.logo || "/placeholder.svg"}
                          alt="Logo"
                          className="h-20 w-20 rounded-lg object-cover border"
                        />
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors h-20 flex items-center justify-center">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Upload className="h-4 w-4" />
                          <span className="text-sm">Upload cover image</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Name & Industry */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Business Name</Label>
                      <Input
                        value={businessInfo.name}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select
                        value={businessInfo.industry}
                        onValueChange={(value) => setBusinessInfo({ ...businessInfo, industry: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Fashion">Fashion</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <Label>Business Summary</Label>
                    <Textarea
                      placeholder="Tell students about your business, what you do, and what makes you unique..."
                      value={businessInfo.summary}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, summary: e.target.value })}
                      rows={4}
                    />
                  </div>

                  {/* Mission */}
                  <div className="space-y-2">
                    <Label>Mission Statement</Label>
                    <Textarea
                      placeholder="What's your company's mission?"
                      value={businessInfo.mission}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, mission: e.target.value })}
                      rows={2}
                    />
                  </div>

                  {/* Additional Info */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Founded Year</Label>
                      <Input
                        type="number"
                        value={businessInfo.foundedYear}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, foundedYear: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Team Size</Label>
                      <Select
                        value={businessInfo.teamSize}
                        onValueChange={(value) => setBusinessInfo({ ...businessInfo, teamSize: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10</SelectItem>
                          <SelectItem value="11-50">11-50</SelectItem>
                          <SelectItem value="51-200">51-200</SelectItem>
                          <SelectItem value="201-500">201-500</SelectItem>
                          <SelectItem value="500+">500+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="https://..."
                          value={businessInfo.website}
                          onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          value={businessInfo.phone}
                          onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          value={businessInfo.email}
                          onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveBasicInfo}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Address Line 1</Label>
                    <Input
                      placeholder="Street address"
                      value={location.addressLine1}
                      onChange={(e) => setLocation({ ...location, addressLine1: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address Line 2 (optional)</Label>
                    <Input
                      placeholder="Apartment, suite, etc."
                      value={location.addressLine2}
                      onChange={(e) => setLocation({ ...location, addressLine2: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={location.city}
                        onChange={(e) => setLocation({ ...location, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        value={location.state}
                        onChange={(e) => setLocation({ ...location, state: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Postal Code</Label>
                      <Input
                        value={location.postalCode}
                        onChange={(e) => setLocation({ ...location, postalCode: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Map Preview */}
                  <div className="space-y-2">
                    <Label>Location Preview</Label>
                    <div className="rounded-lg overflow-hidden border h-64">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(`${location.addressLine1}, ${location.city}, ${location.state}`)}`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Business Location Preview"
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveLocation}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Location
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Offerings Tab */}
            <TabsContent value="offerings" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Products & Services</h2>
                  <p className="text-sm text-muted-foreground">Showcase what your business offers</p>
                </div>
                <Dialog open={showOfferingDialog} onOpenChange={setShowOfferingDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Offering
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Product or Service</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          placeholder="e.g., Specialty Coffee"
                          value={newOffering.name || ""}
                          onChange={(e) => setNewOffering({ ...newOffering, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Describe this product or service..."
                          value={newOffering.description || ""}
                          onChange={(e) => setNewOffering({ ...newOffering, description: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price Range</Label>
                        <Input
                          placeholder="e.g., ₹150 - ₹350"
                          value={newOffering.priceRange || ""}
                          onChange={(e) => setNewOffering({ ...newOffering, priceRange: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image (optional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload image</p>
                        </div>
                      </div>
                      <Button className="w-full" onClick={handleAddOffering}>
                        Add Offering
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {offerings.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-1">No offerings added</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Add your products and services to showcase to students
                    </p>
                    <Button variant="outline" onClick={() => setShowOfferingDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Offering
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {offerings.map((offering) => (
                    <Card key={offering.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold">{offering.name}</h3>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteOffering(offering.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{offering.description}</p>
                        <p className="text-primary font-medium">{offering.priceRange}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Photo Gallery</h2>
                  <p className="text-sm text-muted-foreground">Add photos of your shop, team, and products</p>
                </div>
              </div>

              {/* Upload Area */}
              <Card>
                <CardContent className="p-6">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <h3 className="font-semibold mb-1">Upload Photos</h3>
                    <p className="text-sm text-muted-foreground mb-3">Drag and drop images here, or click to browse</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG (max 5MB each)</p>
                  </div>
                </CardContent>
              </Card>

              {gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((image) => (
                    <div key={image.id} className="relative group aspect-square rounded-lg overflow-hidden">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button variant="secondary" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {gallery.length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-1">No photos added</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Add photos to make your profile more attractive to students
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
