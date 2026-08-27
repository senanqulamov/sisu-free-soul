# SISU hero media

Place the production hero footage at `public/videos/sisu-hero.mp4`.

The home hero already references this exact path with `autoplay`, `muted`, `loop`,
and `playsInline`. Until it is supplied, the cinematic poster at
`public/images/sisu-hero-poster.png` remains visible as the fallback.

For production, export a mobile-friendly H.264 MP4 with no embedded audio needed
for the initial hero load. A 1920px-wide source at a sensible bitrate is preferred.
