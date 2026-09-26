"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Plus,
  Copy,
  QrCode,
  TrendingUp,
  Users,
  Ticket,
  BarChart3,
  Calendar,
  CheckCircle,
  Edit,
  Trash2,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react"

interface PromoCode {
  id: string
  code: string
  description: string
  discountType: "percentage" | "fixed" | "none"
  discountValue: number
  maxUses?: number
  currentUses: number
  isActive: boolean
  validFrom: Date
  validUntil?: Date
  createdAt: Date
  source: string
}

interface UsageData {
  date: string
  uses: number
}

export default function PromoCodesPage() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: "1",
      code: "TECHSTART20",
      description: "20% off for new customers from MARKETMATE",
      discountType: "percentage",
      discountValue: 20,
      maxUses: 100,
      currentUses: 45,
      isActive: true,
      validFrom: new Date("2024-01-01"),
      validUntil: new Date("2024-12-31"),
      createdAt: new Date("2024-01-01"),
      source: "platform_listing",
    },
    {
      id: "2",
      code: "WELCOME10",
      description: "10% off first order",
      discountType: "percentage",
      discountValue: 10,
      currentUses: 128,
      isActive: true,
      validFrom: new Date("2024-01-01"),
      createdAt: new Date("2024-01-01"),
      source: "social_media",
    },
    {
      id: "3",
      code: "STUDENT50",
      description: "₹50 off for students",
      discountType: "fixed",
      discountValue: 50,
      maxUses: 200,
      currentUses: 67,
      isActive: false,
      validFrom: new Date("2024-03-01"),
      validUntil: new Date("2024-06-30"),
      createdAt: new Date("2024-03-01"),
      source: "platform_listing",
    },
  ])

  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newCode, setNewCode] = useState({
    code: "",
    description: "",
    discountType: "percentage" as const,
    discountValue: "",
    maxUses: "",
    validUntil: "",
  })

  // Usage data for charts
  const weeklyData: UsageData[] = [
    { date: "Mon", uses: 12 },
    { date: "Tue", uses: 18 },
    { date: "Wed", uses: 15 },
    { date: "Thu", uses: 22 },
    { date: "Fri", uses: 28 },
    { date: "Sat", uses: 35 },
    { date: "Sun", uses: 20 },
  ]

  const monthlyData = [
    { month: "Jan", customers: 45 },
    { month: "Feb", customers: 52 },
    { month: "Mar", customers: 61 },
    { month: "Apr", customers: 78 },
    { month: "May", customers: 89 },
    { month: "Jun", customers: 102 },
  ]

  const sourceData = [
    { name: "Platform Listing", value: 45, color: "hsl(var(--primary))" },
    { name: "Social Media", value: 30, color: "hsl(var(--chart-2))" },
    { name: "Direct", value: 25, color: "hsl(var(--chart-3))" },
  ]

  // Calculate metrics
  const totalCustomers = promoCodes.reduce((sum, p) => sum + p.currentUses, 0)
  const activeCodesCount = promoCodes.filter((p) => p.isActive).length
  const platformCustomers = promoCodes
    .filter((p) => p.source === "platform_listing")
    .reduce((sum, p) => sum + p.currentUses, 0)

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = "MM"
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewCode({ ...newCode, code: result })
  }

  const handleCreateCode = () => {
    if (newCode.code && newCode.description) {
      const newPromo: PromoCode = {
        id: Date.now().toString(),
        code: newCode.code.toUpperCase(),
        description: newCode.description,
        discountType: newCode.discountType,
        discountValue: Number.parseFloat(newCode.discountValue) || 0,
        maxUses: newCode.maxUses ? Number.parseInt(newCode.maxUses) : undefined,
        currentUses: 0,
        isActive: true,
        validFrom: new Date(),
        validUntil: newCode.validUntil ? new Date(newCode.validUntil) : undefined,
        createdAt: new Date(),
        source: "platform_listing",
      }
      setPromoCodes([...promoCodes, newPromo])
      setNewCode({
        code: "",
        description: "",
        discountType: "percentage",
        discountValue: "",
        maxUses: "",
        validUntil: "",
      })
      setShowCreateDialog(false)
    }
  }

  const toggleCodeStatus = (id: string) => {
    setPromoCodes(promoCodes.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)))
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const deleteCode = (id: string) => {
    setPromoCodes(promoCodes.filter((p) => p.id !== id))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Promo Codes & ROI Tracking</h1>
              <p className="text-muted-foreground">Track new customer acquisition and measure platform ROI</p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Promo Code
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Promo Code</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Promo Code</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., SUMMER20"
                        value={newCode.code}
                        onChange={(e) => setNewCode({ ...newCode, code: e.target.value.toUpperCase() })}
                        className="uppercase"
                      />
                      <Button variant="outline" onClick={generateCode}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="What is this promo for?"
                      value={newCode.description}
                      onChange={(e) => setNewCode({ ...newCode, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Discount Type</Label>
                      <Select
                        value={newCode.discountType}
                        onValueChange={(value: "percentage" | "fixed" | "none") =>
                          setNewCode({ ...newCode, discountType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                          <SelectItem value="none">No Discount (Tracking Only)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Discount Value</Label>
                      <Input
                        type="number"
                        placeholder={newCode.discountType === "percentage" ? "e.g., 20" : "e.g., 100"}
                        value={newCode.discountValue}
                        onChange={(e) => setNewCode({ ...newCode, discountValue: e.target.value })}
                        disabled={newCode.discountType === "none"}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Max Uses (optional)</Label>
                      <Input
                        type="number"
                        placeholder="Unlimited"
                        value={newCode.maxUses}
                        onChange={(e) => setNewCode({ ...newCode, maxUses: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Valid Until (optional)</Label>
                      <Input
                        type="date"
                        value={newCode.validUntil}
                        onChange={(e) => setNewCode({ ...newCode, validUntil: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleCreateCode}>
                    Create Promo Code
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* ROI Metrics Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total New Customers</p>
                    <p className="text-3xl font-bold">{totalCustomers}</p>
                    <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Platform Referrals</p>
                    <p className="text-3xl font-bold">{platformCustomers}</p>
                    <p className="text-xs text-muted-foreground mt-1">From MARKETMATE listings</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Promo Codes</p>
                    <p className="text-3xl font-bold">{activeCodesCount}</p>
                    <p className="text-xs text-muted-foreground mt-1">{promoCodes.length} total codes</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Ticket className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated ROI</p>
                    <p className="text-3xl font-bold">3.2x</p>
                    <p className="text-xs text-green-600 mt-1">Based on customer value</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="codes" className="space-y-6">
            <TabsList>
              <TabsTrigger value="codes">Promo Codes</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Promo Codes Tab */}
            <TabsContent value="codes" className="space-y-4">
              {promoCodes.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Ticket className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-1">No promo codes created</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Create promo codes to track new customer acquisition
                    </p>
                    <Button onClick={() => setShowCreateDialog(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Promo Code
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {promoCodes.map((promo) => (
                    <Card key={promo.id} className={!promo.isActive ? "opacity-60" : ""}>
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                              <Ticket className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-mono font-bold text-lg">{promo.code}</h3>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => copyCode(promo.code)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Badge variant={promo.isActive ? "default" : "secondary"}>
                                  {promo.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{promo.description}</p>
                              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                                {promo.discountType !== "none" && (
                                  <Badge variant="outline">
                                    {promo.discountType === "percentage"
                                      ? `${promo.discountValue}% off`
                                      : `₹${promo.discountValue} off`}
                                  </Badge>
                                )}
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {promo.validUntil
                                    ? `Valid until ${promo.validUntil.toLocaleDateString()}`
                                    : "No expiry"}
                                </span>
                                <Badge variant="secondary" className="capitalize">
                                  {promo.source.replace("_", " ")}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Usage Stats */}
                            <div className="text-center px-4 py-2 bg-secondary/50 rounded-lg">
                              <p className="text-2xl font-bold">{promo.currentUses}</p>
                              <p className="text-xs text-muted-foreground">
                                {promo.maxUses ? `of ${promo.maxUses}` : "uses"}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <Switch checked={promo.isActive} onCheckedChange={() => toggleCodeStatus(promo.id)} />
                                <span className="text-sm">{promo.isActive ? "On" : "Off"}</span>
                              </div>
                              <Button variant="ghost" size="icon">
                                <QrCode className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => deleteCode(promo.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Weekly Usage Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Promo Code Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar dataKey="uses" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Customer Growth Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>New Customer Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="customers"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={{ fill: "hsl(var(--primary))" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Source Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Source Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sourceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {sourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--background))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                      {sourceData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-muted-foreground">
                            {item.name} ({item.value}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* ROI Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>ROI Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">New Customers from Platform</p>
                          <p className="text-2xl font-bold">{platformCustomers}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">Average Customer Value</p>
                          <p className="text-2xl font-bold">₹1,250</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Revenue from Platform</p>
                          <p className="text-2xl font-bold text-primary">
                            ₹{(platformCustomers * 1250).toLocaleString("en-IN")}
                          </p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-primary" />
                      </div>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
