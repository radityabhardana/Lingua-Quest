import { Component,lazy,Suspense,type ReactNode,useState } from 'react'
import { useAtlas } from '../state/atlas'
import { canUseWebGL } from '../runtime'
import { LiteAtlas } from './LiteAtlas'
import { CountryPreview } from './CountryPreview'
import { copy,type Locale } from '../../../i18n'
import { byCode } from '../data/manifest'
const Renderer=lazy(()=>import('../scene/Renderer'))
class RendererBoundary extends Component<{onLost:()=>void;children:ReactNode},{failed:boolean}>{state={failed:false};componentDidCatch(){this.setState({failed:true});this.props.onLost()}render(){return this.state.failed?null:this.props.children}}
export function AtlasHarness({locale}:{locale:Locale}){const {state,dispatch}=useAtlas(),[captured,setCaptured]=useState(false),t=copy[locale],country=state.selected?byCode.get(state.selected):null,start=()=>{if(canUseWebGL())dispatch({type:'three'});else dispatch({type:'lost'})};return <section className="atlas-harness"><div className="atlas-stage"><div className="atlas-poster" aria-hidden="true">◎</div><p id="globe-instructions" className="globe-instructions">{t.instructions}</p>{state.mode==='three'&&<RendererBoundary onLost={()=>dispatch({type:'lost'})}><Suspense fallback={<p className="atlas-status">{t.loading}</p>}><Renderer locale={locale} captured={captured} onLost={()=>dispatch({type:'lost'})}/></Suspense></RendererBoundary>}</div><p className="atlas-status" aria-live="polite">{country?`${t.selected}: ${locale==='id'?country.nameId:country.nameEn}`:state.mode==='lite'?t.lite:t.three}</p><div className="atlas-controls">{state.mode==='lite'&&(!state.started||!state.retried)&&<button onClick={start}>{state.started?t.retry:t.try3d}</button>}{state.mode==='three'&&<><button onClick={()=>dispatch({type:'lite'})}>{t.returnLite}</button><button aria-pressed={captured} onClick={()=>setCaptured(value=>!value)}>{captured?'Release globe':'Capture globe'}</button></>}</div><CountryPreview locale={locale}/><LiteAtlas locale={locale}/></section>}
