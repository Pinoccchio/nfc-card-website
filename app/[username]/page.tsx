import type React from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Globe,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Github,
  Youtube,
  Music,
  Dribbble,
  Figma,
  Twitch,
  MessageCircle,
  Smartphone,
} from "lucide-react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Function to get icon component by platform ID
const getPlatformIcon = (platformId: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    twitter: <Twitter className="h-6 w-6 text-primary" />,
    instagram: <Instagram className="h-6 w-6 text-primary" />,
    facebook: <Facebook className="h-6 w-6 text-primary" />,
    linkedin: <Linkedin className="h-6 w-6 text-primary" />,
    github: <Github className="h-6 w-6 text-primary" />,
    youtube: <Youtube className="h-6 w-6 text-primary" />,
    tiktok: <Music className="h-6 w-6 text-primary" />,
    dribbble: <Dribbble className="h-6 w-6 text-primary" />,
    behance: <Figma className="h-6 w-6 text-primary" />,
    medium: <MessageCircle className="h-6 w-6 text-primary" />,
    twitch: <Twitch className="h-6 w-6 text-primary" />,
    discord: <MessageCircle className="h-6 w-6 text-primary" />,
    website: <Globe className="h-6 w-6 text-primary" />,
    email: <Mail className="h-6 w-6 text-primary" />,
    whatsapp: <Phone className="h-6 w-6 text-primary" />,
    telegram: <MessageCircle className="h-6 w-6 text-primary" />,
  }

  return iconMap[platformId] || <Globe className="h-6 w-6 text-primary" />
}

interface ProfilePageProps {
  params: {
    username: string
  }
}

export const revalidate = 0 // Disable caching for this page

export default async function ProfilePage({ params }: ProfilePageProps) {
  // Create a Supabase client with server component client
  const supabase = createServerComponentClient({ cookies })

  // Try to find user by username - without requiring authentication
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*, social_links(*), custom_links(*)")
    .eq("username", params.username)
    .single()

  // If no profile is found, show 404
  if (error || !profile) {
    console.error("Profile not found:", error)
    notFound()
  }

  // Track profile view (optional)
  try {
    await supabase.from("profile_views").insert({
      profile_id: profile.id,
      viewed_at: new Date().toISOString(),
    })
  } catch (viewError) {
    // Silently fail if view tracking fails - don't block the page render
    console.error("Failed to track view:", viewError)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-primary/10 via-background to-background p-4">
      <div className="container max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-background bg-background shadow-lg">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url || "/placeholder.svg"}
                alt={`${profile.first_name} ${profile.last_name}`}
                width={128}
                height={128}
                className="h-full w-full object-cover"
                unoptimized // Add this to avoid Next.js image optimization issues with Supabase URLs
              />
            ) : (
              <Image
                src="/diverse-professional-profiles.png"
                alt={`${profile.first_name} ${profile.last_name}`}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <h1 className="text-2xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h1>
          <p className="text-muted-foreground">{profile.bio}</p>
          {profile.location && (
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {profile.location}
            </div>
          )}
        </div>

        {profile.social_links && profile.social_links.length > 0 && (
          <div className="mb-8 grid grid-cols-4 gap-4">
            {profile.social_links.map((social: any) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shadow-sm transition-transform hover:scale-110">
                  {getPlatformIcon(social.platform)}
                </div>
                <span className="mt-1 text-xs">{social.display_name || social.platform}</span>
              </a>
            ))}
          </div>
        )}

        {profile.custom_links && profile.custom_links.length > 0 && (
          <div className="mb-8 space-y-3">
            {profile.custom_links.map((link: any) => (
              <a
                key={link.id}
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
        )}

        <div className="mb-8 space-y-3">
          {profile.email && (
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Mail className="mr-3 h-5 w-5 text-gray-500" />
                  <span>{profile.email}</span>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <a href={`mailto:${profile.email}`}>Contact</a>
                </Button>
              </CardContent>
            </Card>
          )}

          {profile.phone && (
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <Phone className="mr-3 h-5 w-5 text-gray-500" />
                  <span>{profile.phone}</span>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <a href={`tel:${profile.phone}`}>Call</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <Smartphone className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">
              Powered by <span className="font-semibold text-primary">TapLink</span> |{" "}
              <span className="font-medium">NFC Card</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
