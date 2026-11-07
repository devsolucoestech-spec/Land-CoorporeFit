import { SectionTitle } from '../components/SectionTitle'

const CLASSES = ['Flexibilidade', 'Cardio', 'HIIT', 'Musculação', 'Crossfit']

const SCHEDULE: [string, (string | null)[]][] = [
  ['Segunda', ['09:00 – 11:00', null, '12:00 – 14:00', '08:00 – 10:00', '16:00 – 18:00']],
  ['Terça', [null, '10:00 – 12:00', null, null, '18:00 – 20:00']],
  ['Quarta', ['16:00 – 18:00', '10:00 – 12:00', null, '11:00 – 13:00', '16:00 – 18:00']],
  ['Quinta', ['15:00 – 17:00', null, '15:00 – 17:00', '11:00 – 13:00', '16:00 – 18:00']],
  ['Sexta', ['15:00 – 17:00', null, '15:00 – 17:00', '11:00 – 13:00', null]],
  ['Sábado', ['09:00 – 11:00', '08:00 – 10:00', '09:00 – 11:00', '11:00 – 13:00', '08:00 – 10:00']],
]

const cell = 'rounded-sm border border-border px-3 py-2.5 text-center text-xs whitespace-nowrap'

export function Schedule() {
  return (
    <section id="horarios" data-scroll-bg="graphite" className="site-section pt-0 md:pt-0">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Grade de <span className="text-primary">aulas.</span>
            </>
          }
        />
        <div data-reveal className="mt-10 overflow-x-auto">
          <table className="mx-auto w-full min-w-[720px] border-separate border-spacing-2">
            <thead>
              <tr>
                <th className={`${cell} border-primary bg-primary font-medium`}>Aulas</th>
                {CLASSES.map((name) => (
                  <th key={name} className={`${cell} font-medium`}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map(([day, slots]) => (
                <tr key={day}>
                  <td className={`${cell} border-primary text-primary`}>{day}</td>
                  {slots.map((slot, i) => (
                    <td
                      key={i}
                      className={`${cell} text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground`}
                    >
                      {slot ?? ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
