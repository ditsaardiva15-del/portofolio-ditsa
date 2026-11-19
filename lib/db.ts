import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (client) return client

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error("SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diisi di environment variables")
  }

  client = createClient(url, key, { auth: { persistSession: false } })
  return client
}

export interface ChatMessageRecord {
  id: string
  session_id: string
  sender: "user" | "bot"
  text: string
  created_at: number
}

export async function saveMessage(params: {
  id: string
  sessionId: string
  sender: "user" | "bot"
  text: string
  createdAt: number
}) {
  const { error } = await getClient().from("messages").insert({
    id: params.id,
    session_id: params.sessionId,
    sender: params.sender,
    text: params.text,
    created_at: params.createdAt,
  })
  if (error) throw error
}

export async function getSessionMessages(sessionId: string): Promise<ChatMessageRecord[]> {
  const { data, error } = await getClient()
    .from("messages")
    .select("id, session_id, sender, text, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
  if (error) throw error
  return (data ?? []) as ChatMessageRecord[]
}

export async function getRecentHistory(
  sessionId: string,
  limit = 10,
): Promise<{ role: "user" | "assistant"; content: string }[]> {
  const { data, error } = await getClient()
    .from("messages")
    .select("sender, text")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false })
    .limit(limit)
  if (error) throw error
  return (data ?? []).reverse().map((r) => ({
    role: r.sender === "user" ? ("user" as const) : ("assistant" as const),
    content: r.text as string,
  }))
}

export async function clearSessionMessages(sessionId: string) {
  const { error } = await getClient().from("messages").delete().eq("session_id", sessionId)
  if (error) throw error
}
