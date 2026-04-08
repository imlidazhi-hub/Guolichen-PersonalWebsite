import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh', 'en'] as const,
  defaultLocale: 'zh',
})
