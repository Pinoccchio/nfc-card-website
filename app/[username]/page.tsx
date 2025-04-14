import Link from "next/link"
import { notFound } from "next/navigation"
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// This would typically come from a database
const mockUsers = [
  {
    username: "johndoe",
    name: "John Doe",
    bio: "Digital Creator & Web Developer",
    location: "San Francisco, CA",
    avatar: "/thoughtful-student.png",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    socials: [
      { name: "Twitter", url: "https://twitter.com", icon: "Twitter" },
      { name: "Instagram", url: "https://instagram.com", icon: "Instagram" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
      { name: "GitHub", url: "https://github.com", icon: "Github" },
      { name: "YouTube", url: "https://youtube.com", icon: "Youtube" },
      { name: "Dribbble", url: "https://dribbble.com", icon: "Dribbble" },
      { name: "Facebook", url: "https://facebook.com", icon: "Facebook" },
      { name: "TikTok", url: "https://tiktok.com", icon: "TikTok" },
    ],
    links: [
      { title: "My Portfolio", url: "https://example.com/portfolio" },
      { title: "My Blog", url: "https://example.com/blog" },
    ],
  },
]

interface ProfilePageProps {
  params: {
    username: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = mockUsers.find((u) => u.username === params.username)

  if (!user) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-primary/10 via-background to-background p-4">
      <div className="container max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-background bg-background shadow-lg">
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-full w-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.bio}</p>
          {user.location && (
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {user.location}
            </div>
          )}
        </div>

        <div className="mb-8 grid grid-cols-4 gap-4">
          {user.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 shadow-sm transition-transform hover:scale-110">
                <div className="h-6 w-6 rounded-full bg-gray-600" />
              </div>
              <span className="mt-1 text-xs">{social.name}</span>
            </a>
          ))}
        </div>

        <div className="mb-8 space-y-3">
          {user.links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-between rounded-lg bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
            >
              <span className="font-medium">{link.title}</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </a>
          ))}
        </div>

        <div className="mb-8 space-y-3">
          {user.email && (
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <a href={`mailto:${user.email}`}>Contact</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {user.phone && (
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-gray-500" />
                  <span>{user.phone}</span>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <a href={`tel:${user.phone}`}>Call</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mb-8 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold">TapLink</span>
          </p>
          <Link href="/" className="text-sm text-primary hover:underline">
            Create your own profile
          </Link>
        </div>
      </div>
    </div>
  )
}
