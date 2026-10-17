// Enriched country data for detail pages. Sample data for 3 countries; rest stubbed.
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
}

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
    ]
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
    ]
  }
]

export const detailsByCode = new Map(sampleData.map(d => [d.alpha2, d]))

// Placeholder generator for countries without enriched data
export function getCountryDetail(alpha2: string): CountryDetail {
  const existing = detailsByCode.get(alpha2)
  if (existing) return existing
  
  // Stub structure for enrichment
  return {
    alpha2,
    capital: '[Capital data needed]',
    population: '[Population data needed]',
    area: '[Area data needed]',
    languages: {
      official: ['[Language data needed]']
    },
    coordinates: '[Coordinates data needed]',
    borders: [],
    cultureEn: 'Cultural information for this country is being researched. Check back soon for detailed insights into traditions, history, and contemporary life.',
    cultureId: 'Informasi budaya untuk negara ini sedang diriset. Kembali lagi untuk wawasan mendetail tentang tradisi, sejarah, dan kehidupan kontemporer.',
    funFactsEn: [
      'Rich cultural heritage',
      'Unique geographic features',
      'Diverse linguistic landscape'
    ],
    funFactsId: [
      'Warisan budaya yang kaya',
      'Fitur geografis unik',
      'Lanskap linguistik beragam'
    ]
  }
}
