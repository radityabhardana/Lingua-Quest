import type { Locale } from '../i18n'

const dioramaUrl = new URL('../../assets/generated/lingua-diorama.png', import.meta.url).href

export const landingCopy = {
  en: {
    skip: 'Skip to content', navigation: 'Main navigation', howNav: 'How it works',
    expeditionNav: 'The expedition', aboutNav: 'About', eyebrow: 'A language journey, mapped',
    intro: 'A world of places. One place to begin. Choose a country, explore its atlas entry, or discover our Yogyakarta expedition preview.',
    featuredLink: 'Discover Yogyakarta', liteNote: 'Lite first. 3D is optional.',
    belowAtlas: 'There’s more below the map', footerNote: 'Explore with curiosity. Learn in context.',
    footerNavigation: 'Footer navigation', accessibilityNav: 'Accessibility', attributionNav: 'Attribution', backTop: 'Back to atlas',
    howLabel: 'The starting point', howTitle: 'Follow your curiosity.',
    howIntro: 'Start with a place, not a test. The atlas helps you find your way to the content available here.',
    steps: [
      ['Choose a country', 'Search by name or use the country list. The same preview opens in Lite and 3D.'],
      ['See what’s there', 'Find the country’s names, codes, region, and a clear content label.'],
      ['Find your next step', 'Explore other countries in the region, or visit the Yogyakarta preview below.'],
    ],
    coverageLabel: 'A clear view of coverage', coverageTitle: 'An atlas is not an expedition.',
    coverageIntro: 'The map is broad. The learning preview is deliberately focused. Here is what this landing page offers today.',
    tierA: 'Tier A · Expedition preview', tierATitle: 'One place, a closer look.',
    tierABody: 'Indonesia · Yogyakarta. An original illustrated setting introduces the expedition concept. This is a preview, not a playable mission.',
    tierC: 'Atlas coverage', tierCTitle: '195 country entries.',
    tierCBody: 'All 195 countries have an atlas entry with searchable names, ISO codes, and regions. Indonesia also has the illustrated preview; the other 194 countries are atlas-only (Tier C). No playable missions are offered.',
    coverageNote: 'No account, saved progress, or mission completion is offered on this page.',
    featuredLabel: 'Featured expedition · Indonesia', featuredTitle: 'Begin in Yogyakarta.',
    featuredBody: 'A small setting for a bigger idea: learning a language through situations, people, and choices. Take a first look at the original Yogyakarta illustration.',
    previewLabel: 'Illustrated preview, not a playable mission',
    imageAlt: 'Original low-poly illustration of a pavilion, a welcome table, a path, trees, and two abstract people.',
    figureCaption: 'An imagined learning setting, not a navigation map or a documentary depiction of the city.',
    featuredNext: 'Want to look somewhere else?', featuredAction: 'Return to the country list',
    aboutLabel: 'About Lingua Quest', aboutTitle: 'Language belongs in context.',
    aboutBody: 'Lingua Quest explores an idea: connect language learning with the curiosity that takes us to new places. This landing page brings together a world atlas and one illustrated expedition preview.',
    accessTitle: 'A lighter way is a full way in.',
    accessBody: 'Use search and the HTML country list without loading 3D. Both views share the selected country and its preview. Keyboard focus stays visible, and reduced-motion preferences are respected.',
    accessNote: '3D is an optional candidate view. Performance on target mobile devices is still being verified.',
    attributionTitle: 'Sources & original work',
    attributionBody: 'Map geometry: Natural Earth, distributed through world-atlas. Country names and regions follow the atlas data manifest. Boundaries are illustrative; a map shape does not define the country list.',
    artworkBody: 'Yogyakarta artwork: original project illustration and Blender scene, created with AI-assisted tooling. The setting and people are illustrative, not cultural claims.',
  },
  id: {
    skip: 'Lewati ke konten', navigation: 'Navigasi utama', howNav: 'Cara kerja',
    expeditionNav: 'Ekspedisi', aboutNav: 'Tentang', eyebrow: 'Peta awal perjalanan bahasa',
    intro: 'Banyak tempat untuk dijelajahi. Satu tempat untuk memulai. Pilih negara, lihat entri atlasnya, atau temukan pratinjau ekspedisi Yogyakarta.',
    featuredLink: 'Temukan Yogyakarta', liteNote: 'Mulai dengan Lite. 3D opsional.',
    belowAtlas: 'Masih ada cerita di bawah peta', footerNote: 'Jelajahi dengan rasa ingin tahu. Belajar lewat konteks.',
    footerNavigation: 'Navigasi footer', accessibilityNav: 'Aksesibilitas', attributionNav: 'Atribusi', backTop: 'Kembali ke atlas',
    howLabel: 'Titik awal', howTitle: 'Ikuti rasa ingin tahumu.',
    howIntro: 'Mulai dari sebuah tempat, bukan tes. Atlas membantumu menemukan konten yang tersedia di sini.',
    steps: [
      ['Pilih negara', 'Cari nama atau gunakan daftar negara. Ringkasan yang sama terbuka di Lite maupun 3D.'],
      ['Lihat isinya', 'Temukan nama, kode, wilayah, dan label konten negara yang jelas.'],
      ['Tentukan langkah berikutnya', 'Jelajahi negara lain di wilayah itu, atau lihat pratinjau Yogyakarta di bawah.'],
    ],
    coverageLabel: 'Cakupan yang jelas', coverageTitle: 'Atlas bukanlah ekspedisi.',
    coverageIntro: 'Petanya luas. Pratinjau belajarnya sengaja terfokus. Inilah yang tersedia di halaman ini saat ini.',
    tierA: 'Tier A · Pratinjau ekspedisi', tierATitle: 'Satu tempat, lebih dekat.',
    tierABody: 'Indonesia · Yogyakarta. Latar ilustrasi orisinal memperkenalkan konsep ekspedisi. Ini pratinjau, bukan misi yang dapat dimainkan.',
    tierC: 'Cakupan atlas', tierCTitle: '195 entri negara.',
    tierCBody: 'Seluruh 195 negara memiliki entri atlas berisi nama, kode ISO, dan wilayah yang dapat dicari. Indonesia juga memiliki pratinjau ilustrasi; 194 negara lainnya hanya memiliki atlas (Tier C). Tidak ada misi yang dapat dimainkan.',
    coverageNote: 'Halaman ini tidak menyediakan akun, penyimpanan progres, atau penyelesaian misi.',
    featuredLabel: 'Ekspedisi pilihan · Indonesia', featuredTitle: 'Mulai di Yogyakarta.',
    featuredBody: 'Latar kecil untuk gagasan yang lebih besar: belajar bahasa melalui situasi, orang, dan pilihan. Lihat ilustrasi Yogyakarta orisinal sebagai langkah awal.',
    previewLabel: 'Pratinjau ilustrasi, bukan misi yang dapat dimainkan',
    imageAlt: 'Ilustrasi low-poly orisinal berisi pendopo, meja penyambutan, jalan setapak, pepohonan, dan dua figur manusia abstrak.',
    figureCaption: 'Latar belajar imajinatif, bukan peta navigasi atau penggambaran dokumenter kota.',
    featuredNext: 'Ingin melihat tempat lain?', featuredAction: 'Kembali ke daftar negara',
    aboutLabel: 'Tentang Lingua Quest', aboutTitle: 'Bahasa hidup dalam konteks.',
    aboutBody: 'Lingua Quest mengeksplorasi gagasan: menghubungkan belajar bahasa dengan rasa ingin tahu yang membawa kita ke tempat baru. Halaman ini menyatukan atlas dunia dan satu pratinjau ekspedisi berilustrasi.',
    accessTitle: 'Tampilan ringan, akses tetap utuh.',
    accessBody: 'Gunakan pencarian dan daftar negara HTML tanpa memuat 3D. Kedua tampilan berbagi pilihan negara dan ringkasannya. Fokus keyboard terlihat jelas, dan preferensi pengurangan gerak dihormati.',
    accessNote: '3D adalah tampilan kandidat opsional. Kinerja pada perangkat seluler sasaran masih diverifikasi.',
    attributionTitle: 'Sumber & karya orisinal',
    attributionBody: 'Geometri peta: Natural Earth, didistribusikan melalui world-atlas. Nama negara dan wilayah mengikuti manifes data atlas. Batas bersifat ilustratif; bentuk peta tidak menentukan daftar negara.',
    artworkBody: 'Karya Yogyakarta: ilustrasi proyek dan adegan Blender orisinal, dibuat dengan bantuan alat AI. Latar dan tokohnya bersifat ilustratif, bukan klaim budaya.',
  },
} as const

