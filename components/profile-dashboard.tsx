"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  ExternalLink,
  Eye,
  Globe,
  ImagePlus,
  LinkIcon,
  MapPin,
  Plus,
  Save,
  Smartphone,
  Trash2,
  User,
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
  Mail,
  Phone,
} from "lucide-react"

import { createClientSupabaseClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { WEBSITE_DOMAIN, WEBSITE_PROTOCOL } from "@/lib/constants"

// Social platform options with icons
const SOCIAL_PLATFORMS = [
  { id: "twitter", name: "Twitter", icon: "Twitter" },
  { id: "instagram", name: "Instagram", icon: "Instagram" },
  { id: "facebook", name: "Facebook", icon: "Facebook" },
  { id: "linkedin", name: "LinkedIn", icon: "Linkedin" },
  { id: "github", name: "GitHub", icon: "Github" },
  { id: "youtube", name: "YouTube", icon: "Youtube" },
  { id: "tiktok", name: "TikTok", icon: "Music" },
  { id: "dribbble", name: "Dribbble", icon: "Dribbble" },
  { id: "behance", name: "Behance", icon: "Figma" },
  { id: "medium", name: "Medium", icon: "MessageCircle" },
  { id: "pinterest", name: "Pinterest", icon: "Globe" },
  { id: "snapchat", name: "Snapchat", icon: "Globe" },
  { id: "twitch", name: "Twitch", icon: "Twitch" },
  { id: "discord", name: "Discord", icon: "MessageCircle" },
  { id: "reddit", name: "Reddit", icon: "Globe" },
  { id: "whatsapp", name: "WhatsApp", icon: "Phone" },
  { id: "telegram", name: "Telegram", icon: "MessageCircle" },
  { id: "email", name: "Email", icon: "Mail" },
  { id: "website", name: "Website", icon: "Globe" },
  { id: "other", name: "Other", icon: "Globe" },
]

// Function to get icon component by name
const getIconByName = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Twitter: <Twitter className="h-4 w-4 text-primary" />,
    Instagram: <Instagram className="h-4 w-4 text-primary" />,
    Facebook: <Facebook className="h-4 w-4 text-primary" />,
    Linkedin: <Linkedin className="h-4 w-4 text-primary" />,
    Github: <Github className="h-4 w-4 text-primary" />,
    Youtube: <Youtube className="h-4 w-4 text-primary" />,
    Music: <Music className="h-4 w-4 text-primary" />,
    Dribbble: <Dribbble className="h-4 w-4 text-primary" />,
    Figma: <Figma className="h-4 w-4 text-primary" />,
    Twitch: <Twitch className="h-4 w-4 text-primary" />,
    MessageCircle: <MessageCircle className="h-4 w-4 text-primary" />,
    Mail: <Mail className="h-4 w-4 text-primary" />,
    Phone: <Phone className="h-4 w-4 text-primary" />,
    Globe: <Globe className="h-4 w-4 text-primary" />,
  }

  return iconMap[iconName] || <Globe className="h-4 w-4 text-primary" />
}

interface ProfileDashboardProps {
  profile: any
  socialLinks: any[]
  customLinks: any[]
}

