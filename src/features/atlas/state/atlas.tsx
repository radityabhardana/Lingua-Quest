import { createContext, useContext, useReducer, type ReactNode } from 'react'
export type State={selected:string|null;mode:'lite'|'three';started:boolean;retried:boolean;filter:string|null}
export type Action={type:'select';code:string}|{type:'close'}|{type:'filter';region:string|null}|{type:'three'}|{type:'lite'}|{type:'lost'}
const Context=createContext<{state:State;dispatch:(action:Action)=>void}|null>(null)
export function atlasReducer(state:State,action:Action):State { if(action.type==='select')return {...state,selected:action.code};if(action.type==='close')return {...state,selected:null};if(action.type==='filter')return {...state,filter:action.region};if(action.type==='lite')return {...state,mode:'lite'};if(action.type==='three')return state.started&&state.retried?state:{...state,mode:'three',started:true,retried:state.started||state.retried};return {...state,mode:'lite'} }
export function AtlasProvider({children}:{children:ReactNode}) { const [state,dispatch]=useReducer(atlasReducer,{selected:null,mode:'lite',started:false,retried:false,filter:null}); return <Context.Provider value={{state,dispatch}}>{children}</Context.Provider> }
export const useAtlas=()=>{const value=useContext(Context);if(!value)throw Error('AtlasProvider required');return value}
