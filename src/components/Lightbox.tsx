import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { Modal } from './Modal'

/** Com `video`, o item é exibido como vídeo e `src` vira a capa. */
export type LightboxImage = { src: string; alt: string; caption?: string; video?: string }

type LightboxProps = {
  images: LightboxImage[]
  index: number | null
  onChange: (index: number | null) => void
}

export function Lightbox({ images, index, onChange }: LightboxProps) {
  const open = index !== null
  const image = open ? images[index] : null
  const hasMany = images.length > 1

  useEffect(() => {
    if (!open || !hasMany) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, hasMany, index, images.length, onChange])

  const navButton =
    'grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-background/80 transition-colors hover:border-primary hover:text-primary'
  const media = 'max-h-[80vh] w-auto rounded-md object-contain'

  return (
    <Modal open={open} onClose={() => onChange(null)} label="Visualização ampliada">
      {image && (
        <figure className="flex items-center gap-3 md:gap-5">
          {hasMany && (
            <button
              type="button"
              aria-label="Anterior"
              className={navButton}
              onClick={() => onChange((index! - 1 + images.length) % images.length)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div>
            {image.video ? (
              <video
                key={image.video}
                src={image.video}
                poster={image.src}
                aria-label={image.alt}
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                autoPlay
                playsInline
                className={`${media} bg-black`}
              />
            ) : (
              <img src={image.src} alt={image.alt} className={media} />
            )}
            {image.caption && (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground">{image.caption}</figcaption>
            )}
          </div>
          {hasMany && (
            <button
              type="button"
              aria-label="Próximo"
              className={navButton}
              onClick={() => onChange((index! + 1) % images.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </figure>
      )}
    </Modal>
  )
}
