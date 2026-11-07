import { SlideTextButton } from '../components/SlideTextButton'
import { WHATSAPP_MESSAGES } from '../config/site'
import { whatsappUrl } from '../lib/whatsapp'

export function FinalCta() {
  return (
    <section id="matricula" data-scroll-bg="red" className="site-section relative overflow-hidden text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_30%,rgb(255_0_0/0.6),transparent_60%),radial-gradient(700px_400px_at_80%_80%,rgb(71_0_0/0.7),transparent_60%)]"
      />
      <div className="container-gym relative">
        <h2
          data-poster
          className="origin-[50%_80%] font-poster text-[clamp(42px,13vw,72px)] leading-[0.88] font-normal tracking-[-0.02em] uppercase md:text-[clamp(52px,10vw,160px)]"
        >
          Chegou a sua vez.
          <br />
          Vamos começar?
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-lg text-base text-white/90 md:mt-10 md:text-lg">
          Dê o primeiro passo para uma rotina mais forte, saudável e ativa.
        </p>
        <div data-reveal className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mt-10">
          <SlideTextButton
            href="#planos"
            text="Quero me matricular →"
            hoverText="Ver planos →"
            variant="dark"
            className="w-full sm:w-auto"
          />
          <SlideTextButton
            href={whatsappUrl(WHATSAPP_MESSAGES.visit)}
            external
            text="Agendar uma visita"
            hoverText="Chamar no WhatsApp →"
            variant="light"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </section>
  )
}
