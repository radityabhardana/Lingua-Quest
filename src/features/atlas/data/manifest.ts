import source from './manifest.json'
export type Country = (typeof source.records)[number]
export const countries = source.records as Country[]
export const byCode = new Map(countries.map(country => [country.alpha2,country]))
