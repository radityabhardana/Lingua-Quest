import { useEffect } from 'react'
import { AtlasProvider } from '../features/atlas/state/atlas'
import { AtlasHarness } from '../features/atlas/harness/AtlasHarness'
import { copy, type Locale } from '../i18n'
import { LandingSections, landingCopy } from '../sections/LandingSections'
import { useScrollAnimations } from '../hooks/useScrollAnimations'

interface LandingProps {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export function Landing({ locale, setLocale }: LandingProps) {
  const t = copy[locale]
  const page = landingCopy[locale]

  useEffect(() => { document.documentElement.lang = locale }, [locale])
  useScrollAnimations()

  return (
    <AtlasProvider>
      <div className="night-atlas" lang={locale}>
        <a className="skip-link" href="#main-content">{page.skip}</a>
        <header className="site-header page-width">
          <a className="wordmark" href="#main-content" aria-label="Lingua Quest">
            <span className="brand-mark" aria-hidden="true">✳</span>
            <span>Lingua<span className="wordmark-light"> Quest</span></span>
          </a>
          <nav className="header-nav" aria-label={page.navigation}>
            <a href="#how-it-works">{page.howNav}</a>
            <a href="#featured-expedition">{page.expeditionNav}</a>
            <a href="#about">{page.aboutNav}</a>
          </nav>
          <button
            className="locale-switch"
            onClick={() => setLocale(locale === 'en' ? 'id' : 'en')}
            aria-label={locale === 'en' ? 'Ganti bahasa ke Bahasa Indonesia' : 'Switch language to English'}
          >
            <span lang="en" className={locale === 'en' ? 'locale-active' : undefined}>EN</span>
            <span className="locale-divider" aria-hidden="true">/</span>
            <span lang="id" className={locale === 'id' ? 'locale-active' : undefined}>ID</span>
          </button>
        </header>

        <main id="main-content" tabIndex={-1}>
          <section className="atlas-hero page-width" aria-labelledby="atlas-title">
            <div className="hero-intro">
              <div>
                <p className="eyebrow"><span className="route-diamond" aria-hidden="true" />{page.eyebrow}</p>
                <h1 id="atlas-title">{t.title}<span className="title-period" aria-hidden="true">.</span></h1>
              </div>
              <div className="hero-brief">
                <p>{page.intro}</p>
                <div className="hero-links">
                  <a className="text-link" href="#atlas-explorer">{t.hint}<span aria-hidden="true">↘</span></a>
                  <a className="quiet-link" href="#featured-expedition">{page.featuredLink}<span aria-hidden="true">↓</span></a>
                </div>
              </div>
            </div>

            <div id="atlas-explorer" className="atlas-explorer" tabIndex={-1}>
              <AtlasHarness locale={locale} />
            </div>

            <div className="hero-footnote">
              <p><span className="lite-indicator" aria-hidden="true">○</span>{page.liteNote}</p>
              <p>{t.boundary}</p>
            </div>
            <a className="below-atlas-link" href="#how-it-works">{page.belowAtlas}<span aria-hidden="true">↓</span></a>
          </section>

          <LandingSections locale={locale} />
        </main>

        <footer className="site-footer page-width">
          <a className="wordmark" href="#main-content">Lingua<span className="wordmark-light"> Quest</span></a>
          <p>{page.footerNote}</p>
          <nav aria-label={page.footerNavigation}>
            <a href="#accessibility">{page.accessibilityNav}</a>
            <a href="#attribution">{page.attributionNav}</a>
            <a href="#atlas-title">{page.backTop}<span aria-hidden="true">↑</span></a>
          </nav>
        </footer>
      </div>
    </AtlasProvider>
  )
}
