# Lingua Quest — World Atlas & Country Explorer

Platform eksplorasi dunia berbasis globe 3D yang menghubungkan penjelajahan geografis dengan pembelajaran bahasa dan budaya. Dibangun dengan pendekatan **Lite-first** agar tetap cepat dan dapat diakses di perangkat dengan sumber daya terbatas.

> Antarmuka tersedia dalam Bahasa Indonesia dan English. Pengalih bahasa ada di header.

## Fitur

### World Atlas (Landing)

- **Globe 3D interaktif** dengan tekstur bumi resolusi tinggi dan batas negara
- **Dua mode tampilan**: Lite (daftar HTML, instan) dan 3D (dimuat sesuai permintaan)
- **Pencarian dan filter wilayah** untuk 195 entri negara
- **Pratinjau negara** dengan nama, kode ISO, dan wilayah
- **Fallback otomatis** saat WebGL tidak tersedia atau konteks hilang

### Country Explorer

- **Globe per negara** yang dapat diputar dan diperbesar, dengan negara terpilih disorot
- **Quick Facts** dengan foto dan narasi: ibu kota, populasi, luas, bahasa
- **Konteks budaya** dengan ilustrasi dan teks kurasi
- **Frasa bahasa** dengan pelafalan audio untuk kawasan Eropa, Asia, dan Amerika
- **Negara terkait** berdasarkan perbatasan dan subwilayah
- **Gerbang ekspedisi** yang jujur menandai ketersediaan konten

## Stack

| Lapisan | Teknologi |
|---|---|
| UI | React 19, TypeScript 5.9, Vite 7 |
| Routing | react-router-dom 7 |
| 3D | three 0.186, React Three Fiber 9, three-globe 2.44, drei 10 |
| Animasi | GSAP 3 dengan ScrollTrigger |
| Data geografis | topojson-client, world-atlas 2.0 (TopoJSON 110m) |
| Data negara | mledoze/countries, World Bank, Wikipedia/Wikimedia |
| Testing | Vitest 4, Playwright (smoke test) |

## Menjalankan

```bash
npm install
npm run dev
```

Atau gunakan `start.bat` pada Windows.

### Perintah

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Server pengembangan Vite |
| `npm run check` | Typecheck TypeScript |
| `npm test` | Unit test Vitest |
| `npm run build` | Build produksi |
| `npm run smoke` | Smoke test produksi dengan Playwright |
| `npm run validate:data` | Validasi manifest atlas |

## Struktur Proyek

```
src/
  app/                        Shell aplikasi dan routing
    App.tsx
    Router.tsx                Rute: / dan /country/:alpha2
    Landing.tsx
  sections/                   Seksi landing page
  hooks/                      Hook animasi scroll landing
  styles/                     foundation.css (token desain Night Atlas)
  i18n/                       String antarmuka EN/ID
  design-system/              Aset SVG
  features/
    atlas/
      data/                   manifest.json, maps, provenance
      harness/                AtlasHarness, LiteAtlas, CountryPreview
      scene/                  Renderer three-globe
      state/                  Reducer seleksi dan mode
    country/
      CountryDetail.tsx       Halaman Country Explorer
      components/             Hero, FactRow, LanguageExplorer, dll
      hooks/                  Animasi scroll country
      styles/                 country-detail.css
scripts/
  atlas/                      Generator dan validator data atlas
  data-pipeline/              Skrip pengambilan data negara dan gambar
public/
  atlas/                      countries-110m.json
  assets/                     Tekstur bumi dan ilustrasi
docs/
  implementation/             Laporan audit dan implementasi per job
tests/                        Unit test dan smoke test
```

## Data

### Sumber

- **Geometri negara**: Natural Earth melalui `world-atlas` (TopoJSON 110m, domain publik)
- **Nama dan kode negara**: CLDR 48.2 dengan manifest proyek
- **Fakta negara**: `mledoze/countries` (lisensi ODbL)
- **Populasi**: World Bank Open Data
- **Gambar**: Wikipedia dan Wikimedia Commons
- **Tekstur bumi**: NASA Visible Earth Blue Marble (domain publik)

### Cakupan

- 195 entri negara dengan nama, kode ISO, dan wilayah
- 250 negara dengan data faktual hasil pengayaan
- 193 negara dengan foto, setelah penyaringan gambar bendera dan peta
- Konten editorial kurasi (budaya, fakta menarik, frasa) untuk Indonesia, Jepang, dan Amerika Serikat

Negara tanpa konten editorial menampilkan data faktual terverifikasi dan status konten yang jelas, bukan teks placeholder.

## Lisensi Data Pihak Ketiga

- TopoJSON world-atlas 110m: ISC (`scripts/atlas/WORLD-ATLAS-ISC.txt`)
- CLDR: Unicode License v3 (`scripts/atlas/UNICODE-LICENSE.txt`)
- Atribusi lengkap: `docs/atlas-data-provenance.md`

## Dokumentasi

- `docs/implementation/JOB-00-AUDIT.md` — audit repositori awal
- `docs/implementation/JOB-02-DESIGN-PROPOSAL.md` — proposal desain Country Explorer
- `docs/implementation/JOB-02-COUNTRY-EXPLORER.md` — laporan implementasi
- `docs/atlas-data-provenance.md` — asal usul data atlas
- `docs/atlas-device-checklist.md` — checklist pengujian perangkat
