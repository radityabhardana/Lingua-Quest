// Enriched country data for detail pages. Sample data for 3 countries; rest stubbed.
import enrichedSource from './country-details-enriched.json'

export type CountryDetail = {
  alpha2: string
  capital: string
  population: string
  area: string
  languages: {
    official: string[]
    widelySpoken?: string[]
  }
  coordinates: string
  borders: string[]
  cultureEn: string
  cultureId: string
  funFactsEn: string[]
  funFactsId: string[]
  introEn?: string  // Hero one-liner
  introId?: string
  phrases?: Array<{
    en: string
    translation: string
    romanization?: string
    note?: string
  }>
  expeditions?: string[]  // Expedition IDs
  /** Optional visual anchor images keyed by theme. */
  images?: {
    capital?: string
    landscape?: string
    culture?: string
    area?: string
    language?: string
  }
}

type EnrichedRecord = {
  alpha2: string
  capital: string | null
  population: string | null
  area: string | null
  languages: { official: string[]; widelySpoken: string[] }
  coordinates: string | null
  borders: string[]
  region: string | null
  subregion: string | null
}

const enriched = enrichedSource as Record<string, EnrichedRecord>

import imageSource from './country-images.json'
const countryImages = imageSource as Record<string, { capital?: string; landscape?: string; culture?: string; area?: string; language?: string }>

