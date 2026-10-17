# Lingua Quest — World Atlas

Landing page berbasis globe 3D "Night Atlas": dunia yang bisa diputar, diklik per negara, dan pratinjau negara dwibahasa (EN/ID) — dibangun Lite-first agar cepat di perangkat fisik.

> Landing page is bilingual (English / Bahasa Indonesia). Toggle bahasa tersedia langsung di halaman.

## Ringkasan

- **Globe 3D Night Atlas** — palet flat dari token CSS (tanpa shader glow), batas negara terlihat, negara terpilih disorot kuningan.
- **Lite-first** — startup menampilkan atlas lite (teks + SVG) segera; topology 3D (110m) dimuat lazy hanya saat "Explore in 3D".
- **Klik akurat** — klik dipetakan lewat probe raycast tervalidasi (anti salah pin negara tetangga), termasuk kursor pointer deterministik.
- **Ketangguhan** — fallback tanpa WebGL, pemulihan kehilangan konteks WebGL (Retry 3D sekali), kontrak `touch-action` untuk scroll mobile.
- **Data kanonik** — 195 entri (193 negara UN + Vatican + Palestina), 29 negara kecil geometry-id null, deterministik dari CLDR + TopoJSON 110m.

## Stack

| Lapisan | Teknologi |
|---|---|
| UI | React 19, TypeScript, Vite 7 |
| 3D | three 0.186, R3F 9, three-globe (lazy-loaded) |
| Data | CLDR 48.2.0, topojson-client, generator deterministik + SHA-256 |
| Testing | Vitest 4, smoke ujung-ke-ujung Playwright (produksi `vite preview`) |

## Menjalankan

```bat
start.bat
```

atau manual:

```bash
npm install
npm run dev
```

Perintah lain:

| Perintah | Fungsi |
|---|---|
| `npm run check` | typecheck (`tsc -b`) |
| `npm test` | unit tests (Vitest) |
| `npm run build` | build produksi + ukuran gzip |
| `npm run smoke` | smoke produksi (preview + Playwright): klik pointer, touch-action, kehilangan konteks WebGL, locale, fallback tanpa-WebGL |
| `npm run validate:data` | validasi manifest atlas (11 kasus negatif) |
| `npx tsx scripts/generate-atlas.ts --check` | verifikasi determinisme + SHA-256 data |

## Struktur

```
src/
  app/            # App shell (Night Atlas sections)
  sections/       # Landing sections
  styles/         # foundation.css (token Night Atlas)
  features/atlas/
    data/         # manifest.json, provenance.json, maps (kontrak kanonik)
    harness/      # AtlasHarness, LiteAtlas, CountryPreview
    scene/        # Renderer 3D (three-globe) + probe raycast
    state/        # reducer seleksi/filter/mode (lite|three)
scripts/          # generator + validator atlas (LPAS)
public/atlas/     # countries-110m.json (lazy)
docs/             # dokumen desain, provenance data, checklist perangkat
tests/            # vitest + smoke produksi
```

## Lisensi data pihak ketiga

- TopoJSON world-atlas 110m — ISC (`scripts/atlas/WORLD-ATLAS-ISC.txt`)
- CLDR data — Unicode License v3 (`scripts/atlas/UNICODE-LICENSE.txt`)
- Atribusi lengkap: `docs/atlas-data-provenance.md`
