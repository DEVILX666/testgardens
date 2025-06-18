"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Check, Clock, ArrowRight, RefreshCw, AlertCircle } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface OGAdsOffer {
  id: number
  title: string
  description: string
  reward: string
  instructions: string
  url: string
  image: string
  payout: number
  badge?: string
  category: string
}

interface ChatMessage {
  username: string
  message: string
  timeAgo: string
  avatarUrl: string
}

// New Roblox usernames with avatars
const realRobloxUsers = [
  {
    username: "Liliana_Cupcake1",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-F886F6A2F04884003042CB1B133FF85E-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "PixelNinja123",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-DB22938CEDD6F835BDC83517F22CF558-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "ayoletgo",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-F323BBE8809396771A9D3B009ABB7B6C-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Dreamycloudxo",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-877FD313CF49AC230D6CDB0813384418-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "lily_l0llyp0p",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-508B26B915327442310C15E05990262A-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "lilypaddd11",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-D69F986644481AEE90D6BBB252BDD78B-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Sisi_7901",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-2C45A19E70B6AAC621EBD8B2D0A6E42E-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "him90236",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-06DD1C00CA0EB2CCDF1E8E828D182573-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Queenbee_mavi",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-7E66C8AA069C27FAB434F332DFA7DE40-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "reto21r",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-ED6E717A62E7C6DE57502AA232123D98-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Emmagirl0916",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A415CFB32D441BB6E1A96CA204BB0647-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "3mmqza",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A4BA51E32FA674ED3D7A1CE66FE5AA40-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "parassinitu",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-D317B719D555BB05A2AF522B512BFF23-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "laxyaaa",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A7818BF2D5D4AC3CB6D5418A713BBB6C-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Battal_216",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-AEC10DD31BD85B9706BB3567ED5A4BC5-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "bangakumakan",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A9C2582009A1FDECCA18263C7A3C6FE8-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "DDDDEdZZ",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-0E08B78408BB5614B39A026D36A9575D-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Anhtomdepzai",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-6C9E0AAEF821128DD48FB8A389C4A0B9-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "XAGXcallYTCH",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-EA378FFC5001D147249CB2B3AAED2C05-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Moonee_Play",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-151FF93EEB183449A06A4833E71938A3-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "hotspot5671",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-F47CC2E15DEC626448D15A9E66EF1762-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "CyberXIndo",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A654D4AEA6E04F5671471E0266B4EA62-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "AT111114",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-E9527F1E31B8A775C70C0022AF80FDC5-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "wDetrox",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-D149EA2C4E77B7B6882D6C056B0B3772-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Eightnesses",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-3F0C92CED81F2936EA712517457CC982-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "EightPxth",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-B6530B4FCD3302ED31F4BD913E198D7F-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Ishowspeedjr2nd",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-16067DDF7E67005B57C8CA1BACBC8395-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "angel1789tay",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-8EE17821CC0789141F9753763D593180-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "gardenwindut",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A8B021C60924EE61CEF929236824C30F-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "needscreativity",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-9C81A53E43F0D94E105F86CFCC350C5D-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
  {
    username: "Richy_544",
    avatar:
      "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-7D7B193935907A3816671468E709A849-Png/150/150/AvatarHeadshot/Webp/noFilter",
  },
]

const petImages = [
  "https://aldi.today/photo/raccoon.jpg",
  "https://aldi.today/photo/dragonfly.jpg",
  "https://aldi.today/photo/redfox.jpg",
  "https://aldi.today/photo/theowl.jpg",
]

const petNames = ["Raccoon", "Dragonfly", "Red Fox", "Owl"]

// Brainrot chat messages
const brainrotMessages = [
  "just got my raccoon bro what! 😘 rizzler vibes only",
  "omg it actually worked, downloaded 3 apps and got my dragonfly fr fr",
  "finally got my dragonfly after trying for weeks, this is bussin 💀",
  "nah frr I just did 3 easy apps and raccoons omg bro 🔥",
  "yo got my raccoon by downloading 3 apps 😘 Rizzler vibes only!",
  "this site is actually goated, no cap 🧢",
  "W site, got my fox in 2 mins by doing surveys",
  "my friends are so pressed about my new pet lmaooo",
  "easiest pets ever, just download some apps bestie 💅",
  "not me getting free pets while others pay robux 💀💀",
  "this is so sigma, got my owl for free",
  "downloading apps > spending robux, periodt 💯",
]

const proofImages = [
  "https://th.bing.com/th/id/OIP.KzRtrtFiRc41Ubfgl9C-4gHaPI?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.KzRtrtFiRc41Ubfgl9C-4gHaPI?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.KzRtrtFiRc41Ubfgl9C-4gHaPI?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.KzRtrtFiRc41Ubfgl9C-4gHaPI?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.KzRtrtFiRc41Ubfgl9C-4gHaPI?rs=1&pid=ImgDetMain",
]

// OGAds API Configuration
const CONFIG = {
  apiEndpoint: "https://unlockcontent.net/api/v2",
  apiKey: "32596|NvKZ6LZ7CMlmaVb5fqyUVQpDYtuISaeJCWVyq8vq87c6f790",
  postbackUrl: "https://testervibe.com/postback.php",
  checkConversionUrl: "https://testervibe.com/check_conversion.php",
  requiredTasks: 2,
  offerTypes: 1, // 1=CPI, 2=CPA, 3=CPI+CPA, etc.
  debug: true,
}

export default function CompleteTasksPage() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || "Player"
  const petId = Number.parseInt(searchParams.get("pet") || "0")
  const [offers, setOffers] = useState<OGAdsOffer[]>([])
  const [completedOffers, setCompletedOffers] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentNotification, setCurrentNotification] = useState<{ message: string; avatar: string } | null>(null)
  const [liveCount, setLiveCount] = useState(15)
  const [completedToday, setCompletedToday] = useState(420)
  const [currentProofIndex, setCurrentProofIndex] = useState(0)
  const [userIP, setUserIP] = useState("")
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)

  // Generate unique session ID
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  useEffect(() => {
    // Initialize audio
    clickSoundRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3")

    // Initialize
    initializeApp()

    // Initialize chat
    const initialMessages = generateChatMessages(3)
    setChatMessages(initialMessages)

    // Setup push notifications with avatars
    const showRandomNotification = () => {
      const user = realRobloxUsers[Math.floor(Math.random() * realRobloxUsers.length)]
      const pets = ["Raccoon", "Dragonfly", "Red Fox", "Owl"]
      const pet = pets[Math.floor(Math.random() * pets.length)]

      setCurrentNotification({
        message: `${user.username} just claimed a ${pet} pet! 🎉`,
        avatar: user.avatar,
      })

      setTimeout(() => {
        setCurrentNotification(null)
      }, 4000)
    }

    const firstNotification = setTimeout(showRandomNotification, 3000)
    const notificationInterval = setInterval(showRandomNotification, 8000 + Math.random() * 7000)

    // Chat updates
    const chatInterval = setInterval(() => {
      const newMessage = generateChatMessage()
      setChatMessages((prev) => {
        const updated = [newMessage, ...prev]
        if (updated.length > 5) updated.pop()
        return updated
      })

      // Update timestamps
      setChatMessages((prev) =>
        prev.map((msg, i) => {
          if (i === 0) return msg
          if (msg.timeAgo === "Just now") return { ...msg, timeAgo: "1m ago" }
          if (msg.timeAgo === "1m ago") return { ...msg, timeAgo: "2m ago" }
          if (msg.timeAgo === "2m ago") return { ...msg, timeAgo: "5m ago" }
          return msg
        }),
      )
    }, 15000)

    // Live count updates
    const liveInterval = setInterval(() => {
      setLiveCount((prev) => Math.max(10, Math.min(25, prev + Math.floor(Math.random() * 3) - 1)))
      setCompletedToday((prev) => prev + Math.floor(Math.random() * 3))
    }, 30000)

    // Proof images carousel
    const proofInterval = setInterval(() => {
      setCurrentProofIndex((prev) => (prev + 1) % proofImages.length)
    }, 3500)

    return () => {
      clearTimeout(firstNotification)
      clearInterval(notificationInterval)
      clearInterval(chatInterval)
      clearInterval(liveInterval)
      clearInterval(proofInterval)
    }
  }, [])

  // Initialize app
  const initializeApp = async () => {
    const ip = await getClientIP()
    setUserIP(ip)
    if (CONFIG.debug) console.log("Session initialized:", { sessionId, userIP: ip })
    await fetchOGAdsOffers(ip)
  }

  // Get Client IP
  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch("https://api.ipify.org?format=json")
      const data = await response.json()
      return data.ip || "123.45.67.89"
    } catch (error) {
      if (CONFIG.debug) console.error("IP fetch failed:", error)
      return "123.45.67.89"
    }
  }

  // Get Default Instructions Based on Offer Type
  const getDefaultInstructions = (offer: any): string => {
    if (offer.name.toLowerCase().includes("survey")) {
      return "Complete the entire survey with valid information to unlock your content."
    }
    if (offer.device?.toLowerCase().includes("iphone") || offer.device?.toLowerCase().includes("android")) {
      return "Download and install the app, then open it for at least 30 seconds."
    }
    return "Follow all instructions carefully to complete this offer and unlock your content."
  }

  // Build Tracking URL with OGAds Parameters
  const buildTrackingUrl = (offer: any): string => {
    const baseUrl = offer.link
    const params = new URLSearchParams({
      offer_id: offer.offerid.toString(),
      subid: sessionId,
      aff_sub4: sessionId,
      aff_sub5: userIP,
    })
    return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${params.toString()}`
  }

  // Fetch Real OGAds Offers
  const fetchOGAdsOffers = async (ip: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        ip: ip,
        user_agent: navigator.userAgent,
        ctype: CONFIG.offerTypes.toString(),
        max: (CONFIG.requiredTasks * 2).toString(), // Get extra offers for selection
      })

      console.log("🎯 Fetching OGAds offers...", { ip, sessionId })

      const response = await fetch(`${CONFIG.apiEndpoint}?${params}`, {
        headers: {
          Authorization: `Bearer ${CONFIG.apiKey}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (CONFIG.debug) console.log("📦 OGAds API Response:", data)

      if (data.success && data.offers && data.offers.length > 0) {
        const formattedOffers = data.offers.slice(0, CONFIG.requiredTasks * 2).map((offer: any) => ({
          id: offer.offerid,
          title: offer.name_short || offer.name,
          description: offer.adcopy || "Complete this offer to unlock your content",
          reward: `$${offer.payout} Reward`,
          instructions: getDefaultInstructions(offer),
          url: buildTrackingUrl(offer),
          image: offer.picture || "https://cdn.ogads.com/offer_images/default.jpg",
          category: offer.device?.toLowerCase().includes("iphone") ? "ios" : "android",
          payout: Number.parseFloat(offer.payout),
          badge: getBadgeForOffer(offer),
        }))

        setOffers(formattedOffers)
        console.log(`✅ Successfully loaded ${formattedOffers.length} real OGAds offers`)
      } else {
        throw new Error(data.error || "No offers available")
      }
    } catch (error: any) {
      console.error("❌ OGAds fetch failed:", error)
      setError("Failed to load offers. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Get badge for offer
  const getBadgeForOffer = (offer: any): string => {
    if (offer.name.toLowerCase().includes("survey")) return "Easy Offer"
    if (Number.parseFloat(offer.payout) > 0.5) return "Top Conversion"
    return "Hot Offer"
  }

  const generateChatMessage = (): ChatMessage => {
    const user = realRobloxUsers[Math.floor(Math.random() * realRobloxUsers.length)]
    const message = brainrotMessages[Math.floor(Math.random() * brainrotMessages.length)]

    return {
      username: user.username,
      message,
      timeAgo: "Just now",
      avatarUrl: user.avatar,
    }
  }

  const generateChatMessages = (count: number): ChatMessage[] => {
    return Array.from({ length: count }, () => generateChatMessage())
  }

  const handleOfferClick = (offer: OGAdsOffer) => {
    playClickSound()

    console.log(`🎯 User clicked offer: ${offer.title} (ID: ${offer.id})`)
    console.log(`🔗 Tracking URL: ${offer.url}`)

    if (!completedOffers.includes(offer.id)) {
      setCompletedOffers((prev) => {
        const newCompleted = [...prev, offer.id]
        console.log(`✅ Completed offers: ${newCompleted.length}/${CONFIG.requiredTasks}`)

        if (newCompleted.length >= CONFIG.requiredTasks) {
          console.log("🎉 All tasks completed! Redirecting to testervibe.com...")
          setTimeout(() => {
            window.location.href = "https://testervibe.com"
          }, 2000)
        }

        return newCompleted
      })
    }

    window.open(offer.url, "_blank")
  }

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Easy Offer":
        return "bg-green-500"
      case "Top Conversion":
        return "bg-blue-500"
      case "Hot Offer":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-[var(--soft-beige)]">
      <Header onCtaClick={() => {}} playClickSound={playClickSound} />

      {/* Push Notifications with Avatar */}
      {currentNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-40 animate-bounce max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
              <Image
                src={currentNotification.avatar || "/placeholder.svg"}
                alt="User avatar"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">{currentNotification.message}</span>
            </div>
          </div>
        </div>
      )}

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with live count */}
          <div className="text-center mb-10 relative">
            <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              {liveCount} live
            </div>
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full font-bold mb-4 animate-pulse">
              🎉 {username}, Your Garden Grew! 🪴
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--forest-green)] mb-4">
              You Unlocked 10 Final Rewards Below!
            </h1>
            <p className="text-lg md:text-xl text-gray-700">Complete only 2 steps to claim EVERYTHING!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Task Tracker with Real OGAds Offers */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-[var(--forest-green)] mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[var(--forest-green)] text-white rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  Task Tracker: Complete 2 of {offers.length} Real Tasks
                </h2>

                <div className="w-full bg-gray-200 h-3 rounded-full mb-6">
                  <div
                    className="bg-[var(--forest-green)] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(completedOffers.length / CONFIG.requiredTasks) * 100}%` }}
                  ></div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col justify-center items-center py-12">
                    <div className="loading-spinner mb-4"></div>
                    <p className="text-gray-600">🎯 Connecting to OGAds API...</p>
                    <p className="text-sm text-gray-500 mt-2">Loading real offers from content locker...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                      className="flex items-center gap-2 mx-auto bg-[var(--forest-green)] text-white px-6 py-3 rounded-lg hover:bg-[var(--forest-green)]/90 transition-colors"
                      onClick={() => fetchOGAdsOffers(userIP)}
                      onMouseEnter={playClickSound}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Retry OGAds API
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {offers.map((offer) => (
                      <div
                        key={offer.id}
                        className={`border rounded-lg overflow-hidden transition-all ${
                          completedOffers.includes(offer.id)
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-[var(--sunshine-yellow)] hover:shadow-md cursor-pointer"
                        }`}
                        onClick={() => !completedOffers.includes(offer.id) && handleOfferClick(offer)}
                      >
                        <div className="p-4">
                          <div className="flex gap-4 mb-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={offer.image || "/placeholder.svg"}
                                alt={offer.title}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=64&width=64"
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-[var(--forest-green)] text-sm">{offer.title}</h3>
                                {offer.badge && (
                                  <span
                                    className={`text-xs px-2 py-1 rounded-full text-white ${getBadgeColor(offer.badge)}`}
                                  >
                                    {offer.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-600">${offer.payout.toFixed(2)} payout</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-md mb-3">
                            <p className="text-sm text-gray-700">{offer.instructions}</p>
                          </div>

                          <div className="flex justify-end">
                            {completedOffers.includes(offer.id) ? (
                              <div className="flex items-center text-green-600 font-medium">
                                <Check className="w-4 h-4 mr-1" />
                                Completed
                              </div>
                            ) : (
                              <button
                                className="bg-[var(--forest-green)] text-white text-sm px-4 py-2 rounded-lg hover:bg-[var(--forest-green)]/90 transition-colors flex items-center gap-1"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOfferClick(offer)
                                }}
                                onMouseEnter={playClickSound}
                              >
                                Complete Task
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 text-center">
                  <div
                    className={`inline-block px-6 py-3 rounded-lg font-bold ${
                      completedOffers.length >= CONFIG.requiredTasks
                        ? "bg-[var(--forest-green)] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {completedOffers.length >= CONFIG.requiredTasks
                      ? "✅ All Tasks Completed! Redirecting..."
                      : `🔒 Complete ${CONFIG.requiredTasks - completedOffers.length} more task${completedOffers.length === CONFIG.requiredTasks - 1 ? "" : "s"} to unlock`}
                  </div>
                </div>
              </div>

              {/* Having Trouble Video */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[var(--forest-green)] mb-4">Having Trouble? Watch This!</h3>
                <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/CDG_y0nR3Qg"
                    title="How to complete offers"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* Proof Section */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[var(--forest-green)] mb-4 text-center">
                  And no we're not joking, here is proof of y'all
                </h3>
                <div className="flex justify-center">
                  <Image
                    src={proofImages[currentProofIndex] || "/placeholder.svg"}
                    alt="Proof screenshot"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[var(--forest-green)] mb-4">FAQ</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Q1: Will this work on my Roblox account?</p>
                    <p className="text-gray-600">➡️ Yes! All Roblox accounts are eligible for Grow Garden events!</p>
                  </div>
                  <div>
                    <p className="font-medium">Q2: Is this really free?</p>
                    <p className="text-gray-600">➡️ Yes, just complete one simple quest (takes 30–60 seconds).</p>
                  </div>
                  <div>
                    <p className="font-medium">Q3: Do I need to log in?</p>
                    <p className="text-gray-600">➡️ No login required! Just enter your username.</p>
                  </div>
                  <div>
                    <p className="font-medium">Q4: Why do I have to complete a quest?</p>
                    <p className="text-gray-600">
                      ➡️ Quests help keep the items exclusive and prevent bots from abusing the system.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Q5: Why didn't I receive the item?</p>
                    <p className="text-gray-600">
                      ➡️ You may have exited too early or didn't complete the quest fully. Retry now!
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[var(--forest-green)] mb-2">
                    🔥 {completedToday} offers completed today!
                  </h3>
                  <p className="text-gray-600">Last update: {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Selected Pet */}
              <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
                <h2 className="text-xl font-bold text-[var(--forest-green)] mb-4">Your Selected Pet</h2>
                <div className="bg-[var(--soft-beige)] rounded-lg p-4 flex flex-col items-center">
                  <div className="relative">
                    <Image
                      src={petImages[Math.min(petId - 1, petImages.length - 1)] || petImages[0]}
                      alt={petNames[Math.min(petId - 1, petNames.length - 1)] || petNames[0]}
                      width={150}
                      height={150}
                      className="w-full h-auto rounded-lg border-4 border-[var(--sunshine-yellow)] shadow-lg mb-4 animate-pulse"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg animate-pulse"></div>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--forest-green)]">
                    {petNames[Math.min(petId - 1, petNames.length - 1)] || petNames[0]} Pet
                  </h3>
                  <div className="text-sm text-gray-500 mb-2">Exclusive Grow a Garden Item</div>
                  <div className="flex items-center gap-1 text-amber-600 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Limited time offer</span>
                  </div>
                </div>
              </div>

              {/* Live Chat */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-[var(--forest-green)] mb-4 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  Live Chat
                </h2>

                <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-2 mb-4 text-sm text-center">
                  🔒 Need to complete at least two offers to unlock the chat
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-2 ${i === 0 ? "animate-highlight" : ""}`}>
                      <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={msg.avatarUrl || "/placeholder.svg"}
                          alt="User avatar"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{msg.username}</span>
                          <span className="text-xs text-gray-500">{msg.timeAgo}</span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
