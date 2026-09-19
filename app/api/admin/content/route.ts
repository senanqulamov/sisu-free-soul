import { NextResponse } from 'next/server'
import { publishedContent } from '@/content/cms'
import { requireAdmin } from '@/lib/admin-auth'
import { getRepositoryRevision } from '@/lib/github'
export async function GET() {
  try {
    await requireAdmin()
    try { return NextResponse.json({ content: publishedContent, revision: await getRepositoryRevision() }) }
    catch { return NextResponse.json({ content: publishedContent, revision: 'local-development', publishingConfigured: false }) }
  } catch { return NextResponse.json({ error: 'Unable to load published content.' }, { status: 401 }) }
}
