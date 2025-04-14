import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AuthDialog } from "@/components/auth-dialog"
import { FeatureCard } from "@/components/feature-card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6" />
            <span className="text-xl font-bold">TapLink</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="#features" className="hidden text-sm font-medium hover:underline md:inline-block">
              Features
            </Link>
            <Link href="#pricing" className="hidden text-sm font-medium hover:underline md:inline-block">
              Pricing
            </Link>
            <ThemeToggle />
            <AuthDialog />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                    The Future of Networking
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Share Your Digital Identity with a <span className="text-primary">Tap</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Connect all your social profiles in one place and share them instantly with NFC technology.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <AuthDialog type="signup">
                    <Button size="lg" className="gap-1">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </AuthDialog>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative h-[450px] w-[300px] overflow-hidden rounded-xl border bg-card shadow-xl dark:border-gray-800 flex items-center justify-center">
                  <div className="p-6 flex flex-col items-center">
                    <div className="relative w-full max-w-[280px]">
                      <Image
                        src="/contactless-payment.png"
                        alt="Contactless Payment"
                        width={280}
                        height={200}
                        className="rounded-lg shadow-lg animate-float"
                      />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">Tap & Share</h3>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Share your digital profile with a simple tap of your NFC card
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="bg-muted/50 py-16 md:py-24 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to share your digital identity with the world
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <FeatureCard
                icon="Smartphone"
                title="NFC Technology"
                description="Share your profile with a simple tap of your card on any NFC-enabled device."
              />
              <FeatureCard
                icon="Link"
                title="Custom URL"
                description="Get your own personalized link that you can share anywhere."
              />
              <FeatureCard
                icon="LayoutGrid"
                title="All Your Socials"
                description="Connect all your social media accounts in one place."
              />
              <FeatureCard
                icon="Palette"
                title="Customizable Design"
                description="Personalize your profile with custom themes and layouts."
              />
              <FeatureCard
                icon="BarChart"
                title="Analytics"
                description="Track who's viewing your profile and which links are getting clicked."
              />
              <FeatureCard
                icon="Shield"
                title="Privacy Controls"
                description="Control who can see your information and when."
              />
            </div>
          </div>
        </section>
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Three simple steps to start sharing your digital identity
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="text-gray-500">Create your account and set up your profile with all your social links.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold">Customize</h3>
                <p className="text-gray-500">Personalize your profile with your photo, bio, and preferred theme.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold">Share</h3>
                <p className="text-gray-500">Order your NFC card and start sharing your profile with a simple tap.</p>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <div className="relative max-w-md">
                <Image
                  src="/contactless-payment.png"
                  alt="Contactless Payment"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg md:hidden"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="bg-muted/50 py-16 md:py-24 dark:bg-muted/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works for you
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-bold dark:text-white">Basic</h3>
                  <p className="text-gray-500 dark:text-gray-400">For individuals just getting started</p>
                </div>
                <div className="my-6">
                  <span className="text-4xl font-bold dark:text-white">$9.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="dark:text-gray-300">1 NFC Card</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="dark:text-gray-300">Up to 10 social links</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="dark:text-gray-300">Basic analytics</span>
                  </li>
                </ul>
                <Button className="mt-6">Get Started</Button>
              </div>
              <div className="flex flex-col rounded-lg border bg-primary p-6 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-bold text-primary-foreground">Pro</h3>
                  <p className="text-primary-foreground/80">For professionals and creators</p>
                </div>
                <div className="my-6">
                  <span className="text-4xl font-bold text-primary-foreground">$19.99</span>
                  <span className="text-primary-foreground/80">/month</span>
                </div>
                <ul className="space-y-2 text-primary-foreground">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>3 NFC Cards</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Unlimited social links</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Custom themes</span>
                  </li>
                </ul>
                <Button className="mt-6 bg-white text-primary hover:bg-white/90">Get Started</Button>
              </div>
              <div className="flex flex-col rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-bold dark:text-white">Business</h3>
                  <p className="text-gray-500 dark:text-gray-400">For teams and businesses</p>
                </div>
                <div className="my-6">
                  <span className="text-4xl font-bold dark:text-white">$49.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="dark:text-gray-300">10 NFC Cards</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="dark:text-gray-300">Team management</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="dark:text-gray-300">Brand customization</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="dark:text-gray-300">Priority support</span>
                  </li>
                </ul>
                <Button className="mt-6">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of professionals who are already using TapLink
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <AuthDialog type="signup">
                  <Button size="lg" className="gap-1">
                    Create Your Profile
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </AuthDialog>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/50 dark:bg-muted/10">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6" />
            <span className="text-xl font-bold">TapLink</span>
          </div>
          <nav className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
