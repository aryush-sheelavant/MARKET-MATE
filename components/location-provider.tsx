"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LocationData {
  city: string | null
  state: string | null
  country: string | null
  latitude: number | null
  longitude: number | null
  loading: boolean
  error: string | null
}

interface LocationContextType extends LocationData {
  requestLocation: () => void
  setManualLocation: (city: string) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

// Karnataka cities mapping
const karnatakaCities = [
  "Bangalore",
  "Bengaluru",
  "Mysore",
  "Mysuru",
  "Hubli",
  "Mangalore",
  "Mangaluru",
  "Belgaum",
  "Belagavi",
  "Dharwad",
  "Tumkur",
  "Shimoga",
  "Davangere",
  "Bellary",
  "Gulbarga",
  "Bijapur",
  "Chitradurga",
  "Hassan",
  "Mandya",
  "Udupi",
  "Chikmagalur",
]

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData>({
    city: null,
    state: null,
    country: null,
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  })

  const fetchCityFromCoords = async (lat: number, lon: number) => {
    try {
      // Using OpenStreetMap Nominatim for reverse geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
        { headers: { "Accept-Language": "en" } },
      )
      const data = await response.json()

      const city = data.address?.city || data.address?.town || data.address?.village || data.address?.suburb
      const state = data.address?.state
      const country = data.address?.country

      // Normalize city names for Karnataka
      let normalizedCity = city
      if (city?.toLowerCase().includes("bengaluru") || city?.toLowerCase().includes("bangalore")) {
        normalizedCity = "Bangalore"
      } else if (city?.toLowerCase().includes("mysuru") || city?.toLowerCase().includes("mysore")) {
        normalizedCity = "Mysore"
      }

      setLocation({
        city: normalizedCity,
        state,
        country,
        latitude: lat,
        longitude: lon,
        loading: false,
        error: null,
      })

      // Save to localStorage for persistence
      localStorage.setItem("userLocation", JSON.stringify({ city: normalizedCity, state, country }))
    } catch {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Could not determine your location",
      }))
    }
  }

  const requestLocation = () => {
    setLocation((prev) => ({ ...prev, loading: true, error: null }))

    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser",
      }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchCityFromCoords(position.coords.latitude, position.coords.longitude)
      },
      (error) => {
        let errorMessage = "Could not get your location"
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location permission denied"
        }
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }))
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  const setManualLocation = (city: string) => {
    setLocation({
      city,
      state: "Karnataka",
      country: "India",
      latitude: null,
      longitude: null,
      loading: false,
      error: null,
    })
    localStorage.setItem("userLocation", JSON.stringify({ city, state: "Karnataka", country: "India" }))
  }

  // Try to load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("userLocation")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setLocation({
          city: parsed.city,
          state: parsed.state,
          country: parsed.country,
          latitude: null,
          longitude: null,
          loading: false,
          error: null,
        })
      } catch {
        requestLocation()
      }
    } else {
      // Auto-request location on first visit
      requestLocation()
    }
  }, [])

  return (
    <LocationContext.Provider value={{ ...location, requestLocation, setManualLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation must be used within LocationProvider")
  }
  return context
}

export { karnatakaCities }