export function LandingSections({ locale }: { locale: Locale }) {
  const t = landingCopy[locale]

  return (
    <>
      <section id="how-it-works" className="landing-section page-width" aria-labelledby="how-title">
        <div className="section-intro">
          <div><p className="eyebrow">{t.howLabel}</p><h2 id="how-title">{t.howTitle}</h2></div>
          <p>{t.howIntro}</p>
        </div>
        <ol className="journey-steps">
          {t.steps.map(([title, body], index) => (
            <li key={index}>
              <span className="step-number" aria-hidden="true">0{index + 1}</span>
              <h3>{title}</h3><p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="coverage" className="coverage-section" aria-labelledby="coverage-title">
        <div className="page-width landing-section">
          <div className="section-intro">
            <div><p className="eyebrow">{t.coverageLabel}</p><h2 id="coverage-title">{t.coverageTitle}</h2></div>
            <p>{t.coverageIntro}</p>
          </div>
          <div className="coverage-grid">
            <article className="coverage-entry">
              <p className="tier-label"><span className="tier-symbol tier-symbol-a" aria-hidden="true">◆</span>{t.tierA}</p>
              <h3>{t.tierATitle}</h3><p>{t.tierABody}</p>
              <a className="text-link" href="#featured-expedition">{t.featuredLink}<span aria-hidden="true">↗</span></a>
            </article>
            <article className="coverage-entry">
              <p className="tier-label"><span className="tier-symbol" aria-hidden="true">○</span>{t.tierC}</p>
              <h3>{t.tierCTitle}</h3><p>{t.tierCBody}</p>
              <a className="text-link" href="#atlas-explorer">{t.featuredAction}<span aria-hidden="true">↑</span></a>
            </article>
          </div>
          <p className="section-note">{t.coverageNote}</p>
        </div>
      </section>

      <section id="featured-expedition" className="featured-section page-width landing-section" aria-labelledby="featured-title" tabIndex={-1}>
        <div className="featured-copy">
          <p className="eyebrow">{t.featuredLabel}</p>
          <h2 id="featured-title">{t.featuredTitle}</h2>
          <p>{t.featuredBody}</p>
          <p className="preview-label"><span aria-hidden="true">◆</span>{t.previewLabel}</p>
        </div>
        <figure className="expedition-figure">
          <img src={dioramaUrl} alt={t.imageAlt} width="1600" height="1200" loading="lazy" decoding="async" />
          <figcaption>{t.figureCaption}</figcaption>
        </figure>
        <div className="featured-return"><p>{t.featuredNext}</p><a className="text-link" href="#atlas-explorer">{t.featuredAction}<span aria-hidden="true">↑</span></a></div>
      </section>

      <section id="about" className="about-section page-width landing-section" aria-labelledby="about-title">
        <p className="eyebrow">{t.aboutLabel}</p>
        <h2 id="about-title">{t.aboutTitle}</h2>
        <p className="about-body">{t.aboutBody}</p>
      </section>

      <div className="page-width information-grid">
        <section id="accessibility" aria-labelledby="access-title">
          <p className="eyebrow">{t.accessibilityNav}</p><h2 id="access-title">{t.accessTitle}</h2>
          <p>{t.accessBody}</p><p>{t.accessNote}</p>
          <a className="text-link" href="#atlas-explorer">{t.featuredAction}<span aria-hidden="true">↑</span></a>
        </section>
        <section id="attribution" aria-labelledby="attribution-title">
          <p className="eyebrow">{t.attributionNav}</p><h2 id="attribution-title">{t.attributionTitle}</h2>
          <p>{t.attributionBody}</p><p>{t.artworkBody}</p>
        </section>
      </div>
    </>
  )
}
