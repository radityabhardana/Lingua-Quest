import { describe,it,expect } from 'vitest'
import { atlasReducer } from './atlas'
const initial={selected:null,mode:'lite' as const,started:false,retried:false,filter:null}
describe('atlas reducer',()=>{it('permits one renderer retry',()=>{let state=atlasReducer(initial,{type:'three'});state=atlasReducer(state,{type:'lost'});state=atlasReducer(state,{type:'three'});state=atlasReducer(state,{type:'lost'});expect(atlasReducer(state,{type:'three'}).mode).toBe('lite')});it('keeps selection on renderer loss',()=>{const state=atlasReducer({...initial,selected:'ID',mode:'three'},{type:'lost'});expect(state.selected).toBe('ID')})})
