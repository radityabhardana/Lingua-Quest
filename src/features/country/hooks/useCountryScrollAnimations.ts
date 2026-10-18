import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-driven reveal animations for the Country Explorer page.
 * Sections fade + rise into view; card grids stagger; hero content enters on mount.
 */
export function useCountryScrollAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // Start from the top before measuring trigger positions, otherwise a
    // route change leaves stale offsets and elements animate out of place.
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from('.hero-eyebrow', { y: 18, opacity: 0, duration: 0.7, ease: 'power2.out' })
      gsap.from('.hero-title', { y: 34, opacity: 0, duration: 0.9, delay: 0.08, ease: 'power3.out' })
      gsap.from('.hero-alt-name', { y: 20, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power2.out' })
      gsap.from('.hero-visual', { scale: 0.94, opacity: 0, duration: 1.1, delay: 0.1, ease: 'power3.out' })
      gsap.from('.back-to-atlas', { x: -12, opacity: 0, duration: 0.6, ease: 'power2.out' })

      const reveal = (trigger: string, target: string) => {
        const el = document.querySelector(trigger)
        if (!el) return
        gsap.from(target, {
          y: 44,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        })
      }

      reveal('.country-intro', '.country-intro p')
      reveal('.country-facts', '.facts-rows')
      reveal('.country-culture', '.country-culture')
      reveal('.language-explorer', '.language-explorer')
      reveal('.country-fun-facts', '.fun-facts-list')
      reveal('.related-countries', '.related-grid')
      reveal('.expedition-gateway', '.expedition-gateway')

      gsap.from('.fact-row', {
        y: 36,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.country-facts',
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      })

      gsap.from('.phrase-card', {
        y: 30,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.phrase-list',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })

      gsap.from('.related-country-card', {
        y: 34,
        opacity: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.related-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })

      gsap.from('.fun-facts-list li', {
        x: -16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.fun-facts-list',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })

      const cultureImg = document.querySelector('.culture-visual img')
      if (cultureImg) {
        gsap.fromTo(cultureImg,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: '.culture-visual',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        )
      }
    })

    // Recalculate once images and fonts have settled so nothing lands mid-page.
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      window.clearTimeout(refresh)
      window.removeEventListener('load', onLoad)
      ctx.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
}
