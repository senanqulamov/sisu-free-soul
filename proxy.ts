import { NextRequest, NextResponse } from 'next/server'

const COOKIE = 'sisu_admin_session'
function base64url(bytes: ArrayBuffer) { return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '') }
async function validSession(value: string | undefined, secret: string | undefined) {
  if (!value || !secret) return false
  const parts = value.split('.')
  if (parts.length !== 3 || Number(parts[1]) <= Date.now() / 1000) return false
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${parts[0]}.${parts[1]}`))
  return base64url(signature) === parts[2]
}
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/login')) return NextResponse.next()
  const session = request.cookies.get(COOKIE)?.value
  if (await validSession(session, process.env.SESSION_SECRET)) return NextResponse.next()
  if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  return NextResponse.redirect(new URL('/admin/login', request.url))
}
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }
