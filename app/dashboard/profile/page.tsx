import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import ProfileDashboard from "@/components/profile-dashboard"

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/")
  }

  // Get user profile data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Get user's social links
  const { data: socialLinks } = await supabase
    .from("social_links")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: true })

  // Get user's custom links
  const { data: customLinks } = await supabase
    .from("custom_links")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: true })

  return <ProfileDashboard profile={profile || {}} socialLinks={socialLinks || []} customLinks={customLinks || []} />
}
