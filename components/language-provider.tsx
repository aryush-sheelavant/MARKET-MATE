"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "kn"

interface Translations {
  [key: string]: {
    en: string
    kn: string
  }
}

export const translations: Translations = {
  // Navigation
  home: { en: "Home", kn: "ಮುಖಪುಟ" },
  jobs: { en: "Jobs", kn: "ಉದ್ಯೋಗಗಳು" },
  students: { en: "Students", kn: "ವಿದ್ಯಾರ್ಥಿಗಳು" },
  businesses: { en: "Businesses", kn: "ವ್ಯಾಪಾರಗಳು" },
  login: { en: "Login", kn: "ಲಾಗಿನ್" },
  signup: { en: "Sign Up", kn: "ಸೈನ್ ಅಪ್" },
  logout: { en: "Logout", kn: "ಲಾಗ್ ಔಟ್" },

  // Hero
  heroTitle: { en: "Connect. Create. Succeed.", kn: "ಸಂಪರ್ಕಿಸಿ. ರಚಿಸಿ. ಯಶಸ್ವಿಯಾಗಿ." },
  heroSubtitle: {
    en: "Where ambitious students meet local businesses seeking fresh marketing talent",
    kn: "ಮಹತ್ವಾಕಾಂಕ್ಷಿ ವಿದ್ಯಾರ್ಥಿಗಳು ತಾಜಾ ಮಾರ್ಕೆಟಿಂಗ್ ಪ್ರತಿಭೆಯನ್ನು ಹುಡುಕುತ್ತಿರುವ ಸ್ಥಳೀಯ ವ್ಯಾಪಾರಗಳನ್ನು ಭೇಟಿ ಮಾಡುತ್ತಾರೆ",
  },
  findJobs: { en: "Find Jobs", kn: "ಉದ್ಯೋಗಗಳನ್ನು ಹುಡುಕಿ" },
  hireTalent: { en: "Hire Talent", kn: "ಪ್ರತಿಭೆಯನ್ನು ನೇಮಿಸಿ" },

  // Features
  featuresTitle: { en: "Why Choose MARKETMATE?", kn: "MARKETMATE ಅನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?" },
  verifiedProfiles: { en: "Verified Profiles", kn: "ಪರಿಶೀಲಿಸಿದ ಪ್ರೊಫೈಲ್‌ಗಳು" },
  verifiedDesc: {
    en: "All students and businesses are verified for trust and safety",
    kn: "ನಂಬಿಕೆ ಮತ್ತು ಸುರಕ್ಷತೆಗಾಗಿ ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ವ್ಯಾಪಾರಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
  },
  realTimeNotifications: { en: "Real-Time Notifications", kn: "ನೈಜ-ಸಮಯದ ಅಧಿಸೂಚನೆಗಳು" },
  notificationsDesc: {
    en: "Get instant alerts when applications are accepted",
    kn: "ಅರ್ಜಿಗಳು ಸ್ವೀಕರಿಸಿದಾಗ ತಕ್ಷಣ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ",
  },
  builtInChat: { en: "Built-in Chat", kn: "ಅಂತರ್ನಿರ್ಮಿತ ಚಾಟ್" },
  chatDesc: {
    en: "Communicate directly with merchants through our platform",
    kn: "ನಮ್ಮ ವೇದಿಕೆಯ ಮೂಲಕ ವ್ಯಾಪಾರಿಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂವಹನ ಮಾಡಿ",
  },
  securePayments: { en: "Secure Payments", kn: "ಸುರಕ್ಷಿತ ಪಾವತಿಗಳು" },
  paymentsDesc: {
    en: "All payments in Indian Rupees with secure transactions",
    kn: "ಸುರಕ್ಷಿತ ವಹಿವಾಟುಗಳೊಂದಿಗೆ ಎಲ್ಲಾ ಪಾವತಿಗಳು ಭಾರತೀಯ ರೂಪಾಯಿಗಳಲ್ಲಿ",
  },

  // Jobs
  applyNow: { en: "Apply Now", kn: "ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" },
  perMonth: { en: "/month", kn: "/ತಿಂಗಳು" },
  perProject: { en: "/project", kn: "/ಯೋಜನೆ" },
  remote: { en: "Remote", kn: "ದೂರಸ್ಥ" },
  onsite: { en: "On-site", kn: "ಸ್ಥಳದಲ್ಲಿ" },
  hybrid: { en: "Hybrid", kn: "ಹೈಬ್ರಿಡ್" },

  // Chat
  typeMessage: { en: "Type a message...", kn: "ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ..." },
  send: { en: "Send", kn: "ಕಳುಹಿಸಿ" },
  back: { en: "Back", kn: "ಹಿಂದೆ" },

  // Reviews
  reviews: { en: "Reviews", kn: "ವಿಮರ್ಶೆಗಳು" },
  writeReview: { en: "Write Review", kn: "ವಿಮರ್ಶೆ ಬರೆಯಿರಿ" },
  submitReview: { en: "Submit Review", kn: "ವಿಮರ್ಶೆ ಸಲ್ಲಿಸಿ" },

  // Dashboard
  dashboard: { en: "Dashboard", kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" },
  myApplications: { en: "My Applications", kn: "ನನ್ನ ಅರ್ಜಿಗಳು" },
  messages: { en: "Messages", kn: "ಸಂದೇಶಗಳು" },
  profile: { en: "Profile", kn: "ಪ್ರೊಫೈಲ್" },

  // Status
  pending: { en: "Pending", kn: "ಬಾಕಿ" },
  accepted: { en: "Accepted", kn: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ" },
  rejected: { en: "Rejected", kn: "ತಿರಸ್ಕರಿಸಲಾಗಿದೆ" },

  // Footer
  footerText: {
    en: "Empowering students and businesses to grow together",
    kn: "ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ವ್ಯಾಪಾರಗಳು ಒಟ್ಟಿಗೆ ಬೆಳೆಯಲು ಸಶಕ್ತಗೊಳಿಸುವುದು",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
