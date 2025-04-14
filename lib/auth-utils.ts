"use client"

import { createClientSupabaseClient } from "./supabase-client"

export async function isUserAdmin() {
  const supabase = createClientSupabaseClient()

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return false

  // Get the user's profile
  const { data, error } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (error || !data) return false

  return data.role === "admin"
}

export async function getUserRole() {
  const supabase = createClientSupabaseClient()

  // Get the current session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return null

  // Get the user's profile
  const { data, error } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (error || !data) return null

  return data.role
}

export async function redirectAfterAuth() {
  const supabase = createClientSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return "/"

  const { data } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (data?.role === "admin") {
    return "/dashboard"
  } else {
    return "/dashboard/profile"
  }
}
