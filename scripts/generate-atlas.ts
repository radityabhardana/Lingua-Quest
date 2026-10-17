import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { canonicalAlpha2,listOnly } from './atlas/policy'
const root=process.cwd(), file=(p:string)=>resolve(root,p), json=(p:string)=>JSON.parse(readFileSync(file(p),'utf8'))
const paths={mappings:'node_modules/cldr-core/supplemental/codeMappings.json',containment:'node_modules/cldr-core/supplemental/territoryContainment.json',en:'node_modules/cldr-localenames-full/main/en/territories.json',id:'node_modules/cldr-localenames-full/main/id/territories.json'}
const hash=(p:string)=>createHash('sha256').update(readFileSync(file(p))).digest('hex')
const mappings=json(paths.mappings).supplemental.codeMappings, containment=json(paths.containment).supplemental.territoryContainment
const en=json(paths.en).main.en.localeDisplayNames.territories, id=json(paths.id).main.id.localeDisplayNames.territories
const parents=new Map<string,string[]>();for(const [parent,value] of Object.entries<any>(containment))if(!parent.includes('-'))for(const child of value._contains??[])parents.set(child,[...(parents.get(child)??[]),parent])
const continents=new Set(['002','009','019','142','150'])
function hierarchy(code:string){const walk=(node:string,path:string[]=[]):string[]|undefined=>continents.has(node)?[node,...path]:(parents.get(node)??[]).map(parent=>walk(parent,[node,...path])).find(Boolean);const path=walk(code);if(!path||path.length<2)throw Error(`no CLDR hierarchy for ${code}`);const [region,subregion]=path;return {region:{code:region,nameEn:en[region],nameId:id[region]??en[region]},subregion:{code:subregion,nameEn:en[subregion],nameId:id[subregion]??en[subregion]}}}
const missing=listOnly,observers=new Set(['PS','VA'])
const records=canonicalAlpha2.map(alpha2=>{const map=mappings[alpha2];if(!map?._numeric||!map._alpha3)throw Error(`missing CLDR mapping ${alpha2}`);const numeric=map._numeric;return {alpha2,alpha3:map._alpha3,numeric,nameEn:en[alpha2],nameId:id[alpha2]??en[alpha2],...hierarchy(alpha2),unStatus:observers.has(alpha2)?'observer':'member',geometryId:missing.has(alpha2)?null:numeric,geometryStatus:missing.has(alpha2)?'missing-110m':'matched'}})
const manifest={version:'cldr-48.2.0',records};const output=JSON.stringify(manifest,null,2)+'\n', target='src/features/atlas/data/manifest.json';if(process.argv.includes('--check')){if(readFileSync(file(target),'utf8')!==output)throw Error('manifest is stale; run tsx scripts/generate-atlas.ts')}else writeFileSync(file(target),output)
const provenance={cldr:{version:'48.2.0',license:'Unicode License v3',inputs:Object.fromEntries(Object.entries(paths).map(([name,path])=>[name,{path,sha256:hash(path)}]))},geometry:{package:'world-atlas@2.0.2',sha256:createHash('sha256').update(readFileSync(file('public/atlas/countries-110m.json'))).digest('hex').toUpperCase()}}
const provenanceOutput=JSON.stringify(provenance,null,2)+'\n', provenanceTarget='src/features/atlas/data/provenance.json';if(process.argv.includes('--check')){if(readFileSync(file(provenanceTarget),'utf8')!==provenanceOutput)throw Error('provenance is stale')}else writeFileSync(file(provenanceTarget),provenanceOutput)
