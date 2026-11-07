import { Expand } from 'lucide-react'
import { useState } from 'react'
import { Lightbox } from '../components/Lightbox'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import { SectionTitle } from '../components/SectionTitle'
import { STRUCTURE_PHOTOS, type StructurePhoto } from '../data/structure'

const SIZE_CLASS: Record<StructurePhoto['size'], string> = {
  large: 'col-span-2 row-span-2',
  wide: 'col-span-2',
  small: 'col-span-1',
}

export function Structure() {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const photos = STRUCTURE_PHOTOS.filter((photo) => photo.src).map((photo) => ({
    src: photo.src!,
    alt: photo.label,
    caption: photo.label,
  }))

  return (
    <section id="estrutura" data-scroll-bg="graphite" className="site-section">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Um espaço preparado <span className="text-primary">para sua evolução.</span>
            </>
          }
          sub="Conheça um ambiente pensado para proporcionar conforto, qualidade e tudo o que você precisa para alcançar seus objetivos."
        />

        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
          {STRUCTURE_PHOTOS.map((photo) => {
            const photoIndex = photos.findIndex((p) => p.src === photo.src)
            return (
              <div key={photo.label} data-reveal className={SIZE_CLASS[photo.size]}>
                {photo.src ? (
                  <button
                    type="button"
                    onClick={() => setLightbox(photoIndex)}
                    aria-label={`Ampliar foto: ${photo.label}`}
                    className="group relative h-full w-full overflow-hidden rounded-md border border-border transition-colors hover:border-primary"
                  >
                    <img
                      src={photo.src}
                      alt={photo.label}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background to-transparent p-4 font-display text-sm font-bold uppercase">
                      {photo.label}
                      <Expand aria-hidden="true" className="h-4 w-4 text-primary" />
                    </span>
                  </button>
                ) : (
                  <PhotoPlaceholder label={photo.label} className="h-full" />
                )}
              </div>
            )
          })}
        </div>

      </div>

      <Lightbox images={photos} index={lightbox} onChange={setLightbox} />
    </section>
  )
}
