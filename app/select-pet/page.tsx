"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowRight, Clock, Check } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface Pet {
  id: number
  name: string
  image: string
  tag: string
  remaining: number
  popularity: number
  available: boolean
}

const pets: Pet[] = [
  {
    id: 1,
    name: "Raccoon Pet",
    image: "https://aldi.today/photo/raccoon.jpg",
    tag: "Most Claimed",
    remaining: 17,
    popularity: 82,
    available: true,
  },
  {
    id: 2,
    name: "Dragonfly Pet",
    image: "https://aldi.today/photo/dragonfly.jpg",
    tag: "VIP Exclusive",
    remaining: 9,
    popularity: 76,
    available: true,
  },
  {
    id: 3,
    name: "Red Fox Pet",
    image: "https://aldi.today/photo/redfox.jpg",
    tag: "Rare",
    remaining: 12,
    popularity: 68,
    available: true,
  },
  {
    id: 4,
    name: "Owl Pet",
    image: "https://aldi.today/photo/theowl.jpg",
    tag: "SOLD OUT",
    remaining: 0,
    popularity: 91,
    available: false,
  },
]

export default function SelectPetPage() {
  const searchParams = useSearchParams()
  const username = searchParams.get("username") || "Player"
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const treasureSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio elements
    clickSoundRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3")
    treasureSoundRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3")

    // Create dragonfly background elements
    const container = document.querySelector("body")
    if (container) {
      const positions = [
        { top: "10%", left: "5%", delay: "0s" },
        { top: "30%", left: "80%", delay: "3s" },
        { top: "70%", left: "15%", delay: "6s" },
      ]

      positions.forEach((pos) => {
        const dragonfly = document.createElement("div")
        dragonfly.className = "dragonfly-bg"
        dragonfly.style.top = pos.top
        dragonfly.style.left = pos.left
        dragonfly.style.animationDelay = pos.delay
        container.appendChild(dragonfly)
      })
    }

    // Countdown timer
    if (showConfirm) {
      const timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          clearInterval(timer)
        }
      }, 1000)

      return () => clearInterval(timer)
    }

    return () => {
      // Remove dragonfly elements
      document.querySelectorAll(".dragonfly-bg").forEach((el) => el.remove())
    }
  }, [showConfirm, minutes, seconds])

  const playClickSound = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const playTreasureSound = () => {
    if (treasureSoundRef.current) {
      treasureSoundRef.current.currentTime = 0
      treasureSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const handleSelectPet = (pet: Pet) => {
    playTreasureSound()
    setSelectedPet(pet)
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    playClickSound()
    // Redirect to the locker link
    window.location.href = "https://installchecker.site/cl/i/1onk5k"
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--soft-beige)] to-amber-50">
      <Header onCtaClick={() => {}} playClickSound={playClickSound} />

      <section className="py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--forest-green)] mb-4">
              🌱 Welcome back, <span className="text-[var(--earth-brown)]">{username}</span>!
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              Your garden is almost complete. Choose your FREE item below to continue.
            </p>
          </div>

          {!showConfirm ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  className={`bg-white rounded-xl overflow-hidden shadow-lg border-2 transition-all ${
                    !pet.available
                      ? "border-gray-300 opacity-60 cursor-not-allowed"
                      : "border-transparent hover:border-[var(--sunshine-yellow)] hover:-translate-y-1 cursor-pointer group"
                  }`}
                  onClick={() => pet.available && handleSelectPet(pet)}
                  onMouseEnter={pet.available ? playClickSound : undefined}
                >
                  <div className="relative">
                    <Image
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      width={500}
                      height={300}
                      className={`w-full h-48 object-cover transition-transform ${
                        pet.available ? "group-hover:scale-105" : "grayscale"
                      }`}
                    />
                    <div
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-bold ${
                        pet.tag === "Most Claimed"
                          ? "bg-green-500 text-white"
                          : pet.tag === "VIP Exclusive"
                            ? "bg-purple-500 text-white"
                            : pet.tag === "Rare"
                              ? "bg-orange-500 text-white"
                              : "bg-gray-500 text-white"
                      }`}
                    >
                      {pet.tag}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[var(--forest-green)] mb-2">{pet.name}</h3>
                    {pet.available ? (
                      <>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-500">Only {pet.remaining} left</span>
                          <span className="text-sm text-gray-500">{pet.popularity}% of players chose this</span>
                        </div>
                        <button className="w-full bg-[var(--forest-green)] text-white py-3 rounded-lg font-bold hover:bg-[var(--forest-green)]/90 transition-colors flex items-center justify-center gap-2">
                          Select
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-center mb-3">
                          <span className="text-red-500 font-bold">SOLD OUT</span>
                          <p className="text-sm text-gray-500 mt-1">Please come back tomorrow!</p>
                        </div>
                        <button
                          disabled
                          className="w-full bg-gray-400 text-white py-3 rounded-lg font-bold cursor-not-allowed"
                        >
                          Unavailable
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl border-2 border-[var(--sunshine-yellow)]">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3">
                  <Image
                    src={selectedPet?.image || ""}
                    alt={selectedPet?.name || ""}
                    width={300}
                    height={300}
                    className="w-full h-auto rounded-lg border-4 border-[var(--sunshine-yellow)] shadow-lg"
                  />
                </div>

                <div className="w-full md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--forest-green)] mb-4">
                    Great choice, {username}!
                  </h2>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Username verified</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Item selected: {selectedPet?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      </div>
                      <span className="font-medium text-gray-500">Complete quest to claim</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
                    <div className="bg-[var(--forest-green)] h-2 rounded-full" style={{ width: "66%" }}></div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-amber-600">
                      <Clock className="w-5 h-5" />
                      <span>
                        Item reserved for {minutes}:{seconds.toString().padStart(2, "0")} minutes
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">Only {selectedPet?.remaining} left</div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-[var(--forest-green)] to-[var(--sky-blue)] text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all"
                    onClick={handleConfirm}
                    onMouseEnter={playClickSound}
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
