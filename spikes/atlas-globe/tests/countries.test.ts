import { describe, expect, it } from 'vitest'
import { numericToAlpha2, testedCountryIds } from '../src/countries'
describe('country mapping', () => {
  it('covers fourteen representative numeric ISO IDs', () => expect(testedCountryIds).toHaveLength(14))
  it('makes every canonical-list ID selectable via a region code', () => expect(testedCountryIds.every(id => /^[A-Z]{2}$/.test(numericToAlpha2[id]))).toBe(true))
  it('keeps island and multipolygon selections canonical', () => {
    expect(numericToAlpha2['554']).toBe('NZ')
    expect(numericToAlpha2['360']).toBe('ID')
    expect(numericToAlpha2['826']).toBe('GB')
  })
})
