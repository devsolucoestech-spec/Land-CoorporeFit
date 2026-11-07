export type ClassSlot = { time: string; modality: string }

export type ScheduleDay = {
  label: string
  short: string
  classes: ClassSlot[]
}

/** Grade de aulas coletivas. Provisória: marque `confirmed: true` quando a grade for oficial. */
export const CLASS_SCHEDULE: { confirmed: boolean; days: ScheduleDay[] } = {
  confirmed: false,
  days: [
    {
      label: 'Segunda',
      short: 'Seg',
      classes: [
        { time: '07:00', modality: 'Funcional' },
        { time: '19:00', modality: 'HIIT' },
      ],
    },
    {
      label: 'Terça',
      short: 'Ter',
      classes: [
        { time: '07:00', modality: 'HIIT' },
        { time: '19:00', modality: 'Funcional' },
      ],
    },
    {
      label: 'Quarta',
      short: 'Qua',
      classes: [
        { time: '07:00', modality: 'Funcional' },
        { time: '19:00', modality: 'HIIT' },
      ],
    },
    {
      label: 'Quinta',
      short: 'Qui',
      classes: [
        { time: '07:00', modality: 'HIIT' },
        { time: '19:00', modality: 'Funcional' },
      ],
    },
    {
      label: 'Sexta',
      short: 'Sex',
      classes: [
        { time: '07:00', modality: 'Funcional' },
        { time: '18:00', modality: 'HIIT' },
      ],
    },
    {
      label: 'Sábado',
      short: 'Sáb',
      classes: [{ time: '09:00', modality: 'Funcional' }],
    },
  ],
}
