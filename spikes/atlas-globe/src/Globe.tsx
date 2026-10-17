import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { feature } from 'topojson-client'
import ThreeGlobe from 'three-globe'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { WebGLRenderer } from 'three'
import atlas from 'world-atlas/countries-110m.json'
import { numericToAlpha2 } from './countries'

type Props = { reduceMotion: boolean; onSelect: (id: string) => void; onContextLost: () => void }
function Countries({ onSelect }: Pick<Props, 'onSelect'>) {
  const globe = useMemo(() => new ThreeGlobe(), [])
  const [hovered, setHovered] = useState<string | null>(null)
  useEffect(() => {
    const objects = (atlas as any).objects.countries
    const countries = ((feature(atlas as any, objects) as unknown) as GeoJSON.FeatureCollection).features
    ;(globe.globeMaterial() as any).color.set('#0f172a')
    globe.polygonsData(countries)
      .polygonCapColor((d: any) => numericToAlpha2[String(d.id).padStart(3, '0')] ? '#2563eb' : '#475569')
      .polygonSideColor(() => '#0f172a').polygonStrokeColor(() => '#cbd5e1')
    // three-globe produces one Object3D per Polygon (several for MultiPolygon); tag them for R3F ray events.
    const ids = countries.flatMap((country: any) => Array(country.geometry?.type === 'MultiPolygon' ? country.geometry.coordinates.length : 1).fill(String(country.id).padStart(3, '0')))
    let index = 0
    globe.traverse((object: any) => { if (object.__globeObjType === 'polygon') object.userData.countryId = ids[index++] })
  }, [globe])
  // Changes material colours only; polygonsData/geometry and ID tagging remain intact.
  useEffect(() => { globe.polygonCapColor((d: any) => String(d.id).padStart(3, '0') === hovered ? '#fbbf24' : numericToAlpha2[String(d.id).padStart(3, '0')] ? '#2563eb' : '#475569') }, [globe, hovered])
  const idFromEvent = (event: any) => {
    let object = event.object
    while (object && !object.userData?.countryId) object = object.parent
    return object?.userData?.countryId
  }
  return <primitive object={globe} onPointerMove={(event: any) => { const id = idFromEvent(event); setHovered(id == null ? null : String(id).padStart(3, '0')) }} onPointerOut={() => setHovered(null)} onClick={(event: any) => { const id = idFromEvent(event); if (id != null) onSelect(String(id).padStart(3, '0')) }} />
}
export default function Globe({ reduceMotion, onSelect, onContextLost }: Props) {
  const renderer = useRef<WebGLRenderer | null>(null)
  useEffect(() => {
    const force = () => renderer.current?.forceContextLoss()
    addEventListener('atlas-force-context-loss', force)
    return () => removeEventListener('atlas-force-context-loss', force)
  }, [])
  return <Canvas className="canvas" camera={{ position: [0, 0, 260] }} onCreated={({ gl }) => {
    renderer.current = gl
    gl.domElement.addEventListener('webglcontextlost', event => { event.preventDefault(); onContextLost() }, { once: true })
  }}><ambientLight intensity={2} /><Countries onSelect={onSelect} /><OrbitControls enablePan={false} enableZoom={true} autoRotate={!reduceMotion} autoRotateSpeed={0.35} /></Canvas>
}