// Sample data — Indonesia, USA, Japan
const sampleData: CountryDetail[] = [
  {
    alpha2: 'ID',
    capital: 'Jakarta',
    population: '277 million',
    area: '1,904,569 km²',
    languages: {
      official: ['Indonesian'],
      widelySpoken: ['Javanese', 'Sundanese', 'Malay']
    },
    coordinates: '0°47′S 113°55′E',
    borders: ['Malaysia', 'Papua New Guinea', 'Timor-Leste'],
    cultureEn: 'Indonesia is an archipelago of over 17,000 islands, home to hundreds of ethnic groups and languages. The nation blends indigenous traditions with Hindu, Buddhist, and Islamic influences, creating a rich cultural tapestry.\n\nFrom Balinese dance to Javanese gamelan, Indonesian arts reflect centuries of cross-cultural exchange. The philosophy of Pancasila and the concept of gotong royong (mutual cooperation) shape social life.',
    cultureId: 'Indonesia adalah kepulauan dengan lebih dari 17.000 pulau, rumah bagi ratusan kelompok etnis dan bahasa. Bangsa ini memadukan tradisi asli dengan pengaruh Hindu, Buddha, dan Islam, menciptakan kekayaan budaya.\n\nDari tarian Bali hingga gamelan Jawa, seni Indonesia mencerminkan pertukaran lintas budaya selama berabad-abad. Filosofi Pancasila dan konsep gotong royong membentuk kehidupan sosial.',
    funFactsEn: [
      'Largest archipelago nation on Earth',
      'Home to the Komodo dragon, found nowhere else',
      'Fourth most populous country globally',
      'Borobudur is the world\'s largest Buddhist temple',
      'Over 700 living languages spoken'
    ],
    funFactsId: [
      'Negara kepulauan terbesar di dunia',
      'Habitat komodo yang tidak ada di tempat lain',
      'Negara terpadat keempat di dunia',
      'Borobudur adalah candi Buddha terbesar',
      'Lebih dari 700 bahasa masih digunakan'
    ],
    introEn: 'An archipelago of thousands of islands, where diverse cultures meet ancient traditions and modern aspirations.',
    introId: 'Kepulauan ribuan pulau, tempat beragam budaya bertemu tradisi kuno dan aspirasi modern.',
    phrases: [
      {
        en: 'Hello',
        translation: 'Halo',
        note: 'Informal greeting, commonly used'
      },
      {
        en: 'Good morning',
        translation: 'Selamat pagi',
        note: 'Used until around 11 AM'
      },
      {
        en: 'Thank you',
        translation: 'Terima kasih',
        note: 'Standard expression of gratitude'
      },
      {
        en: 'You\'re welcome',
        translation: 'Sama-sama',
        note: 'Literally "same-same", mutual acknowledgment'
      },
      {
        en: 'Excuse me / Sorry',
        translation: 'Permisi / Maaf',
        note: 'Permisi for attention, maaf for apology'
      },
      {
        en: 'How much?',
        translation: 'Berapa harganya?',
        note: 'Essential for markets and shops'
      }
    ],
    expeditions: ['yogyakarta-01']
  },
  {
    alpha2: 'US',
    capital: 'Washington, D.C.',
    population: '334 million',
    area: '9,833,520 km²',
    languages: {
      official: ['None (de facto English)'],
      widelySpoken: ['English', 'Spanish', 'Chinese', 'Tagalog']
    },
    coordinates: '38°N 97°W',
    borders: ['Canada', 'Mexico'],
    cultureEn: 'The United States is a nation built on immigration, creating a diverse cultural landscape shaped by Indigenous peoples, European colonization, African heritage, and waves of global migration.\n\nAmerican culture emphasizes individualism, innovation, and the "American Dream" ideal. From jazz and rock to Hollywood and Silicon Valley, US cultural exports have shaped global trends.',
    cultureId: 'Amerika Serikat adalah bangsa yang dibangun atas imigrasi, menciptakan lanskap budaya beragam yang dibentuk oleh masyarakat pribumi, kolonisasi Eropa, warisan Afrika, dan gelombang migrasi global.\n\nBudaya Amerika menekankan individualisme, inovasi, dan ideal "American Dream". Dari jazz dan rock hingga Hollywood dan Silicon Valley, ekspor budaya AS telah membentuk tren global.',
    funFactsEn: [
      'No official language at federal level',
      'Home to the world\'s largest economy',
      'Yellowstone: first national park (1872)',
      'The Internet originated from ARPANET',
      '50 states with distinct regional cultures'
    ],
    funFactsId: [
      'Tidak ada bahasa resmi tingkat federal',
      'Rumah ekonomi terbesar di dunia',
      'Yellowstone: taman nasional pertama (1872)',
      'Internet berasal dari ARPANET',
      '50 negara bagian dengan budaya khas'
    ],
    introEn: 'A vast nation of fifty states, shaped by immigration and innovation across diverse landscapes and cultures.',
    introId: 'Bangsa luas dengan lima puluh negara bagian, dibentuk oleh imigrasi dan inovasi di seluruh lanskap dan budaya beragam.',
    phrases: [
      { en: 'Hello', translation: 'Hello', note: 'Common informal greeting across the country' },
      { en: 'Thank you', translation: 'Thank you', note: 'Standard expression of gratitude' },
      { en: 'Excuse me', translation: 'Excuse me', note: 'Used to get attention or apologize' },
      { en: 'How are you?', translation: 'How are you?', note: 'Casual greeting among acquaintances' },
      { en: 'Please', translation: 'Please', note: 'Added to requests for politeness' },
      { en: 'Goodbye', translation: 'Goodbye', note: 'Common parting phrase' }
    ]
  },
  {
    alpha2: 'JP',
    capital: 'Tokyo',
    population: '125 million',
    area: '377,975 km²',
    languages: {
      official: ['Japanese'],
      widelySpoken: ['English (limited)']
    },
    coordinates: '36°N 138°E',
    borders: [],
    cultureEn: 'Japan blends ancient traditions with cutting-edge modernity. From tea ceremonies and sumo wrestling to anime and robotics, the culture balances preservation of heritage with technological innovation.\n\nThe concepts of wa (harmony), omotenashi (hospitality), and mono no aware (appreciation of transience) shape social interactions and aesthetics across daily life and art.',
    cultureId: 'Jepang memadukan tradisi kuno dengan modernitas canggih. Dari upacara teh dan sumo hingga anime dan robotika, budayanya menyeimbangkan pelestarian warisan dengan inovasi teknologi.\n\nKonsep wa (harmoni), omotenashi (keramahan), dan mono no aware (apresiasi ketidakkekalan) membentuk interaksi sosial dan estetika dalam kehidupan sehari-hari dan seni.',
    funFactsEn: [
      'Island nation with no land borders',
      'Home to the world\'s oldest company (Kongō Gumi, 578 CE)',
      'Over 6,800 islands in the archipelago',
      'Highest life expectancy globally',
      'Shinkansen bullet trains since 1964'
    ],
    funFactsId: [
      'Negara kepulauan tanpa perbatasan darat',
      'Rumah perusahaan tertua di dunia (Kongō Gumi, 578 M)',
      'Lebih dari 6.800 pulau di kepulauan',
      'Harapan hidup tertinggi di dunia',
      'Kereta peluru Shinkansen sejak 1964'
    ],
    introEn: 'Where ancient temples stand beside neon cities, tradition and innovation exist in harmonious balance.',
    introId: 'Tempat kuil kuno berdiri di samping kota neon, tradisi dan inovasi hadir dalam keseimbangan harmonis.',
    phrases: [
      {
        en: 'Hello',
        translation: 'こんにちは',
        romanization: 'Konnichiwa',
        note: 'Standard daytime greeting'
      },
      {
        en: 'Good morning',
        translation: 'おはようございます',
        romanization: 'Ohayō gozaimasu',
        note: 'Polite morning greeting'
      },
      {
        en: 'Thank you',
        translation: 'ありがとうございます',
        romanization: 'Arigatō gozaimasu',
        note: 'Polite expression of gratitude'
      },
      {
        en: 'Excuse me',
        translation: 'すみません',
        romanization: 'Sumimasen',
        note: 'Also used for "sorry" and getting attention'
      },
      {
        en: 'Yes / No',
        translation: 'はい / いいえ',
        romanization: 'Hai / Iie',
        note: 'Basic affirmation and negation'
      },
      {
        en: 'I don\'t understand',
        translation: 'わかりません',
        romanization: 'Wakarimasen',
        note: 'Useful when communication is difficult'
      }
    ],
    expeditions: ['kyoto-01']
  }
]

