import { Accordion } from '../components/Accordion'
import { SlideTextButton } from '../components/SlideTextButton'
import { WHATSAPP_MESSAGES } from '../config/site'
import { FAQ } from '../data/faq'
import { whatsappUrl } from '../lib/whatsapp'

export function Faq() {
  return (
    <section id="faq" data-scroll-bg="black" className="site-section">
      <div className="container-gym grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 data-split-title className="site-h2">
            Tem alguma dúvida? <span className="text-primary">A gente responde.</span>
          </h2>
          <p data-reveal className="mt-5 max-w-sm text-muted-foreground">
            Não encontrou o que procurava? Fale direto com a nossa equipe.
          </p>
          <SlideTextButton
            data-reveal
            href={whatsappUrl(WHATSAPP_MESSAGES.general)}
            external
            text="Falar no WhatsApp"
            hoverText="Abrir conversa →"
            variant="outline"
            className="mt-8"
          />
        </div>
        <Accordion items={FAQ} />
      </div>
    </section>
  )
}
