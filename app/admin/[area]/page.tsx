import { notFound } from 'next/navigation'
import { AdminApp } from '@/components/admin/admin-app'
const areas = ['homepage','about','podcasts','journal','stories','videos','navigation','footer','seo'] as const
export default async function AdminArea({ params }: { params: Promise<{ area: string }> }) { const { area } = await params; if (!areas.includes(area as typeof areas[number])) notFound(); return <AdminApp area={area as typeof areas[number]} /> }
