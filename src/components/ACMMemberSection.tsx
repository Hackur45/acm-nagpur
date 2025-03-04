"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, ExternalLink } from "lucide-react"

// Define the type for a member
interface Member {
  id: number
  name: string
  profession: string
  organization: string
  designation: string
  image: string
  linkedin?: string
  website?: string
}

// Sample data - replace with your actual data
const sampleMembers: Member[] = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    profession: "AI Researcher",
    organization: "Stanford University",
    designation: "Associate Professor",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  {
    id: 2,
    name: "Alex Johnson",
    profession: "Software Architect",
    organization: "Google",
    designation: "Principal Engineer",
    image: "/placeholder.svg?height=400&width=400",
    website: "https://alexjohnson.dev",
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    profession: "Computer Scientist",
    organization: "MIT",
    designation: "Research Director",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "https://linkedin.com/in/michaelchen",
  },
  {
    id: 4,
    name: "Sarah Williams",
    profession: "Cybersecurity Expert",
    organization: "Microsoft",
    designation: "Security Lead",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "https://linkedin.com/in/sarahwilliams",
    website: "https://sarahwilliams.tech",
  },
  {
    id: 5,
    name: "Robert Taylor",
    profession: "Data Scientist",
    organization: "Amazon",
    designation: "Senior Data Scientist",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 6,
    name: "Emily Davis",
    profession: "UX Researcher",
    organization: "Apple",
    designation: "Design Director",
    image: "/placeholder.svg?height=400&width=400",
    linkedin: "https://linkedin.com/in/emilydavis",
  },
]

export default function ACMMembersSection() {
  const [members, setMembers] = useState<Member[]>([])

  // Simulate loading data
  useEffect(() => {
    setMembers(sampleMembers)
  }, [])

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-black to-slate-900 text-white overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-slate-900/0 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors duration-300">
              ACM Community
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              Meet Our Distinguished Members
            </h2>
            <p className="max-w-[800px] text-slate-300 md:text-xl/relaxed">
              Connecting the brightest minds in computing to advance the profession and make a positive impact.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="overflow-hidden bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-blue-500/50 transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex justify-between items-center">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Linkedin className="h-5 w-5" />
                            </a>
                          )}
                          {member.website && (
                            <a
                              href={member.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-slate-300 font-medium">{member.profession}</p>
                      <div className="mt-2 flex flex-col">
                        <span className="text-sm text-slate-400">{member.organization}</span>
                        <span className="text-sm text-slate-500">{member.designation}</span>
                      </div>
                    </motion.div>
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-violet-500 w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

