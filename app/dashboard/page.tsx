"use client"

import { useState } from "react"
import Link from "next/link"
import { Copy, Edit, ExternalLink, Plus, QrCode, Settings, Smartphone, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [username, setUsername] = useState("johndoe")
  const profileUrl = `/${username}`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6" />
            <span className="text-xl font-bold">TapLink</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button size="sm">Upgrade</Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-md border bg-background px-3 py-1">
                <span className="mr-2 text-sm text-muted-foreground">taplink.com/</span>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-8 w-32 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy URL</span>
                </Button>
              </div>
              <Button asChild>
                <Link href={profileUrl} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Profile
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="md:col-span-2">
              <Tabs defaultValue="links">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="links">Links</TabsTrigger>
                  <TabsTrigger value="socials">Social Media</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                </TabsList>
                <TabsContent value="links" className="space-y-4">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">Your Links</h2>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Link
                    </Button>
                  </div>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">My Portfolio</CardTitle>
                      <CardDescription>https://example.com/portfolio</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end gap-2 p-4 pt-0">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">My Blog</CardTitle>
                      <CardDescription>https://example.com/blog</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end gap-2 p-4 pt-0">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="socials" className="space-y-4">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold">Social Media</h2>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Social
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted"></div>
                          <CardTitle className="text-lg">Twitter</CardTitle>
                        </div>
                        <CardDescription>@johndoe</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-end gap-2 p-4 pt-0">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted"></div>
                          <CardTitle className="text-lg">Instagram</CardTitle>
                        </div>
                        <CardDescription>@johndoe</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-end gap-2 p-4 pt-0">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="appearance" className="space-y-4">
                  <h2 className="text-xl font-semibold">Appearance</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your profile details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" defaultValue="Digital Creator & Web Developer" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="San Francisco, CA" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold">Your NFC Card</h2>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted/50">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium">Scan your QR code</h3>
                  <p className="mb-4 text-center text-sm text-muted-foreground">
                    This QR code links directly to your profile. You can also order an NFC card.
                  </p>
                  <div className="grid w-full grid-cols-2 gap-2">
                    <Button variant="outline">Download QR</Button>
                    <Button>Order NFC Card</Button>
                  </div>
                </CardContent>
              </Card>

              <h2 className="mb-4 mt-8 text-xl font-semibold">Analytics</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Views</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full">
                    <div className="flex h-full flex-col items-center justify-center">
                      <p className="text-4xl font-bold">127</p>
                      <p className="text-sm text-green-500">↑ 12% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
