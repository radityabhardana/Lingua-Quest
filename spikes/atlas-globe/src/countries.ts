/** Verified against ISO 3166-1 numeric assignments. Covers continental, island, and multipolygon examples. */
export const numericToAlpha2: Record<string, string> = {
  '036': 'AU', '076': 'BR', '124': 'CA', '152': 'CL', '250': 'FR',
  '356': 'IN', '360': 'ID', '392': 'JP', '554': 'NZ', '608': 'PH',
  '710': 'ZA', '724': 'ES', '826': 'GB', '840': 'US'
}

export const testedCountryIds = Object.keys(numericToAlpha2)
export function countryName(numericId: string | number, locale = navigator.language): string {
  const code = numericToAlpha2[String(numericId).padStart(3, '0')]
  return code ? new Intl.DisplayNames([locale], { type: 'region' }).of(code) ?? code : `Country ${numericId}`
}
