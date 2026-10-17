import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up sections on scroll
      gsap.utils.toArray<HTMLElement>('.landing-section').forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none none'
          }
        })
      })

      // Fade up journey steps with stagger
      gsap.from('.journey-steps li', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.journey-steps',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })

      // Parallax expedition image
      gsap.to('.expedition-figure img', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.expedition-figure',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Coverage grid entries
      gsap.from('.coverage-entry', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.coverage-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      })
    })

    return () => ctx.revert()
  }, [])
}
