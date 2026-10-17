import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { byCode, countries } from '../data/manifest'
import { getCountryDetail } from '../data/country-details'
import { copy, type Locale } from '../../../i18n'

type CountryDetailProps = {
  locale: Locale
}

export function CountryDetail({ locale }: CountryDetailProps) {
  const { alpha2 } = useParams<{ alpha2: string }>()
  const navigate = useNavigate()
  const heroRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    heroRef.current?.focus()
    window.scrollTo(0, 0)
  }, [alpha2])

  if (!alpha2) {
    navigate('/')
    return null
  }

  const country = byCode.get(alpha2.toUpperCase())
  if (!country) {
    navigate('/')
    return null
  }

  const detail = getCountryDetail(alpha2.toUpperCase())
  const t = copy[locale]
  const name = locale === 'id' ? country.nameId : country.nameEn
  const altName = locale === 'id' ? country.nameEn : country.nameId
  const region = locale === 'id' ? country.region.nameId : country.region.nameEn
  const subregion = locale === 'id' ? country.subregion.nameId : country.subregion.nameEn
  const culture = locale === 'id' ? detail.cultureId : detail.cultureEn
  const funFacts = locale === 'id' ? detail.funFactsId : detail.funFactsEn
  
  // Related countries: neighbors or same subregion (max 6)
  const related = countries
    .filter(c => {
      if (c.alpha2 === country.alpha2) return false
      if (detail.borders.some(b => c.nameEn === b || c.nameId === b)) return true
      return c.subregion.code === country.subregion.code
    })
    .slice(0, 6)

  const labels = {
    backToAtlas: locale === 'id' ? 'Kembali ke Atlas' : 'Back to Atlas',
    quickFacts: locale === 'id' ? 'Fakta Singkat' : 'Quick Facts',
    capital: locale === 'id' ? 'Ibu Kota' : 'Capital',
    population: locale === 'id' ? 'Populasi' : 'Population',
    area: locale === 'id' ? 'Luas' : 'Area',
    languages: locale === 'id' ? 'Bahasa' : 'Languages',
    official: locale === 'id' ? 'Resmi' : 'Official',
    spoken: locale === 'id' ? 'Umum' : 'Widely Spoken',
    geography: locale === 'id' ? 'Geografi' : 'Geography',
    coordinates: locale === 'id' ? 'Koordinat' : 'Coordinates',
    borders: locale === 'id' ? 'Berbatasan dengan' : 'Borders',
    noBorders: locale === 'id' ? 'Negara kepulauan/tidak berbatasan darat' : 'Island nation / No land borders',
    culture: locale === 'id' ? 'Budaya' : 'Culture',
    funFacts: locale === 'id' ? 'Fakta Menarik' : 'Fun Facts',
    related: locale === 'id' ? 'Negara Terkait' : 'Related Countries',
    exploreRegion: locale === 'id' ? 'Jelajahi negara lain di kawasan ini' : 'Explore other countries in this region'
  }

  return (
    <div className="country-detail-page">
      <button 
        className="back-to-atlas"
        onClick={() => navigate('/')}
        aria-label={labels.backToAtlas}
      >
        <span aria-hidden="true">←</span>
        {labels.backToAtlas}
      </button>

      <article className="country-detail">
        <header className="country-hero" ref={heroRef} tabIndex={-1}>
          <div className="country-flag" aria-label={`Flag of ${name}`}>
            <span className="flag-placeholder" role="img">
              {country.alpha2}
            </span>
          </div>
          <h1>{name}</h1>
          {altName !== name && <p className="alt-name">{altName}</p>}
        </header>

        <section className="quick-facts" aria-labelledby="quick-facts-heading">
          <h2 id="quick-facts-heading">{labels.quickFacts}</h2>
          <dl className="facts-grid">
            <div>
              <dt>{labels.capital}</dt>
              <dd>{detail.capital}</dd>
            </div>
            <div>
              <dt>{labels.population}</dt>
              <dd>{detail.population}</dd>
            </div>
            <div>
              <dt>{labels.area}</dt>
              <dd>{detail.area}</dd>
            </div>
            <div>
              <dt>{t.tier}</dt>
              <dd>{region} / {subregion}</dd>
            </div>
          </dl>
        </section>

        <section className="country-languages" aria-labelledby="languages-heading">
          <h2 id="languages-heading">{labels.languages}</h2>
          <dl>
            <dt>{labels.official}</dt>
            <dd>{detail.languages.official.join(', ')}</dd>
            {detail.languages.widelySpoken && (
              <>
                <dt>{labels.spoken}</dt>
                <dd>{detail.languages.widelySpoken.join(', ')}</dd>
              </>
            )}
          </dl>
        </section>

        <section className="country-geography" aria-labelledby="geography-heading">
          <h2 id="geography-heading">{labels.geography}</h2>
          <dl>
            <dt>{labels.coordinates}</dt>
            <dd>{detail.coordinates}</dd>
            <dt>{labels.borders}</dt>
            <dd>
              {detail.borders.length > 0 
                ? detail.borders.join(', ') 
                : labels.noBorders}
            </dd>
          </dl>
        </section>

        <section className="country-culture" aria-labelledby="culture-heading">
          <h2 id="culture-heading">{labels.culture}</h2>
          {culture.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>

        <section className="country-facts" aria-labelledby="facts-heading">
          <h2 id="facts-heading">{labels.funFacts}</h2>
          <ul>
            {funFacts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </section>

        {related.length > 0 && (
          <section className="related-countries" aria-labelledby="related-heading">
            <h2 id="related-heading">{labels.related}</h2>
            <p className="related-intro">{labels.exploreRegion}</p>
            <nav className="related-grid" aria-label={labels.related}>
              {related.map(c => (
                <a 
                  key={c.alpha2}
                  href={`/country/${c.alpha2.toLowerCase()}`}
                  className="related-card"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/country/${c.alpha2.toLowerCase()}`)
                  }}
                >
                  <span className="related-flag" aria-hidden="true">{c.alpha2}</span>
                  <span className="related-name">{locale === 'id' ? c.nameId : c.nameEn}</span>
                </a>
              ))}
            </nav>
          </section>
        )}
      </article>
    </div>
  )
}
