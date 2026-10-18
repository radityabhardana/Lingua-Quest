import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useMemo, useState } from 'react'
import { feature } from 'topojson-client'
import ThreeGlobe from 'three-globe'
import { Vector3, TextureLoader, MeshBasicMaterial, SRGBColorSpace, Group } from 'three'
import type { Country } from '../../atlas/data/manifest'
import type { Locale } from '../../../i18n'
import { topologyUrl } from '../../atlas/runtime'
import { numericToCountry } from '../../atlas/data/maps'

interface CountryHeroProps {
  country: Country
  locale: Locale
}

const BASE = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/'
const TEXTURE_URL = `${BASE}assets/earth-day.jpg`

// Cache topology + texture across navigations so switching countries is instant.
let topologyCache: any = null
let topologyPromise: Promise<any> | null = null

function loadTopology() {
  if (topologyCache) return Promise.resolve(topologyCache)
  if (!topologyPromise) {
    topologyPromise = fetch(topologyUrl())
      .then(r => {
        if (!r.ok) throw new Error('topology unavailable')
        return r.json()
      })
      .then(t => {
        topologyCache = t
        return t
      })
      .catch(err => {
        topologyPromise = null
        throw err
      })
  }
  return topologyPromise
}

function HeroGlobe({ alpha2 }: { alpha2: string }) {
  const { camera } = useThree()
  const [ready, setReady] = useState(false)
  const groupRef = useRef<Group>(null)

  // Fresh globe per country so nothing leaks between routes.
  const globe = useMemo(() => {
    const texture = new TextureLoader().load(TEXTURE_URL)
    texture.colorSpace = SRGBColorSpace
    return new ThreeGlobe()
      .globeMaterial(new MeshBasicMaterial({ map: texture }))
      .showAtmosphere(false)
  }, [])

  useEffect(() => {
    let cancelled = false

    loadTopology()
      .then(topology => {
        if (cancelled) return

        const features = (feature(topology, topology.objects.countries) as any).features
        const codeOf = (value: unknown) =>
          numericToCountry.get(String(value ?? '').padStart(3, '0'))?.alpha2

        // Only the selected country becomes a polygon so the texture stays visible.
        const selected = features.filter((f: any) => codeOf(f.id) === alpha2)

        globe
          .polygonsData(selected)
          .polygonCapColor(() => '#e7be7c')
          .polygonSideColor(() => 'rgba(0,0,0,0)')
          .polygonStrokeColor(() => '#ffdc9c')
          .polygonAltitude(() => 0.012)
          .polygonsTransitionDuration(0)

        // Aim the camera at the country's centroid.
        if (selected.length) {
          const pts: [number, number][] = []
          const collect = (c: any) => {
            if (typeof c?.[0] === 'number') pts.push(c as [number, number])
            else c?.forEach(collect)
          }
          collect(selected[0].geometry.coordinates)

          if (pts.length) {
            let lonSum = 0, latSum = 0
            pts.forEach(([lon, lat]) => { lonSum += lon; latSum += lat })
            const lat = latSum / pts.length
            const lng = lonSum / pts.length

            const phi = (90 - lat) * Math.PI / 180
            const theta = (90 - lng) * Math.PI / 180
            const phiSin = Math.sin(phi)
            const dist = 300
            camera.position.set(
              dist * phiSin * Math.cos(theta),
              dist * Math.cos(phi),
              dist * phiSin * Math.sin(theta)
            )
            camera.lookAt(0, 0, 0)
            camera.updateProjectionMatrix()
          }
        }

        setReady(true)
      })
      .catch(() => setReady(false))

    return () => { cancelled = true }
  }, [globe, alpha2, camera])

  // Dispose only on unmount.
  useEffect(() => () => {
    globe.clear()
    const material = globe.globeMaterial?.() as MeshBasicMaterial | undefined
    material?.map?.dispose()
    material?.dispose()
  }, [globe])

  return (
    <group ref={groupRef}>
      <primitive object={globe} visible={ready} />
    </group>
  )
}

export function CountryHero({ country, locale }: CountryHeroProps) {
  const name = locale === 'id' ? country.nameId : country.nameEn
  const altName = locale === 'id' ? country.nameEn : country.nameId
  const region = locale === 'id' ? country.region.nameId : country.region.nameEn
  const subregion = locale === 'id' ? country.subregion.nameId : country.subregion.nameEn

  return (
    <section className="country-hero">
      <div className="hero-content">
        <div className="hero-text">
          <a href="/" className="back-to-atlas">
            {locale === 'id' ? 'Kembali ke Atlas' : 'Back to Atlas'}
          </a>

          <p className="hero-region">
            {region} / {subregion}
          </p>

          <h1 className="hero-title">
            {name}<span className="title-period" aria-hidden="true">.</span>
            <img
              className="hero-flag-inline"
              src={`https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${country.alpha2.toLowerCase()}.svg`}
              alt=""
              width={640}
              height={480}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          </h1>

          {altName !== name && <p className="hero-alt-name">{altName}</p>}

          <p className="hero-hint">
            {locale === 'id' ? 'Geser untuk memutar, scroll untuk memperbesar' : 'Drag to rotate, scroll to zoom'}
          </p>
        </div>

        <div className="hero-visual" aria-label={`Interactive globe showing ${name}`}>
          <Canvas
            key={country.alpha2}
            camera={{ position: [0, 0, 300], fov: 45 }}
            className="country-canvas"
            dpr={[1, 1.75]}
            gl={{ antialias: true, alpha: true }}
          >
            <HeroGlobe alpha2={country.alpha2} />
            <OrbitControls
              enablePan={false}
              enableZoom
              enableRotate
              rotateSpeed={0.55}
              zoomSpeed={0.8}
              minDistance={170}
              maxDistance={480}
              minPolarAngle={0.25}
              maxPolarAngle={Math.PI - 0.25}
              enableDamping
              dampingFactor={0.08}
            />
          </Canvas>
        </div>
      </div>
    </section>
  )
}
