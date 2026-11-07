import { Modal } from './Modal'
import { SITE } from '../config/site'

type PrivacyPolicyProps = { open: boolean; onClose: () => void }

/** Política de privacidade do site. Revise com o responsável legal antes de publicar. */
export function PrivacyPolicy({ open, onClose }: PrivacyPolicyProps) {
  const owner = [SITE.legalName || SITE.name, SITE.cnpj && `CNPJ ${SITE.cnpj}`].filter(Boolean).join(', ')

  return (
    <Modal open={open} onClose={onClose} label="Política de privacidade">
      <article className="max-h-[85vh] w-[min(720px,92vw)] overflow-y-auto rounded-md border border-border bg-card p-8 md:p-10">
        <h2 className="text-3xl font-bold">Política de privacidade</h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Este site é mantido por {owner} e tem caráter informativo, apresentando a academia, suas modalidades,
            planos e horários.
          </p>
          <p>
            O site não possui formulários e não coleta dados pessoais diretamente. Ao clicar nos botões de contato, você
            é direcionado ao WhatsApp ou ao Instagram, e as informações que você compartilhar nesses aplicativos seguem
            as políticas de privacidade das respectivas plataformas.
          </p>
          <p>
            Os dados enviados por você à nossa equipe pelo WhatsApp são usados apenas para responder ao seu contato e
            tratar da sua matrícula, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
          <p>
            Para solicitar informações, correção ou exclusão dos seus dados, entre em contato com a nossa equipe pelos
            canais informados neste site.
          </p>
        </div>
      </article>
    </Modal>
  )
}
