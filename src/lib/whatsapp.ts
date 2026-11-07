import { SITE } from '../config/site'

/**
 * Link do WhatsApp com mensagem pronta.
 * Sem número configurado, o WhatsApp abre e pede para escolher o contato.
 */
export function whatsappUrl(message: string) {
  const text = encodeURIComponent(message)
  return SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`
}

export const hasWhatsapp = Boolean(SITE.whatsapp)