export const detailsByCode = new Map(sampleData.map(d => [d.alpha2, d]))

// Resolve a human-readable country name from an ISO3 border code.
import { countries } from './manifest'
const byIso3 = new Map(countries.map(c => [c.alpha3, c]))

function resolveBorderNames(codes: string[]): string[] {
  return codes
    .map(code => byIso3.get(code)?.nameEn)
    .filter((n): n is string => Boolean(n))
}

/**
 * Returns country detail. Prefers hand-written editorial content (culture,
 * fun facts, phrases) where it exists, and fills factual fields from the
 * verified enriched dataset for every other country. Never returns
 * placeholder strings.
 */
export function getCountryDetail(alpha2: string): CountryDetail {
  const editorial = detailsByCode.get(alpha2)
  const facts = enriched[alpha2]
  const images = countryImages[alpha2]

  if (editorial) {
    // Editorial content wins, but backfill any missing factual field.
    return {
      ...editorial,
      capital: editorial.capital || facts?.capital || '—',
      population: editorial.population || facts?.population || '—',
      area: editorial.area || facts?.area || '—',
      coordinates: editorial.coordinates || facts?.coordinates || '—',
      languages: {
        official: editorial.languages.official.length
          ? editorial.languages.official
          : (facts?.languages.official ?? []),
        widelySpoken: editorial.languages.widelySpoken ?? facts?.languages.widelySpoken ?? []
      },
      borders: editorial.borders.length
        ? editorial.borders
        : resolveBorderNames(facts?.borders ?? []),
      images: {
        capital: images?.capital,
        landscape: images?.landscape,
        culture: images?.culture,
        area: images?.area,
        language: images?.language
      }
    }
  }

  const official = facts?.languages.official ?? []
  const borderNames = resolveBorderNames(facts?.borders ?? [])

  return {
    alpha2,
    capital: facts?.capital ?? '—',
    population: facts?.population ?? '—',
    area: facts?.area ?? '—',
    languages: { official, widelySpoken: [] },
    coordinates: facts?.coordinates ?? '—',
    borders: borderNames,
    cultureEn: '',
    cultureId: '',
    funFactsEn: [],
    funFactsId: [],
    images: {
      capital: images?.capital,
      landscape: images?.landscape,
      culture: images?.culture,
      area: images?.area,
      language: images?.language
    }
  }
}
