import { createServerSupabaseClient } from "@/lib/supabase-server"

export async function getProfileByUsername(username: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("profiles")
    .select("*, social_links(*), custom_links(*)")
    .eq("username", username)
    .single()

  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }

  return data
}

export async function trackProfileView(profileId: string) {
  const supabase = createServerSupabaseClient()

  try {
    await supabase.from("profile_views").insert({
      profile_id: profileId,
      viewed_at: new Date().toISOString(),
    })
    return true
  } catch (error) {
    console.error("Error tracking profile view:", error)
    return false
  }
}
