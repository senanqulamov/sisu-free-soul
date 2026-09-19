'use client'

export type StagedMedia = { id: string; file: Blob; name: string; type: string }
const database = 'sisu-cms-media'
const store = 'staged'
const marker = 'staged-media:'

function open() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(database, 1)
    request.onupgradeneeded = () => request.result.createObjectStore(store, { keyPath: 'id' })
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
export async function stageMedia(file: File) {
  const item: StagedMedia = { id: crypto.randomUUID(), file, name: file.name, type: file.type }
  const db = await open()
  await new Promise<void>((resolve, reject) => { const tx = db.transaction(store, 'readwrite'); tx.objectStore(store).put(item); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error) })
  return `${marker}${item.id}`
}
export async function getStagedMedia(reference: string) {
  if (!reference.startsWith(marker)) return null
  const db = await open(); const id = reference.slice(marker.length)
  return new Promise<StagedMedia | null>((resolve, reject) => { const request = db.transaction(store).objectStore(store).get(id); request.onsuccess = () => resolve(request.result ?? null); request.onerror = () => reject(request.error) })
}
export async function removeStagedMedia(references: string[]) {
  const ids = references.filter((value) => value.startsWith(marker)).map((value) => value.slice(marker.length)); if (!ids.length) return
  const db = await open(); await new Promise<void>((resolve, reject) => { const tx = db.transaction(store, 'readwrite'); ids.forEach((id) => tx.objectStore(store).delete(id)); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error) })
}
export async function resolveStagedMedia<T>(value: T): Promise<T> {
  if (typeof value === 'string' && value.startsWith(marker)) { const media = await getStagedMedia(value); if (!media) throw new Error('A selected image is no longer available. Please choose it again.'); const data = await media.file.arrayBuffer(); return `data:${media.type};base64,${arrayBufferToBase64(data)}` as T }
  if (Array.isArray(value)) return Promise.all(value.map(resolveStagedMedia)) as Promise<T>
  if (value && typeof value === 'object') { const entries = await Promise.all(Object.entries(value as Record<string, unknown>).map(async ([key, item]) => [key, await resolveStagedMedia(item)])); return Object.fromEntries(entries) as T }
  return value
}
export function stagedReferences(value: unknown): string[] { if (typeof value === 'string') return value.startsWith(marker) ? [value] : []; if (Array.isArray(value)) return value.flatMap(stagedReferences); if (value && typeof value === 'object') return Object.values(value).flatMap(stagedReferences); return [] }
function arrayBufferToBase64(buffer: ArrayBuffer) { let binary = ''; for (const byte of new Uint8Array(buffer)) binary += String.fromCharCode(byte); return btoa(binary) }
