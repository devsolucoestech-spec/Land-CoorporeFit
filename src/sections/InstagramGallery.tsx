import gal1 from '../assets/gal-1.jpg'
import gal2 from '../assets/gal-2.jpg'
import gal3 from '../assets/gal-3.jpg'
import gal4 from '../assets/gal-4.jpg'
import { InstagramIcon } from '../components/SocialIcons'

const PHOTOS = [gal1, gal2, gal3, gal4]

export function InstagramGallery() {
  return (
    <section data-scroll-bg="wine" className="pt-16">
      <a
        href="#"
        className="flex items-center justify-center gap-2 bg-[linear-gradient(90deg,var(--cf-wine),var(--cf-red-dark)_30%,var(--cf-red)_50%,var(--cf-red-dark)_70%,var(--cf-wine))] py-3 text-xs font-semibold tracking-wider text-primary-foreground uppercase transition-[filter] hover:brightness-110"
      >
        <InstagramIcon className="h-4 w-4" /> Siga-nos no Instagram
      </a>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {PHOTOS.map((src, i) => (
          <div key={i} data-reveal className="photo-fx group overflow-hidden">
            <img
              src={src}
              alt="Momento na academia"
              loading="lazy"
              width={816}
              height={816}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
