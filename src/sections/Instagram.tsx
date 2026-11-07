import { Expand, Play } from 'lucide-react'
import { useState } from 'react'
import { Lightbox } from '../components/Lightbox'
import { SectionTitle } from '../components/SectionTitle'
import { SlideTextButton } from '../components/SlideTextButton'
import { InstagramIcon } from '../components/SocialIcons'
import { SITE } from '../config/site'
import { INSTAGRAM_POSTS } from '../data/instagram'

export function Instagram() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const { url, handle } = SITE.instagram
  const photos = INSTAGRAM_POSTS.filter((post) => post.src).map((post) => ({
    src: post.src!,
    video: post.video,
    alt: post.alt ?? post.label,
    caption: `${post.label} · ${handle}`,
  }))

  return (
    <section id="instagram" data-scroll-bg="black" className="site-section pb-0 md:pb-0">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Acompanhe <span className="text-primary">nossa rotina.</span>
            </>
          }
          action={
            url && (
              <SlideTextButton
                href={url}
                external
                text={handle}
                hoverText="Seguir no Instagram →"
                icon={<InstagramIcon className="h-4 w-4" />}
                variant="ghost"
                className="normal-case"
              />
            )
          }
        />
      </div>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 flex items-center justify-center gap-3 bg-[linear-gradient(90deg,var(--cf-wine),var(--cf-red-dark)_30%,var(--cf-red)_50%,var(--cf-red-dark)_70%,var(--cf-wine))] py-4 font-display text-sm font-bold tracking-[0.2em] text-primary-foreground uppercase transition-[filter] hover:brightness-110"
        >
          <InstagramIcon className="h-5 w-5" /> Siga a Corpore Fit no Instagram
        </a>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4">
        {INSTAGRAM_POSTS.map((post) => {
          const tile = 'group relative block aspect-[4/5] overflow-hidden'
          if (post.src) {
            const index = photos.findIndex((p) => p.src === post.src)
            return (
              <button
                key={post.label}
                type="button"
                onClick={() => setLightbox(index)}
                aria-label={post.video ? `Assistir vídeo: ${post.label}` : `Ampliar: ${post.label}`}
                className={tile}
              >
                <img
                  src={post.src}
                  alt={post.alt ?? post.label}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${post.video ? 'object-bottom' : ''}`}
                />
                {post.video ? (
                  <>
                    <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_28px_-8px_rgb(8_8_8/0.9)]">
                      <Play aria-hidden="true" className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                    <span className="absolute inset-0 grid place-items-center bg-background/55 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-display text-sm font-bold tracking-[0.15em] text-primary-foreground uppercase">
                        <Play aria-hidden="true" className="h-4 w-4 fill-current" /> Assistir
                      </span>
                    </span>
                  </>
                ) : (
                  <span className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <Expand aria-hidden="true" className="h-7 w-7 text-primary" />
                  </span>
                )}
              </button>
            )
          }
          return (
            <a
              key={post.label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${tile} flex flex-col items-center justify-center gap-3 border border-border bg-background/40 text-center transition-colors hover:bg-wine`}
            >
              <InstagramIcon className="h-8 w-8 text-primary transition-colors group-hover:text-primary-foreground" />
              <span className="font-display text-xl font-bold uppercase">{post.label}</span>
              <span className="text-xs tracking-[0.15em] text-muted-foreground">{handle}</span>
            </a>
          )
        })}
      </div>

      <Lightbox images={photos} index={lightbox} onChange={setLightbox} />
    </section>
  )
}
