import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { byCode, countries } from '../atlas/data/manifest'
import { getCountryDetail } from '../atlas/data/country-details'
import type { Locale } from '../../i18n'
import { CountryHero } from './components/CountryHero'
import { FactRow, type FactItem } from './components/FactRow'
import { LanguageExplorer } from './components/LanguageExplorer'
import { RelatedCountryCard } from './components/RelatedCountryCard'
import { ExpeditionGateway } from './components/ExpeditionGateway'
import { useCountryScrollAnimations } from './hooks/useCountryScrollAnimations'
import './styles/country-detail.css'

type CountryDetailProps = {
  locale: Locale
}

const ICONS = {
  capital: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  population: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  area: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  ),
  languages: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function CountryDetail({ locale }: CountryDetailProps) {
  const { alpha2 } = useParams<{ alpha2: string }>()
  const navigate = useNavigate()
  const heroRef = useRef<HTMLDivElement>(null)

  useCountryScrollAnimations()

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
  const name = locale === 'id' ? country.nameId : country.nameEn
  const culture = locale === 'id' ? detail.cultureId : detail.cultureEn
  const funFacts = locale === 'id' ? detail.funFactsId : detail.funFactsEn
  const intro = locale === 'id' ? detail.introId : detail.introEn
  const hasCulture = Boolean(culture?.trim())
  const hasFunFacts = funFacts.length > 0
  const hasIllustration = country.alpha2 === 'ID'
  const hasPhrases = Boolean(detail.phrases?.length)

  const related = countries
    .filter(c => {
      if (c.alpha2 === country.alpha2) return false
      if (detail.borders.some(b => c.nameEn === b || c.nameId === b)) return true
      return c.subregion.code === country.subregion.code
    })
    .slice(0, 6)

  const labels = {
    quickFacts: locale === 'id' ? 'Fakta Singkat' : 'Quick Facts',
    capital: locale === 'id' ? 'Ibu Kota' : 'Capital',
    population: locale === 'id' ? 'Populasi' : 'Population',
    area: locale === 'id' ? 'Luas' : 'Area',
    languages: locale === 'id' ? 'Bahasa' : 'Languages',
    culture: locale === 'id' ? 'Budaya' : 'Culture',
    cultureBrief: locale === 'id' ? 'Konteks budaya singkat' : 'A brief cultural context',
    funFacts: locale === 'id' ? 'Fakta Menarik' : 'Fun Facts',
    related: locale === 'id' ? 'Negara Terkait' : 'Related Countries',
    exploreRegion: locale === 'id' ? 'Jelajahi negara lain di kawasan ini' : 'Explore other countries in this region',
    contentPending: locale === 'id'
      ? 'Konten budaya dan fakta sedang disusun untuk negara ini.'
      : 'Cultural notes and fun facts are being prepared for this country.',
    contentPendingSub: locale === 'id'
      ? 'Data geografis di atas diverifikasi; narasi editorial akan menyusul.'
      : 'The geographic data above is verified; editorial narrative is on the way.'
  }

  // Build fact items, each with whatever imagery exists.
  const facts: FactItem[] = [
    {
      icon: ICONS.capital,
      label: labels.capital,
      value: detail.capital,
      image: detail.images?.capital,
      imageCaption: detail.capital !== '—' ? detail.capital : undefined,
      detail: locale === 'id'
        ? `Pusat pemerintahan dan denyut budaya negara. ${detail.capital} menyatukan administrasi, sejarah, dan ritme kehidupan kota. Di sinilah pengunjung pertama kali membaca karakter sebuah bangsa.`
        : `The seat of government and the country's cultural pulse. ${detail.capital} brings together administration, history, and the pace of urban life. It is often the first place a visitor reads the rhythm of the nation.`
    },
    {
      icon: ICONS.population,
      label: labels.population,
      value: detail.population,
      image: detail.images?.landscape,
      imageCaption: locale === 'id' ? 'Lanskap khas' : 'Signature landscape',
      detail: locale === 'id'
        ? 'Sebaran penduduk membentuk cara orang tinggal, bekerja, dan berpindah. Kota besar menampung konsentrasi terpadat, sementara wilayah lain tetap menjadi lanskap yang menentukan identitas negara.'
        : `Where people live shapes how they work, travel, and gather. Urban centres hold the densest concentrations, while the wider landscape carries much of the country's identity.`
    },
    {
      icon: ICONS.area,
      label: labels.area,
      value: detail.area,
      image: detail.images?.area,
      imageCaption: locale === 'id' ? 'Bentang alam' : 'Terrain',
      detail: locale === 'id'
        ? 'Luas wilayah menentukan jarak, iklim, dan keragaman bentang alam yang harus dilalui untuk mengenal sebuah negara. Skala ini juga menjelaskan mengapa satu negara bisa memiliki banyak tradisi lokal sekaligus.'
        : 'Area sets the scale of distance, climate, and terrain you have to cross to know a country. It also explains how one nation can hold so many distinct local traditions at once.'
    },
    {
      icon: ICONS.languages,
      label: labels.languages,
      value: detail.languages.official.join(', '),
      image: detail.images?.language,
      imageCaption: locale === 'id' ? 'Bahasa' : 'Language',
      detail: (detail.languages.widelySpoken?.length
        ? (locale === 'id' ? 'Juga digunakan: ' : 'Also spoken: ') + detail.languages.widelySpoken.join(', ') + '. '
        : '') + (locale === 'id'
        ? 'Bahasa membawa cara pandang: sapaan, tingkat kesopanan, dan ungkapan sehari-hari menunjukkan bagaimana orang membangun hubungan.'
        : 'Language carries a way of seeing: greetings, levels of politeness, and everyday expressions reveal how people build relationships.')
    }
  ]

  // Deduplicate by image URL so the same photo never appears twice.
  const seenImages = new Set<string>()
  const photoFacts = facts.filter(f => {
    if (!f.image) return false
    if (seenImages.has(f.image)) return false
    seenImages.add(f.image)
    return true
  })
  const textFacts = facts.filter(f => !f.image || !photoFacts.includes(f))

  return (
    <div className="country-detail-page" ref={heroRef} tabIndex={-1}>
      <CountryHero country={country} locale={locale} />

      {intro && (
        <div className="country-intro page-width">
          <p>{intro}</p>
        </div>
      )}

      <section className="country-facts page-width" aria-labelledby="facts-heading">
        <p className="section-label">{labels.quickFacts}</p>
        <h2 id="facts-heading" className="visually-hidden">{labels.quickFacts}</h2>

        <div className="facts-rows">
          {photoFacts.map((fact, i) => (
            <FactRow key={fact.label} fact={fact} flip={i % 2 === 1} />
          ))}
        </div>

        {textFacts.length > 0 && (
          <div className="facts-text-band">
            {textFacts.map(fact => (
              <FactRow key={fact.label} fact={fact} />
            ))}
          </div>
        )}
      </section>

      {hasCulture ? (
        <section className="country-culture page-width" aria-labelledby="culture-heading">
          <div className="culture-heading-col">
            <p className="section-label">{labels.culture}</p>
            <h2 id="culture-heading" className="section-heading">
              {labels.cultureBrief}
            </h2>
            {hasIllustration && (
              <figure className="culture-visual">
                <img src="/assets/diorama.png" alt="" loading="lazy" />
              </figure>
            )}
          </div>
          <div className="culture-content">
            {culture.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      ) : (
        <section className="country-pending page-width" aria-labelledby="pending-heading">
          <h2 id="pending-heading" className="pending-title">{labels.contentPending}</h2>
          <p className="pending-sub">{labels.contentPendingSub}</p>
        </section>
      )}

      {hasPhrases && (
        <LanguageExplorer
          detail={detail}
          locale={locale}
          regionName={country.region.nameEn}
        />
      )}

      {hasFunFacts && (
        <section className="country-fun-facts page-width" aria-labelledby="fun-facts-heading">
          <p className="section-label">{labels.funFacts}</p>
          <h2 id="fun-facts-heading" className="visually-hidden">{labels.funFacts}</h2>
          <ul className="fun-facts-list">
            {funFacts.map((fact, i) => (
              <li key={i}>
                <span className="fun-fact-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="fun-fact-text">{fact}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="related-countries page-width" aria-labelledby="related-heading">
          <p className="section-label">{labels.related}</p>
          <h2 id="related-heading" className="section-heading">
            {labels.exploreRegion}
          </h2>
          <div className="related-grid">
            {related.map(c => (
              <RelatedCountryCard key={c.alpha2} country={c} locale={locale} />
            ))}
          </div>
        </section>
      )}

      <ExpeditionGateway detail={detail} locale={locale} />
    </div>
  )
}
