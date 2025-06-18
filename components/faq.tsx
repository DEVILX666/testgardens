"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

interface FaqProps {
  onCtaClick: () => void
  playClickSound: () => void
}

const faqItems: FaqItem[] = [
  {
    question: "Will this work on my Roblox account?",
    answer: "Yes! All Roblox accounts are eligible for Grow Garden events!",
  },
  {
    question: "Is this really free?",
    answer: "Yes, just complete one simple quest (takes 30–60 seconds).",
  },
  {
    question: "Do I need to log in?",
    answer: "No login required! Just enter your username.",
  },
  {
    question: "Why do I have to complete a quest?",
    answer: "Quests help keep the items exclusive and prevent bots from abusing the system.",
  },
  {
    question: "Why didn't I receive the item?",
    answer: "You may have exited too early or didn't complete the quest fully. Retry now!",
  },
]

export default function Faq({ onCtaClick, playClickSound }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    playClickSound()
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--forest-green)]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <span>{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[var(--forest-green)]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[var(--forest-green)]" />
                )}
              </button>

              <div className={`px-4 pb-4 ${openIndex === index ? "block" : "hidden"}`}>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-[var(--forest-green)]/10 px-4 py-2 rounded-full text-[var(--forest-green)] font-bold mb-4">
            Redeem Streak: 102 pets claimed in the last hour!
          </div>
          <button className="cta-button-neon" onClick={onCtaClick} onMouseEnter={playClickSound}>
            Start Now
          </button>
        </div>
      </div>
    </section>
  )
}
