import { Expand, MapPin, Navigation } from 'lucide-react'
import { useState } from 'react'
import { Lightbox } from '../components/Lightbox'
import { PhotoPlaceholder } from '../components/PhotoPlaceholder'
import { SectionTitle } from '../components/SectionTitle'
import { SlideTextButton } from '../components/SlideTextButton'
import { SITE } from '../config/site'
import { STRUCTURE_PHOTOS, type StructurePhoto } from '../data/structure'

const { address } = SITE

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
              Estrutura e <span className="text-primary">localização.</span>
            </>
          }
          sub="Conheça o nosso espaço e veja como chegar à Corpore Fit."
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

        {address.mapQuery && (
          <div id="localizacao" className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div data-reveal className="flex flex-col rounded-md border border-border bg-card p-7">
              <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                Localização
              </p>
              <h3 className="mt-4 text-2xl font-bold">{SITE.shortName}</h3>
              <address className="mt-4 space-y-1 text-sm leading-relaxed text-muted-foreground not-italic">
                <span className="block text-foreground">{address.street}</span>
                <span className="block">{address.city}</span>
                {address.zip && <span className="block">CEP {address.zip}</span>}
              </address>
              <div className="mt-auto pt-7">
                <SlideTextButton
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.mapQuery)}`}
                  external
                  text="Como chegar"
                  hoverText="Abrir rota →"
                  icon={<Navigation aria-hidden="true" className="h-4 w-4" />}
                  size="md"
                  className="w-full"
                />
              </div>
            </div>

            <div
              data-reveal
              className="relative h-[360px] overflow-hidden rounded-md border border-border bg-card md:h-[440px]"
            >
              <iframe
                title={`Mapa com a localização da ${SITE.shortName}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address.mapQuery)}&z=17&hl=pt-BR&output=embed`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-full w-full border-0 [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.7)_contrast(0.95)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgb(8_8_8/0.7)]"
              />
            </div>
          </div>
        )}
      </div>

      <Lightbox images={photos} index={lightbox} onChange={setLightbox} />
    </section>
  )
}
