export type ClassSlot = {
  /** Formato HH:MM. */
  time: string
  modality: string
  /** `false` quando a associação horário/modalidade ainda precisa ser confirmada. */
  confirmed?: boolean
}

export type ScheduleDay = {
  label: string
  short: string
  /** Período em que a modalidade de horário livre (musculação) está disponível. */
  open?: { from: string; to: string }
  classes: ClassSlot[]
}

/**
 * Grade de aulas extraída do vídeo institucional.
 * Marque `confirmed: true` quando a academia validar os horários.
 */
export const CLASS_SCHEDULE: {
  confirmed: boolean
  /** Modalidade disponível durante todo o período `open` de cada dia. */
  openModality: string
  /** `false` enquanto o período de musculação for provisório. */
  openConfirmed: boolean
  days: ScheduleDay[]
  /** Modalidades oferecidas, mas sem dias e horários divulgados. */
  onRequest: string[]
} = {
  confirmed: false,
  openModality: 'Musculação',
  openConfirmed: false,
  days: [
    {
      label: 'Segunda',
      short: 'Seg',
      open: { from: '06:00', to: '22:00' },
      classes: [
        { time: '07:00', modality: 'Funcional' },
        { time: '18:00', modality: 'Funcional' },
      ],
    },
    { label: 'Terça', short: 'Ter', open: { from: '06:00', to: '22:00' }, classes: [] },
    {
      label: 'Quarta',
      short: 'Qua',
      open: { from: '06:00', to: '22:00' },
      classes: [
        { time: '07:00', modality: 'GAP', confirmed: false },
        { time: '18:00', modality: 'GAP', confirmed: false },
      ],
    },
    { label: 'Quinta', short: 'Qui', open: { from: '06:00', to: '22:00' }, classes: [] },
    {
      label: 'Sexta',
      short: 'Sex',
      open: { from: '06:00', to: '22:00' },
      classes: [{ time: '18:00', modality: 'Abdominal' }],
    },
    { label: 'Sábado', short: 'Sáb', open: { from: '08:00', to: '14:00' }, classes: [] },
  ],
  onRequest: ['Muay Thai'],
}

/** "07:00" → "07h", "18:30" → "18h30". */
export const formatTime = (time: string) => {
  const [h, m] = time.split(':')
  return m === '00' ? `${h}h` : `${h}h${m}`
}

export const formatRange = ({ from, to }: { from: string; to: string }) => `${formatTime(from)} às ${formatTime(to)}`

export const classesAt = (day: ScheduleDay, time: string) => day.classes.filter((c) => c.time === time)

/** Agrupa dias seguidos com o mesmo período de funcionamento. */
function openGroups() {
  const groups: { first: ScheduleDay; last: ScheduleDay; open: { from: string; to: string } }[] = []
  for (const day of CLASS_SCHEDULE.days) {
    if (!day.open) continue
    const prev = groups.at(-1)
    const sameRange = prev && prev.open.from === day.open.from && prev.open.to === day.open.to
    if (prev && sameRange && CLASS_SCHEDULE.days.indexOf(prev.last) === CLASS_SCHEDULE.days.indexOf(day) - 1) {
      prev.last = day
    } else {
      groups.push({ first: day, last: day, open: day.open })
    }
  }
  return groups
}

/** Funcionamento por grupo de dias: [{ days: 'Segunda a sexta', from: '06:00', to: '22:00' }, ...]. */
export const OPENING_HOURS = openGroups().map(({ first, last, open }) => ({
  days: first === last ? first.label : `${first.label} a ${last.label.toLowerCase()}`,
  ...open,
}))

/** "Seg a Sex · 06h às 22h | Sáb · 08h às 14h". */
function openSummary() {
  return openGroups()
    .map((g) => `${g.first === g.last ? g.first.short : `${g.first.short} a ${g.last.short}`} · ${formatRange(g.open)}`)
    .join(' | ')
}

/** Como a modalidade aparece na grade: com aulas, sob consulta ou fora da grade. */
export function scheduleOf(modality: string) {
  if (modality === CLASS_SCHEDULE.openModality && CLASS_SCHEDULE.days.some((day) => day.open)) {
    return { kind: 'classes' as const, summary: openSummary() }
  }
  const days = CLASS_SCHEDULE.days.filter((day) => day.classes.some((c) => c.modality === modality))
  if (days.length) {
    const summary = days
      .map((day) => {
        const times = day.classes.filter((c) => c.modality === modality).map((c) => formatTime(c.time))
        return `${day.label} · ${times.join(' e ')}`
      })
      .join(' | ')
    return { kind: 'classes' as const, summary }
  }
  if (CLASS_SCHEDULE.onRequest.includes(modality)) return { kind: 'onRequest' as const, summary: 'Consulte os horários' }
  return { kind: 'none' as const, summary: '' }
}
