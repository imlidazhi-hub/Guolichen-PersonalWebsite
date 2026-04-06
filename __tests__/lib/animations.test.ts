import { describe, it, expect } from 'vitest'
import { slideInFromLeft, glitchVariants, personaPageTransition } from '@/lib/animations'

describe('animations', () => {
  it('slideInFromLeft has hidden and visible states', () => {
    expect(slideInFromLeft.hidden).toBeDefined()
    expect(slideInFromLeft.visible).toBeDefined()
    expect((slideInFromLeft.hidden as { x: number }).x).toBeLessThan(0)
    expect((slideInFromLeft.visible as { x: number }).x).toBe(0)
  })

  it('personaPageTransition has initial, animate, exit variants', () => {
    expect(personaPageTransition.initial).toBeDefined()
    expect(personaPageTransition.animate).toBeDefined()
    expect(personaPageTransition.exit).toBeDefined()
  })

  it('glitchVariants has idle and glitch states', () => {
    expect(glitchVariants.idle).toBeDefined()
    expect(glitchVariants.glitch).toBeDefined()
  })
})
