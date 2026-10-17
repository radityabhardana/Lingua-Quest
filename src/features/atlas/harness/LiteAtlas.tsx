import { useState } from 'react'
import { countries } from '../data/manifest'
import { useAtlas } from '../state/atlas'
import { normalize } from '../runtime'
import { copy,type Locale } from '../../../i18n'
const regionOf=(country:any)=>country.region
export function LiteAtlas({locale}:{locale:Locale}){const {state,dispatch}=useAtlas(),[query,setQuery]=useState(''),t=copy[locale],visible=countries.filter(country=>(!state.filter||String(regionOf(country)?.code)===state.filter)&&normalize(`${country.nameEn} ${country.nameId}`).includes(normalize(query))),selected=countries.find(country=>country.alpha2===state.selected);return <section className="country-list" aria-label={t.lite}><p className="atlas-selection-summary">{selected?`${t.selected}: ${locale==='id'?selected.nameId:selected.nameEn}`:t.ready}</p><label className="atlas-search">{t.search}<input value={query} onChange={event=>setQuery(event.target.value)}/></label>{state.filter&&<button onClick={()=>dispatch({type:'filter',region:null})}>{t.reset}</button>}<ul>{visible.map(country=><li key={country.alpha2}><button aria-pressed={country.alpha2===state.selected} onClick={()=>dispatch({type:'select',code:country.alpha2})}>{locale==='id'?country.nameId:country.nameEn}</button>{country.geometryStatus==='missing-110m'&&<small> {t.listOnly}</small>}</li>)}</ul></section>}
