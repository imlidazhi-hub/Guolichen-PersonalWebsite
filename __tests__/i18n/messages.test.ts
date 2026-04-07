import { describe, it, expect } from 'vitest'
import zh from '../../src/messages/zh.json'
import en from '../../src/messages/en.json'

describe('i18n messages', () => {
  it('zh and en have the same top-level keys', () => {
    const zhKeys = Object.keys(zh).sort()
    const enKeys = Object.keys(en).sort()
    expect(zhKeys).toEqual(enKeys)
  })

  it('zh messages have nav section with all 5 pages', () => {
    expect(zh).toHaveProperty('nav')
    const nav = zh.nav as Record<string, string>
    expect(nav).toHaveProperty('home')
    expect(nav).toHaveProperty('resume')
    expect(nav).toHaveProperty('projects')
    expect(nav).toHaveProperty('portfolio')
    expect(nav).toHaveProperty('contact')
  })

  it('en nav.home is "Home" and en nav.resume is "Resume"', () => {
    const en_nav = (en as Record<string, Record<string, string>>).nav
    expect(en_nav.home).toBe('Home')
    expect(en_nav.resume).toBe('Resume')
  })
})