export default function ProfileDashboardSimplified({
  profile,
  socialLinks = [],
  customLinks = [],
}: ProfileDashboardProps) {
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  // Profile state
  const [firstName, setFirstName] = useState(profile.first_name || "")
  const [lastName, setLastName] = useState(profile.last_name || "")
  const [bio, setBio] = useState(profile.bio || "")
  const [location, setLocation] = useState(profile.location || "")
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "")
  const [username, setUsername] = useState(profile.username || "")
  const [phone, setPhone] = useState(profile.phone || "")

  // Links state
  const [userSocialLinks, setUserSocialLinks] = useState(socialLinks)
  const [userCustomLinks, setUserCustomLinks] = useState(customLinks)

  // New link states
  const [newSocialPlatform, setNewSocialPlatform] = useState("")
  const [newSocialUrl, setNewSocialUrl] = useState("")
  const [newSocialDisplayName, setNewSocialDisplayName] = useState("")

  const [newCustomTitle, setNewCustomTitle] = useState("")
  const [newCustomUrl, setNewCustomUrl] = useState("")

  // Get current user
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [supabase])

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      setLoading(true)
      setError("")
      setSuccess("")

      if (!user) return

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          bio,
          location,
          avatar_url: avatarUrl,
          username,
          phone,
        })
        .eq("id", user.id)

      if (error) throw error

      setSuccess("Profile updated successfully!")
      setTimeout(() => setSuccess(""), 3000)

      // Refresh the page to get updated data
      router.refresh()
    } catch (error: any) {
      setError(error.message || "Error updating profile")
    } finally {
      setLoading(false)
    }
  }

  // Handle avatar upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      setError("")

      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      const file = event.target.files[0]
      const fileExt = file.name.split(".").pop()
      // Create a unique file name to avoid collisions
      const fileName = `avatar-${Date.now()}.${fileExt}`

      // Important: Make sure the path follows the structure your RLS policies expect
      // Most commonly, this would be just the user ID as the path
      const filePath = `${user.id}/${fileName}`

      console.log("Uploading to path:", filePath)

      // Upload file to Supabase Storage using your bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("user-profile-pictures")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        })

      if (uploadError) {
        console.error("Upload error details:", uploadError)
        throw uploadError
      }

      console.log("Upload successful:", uploadData)

      // Get public URL
      const { data } = supabase.storage.from("user-profile-pictures").getPublicUrl(filePath)

      console.log("Public URL:", data.publicUrl)

      // Update avatar URL
      setAvatarUrl(data.publicUrl)

      // Immediately update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          avatar_url: data.publicUrl,
        })
        .eq("id", user.id)

      if (updateError) {
        console.error("Profile update error:", updateError)
        throw updateError
      }

      setSuccess("Profile picture updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error: any) {
      console.error("Full error:", error)
      setError(error.message || "Error uploading profile picture")
    } finally {
      setLoading(false)
    }
  }

  // Get platform icon
  const getPlatformIcon = (platformId: string) => {
    const platform = SOCIAL_PLATFORMS.find((p) => p.id === platformId)
    return platform ? getIconByName(platform.icon) : <Globe className="h-4 w-4 text-primary" />
  }

  // Handle adding a new social link
  const handleAddSocialLink = async () => {
    try {
      setLoading(true)
      setError("")

      if (!newSocialPlatform || !newSocialUrl) {
        setError("Please select a platform and enter a URL")
        return
      }

      const { data, error } = await supabase
        .from("social_links")
        .insert({
          user_id: user.id,
          platform: newSocialPlatform,
          url: newSocialUrl,
          display_name: newSocialDisplayName,
        })
        .select()

      if (error) throw error

      // Update local state
      setUserSocialLinks([...userSocialLinks, data[0]])

      // Reset form
      setNewSocialPlatform("")
      setNewSocialUrl("")
      setNewSocialDisplayName("")

      setSuccess("Social link added successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error: any) {
      setError(error.message || "Error adding social link")
    } finally {
      setLoading(false)
    }
  }

  // Handle adding a new custom link
  const handleAddCustomLink = async () => {
    try {
      setLoading(true)
      setError("")

      if (!newCustomTitle || !newCustomUrl) {
        setError("Please enter a title and URL")
        return
      }

      const { data, error } = await supabase
        .from("custom_links")
        .insert({
          user_id: user.id,
          title: newCustomTitle,
          url: newCustomUrl,
        })
        .select()

      if (error) throw error

      // Update local state
      setUserCustomLinks([...userCustomLinks, data[0]])

      // Reset form
      setNewCustomTitle("")
      setNewCustomUrl("")

      setSuccess("Custom link added successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error: any) {
      setError(error.message || "Error adding custom link")
    } finally {
      setLoading(false)
    }
  }

  // Handle deleting a social link
  const handleDeleteSocialLink = async (id: string) => {
    try {
      setLoading(true)
      setError("")

      const { error } = await supabase.from("social_links").delete().eq("id", id)

      if (error) throw error

      // Update local state
      setUserSocialLinks(userSocialLinks.filter((link) => link.id !== id))

      setSuccess("Social link deleted successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error: any) {
      setError(error.message || "Error deleting social link")
    } finally {
      setLoading(false)
    }
  }

  // Handle deleting a custom link
  const handleDeleteCustomLink = async (id: string) => {
    try {
      setLoading(true)
      setError("")

      const { error } = await supabase.from("custom_links").delete().eq("id", id)

      if (error) throw error

      // Update local state
      setUserCustomLinks(userCustomLinks.filter((link) => link.id !== id))

      setSuccess("Custom link deleted successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (error: any) {
      setError(error.message || "Error deleting custom link")
    } finally {
      setLoading(false)
    }
  }

  // Generate profile URL
  const profileUrl = username ? `/${username}` : `/user/${user?.id}`
  const fullProfileUrl = `${WEBSITE_PROTOCOL}://${WEBSITE_DOMAIN}${profileUrl}`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6" />
            <span className="text-xl font-bold">TapLink</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-muted-foreground">Customize your profile and manage your links</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={profileUrl} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Link>
              </Button>
              <Button size="sm" onClick={handleUpdateProfile} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>

          {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">{error}</div>}

          {success && <div className="mb-4 p-3 bg-green-500/10 text-green-500 rounded-md">{success}</div>}

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Tabs defaultValue="profile">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="social">Social Links</TabsTrigger>
                  <TabsTrigger value="custom">Custom Links</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Update your profile information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <div className="flex items-center">
                          <span className="mr-2 text-sm text-muted-foreground">{WEBSITE_DOMAIN}/</span>
                          <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="your-username"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell us about yourself"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="City, Country"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+639123456789"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Social Media Links</CardTitle>
                      <CardDescription>Connect your social media accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {userSocialLinks.length > 0 ? (
                        <div className="space-y-3">
                          {userSocialLinks.map((link) => (
                            <div key={link.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                  {getPlatformIcon(link.platform)}
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {SOCIAL_PLATFORMS.find((p) => p.id === link.platform)?.name || link.platform}
                                  </p>
                                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                                    {link.display_name || link.url}
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteSocialLink(link.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">No social links added yet</div>
                      )}

                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-3">Add New Social Link</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label htmlFor="platform">Platform</Label>
                            <select
                              id="platform"
                              value={newSocialPlatform}
                              onChange={(e) => setNewSocialPlatform(e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                              <option value="">Select platform</option>
                              {SOCIAL_PLATFORMS.map((platform) => (
                                <option key={platform.id} value={platform.id}>
                                  {platform.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="display-name">Display Name (Optional)</Label>
                            <Input
                              id="display-name"
                              value={newSocialDisplayName}
                              onChange={(e) => setNewSocialDisplayName(e.target.value)}
                              placeholder="@username"
                            />
                          </div>
                        </div>

                        <div className="mt-3 space-y-2">
                          <Label htmlFor="social-url">URL</Label>
                          <div className="flex gap-2">
                            <Input
                              id="social-url"
                              value={newSocialUrl}
                              onChange={(e) => setNewSocialUrl(e.target.value)}
                              placeholder="https://..."
                            />
                            <Button onClick={handleAddSocialLink} disabled={loading}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="custom" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Links</CardTitle>
                      <CardDescription>Add custom links to your profile</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {userCustomLinks.length > 0 ? (
                        <div className="space-y-3">
                          {userCustomLinks.map((link) => (
                            <div key={link.id} className="flex items-center justify-between p-3 border rounded-md">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                  <LinkIcon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{link.title}</p>
                                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">{link.url}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteCustomLink(link.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">No custom links added yet</div>
                      )}

                      <div className="pt-4 border-t">
                        <h3 className="font-medium mb-3">Add New Custom Link</h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="link-title">Title</Label>
                            <Input
                              id="link-title"
                              value={newCustomTitle}
                              onChange={(e) => setNewCustomTitle(e.target.value)}
                              placeholder="My Website"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="link-url">URL</Label>
                            <div className="flex gap-2">
                              <Input
                                id="link-url"
                                value={newCustomUrl}
                                onChange={(e) => setNewCustomUrl(e.target.value)}
                                placeholder="https://..."
                              />
                              <Button onClick={handleAddCustomLink} disabled={loading}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Profile Preview</h2>
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-b from-primary/20 to-background h-24"></div>
                <div className="relative px-4">
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full border-4 border-background overflow-hidden bg-muted">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl || "/placeholder.svg"}
                            alt="Profile"
                            width={96}
                            height={96}
                            className="object-cover h-full w-full"
                            unoptimized // Add this to avoid Next.js image optimization issues with Supabase URLs
                          />
                        ) : (
                          <User className="h-12 w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
                        )}
                      </div>
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center cursor-pointer"
                      >
                        <ImagePlus className="h-4 w-4 text-primary-foreground" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleAvatarUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <CardContent className="pt-16 text-center">
                  <h3 className="text-xl font-bold">
                    {firstName || lastName ? `${firstName} ${lastName}` : "Your Name"}
                  </h3>
                  <p className="text-muted-foreground mt-1">{bio || "Your bio will appear here"}</p>
                  {location && (
                    <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {location}
                    </div>
                  )}
                  {phone && (
                    <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3 mr-1" />
                      {phone}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col gap-3 border-t pt-4">
                  <div className="w-full">
                    <p className="text-sm font-medium mb-2">Your profile link:</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 truncate bg-muted p-2 rounded-md text-sm">{fullProfileUrl}</div>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={fullProfileUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>

              {/* Social Media Icons Preview */}
              {userSocialLinks.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base">Social Media Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {userSocialLinks.map((link) => (
                        <div key={link.id} className="flex flex-col items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                            {getPlatformIcon(link.platform)}
                          </div>
                          <span className="text-xs mt-1">
                            {SOCIAL_PLATFORMS.find((p) => p.id === link.platform)?.name.split(" ")[0] || link.platform}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-6">
                <h3 className="font-medium mb-3">Quick Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Add a profile picture to make your profile more personal</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Write a short bio that describes who you are</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Add your most important social media links</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>Choose a memorable username for your profile URL</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
