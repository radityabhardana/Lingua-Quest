import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Country } from '../../atlas/data/manifest'
import type { Locale } from '../../../i18n'

interface RelatedCountryCardProps {
  country: Country
  locale: Locale
}

export function RelatedCountryCard({ country, locale }: RelatedCountryCardProps) {
  const navigate = useNavigate()
  const [imgFailed, setImgFailed] = useState(false)
  const name = locale === 'id' ? country.nameId : country.nameEn
  const region = locale === 'id' ? country.region.nameId : country.region.nameEn
  const code = country.alpha2.toLowerCase()

  const handleClick = () => navigate(`/country/${code}`)

  return (
    <div
      className="related-country-card"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${name}`}
    >
      <div className="related-flag" aria-hidden="true">
        {imgFailed ? (
          <span className="related-flag-fallback">{country.alpha2}</span>
        ) : (
          <img
            src={`https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${code}.svg`}
            alt=""
            loading="lazy"
            decoding="async"
            width={640}
            height={480}
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
      <div className="related-name">{name}</div>
      <div className="related-meta">{country.alpha2} · {region}</div>
    </div>
  )
}
