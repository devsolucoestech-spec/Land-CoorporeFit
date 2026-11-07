const EVENT = 'cf:schedule-focus'

/** Pede à seção de horários que destaque uma modalidade (usado pelos cards de modalidades). */
export function focusSchedule(modality: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: modality }))
}

export function onScheduleFocus(handler: (modality: string) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<string>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
