import { NextResponse } from 'next/server'
import { createSession, verifyPassword } from '@/lib/admin-auth'

const attempts = new Map<string, { count: number; reset: number }>()
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const state = attempts.get(ip)
  if (state && state.reset > Date.now() && state.count >= 5) return NextResponse.json({ error: 'Too many attempts. Please wait a few minutes.' }, { status: 429 })
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null
  if (!body?.email || !body.password || body.email !== process.env.ADMIN_EMAIL || !verifyPassword(body.password)) {
    attempts.set(ip, { count: (state?.reset ?? 0) > Date.now() ? (state?.count ?? 0) + 1 : 1, reset: Date.now() + 10 * 60_000 })
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 })
  }
  attempts.delete(ip); await createSession(body.email)
  return NextResponse.json({ ok: true })
}
