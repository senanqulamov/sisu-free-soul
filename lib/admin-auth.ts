import crypto from 'node:crypto'
import { cookies } from 'next/headers'

const COOKIE = 'sisu_admin_session'
const maxAge = 60 * 60 * 12

function secret() { return process.env.SESSION_SECRET || '' }
function sign(value: string) { return crypto.createHmac('sha256', secret()).update(value).digest('base64url') }

export function verifyPassword(password: string) {
  const encoded = process.env.ADMIN_PASSWORD_HASH
  if (!encoded || !secret()) return false
  const [algorithm, salt, expected] = encoded.split(':')
  if (algorithm !== 'scrypt' || !salt || !expected) return false
  const actual = crypto.scryptSync(password, salt, 64).toString('base64url')
  return crypto.timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
}

export async function createSession(email: string) {
  const expiry = Math.floor(Date.now() / 1000) + maxAge
  // Cookie-safe subject: raw email addresses contain characters browsers encode.
  const value = `${Buffer.from(email).toString('base64url')}.${expiry}`
  ;(await cookies()).set(COOKIE, `${value}.${sign(value)}`, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge })
}

export async function clearSession() { (await cookies()).set(COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 }) }

export function sessionFromValue(cookie?: string) {
  if (!cookie || !secret()) return false
  const parts = cookie.split('.')
  if (parts.length !== 3) return false
  const [email, expiry, signature] = parts
  const value = `${email}.${expiry}`
  if (!crypto.timingSafeEqual(Buffer.from(sign(value)), Buffer.from(signature))) return false
  return Number(expiry) > Math.floor(Date.now() / 1000)
}

export async function requireAdmin() {
  const value = (await cookies()).get(COOKIE)?.value
  if (!sessionFromValue(value)) throw new Error('UNAUTHORIZED')
}

export async function isAdmin() {
  return sessionFromValue((await cookies()).get(COOKIE)?.value)
}
