"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface VideoSectionProps {
  onCtaClick: () => void
  playClickSound: () => void
}

export default function VideoSection({ onCtaClick, playClickSound }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    playClickSound()
    setIsPlaying(true)
    // In a real implementation, you would play the video here
    alert("Video player would launch here showing the process!")
    setIsPlaying(false)
  }

  return (
    <section className="py-16 bg-[var(--soft-beige)]">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[var(--forest-green)]">See It In Action</h2>

        <div className="max-w-2xl mx-auto bg-[var(--text-dark)] rounded-xl overflow-hidden shadow-xl">
          <div
            className="relative w-full aspect-video bg-gradient-to-br from-[var(--forest-green)] to-[var(--sky-blue)] flex items-center justify-center cursor-pointer"
            onClick={handlePlayClick}
          >
            <Image
              src="https://aldi.today/photo/thumbnail.jpeg"
              alt="Video thumbnail"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[var(--sunshine-yellow)] rounded-full flex items-center justify-center shadow-lg z-10 hover:scale-110 transition-transform">
              <Play className="w-8 h-8 md:w-10 md:h-10 text-[var(--forest-green)] ml-1" />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4 text-[var(--forest-green)]">
            People already getting raccoons, why not you?
          </h3>
          <button className="cta-button-shake" onClick={onCtaClick} onMouseEnter={playClickSound}>
            Start Now!
          </button>
        </div>
      </div>
    </section>
  )
}
