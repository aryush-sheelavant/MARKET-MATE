"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CreditCard,
  Building2,
  Smartphone,
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Send,
  Loader2,
  ChevronRight,
  HelpCircle,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const paymentMethods = [
  {
    id: "upi",
    name: "UPI",
    description: "Pay using any UPI app",
    icon: Smartphone,
    popular: true,
  },
  {
    id: "netbanking",
    name: "Net Banking",
    description: "All major Indian banks",
    icon: Building2,
    popular: false,
  },
  {
    id: "credit_card",
    name: "Credit Card",
    description: "Visa, Mastercard, RuPay",
    icon: CreditCard,
    popular: false,
  },
  {
    id: "debit_card",
    name: "Debit Card",
    description: "All debit cards accepted",
    icon: CreditCard,
    popular: false,
  },
]

const popularBanks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
]

const quickFAQs = [
  { question: "Payment failed but amount deducted?", answer: "failed_deducted" },
  { question: "How to get refund?", answer: "refund" },
  { question: "Transaction timed out", answer: "timeout" },
  { question: "UPI not working", answer: "upi_issue" },
  { question: "Card declined", answer: "card_declined" },
]

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [upiId, setUpiId] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm here to help with any payment issues. You can ask me about failed payments, refunds, or any other payment-related questions.",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isSending, setIsSending] = useState(false)

  // Mock order details
  const orderDetails = {
    merchantName: "TechStart Cafe",
    description: "Social Media Marketing Service",
    amount: 15000,
    gst: 2700,
    total: 17700,
    orderId: "MM-2024-001234",
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Randomly succeed or fail for demo
    const success = Math.random() > 0.3
    setPaymentStatus(success ? "success" : "error")
    setIsProcessing(false)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])
    setInputMessage("")
    setIsSending(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let response = ""
    const lowerInput = inputMessage.toLowerCase()

    if (lowerInput.includes("failed") && lowerInput.includes("deducted")) {
      response =
        "I understand your payment failed but the amount was deducted. Don't worry - this is usually temporary. The amount will be automatically refunded to your account within 5-7 business days. If you don't receive the refund, please contact your bank with the transaction ID."
    } else if (lowerInput.includes("refund")) {
      response =
        "Refunds are typically processed within 5-7 business days for bank transfers and 2-3 days for UPI. You can check your refund status in the 'My Payments' section. If your refund is delayed, please share your Order ID and I'll look into it."
    } else if (lowerInput.includes("timeout") || lowerInput.includes("timed out")) {
      response =
        "Transaction timeouts usually occur due to network issues. Please check your internet connection and try again. If the amount was deducted, it will be automatically refunded within 5-7 business days."
    } else if (lowerInput.includes("upi")) {
      response =
        "For UPI issues:\n1. Ensure your UPI ID is correct\n2. Check if your bank's UPI service is active\n3. Try with a different UPI app\n4. Make sure you have sufficient balance\n\nIf the problem persists, try using Net Banking or Card payment instead."
    } else if (lowerInput.includes("card") && lowerInput.includes("declined")) {
      response =
        "Your card may be declined for several reasons:\n1. Insufficient funds\n2. Card expired\n3. International transaction blocked\n4. Daily limit exceeded\n\nPlease contact your bank to enable online transactions or try a different payment method."
    } else {
      response =
        "Thank you for your message. For specific issues with your payment, please share your Order ID or Transaction Reference, and I'll help you resolve it. You can also reach our support team at support@marketmate.com or call us at 1800-XXX-XXXX."
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])
    setIsSending(false)
  }

  const handleQuickFAQ = (faqAnswer: string) => {
    let question = ""
    let response = ""

    switch (faqAnswer) {
      case "failed_deducted":
        question = "Payment failed but amount deducted"
        response =
          "I understand your payment failed but the amount was deducted. Don't worry - this is usually temporary. The amount will be automatically refunded to your account within 5-7 business days. If you don't receive the refund, please contact your bank with the transaction ID."
        break
      case "refund":
        question = "How to get a refund?"
        response =
          "Refunds are typically processed within 5-7 business days for bank transfers and 2-3 days for UPI. You can check your refund status in the 'My Payments' section. If your refund is delayed, please share your Order ID and I'll look into it."
        break
      case "timeout":
        question = "Transaction timed out"
        response =
          "Transaction timeouts usually occur due to network issues. Please check your internet connection and try again. If the amount was deducted, it will be automatically refunded within 5-7 business days."
        break
      case "upi_issue":
        question = "UPI not working"
        response =
          "For UPI issues:\n1. Ensure your UPI ID is correct\n2. Check if your bank's UPI service is active\n3. Try with a different UPI app\n4. Make sure you have sufficient balance\n\nIf the problem persists, try using Net Banking or Card payment instead."
        break
      case "card_declined":
        question = "Card declined"
        response =
          "Your card may be declined for several reasons:\n1. Insufficient funds\n2. Card expired\n3. International transaction blocked\n4. Daily limit exceeded\n\nPlease contact your bank to enable online transactions or try a different payment method."
        break
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    }
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage, assistantMessage])
  }

  if (paymentStatus === "success") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-secondary/20 p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground mb-6">
                Your payment of {formatCurrency(orderDetails.total)} has been processed successfully.
              </p>
              <div className="bg-secondary/50 rounded-lg p-4 mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Order ID</span>
                  <span className="font-mono text-sm">{orderDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Transaction ID</span>
                  <span className="font-mono text-sm">TXN{Date.now()}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href="/merchant">Go to Dashboard</a>
                </Button>
                <Button className="flex-1" asChild>
                  <a href="/jobs">Browse Jobs</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-secondary/20">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Complete Payment</h1>
                <p className="text-muted-foreground">Choose your preferred payment method</p>
              </div>

              {/* Payment Error */}
              {paymentStatus === "error" && (
                <Card className="border-destructive bg-destructive/5">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-destructive">Payment Failed</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          We couldn't process your payment. Please try again or use a different payment method.
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                            onClick={() => setPaymentStatus("idle")}
                          >
                            Try Again
                          </Button>
                          <Sheet open={showChat} onOpenChange={setShowChat}>
                            <SheetTrigger asChild>
                              <Button variant="outline" size="sm" className="bg-transparent">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Get Help
                              </Button>
                            </SheetTrigger>
                          </Sheet>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id}>
                        <Label
                          htmlFor={method.id}
                          className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                            paymentMethod === method.id ? "border-primary bg-primary/5" : "hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <method.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{method.name}</span>
                              {method.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{method.description}</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Details Form */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {paymentMethod === "upi" && "Enter UPI Details"}
                    {paymentMethod === "netbanking" && "Select Your Bank"}
                    {(paymentMethod === "credit_card" || paymentMethod === "debit_card") && "Enter Card Details"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {paymentMethod === "upi" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upi">UPI ID</Label>
                        <Input
                          id="upi"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          You will receive a payment request on your UPI app
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                          Google Pay
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                          PhonePe
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                          Paytm
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                          BHIM
                        </Badge>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "netbanking" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {popularBanks.map((bank) => (
                          <button
                            key={bank}
                            onClick={() => setSelectedBank(bank)}
                            className={`p-3 rounded-lg border text-sm text-left transition-colors ${
                              selectedBank === bank ? "border-primary bg-primary/5" : "hover:border-primary/50"
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <Input placeholder="Search for other banks..." className="pr-10" />
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  )}

                  {(paymentMethod === "credit_card" || paymentMethod === "debit_card") && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={19}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          placeholder="JOHN DOE"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Security Notice */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
                <Lock className="h-4 w-4 ml-auto" />
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">{orderDetails.merchantName}</p>
                    <p className="text-sm text-muted-foreground">{orderDetails.description}</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(orderDetails.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span>{formatCurrency(orderDetails.gst)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(orderDetails.total)}</span>
                  </div>
                  <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Pay {formatCurrency(orderDetails.total)}</>
                    )}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">Order ID: {orderDetails.orderId}</p>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <HelpCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Need Help?</p>
                      <p className="text-sm text-muted-foreground">Get instant support</p>
                    </div>
                    <Sheet open={showChat} onOpenChange={setShowChat}>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                    </Sheet>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Support Chatbot */}
      <Sheet open={showChat} onOpenChange={setShowChat}>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
          <SheetHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <MessageCircle className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <SheetTitle>Payment Support</SheetTitle>
                  <p className="text-xs text-muted-foreground">Typically replies instantly</p>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Quick FAQs */}
          <div className="p-4 border-b bg-secondary/30">
            <p className="text-xs font-medium text-muted-foreground mb-2">Common Issues</p>
            <div className="flex flex-wrap gap-2">
              {quickFAQs.map((faq) => (
                <Badge
                  key={faq.answer}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 text-xs"
                  onClick={() => handleQuickFAQ(faq.answer)}
                >
                  {faq.question}
                </Badge>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="bg-secondary rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isSending}
              />
              <Button type="submit" size="icon" disabled={isSending || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-center text-muted-foreground mt-2">For urgent issues, call 1800-XXX-XXXX</p>
          </div>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  )
}
