import 'server-only'

type GithubConfig = { token: string; owner: string; repo: string; branch: string }
function config(): GithubConfig {
  const { GITHUB_TOKEN: token, GITHUB_OWNER: owner, GITHUB_REPO: repo, GITHUB_BRANCH: branch = 'master' } = process.env
  if (!token || !owner || !repo) throw new Error('PUBLISHING_NOT_CONFIGURED')
  return { token, owner, repo, branch }
}
async function github(path: string, init?: RequestInit) {
  const c = config()
  const response = await fetch(`https://api.github.com/repos/${c.owner}/${c.repo}${path}`, { ...init, headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${c.token}`, 'X-GitHub-Api-Version': '2022-11-28', ...init?.headers }, cache: 'no-store' })
  if (!response.ok) throw new Error(response.status === 401 || response.status === 403 ? 'GITHUB_AUTH_FAILED' : `GITHUB_${response.status}`)
  return response.json()
}

export async function getRepositoryRevision() {
  const c = config()
  const ref = await github(`/git/ref/heads/${encodeURIComponent(c.branch)}`) as { object: { sha: string } }
  return ref.object.sha
}

/** Writes all changed content and media in a single Git tree + commit + ref update. */
export async function publishAtomic(baseRevision: string, files: { path: string; content: string }[]) {
  const c = config()
  const current = await getRepositoryRevision()
  if (current !== baseRevision) throw new Error('CONTENT_CONFLICT')
  const commit = await github(`/git/commits/${current}`) as { tree: { sha: string } }
  const blobs = await Promise.all(files.map(async (file) => {
    const blob = await github('/git/blobs', { method: 'POST', body: JSON.stringify({ content: file.content, encoding: 'base64' }), headers: { 'Content-Type': 'application/json' } }) as { sha: string }
    return { path: file.path, mode: '100644', type: 'blob', sha: blob.sha }
  }))
  const tree = await github('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: commit.tree.sha, tree: blobs }), headers: { 'Content-Type': 'application/json' } }) as { sha: string }
  const nextCommit = await github('/git/commits', { method: 'POST', body: JSON.stringify({ message: 'Publish SISU website content', tree: tree.sha, parents: [current] }), headers: { 'Content-Type': 'application/json' } }) as { sha: string }
  await github(`/git/refs/heads/${encodeURIComponent(c.branch)}`, { method: 'PATCH', body: JSON.stringify({ sha: nextCommit.sha, force: false }), headers: { 'Content-Type': 'application/json' } })
  return nextCommit.sha
}
