import { useState, useEffect, useCallback } from 'react'
import type { CountryDetail } from '../../atlas/data/country-details'
import type { Locale } from '../../../i18n'

interface LanguageExplorerProps {
  detail: CountryDetail
  locale: Locale
  regionName?: string
}

// Only these regions get speech playback, per product scope.
const AUDIO_REGIONS = new Set(['Europe', 'Asia', 'Americas'])

const LANG_TAGS: Record<string, string> = {
  ID: 'id-ID',
  JP: 'ja-JP',
  US: 'en-US',
  GB: 'en-GB',
  FR: 'fr-FR',
  DE: 'de-DE',
  ES: 'es-ES',
  IT: 'it-IT',
  BR: 'pt-BR',
  PT: 'pt-PT',
  CN: 'zh-CN',
  TW: 'zh-TW',
  KR: 'ko-KR',
  TH: 'th-TH',
  VN: 'vi-VN',
  MY: 'ms-MY',
  PH: 'fil-PH',
  IN: 'hi-IN',
  RU: 'ru-RU',
  SA: 'ar-SA',
  EG: 'ar-EG',
  TR: 'tr-TR',
  NL: 'nl-NL',
  SE: 'sv-SE',
  NO: 'nb-NO',
  DK: 'da-DK',
  FI: 'fi-FI',
  PL: 'pl-PL',
  CZ: 'cs-CZ',
  GR: 'el-GR',
  IL: 'he-IL',
  IR: 'fa-IR',
  UA: 'uk-UA',
  RO: 'ro-RO',
  HU: 'hu-HU'
}

export function LanguageExplorer({ detail, locale, regionName }: LanguageExplorerProps) {
  const [expandedPhrase, setExpandedPhrase] = useState<number | null>(null)
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null)
  const [audioSupported, setAudioSupported] = useState(false)

  useEffect(() => {
    const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
    const inScope = regionName ? AUDIO_REGIONS.has(regionName) : false
    setAudioSupported(supported && inScope)
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [regionName])

  const speak = useCallback((text: string, index: number) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = LANG_TAGS[detail.alpha2] ?? 'en-US'
    utterance.rate = 0.85
    utterance.onend = () => setSpeakingIndex(null)
    utterance.onerror = () => setSpeakingIndex(null)

    setSpeakingIndex(index)
    window.speechSynthesis.speak(utterance)
  }, [detail.alpha2])

  const labels = {
    languages: locale === 'id' ? 'Bahasa' : 'Languages',
    phrases: locale === 'id' ? 'Frasa Umum' : 'Common Phrases',
    listen: locale === 'id' ? 'Dengarkan' : 'Listen',
    official: locale === 'id' ? 'Resmi' : 'Official',
    spoken: locale === 'id' ? 'Umum digunakan' : 'Widely spoken'
  }

  if (!detail.phrases || detail.phrases.length === 0) {
    return null
  }

  return (
    <section className="language-explorer page-width" aria-labelledby="language-heading">
      <p className="section-label">{labels.languages}</p>
      <h2 id="language-heading" className="section-heading">
        {labels.phrases}
      </h2>

      <div className="language-chips">
        {detail.languages.official.map((lang, i) => (
          <span key={i} className="language-chip language-chip-primary">
            {lang}
          </span>
        ))}
        {detail.languages.widelySpoken?.map((lang, i) => (
          <span key={i} className="language-chip">
            {lang}
          </span>
        ))}
      </div>

      <div className="phrase-list">
        {detail.phrases.map((phrase, index) => (
          <div
            key={index}
            className={`phrase-card ${expandedPhrase === index ? 'phrase-card-expanded' : ''}`}
          >
            <button
              type="button"
              className="phrase-main"
              onClick={() => setExpandedPhrase(expandedPhrase === index ? null : index)}
              aria-expanded={expandedPhrase === index}
            >
              <span className="phrase-en">{phrase.en}</span>
              <span className="phrase-translation">
                {phrase.translation}
                {phrase.romanization && (
                  <span className="phrase-romanization"> ({phrase.romanization})</span>
                )}
              </span>
            </button>

            {audioSupported && (
              <button
                type="button"
                className={`phrase-audio ${speakingIndex === index ? 'is-speaking' : ''}`}
                onClick={() => speak(phrase.translation, index)}
                aria-label={`${labels.listen}: ${phrase.translation}`}
              >
                <span className="audio-icon" aria-hidden="true">
                  {speakingIndex === index ? (
                    <span className="audio-bars">
                      <i /><i /><i />
                    </span>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </span>
              </button>
            )}

            {phrase.note && expandedPhrase === index && (
              <div className="phrase-note">{phrase.note}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
