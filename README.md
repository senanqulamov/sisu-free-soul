# SISU Free Soul v2

The public site is a Next.js application. Its private content workspace is available at `/admin` and uses GitHub as the persistent store: edits remain in the browser until **Publish changes** creates one Git commit, which triggers the normal Vercel deployment.

Live site: https://sisufreesoul.com
Repository: https://github.com/senanqulamov/sisu-free-soul

## Local setup

Copy `.env.example` to `.env.local`, set the variables, then run `npm install` and `npm run dev`. Visit `/admin/login`.

Generate an admin password hash with Node (choose a long random salt):

```js
require('crypto').scryptSync('your-password', 'random-salt', 64).toString('base64url')
```

Set `ADMIN_PASSWORD_HASH` to `scrypt:random-salt:<result>`. Generate `SESSION_SECRET` with a long random value. Never place any of these values in `NEXT_PUBLIC_` variables.

## Vercel

Add every `.env.example` variable to the Vercel project environment. The GitHub token needs repository Contents read/write access. It is only used by server routes to build one Git tree, one commit, and one branch update when publishing. Drafts and selected images stay in the browser until that action.
