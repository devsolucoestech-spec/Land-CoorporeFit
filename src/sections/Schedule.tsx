import { Clock, Users } from 'lucide-react'
import { useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { OPENING_HOURS } from '../config/site'
import { CLASS_SCHEDULE } from '../data/schedule'

const { days } = CLASS_SCHEDULE
const TIMES = [...new Set(days.flatMap((day) => day.classes.map((c) => c.time)))].sort()

/** Dia atual na grade (segunda = 0). Domingo abre na segunda. */
const todayIndex = () => {
  const weekday = new Date().getDay()
  return weekday === 0 ? 0 : Math.min(weekday - 1, days.length - 1)
}

function ProvisionalBadge() {
  return (
    <span className="rounded-sm border border-primary/40 px-2 py-0.5 text-[10px] font-semibold tracking-[0.15em] text-primary uppercase">
      Provisório
    </span>
  )
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState(todayIndex)

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

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_2fr]">
          <div data-reveal className="rounded-md border border-border bg-card/60 p-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-3 text-xl font-bold">
                <Clock aria-hidden="true" className="h-5 w-5 text-primary" />
                Funcionamento
              </h3>
              {!OPENING_HOURS.confirmed && <ProvisionalBadge />}
            </div>
            <dl className="mt-6 divide-y divide-border">
              {OPENING_HOURS.items.map((item) => (
                <div key={item.days} className="flex justify-between gap-4 py-4 text-sm">
                  <dt className="text-muted-foreground">{item.days}</dt>
                  <dd className="font-semibold">{item.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className="rounded-md border border-border bg-card/60 p-7">
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-3 text-xl font-bold">
                <Users aria-hidden="true" className="h-5 w-5 text-primary" />
                Aulas coletivas
              </h3>
              {!CLASS_SCHEDULE.confirmed && <ProvisionalBadge />}
            </div>

            <div className="mt-6 hidden overflow-x-auto md:block">
              <table className="w-full border-separate border-spacing-1.5 text-sm">
                <thead>
                  <tr>
                    <th scope="col" className="sr-only">
                      Horário
                    </th>
                    {days.map((day) => (
                      <th
                        key={day.label}
                        scope="col"
                        className="pb-2 font-display text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase"
                      >
                        {day.short}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIMES.map((time) => (
                    <tr key={time}>
                      <th scope="row" className="pr-3 text-left font-display text-sm font-bold text-primary">
                        {time}
                      </th>
                      {days.map((day) => {
                        const slot = day.classes.find((c) => c.time === time)
                        return (
                          <td
                            key={day.label}
                            className={`rounded-sm px-2 py-3 text-center text-xs ${
                              slot
                                ? 'border border-border bg-background/60 font-semibold transition-colors hover:border-primary'
                                : 'text-muted-foreground/40'
                            }`}
                          >
                            {slot ? slot.modality : '—'}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 md:hidden">
              <div role="tablist" aria-label="Dias da semana" className="grid grid-cols-6 gap-1">
                {days.map((day, i) => (
                  <button
                    key={day.label}
                    type="button"
                    role="tab"
                    id={`dia-${i}`}
                    aria-selected={activeDay === i}
                    aria-controls="aulas-do-dia"
                    onClick={() => setActiveDay(i)}
                    className={`rounded-sm py-2.5 font-display text-xs font-bold uppercase transition-colors ${
                      activeDay === i ? 'bg-primary text-primary-foreground' : 'bg-background/60 text-muted-foreground'
                    }`}
                  >
                    {day.short}
                  </button>
                ))}
              </div>
              <ul id="aulas-do-dia" role="tabpanel" aria-labelledby={`dia-${activeDay}`} className="mt-4 space-y-2">
                {days[activeDay].classes.map((slot) => (
                  <li
                    key={slot.time}
                    className="flex items-center justify-between rounded-sm border border-border bg-background/60 px-4 py-3"
                  >
                    <span className="font-display text-lg font-bold text-primary">{slot.time}</span>
                    <span className="font-semibold">{slot.modality}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
