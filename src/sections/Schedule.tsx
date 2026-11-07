import { Clock, MessageCircle, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { WHATSAPP_MESSAGES } from '../config/site'
import { CLASS_SCHEDULE, classesAt, formatTime, OPENING_HOURS, type ClassSlot } from '../data/schedule'
import { onScheduleFocus } from '../lib/scheduleFocus'
import { whatsappUrl } from '../lib/whatsapp'

const { days, onRequest, openModality } = CLASS_SCHEDULE
/** Dias exibidos na grade de aulas: até o último dia com aula (sábado sem aulas fica de fora). */
const LAST_CLASS_DAY = days.findLastIndex((day) => day.classes.length > 0)
const CLASS_DAYS = days.slice(0, LAST_CLASS_DAY + 1)
const TIMES = [...new Set(CLASS_DAYS.flatMap((day) => day.classes.map((c) => c.time)))].sort()
const SCHEDULED = [...new Set(CLASS_DAYS.flatMap((day) => day.classes.map((c) => c.modality)))]
const dayHas = (index: number, modality: string) => CLASS_DAYS[index].classes.some((c) => c.modality === modality)

/** Dia de hoje na grade (segunda = 0); se não houver aula, o próximo dia com aula. */
function initialDay() {
  const weekday = new Date().getDay()
  const today = weekday === 0 ? 0 : Math.min(weekday - 1, CLASS_DAYS.length - 1)
  for (let i = 0; i < CLASS_DAYS.length; i++) {
    const index = (today + i) % CLASS_DAYS.length
    if (CLASS_DAYS[index].classes.length) return index
  }
  return today
}

/** Aulas no mesmo horário ("Funcional + GAP"), com a modalidade em destaque realçada. */
function Activities({ slots, focus }: { slots: ClassSlot[]; focus: string | null }) {
  return (
    <>
      {slots.map((slot, i) => (
        <span key={slot.modality}>
          {i > 0 && <span className="text-muted-foreground"> + </span>}
          <span className={focus === slot.modality ? 'text-white' : focus ? 'text-muted-foreground' : ''}>
            {slot.modality}
          </span>
        </span>
      ))}
    </>
  )
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState(initialDay)
  const [focus, setFocus] = useState<string | null>(null)

  const highlight = (modality: string | null) => {
    setFocus(modality)
    if (!modality) return
    const day = CLASS_DAYS.findIndex((_, i) => dayHas(i, modality))
    if (day >= 0) setActiveDay(day)
  }

  useEffect(() => onScheduleFocus(highlight), [])

  const classFocus = focus === openModality ? null : focus
  const slotClass = (slots: ClassSlot[]) => {
    if (classFocus && slots.some((s) => s.modality === classFocus)) {
      return 'border-primary bg-primary/15 text-white shadow-[0_0_24px_-8px_var(--primary)]'
    }
    return `border-border bg-background/60 ${classFocus ? 'opacity-35' : ''}`
  }

  const chip = (active: boolean) =>
    `min-h-11 shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.1em] whitespace-nowrap uppercase transition-colors md:min-h-0 ${
      active
        ? 'border-primary bg-primary text-primary-foreground'
        : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
    }`

  const focusMessage = !focus
    ? ''
    : focus === openModality
      ? `${focus}: disponível durante todo o horário de funcionamento.`
      : SCHEDULED.includes(focus)
        ? `Destacando os horários de ${focus}.`
        : `${focus}: consulte os horários com a nossa equipe.`

  return (
    <section id="horarios" data-scroll-bg="black" className="site-section">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Sua rotina. Seu horário. <span className="text-primary">Seu treino.</span>
            </>
          }
        />

        <div data-reveal className="mt-10 rounded-md border border-border bg-card/60 p-4 sm:p-6 md:mt-12 md:p-8">
          {OPENING_HOURS.length > 0 && (
            <>
              <h3 className="flex items-center gap-3 text-xl font-bold">
                <Clock aria-hidden="true" className="h-5 w-5 text-primary" />
                Horários de funcionamento
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {openModality} com horário livre durante todo o funcionamento.
              </p>

              <ul className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 md:mt-6">
                {OPENING_HOURS.map((group) => (
                  <li
                    key={group.days}
                    className={`rounded-md border px-3.5 py-4 transition-[background-color,border-color,box-shadow] duration-300 sm:px-5 md:py-5 ${
                      focus === openModality
                        ? 'border-primary bg-primary/15 shadow-[0_0_24px_-8px_var(--primary)]'
                        : 'border-border bg-background/60'
                    }`}
                  >
                    <p className="font-display text-[clamp(24px,7.5vw,30px)] font-bold whitespace-nowrap md:text-4xl">
                      {formatTime(group.from)}–{formatTime(group.to)}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{group.days}</p>
                  </li>
                ))}
              </ul>

              <hr className="my-8 border-border md:my-10" />
            </>
          )}

          <h3 className="flex items-center gap-3 text-xl font-bold">
            <Users aria-hidden="true" className="h-5 w-5 text-primary" />
            Aulas coletivas
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">Selecione uma modalidade para consultar a programação.</p>

          {/* Celular: faixa com rolagem própria, sem empurrar a página para os lados. */}
          <div
            role="group"
            aria-label="Destacar modalidade na grade"
            className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:mt-6 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            <button type="button" aria-pressed={!classFocus} onClick={() => highlight(null)} className={chip(!classFocus)}>
              Todas
            </button>
            {[...SCHEDULED, ...onRequest].map((modality) => (
              <button
                key={modality}
                type="button"
                aria-pressed={focus === modality}
                onClick={() => highlight(focus === modality ? null : modality)}
                className={chip(focus === modality)}
              >
                {modality}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="sr-only">
            {focusMessage}
          </p>

          <div className="mt-6 hidden overflow-x-auto md:block">
            <table className="w-full table-fixed border-separate border-spacing-1.5 text-sm">
              <thead>
                <tr>
                  <th scope="col" className="w-16">
                    <span className="sr-only">Horário</span>
                  </th>
                  {CLASS_DAYS.map((day, i) => (
                    <th
                      key={day.label}
                      scope="col"
                      className={`pb-2 font-display text-xs font-bold tracking-[0.15em] uppercase transition-colors ${
                        classFocus && dayHas(i, classFocus) ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      <abbr title={day.label} className="no-underline">
                        {day.short}
                      </abbr>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIMES.map((time) => (
                  <tr key={time}>
                    <th scope="row" className="pr-3 text-left font-display text-base font-bold text-primary">
                      {formatTime(time)}
                    </th>
                    {CLASS_DAYS.map((day) => {
                      const slots = classesAt(day, time)
                      return (
                        <td
                          key={day.label}
                          className={`h-14 rounded-sm px-2 text-center text-xs transition-[opacity,background-color,border-color,box-shadow] duration-300 ${
                            slots.length ? `border font-semibold ${slotClass(slots)}` : 'text-muted-foreground/30'
                          }`}
                        >
                          {slots.length ? <Activities slots={slots} focus={classFocus} /> : '—'}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 md:hidden">
            <div
              role="tablist"
              aria-label="Dias da semana"
              className="grid gap-1.5"
              style={{ gridTemplateColumns: `repeat(${CLASS_DAYS.length}, minmax(0, 1fr))` }}
            >
              {CLASS_DAYS.map((day, i) => (
                <button
                  key={day.label}
                  type="button"
                  role="tab"
                  id={`dia-${i}`}
                  aria-selected={activeDay === i}
                  aria-controls="aulas-do-dia"
                  onClick={() => setActiveDay(i)}
                  className={`relative h-12 rounded-md font-display text-sm font-bold uppercase transition-colors ${
                    activeDay === i ? 'bg-primary text-primary-foreground' : 'bg-background/60 text-muted-foreground'
                  }`}
                >
                  {day.short}
                  {classFocus && dayHas(i, classFocus) && activeDay !== i && (
                    <span aria-hidden="true" className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
            <div id="aulas-do-dia" role="tabpanel" aria-labelledby={`dia-${activeDay}`} className="mt-4">
              {CLASS_DAYS[activeDay].classes.length ? (
                <ul className="space-y-2">
                  {[...new Set(CLASS_DAYS[activeDay].classes.map((c) => c.time))].sort().map((time) => {
                    const slots = classesAt(CLASS_DAYS[activeDay], time)
                    return (
                      <li
                        key={time}
                        className={`flex min-h-16 items-center justify-between gap-4 rounded-md border px-4 py-3 transition-[opacity,background-color,border-color] duration-300 ${slotClass(slots)}`}
                      >
                        <span className="font-display text-xl font-bold text-primary">{formatTime(time)}</span>
                        <span className="text-right text-base font-semibold">
                          <Activities slots={slots} focus={classFocus} />
                        </span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="rounded-sm border border-dashed border-border px-4 py-5 text-center text-sm text-muted-foreground">
                  Nenhuma aula coletiva informada para {CLASS_DAYS[activeDay].label.toLowerCase()}.
                </p>
              )}
            </div>
          </div>

          {onRequest.map((modality) => (
            <div
              key={modality}
              className={`mt-5 flex flex-col gap-4 rounded-md border p-4 transition-[border-color,box-shadow,background-color] duration-300 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:p-5 ${
                focus === modality
                  ? 'border-primary bg-primary/10 shadow-[0_0_32px_-12px_var(--primary)]'
                  : 'border-border bg-background/40'
              }`}
            >
              <div>
                <p className="font-display text-lg font-bold uppercase">{modality}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Consulte os horários: dias e horários informados diretamente pela nossa equipe.
                </p>
              </div>
              <a
                href={whatsappUrl(WHATSAPP_MESSAGES.modalitySchedule(modality))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/40 px-4 text-xs font-semibold tracking-[0.1em] whitespace-nowrap text-primary uppercase max-sm:w-full transition-colors hover:text-foreground sm:min-h-0 sm:border-0 sm:px-0"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Consultar horários →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
