import { useState } from 'react'
import type { CountryDetail } from '../../atlas/data/country-details'
import type { Locale } from '../../../i18n'

interface ExpeditionGatewayProps {
  detail: CountryDetail
  locale: Locale
}

export function ExpeditionGateway({ detail, locale }: ExpeditionGatewayProps) {
  const [showModal, setShowModal] = useState(false)
  const hasExpeditions = detail.expeditions && detail.expeditions.length > 0

  const labels = {
    ready: locale === 'id' ? 'Siap menjelajah?' : 'Ready to explore?',
    available: locale === 'id' 
      ? `${detail.expeditions?.length} ekspedisi tersedia`
      : `${detail.expeditions?.length} expedition${detail.expeditions?.length !== 1 ? 's' : ''} available`,
    viewExpeditions: locale === 'id' ? 'Lihat ekspedisi' : 'View expeditions',
    noExpeditions: locale === 'id' ? 'Belum ada ekspedisi' : 'No expeditions yet',
    comingSoon: locale === 'id'
      ? 'Kami sedang mengembangkan konten pembelajaran untuk negara ini. Periksa kembali segera.'
      : 'We are working on learning content for this country. Check back soon.',
    backToAtlas: locale === 'id' ? 'Kembali ke Atlas' : 'Back to Atlas',
    launching: locale === 'id' ? 'Ekspedisi Segera Hadir' : 'Expeditions Launching Soon',
    launchingMessage: locale === 'id'
      ? 'Fitur ekspedisi sedang dalam pengembangan. Ekspedisi Yogyakarta akan diluncurkan dalam versi mendatang.'
      : 'The expeditions feature is under development. Yogyakarta expeditions will launch in a future release.',
    close: locale === 'id' ? 'Tutup' : 'Close'
  }

  if (hasExpeditions) {
    return (
      <>
        <section className="expedition-gateway page-width">
          <h2>{labels.ready}</h2>
          <p className="expedition-count">{labels.available}</p>
          <button
            className="expedition-button"
            onClick={() => setShowModal(true)}
          >
            {labels.viewExpeditions}
          </button>
        </section>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>{labels.launching}</h3>
              <p>{labels.launchingMessage}</p>
              <button
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                {labels.close}
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <section className="expedition-gateway page-width">
      <h2>{labels.noExpeditions}</h2>
      <p>{labels.comingSoon}</p>
      <a href="/" className="expedition-back">
        <span aria-hidden="true">←</span>
        {labels.backToAtlas}
      </a>
    </section>
  )
}
