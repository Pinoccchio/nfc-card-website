"use client"

import { createClientSupabaseClient } from "./supabase-client"

export async function ensureProfilesTable() {
  const supabase = createClientSupabaseClient()

  // Check if the profiles table exists
  const { data: tableExists, error: checkError } = await supabase.from("profiles").select("id").limit(1).maybeSingle()

  if (checkError && checkError.code === "42P01") {
    // Table doesn't exist
    console.log("Profiles table does not exist, creating it...")

    // Create the profiles table
    const { error: createError } = await supabase.rpc("create_profiles_table")

    if (createError) {
      console.error("Error creating profiles table:", createError)
      return false
    }

    console.log("Profiles table created successfully")
    return true
  }

  return true
}
