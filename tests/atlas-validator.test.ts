import { describe, expect, it } from 'vitest'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import manifest from '../src/features/atlas/data/manifest.json'
import provenance from '../src/features/atlas/data/provenance.json'
import topology from '../public/atlas/countries-110m.json'
import mappingsFile from '../node_modules/cldr-core/supplemental/codeMappings.json'
import containmentFile from '../node_modules/cldr-core/supplemental/territoryContainment.json'
import enFile from '../node_modules/cldr-localenames-full/main/en/territories.json'
import idFile from '../node_modules/cldr-localenames-full/main/id/territories.json'
import { validateAtlas } from '../scripts/atlas/validate'

type Fixture = { manifest: any; provenance: any; topology: any; topologyHash: string; packageVersions: { cldr: string; worldAtlas: string }; sourceHashes: Record<string, string>; mappings: any; containment: any; en: any; id: any }
const paths = { mappings: 'node_modules/cldr-core/supplemental/codeMappings.json', containment: 'node_modules/cldr-core/supplemental/territoryContainment.json', en: 'node_modules/cldr-localenames-full/main/en/territories.json', id: 'node_modules/cldr-localenames-full/main/id/territories.json' }
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex')
const fixture = (): Fixture => ({ manifest: structuredClone(manifest), provenance: structuredClone(provenance), topology: structuredClone(topology), topologyHash: hash('public/atlas/countries-110m.json').toUpperCase(), packageVersions: { cldr: '48.2.0', worldAtlas: '2.0.2' }, sourceHashes: Object.fromEntries(Object.entries(paths).map(([key, path]) => [key, hash(path)])), mappings: mappingsFile.supplemental.codeMappings, containment: containmentFile.supplemental.territoryContainment, en: enFile.main.en.localeDisplayNames.territories, id: idFile.main.id.localeDisplayNames.territories })
const record = (value: Fixture, code: string) => value.manifest.records.find((row: any) => row.alpha2 === code)
const mutations: Record<string, (value: Fixture) => void> = {
  numeric(value) { value.manifest.records[0].numeric = '999' },
  hash(value) { delete value.provenance.cldr.inputs.en },
  unexpected(value) { value.topology.objects.countries.geometries.push({ id: '999' }) },
  inert(value) { value.topology.objects.countries.geometries = value.topology.objects.countries.geometries.filter((geometry: any) => String(geometry.id) !== '010') },
  matched(value) { value.topology.objects.countries.geometries = value.topology.objects.countries.geometries.filter((geometry: any) => String(geometry.id) !== '004') },
  borrowed(value) { record(value, 'VA').geometryId = '380' },
  swapped(value) { const af = record(value, 'AF'), al = record(value, 'AL'); [af.geometryId, al.geometryId] = [al.geometryId, af.geometryId] },
  region(value) { record(value, 'AL').region = { code: '999', nameEn: 'x', nameId: 'x' } },
  subregion(value) { record(value, 'AL').subregion = { code: '999', nameEn: 'x', nameId: 'x' } },
  topologyHash(value) { value.topologyHash = 'bad' },
  package(value) { value.packageVersions.worldAtlas = '0.0.0' }
}
describe('atlas validator', () => {
  it('accepts production fixture', () => expect(validateAtlas(fixture())).toBe(true))
  for (const [name, mutate] of Object.entries(mutations)) it(`rejects ${name}`, () => { const value = fixture(); mutate(value); expect(() => validateAtlas(value)).toThrow() })
})
