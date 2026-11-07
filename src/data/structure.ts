export type StructurePhoto = {
  label: string
  /** Foto real do ambiente. Sem `src`, o espaço aparece reservado ("foto em breve"). */
  src?: string
  /** Tamanho do bloco na galeria assimétrica. */
  size: 'large' | 'wide' | 'small'
}

export const STRUCTURE_PHOTOS: StructurePhoto[] = [
  { label: 'Área de musculação', size: 'large' },
  { label: 'Equipamentos', size: 'small' },
  { label: 'Espaço funcional', size: 'small' },
  { label: 'Área de cardio', size: 'small' },
  { label: 'Outros ambientes', size: 'small' },
]
