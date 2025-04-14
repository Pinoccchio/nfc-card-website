import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import ProfileDashboard from "@/components/profile-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Your Profile | NFC Card",
  description: "Manage your profile and social links",
}

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient()

  try {
    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      redirect("/")
    }

    // Get user profile data
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()

    if (profileError) {
      console.error("Error fetching profile:", profileError)
    }

    // Get user's social links
    const { data: socialLinks, error: socialLinksError } = await supabase
      .from("social_links")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: true })

    if (socialLinksError) {
      console.error("Error fetching social links:", socialLinksError)
    }

    // Get user's custom links
    const { data: customLinks, error: customLinksError } = await supabase
      .from("custom_links")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: true })

    if (customLinksError) {
      console.error("Error fetching custom links:", customLinksError)
    }

    return (
      <div className="min-h-screen w-full bg-background">
        <ProfileDashboard profile={profile || {}} socialLinks={socialLinks || []} customLinks={customLinks || []} />
      </div>
    )
  } catch (error) {
    console.error("Error in profile page:", error)
    // Redirect to home page if there's an error
    redirect("/")
  }
}
