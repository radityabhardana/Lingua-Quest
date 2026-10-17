import { countries } from './manifest'
export const numericToCountry=new Map(countries.filter(c=>c.geometryId).map(c=>[c.numeric,c]))
export const missingCodes=new Set(countries.filter(c=>!c.geometryId).map(c=>c.alpha2))
