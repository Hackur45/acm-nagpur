"use client"

import { type FC, useState, useEffect } from "react"
import Image from "next/image"
import { CalendarDays } from "lucide-react"

interface MemberCardProps {
  name: string
  role: string
  title: string
  company: string
  experience: string
  description: string
  avatarUrl?: string
  linkedin?: string
}

const InfoDisplay: FC<MemberCardProps> = ({ name, role, title, company, experience, description, avatarUrl, linkedin }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const generateQRCode = (url: string) => {
    return `https://quickchart.io/qr?text=${encodeURIComponent(url)}&size=150`
  }

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all duration-700 ease-in-out hover:shadow-xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Section: Avatar and Info */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start space-y-4">
          <div className="h-32 w-32 overflow-hidden rounded-2xl border-2 border-gray-100 bg-gray-50 shadow-sm">
            {avatarUrl ? (
              <Image
                src={avatarUrl || "/placeholder.svg"}
                alt={name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-light text-gray-400">
                {name?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
            <p className="text-base text-gray-600">
              {title} @ <span className="font-medium">{company}</span>
            </p>
            <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {role}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>{experience}</span>
          </div>
        </div>

        {/* Right Section: LinkedIn + Description */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          {linkedin ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800">Connect on LinkedIn</h2>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {linkedin}
              </a>
              <Image
                src={generateQRCode(linkedin)}
                alt="LinkedIn QR Code"
                width={150}
                height={150}
                className="rounded-lg shadow-md"
              />
            </>
          ) : (
            <p className="text-gray-500">No LinkedIn profile available.</p>
          )}

          {/* Description below LinkedIn details */}
          <p className="text-lg leading-relaxed text-gray-700 px-4">{description}</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gray-50 opacity-50"></div>
      <div className="absolute -top-10 -left-10 h-24 w-24 rounded-full bg-blue-50 opacity-30"></div>
    </div>
  )
}

export default InfoDisplay
