"use client"

import Image from "next/image"

interface MemeSectionProps {
  onCtaClick: () => void
  playClickSound: () => void
}

export default function MemeSection({ onCtaClick, playClickSound }: MemeSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--forest-green)]">
          Why Pay When You Can Get It Free?
        </h2>

        <div className="bg-gray-100 rounded-xl p-4 shadow-md">
          <Image
            src="https://aldi.today/photo/meme.png"
            alt="Funny meme about free Grow a Garden pets"
            width={600}
            height={400}
            className="w-full h-auto rounded-lg mb-4"
          />

          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
              <button className="text-red-500 hover:text-red-600">❤️ 1.2k</button>
              <button className="text-gray-500 hover:text-gray-600">💬 243</button>
            </div>
            <button className="text-gray-500 hover:text-gray-600">🔄 Share</button>
          </div>

          <div className="mt-4 border-t pt-4 text-left">
            <div className="flex items-start gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden shrink-0">
                <Image src="/placeholder.svg?height=32&width=32" alt="User avatar" width={32} height={32} />
              </div>
              <div>
                <div className="font-bold">RobloxGirl2023</div>
                <p>LMAOO this is so true! just got my raccoon 😂</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden shrink-0">
                <Image src="/placeholder.svg?height=32&width=32" alt="User avatar" width={32} height={32} />
              </div>
              <div>
                <div className="font-bold">GamerBoy2010</div>
                <p>Why didn't I find this earlier?? 🤦‍♂️</p>
              </div>
            </div>
          </div>
        </div>

        <button className="cta-button-pulse mt-8" onClick={onCtaClick} onMouseEnter={playClickSound}>
          Get Free Pets Now
        </button>
      </div>
    </section>
  )
}
