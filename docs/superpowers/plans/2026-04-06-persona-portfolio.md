# Persona × Cyberpunk 个人作品集网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个以《女神异闻录》风格为设计语言、融合赛博朋克元素的个人作品集网站，面向AI训练师/数据标注职业方向求职展示，支持中英双语。

**Architecture:** 使用 Next.js 14（App Router + 静态导出）构建，通过 `[locale]` 路由实现中英双语，Tailwind CSS 处理样式，Framer Motion 实现 Persona 风格动效。部署到 Vercel 或 GitHub Pages。

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, next-intl, Recharts（技能雷达图）, React Testing Library, Vitest

---

## 文件结构总览

```
PersonalWebsite/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # 全局布局，加载 NPC + 导航 + 过场动画
│   │   │   ├── page.tsx            # 首页
│   │   │   ├── resume/page.tsx     # 简历页
│   │   │   ├── projects/page.tsx   # 项目页
│   │   │   ├── portfolio/page.tsx  # 作品集页
│   │   │   └── contact/page.tsx    # 联系页
│   │   └── globals.css             # 全局 CSS 变量 + 字体
│   ├── components/
│   │   ├── ui/
│   │   │   ├── ClipCard.tsx        # Persona 斜切角卡片（可复用）
│   │   │   ├── GlitchText.tsx      # 故障风文字效果
│   │   │   ├── TypewriterText.tsx  # 打字机效果
│   │   │   ├── PersonaButton.tsx   # 斜切角按钮
│   │   │   └── NPCDialog.tsx       # NPC 气泡对话框
│   │   ├── layout/
│   │   │   ├── Navigation.tsx      # Persona 风格斜切标签页导航
│   │   │   ├── PageTransition.tsx  # 页面切换过场动画（黄紫斜切色块）
│   │   │   └── CircuitBackground.tsx # 动态电路纹理背景
│   │   ├── npc/
│   │   │   ├── NPCBase.tsx         # NPC 通用容器（待机动画 + 点击对话）
│   │   │   ├── NPCRingbell.tsx     # 铃布（首页）
│   │   │   ├── NPCDuoduo.tsx       # 角多多（简历页）
│   │   │   ├── NPCXiaoke.tsx       # 小可（项目页）
│   │   │   └── NPCBeer.tsx         # 小啤酒（作品集页）
│   │   └── sections/
│   │       ├── home/HeroSection.tsx
│   │       ├── resume/TimelineSection.tsx
│   │       ├── resume/SkillRadar.tsx
│   │       ├── projects/ProjectCard.tsx
│   │       ├── portfolio/Gallery.tsx
│   │       ├── portfolio/Lightbox.tsx
│   │       └── contact/ContactInfo.tsx
│   ├── lib/
│   │   ├── animations.ts           # Framer Motion 变体常量
│   │   └── constants.ts            # 颜色、字体、NPC 台词数据
│   └── messages/
│       ├── zh.json                 # 中文文案
│       └── en.json                 # 英文文案
├── public/assets/                  # 图片、PDF、视频素材
├── __tests__/                      # 测试文件（镜像 src 结构）
├── next.config.ts
├── middleware.ts                   # next-intl 语言检测中间件
├── tailwind.config.ts
├── vitest.config.ts
└── package.json
```

---

## Task 1: 项目初始化与工具链配置

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `vitest.config.ts`

- [ ] **Step 1: 初始化 Next.js 项目**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --no-turbopack \
  --import-alias "@/*"
```

- [ ] **Step 2: 安装依赖**

```bash
npm install framer-motion next-intl recharts
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: 配置 next.config.ts 支持静态导出和 i18n**

```typescript
// next.config.ts
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  output: 'export',        // GitHub Pages / Vercel 静态部署
  images: { unoptimized: true },
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 4: 配置 Tailwind 主题色**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'persona-gold': '#FFD900',
        'persona-purple': '#6B21A8',
        'persona-dark': '#1A1A2E',
        'cyber-teal': '#00CED1',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 5: 配置 Vitest**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 6: 创建测试 setup 文件**

```typescript
// src/test-setup.ts
import '@testing-library/jest-dom'
```

- [ ] **Step 7: 验证项目启动**

```bash
npm run dev
```

Expected: 浏览器打开 http://localhost:3000，显示默认 Next.js 页面

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Next.js project with TypeScript, Tailwind, Framer Motion, next-intl, Vitest"
```

---

## Task 2: 全局常量与动画变体

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/lib/animations.ts`
- Create: `__tests__/lib/animations.test.ts`

- [ ] **Step 1: 编写动画变体测试**

```typescript
// __tests__/lib/animations.test.ts
import { describe, it, expect } from 'vitest'
import { slideInFromLeft, glitchVariants, personaPageTransition } from '@/lib/animations'

describe('animations', () => {
  it('slideInFromLeft has hidden and visible states', () => {
    expect(slideInFromLeft.hidden).toBeDefined()
    expect(slideInFromLeft.visible).toBeDefined()
    expect(slideInFromLeft.hidden.x).toBeLessThan(0)
    expect(slideInFromLeft.visible.x).toBe(0)
  })

  it('personaPageTransition has enter and exit variants', () => {
    expect(personaPageTransition.initial).toBeDefined()
    expect(personaPageTransition.animate).toBeDefined()
    expect(personaPageTransition.exit).toBeDefined()
  })

  it('glitchVariants has idle and glitch states', () => {
    expect(glitchVariants.idle).toBeDefined()
    expect(glitchVariants.glitch).toBeDefined()
  })
})
```

- [ ] **Step 2: 运行测试，确认失败**

```bash
npx vitest run __tests__/lib/animations.test.ts
```

Expected: FAIL - "Cannot find module '@/lib/animations'"

- [ ] **Step 3: 创建动画变体文件**

```typescript
// src/lib/animations.ts
import { Variants } from 'framer-motion'

export const slideInFromLeft: Variants = {
  hidden: { x: -80, opacity: 0, skewX: -5 },
  visible: {
    x: 0,
    opacity: 1,
    skewX: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const slideInFromRight: Variants = {
  hidden: { x: 80, opacity: 0, skewX: 5 },
  visible: {
    x: 0,
    opacity: 1,
    skewX: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const personaPageTransition: Variants = {
  initial: { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 0 },
  animate: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    opacity: 0,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
}

export const glitchVariants: Variants = {
  idle: { x: 0, skewX: 0, opacity: 1 },
  glitch: {
    x: [0, -3, 3, -2, 0],
    skewX: [0, -5, 5, -3, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: { duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] },
  },
}

export const npcIdleVariants: Variants = {
  idle: {
    y: [0, -6, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const cardHoverVariants: Variants = {
  rest: { scale: 1, boxShadow: '0 0 0px rgba(255,217,0,0)' },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 20px rgba(255,217,0,0.4)',
    transition: { duration: 0.2 },
  },
}

export const typewriterContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

export const typewriterChar: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
}
```

- [ ] **Step 4: 创建全局常量文件**

```typescript
// src/lib/constants.ts
export const COLORS = {
  gold: '#FFD900',
  purple: '#6B21A8',
  dark: '#1A1A2E',
  teal: '#00CED1',
} as const

export const NPC_LINES = {
  ringbell: {
    zh: ['慢慢来…… 不急的', '进来吧，我等你很久了', '喵。（瞄了你一眼，继续打盹）'],
    en: ['Take your time... no rush', 'Come in, I\'ve been waiting', '*stares at you, then naps*'],
  },
  duoduo: {
    zh: ['♩♪ 欢迎欢迎！我来介绍我的主人！', '嘿！这里有她的全部战绩哦！', '吹个口哨给你 ～ 呼哩哩～'],
    en: ['♩♪ Welcome welcome! Let me introduce!', 'Hey! All her achievements are here!', '*whistles* Here we go~'],
  },
  xiaoke: {
    zh: ['哼，这个项目还行吧', '总算做了点正经事', '（傲娇地转过头）……还凑合'],
    en: ['Hmph, this project is... acceptable', 'Finally did something decent', '(turns away) ...it\'s fine'],
  },
  beer: {
    zh: ['这个好看吧？我觉得好看……', '要不要看看这个？', '（小声）小可说这个不错……'],
    en: ['This looks nice, right? I think so...', 'Want to check this out?', '(quietly) Xiaoke said this is good...'],
  },
}

export const PAGES = ['home', 'resume', 'projects', 'portfolio', 'contact'] as const
export type Page = typeof PAGES[number]
```

- [ ] **Step 5: 运行测试，确认通过**

```bash
npx vitest run __tests__/lib/animations.test.ts
```

Expected: PASS - 3 tests passed

- [ ] **Step 6: Commit**

```bash
git add src/lib/ __tests__/lib/ src/test-setup.ts vitest.config.ts
git commit -m "feat: add animation variants and global constants"
```

---

## Task 3: i18n 国际化配置

**Files:**
- Create: `src/messages/zh.json`
- Create: `src/messages/en.json`
- Create: `middleware.ts`
- Create: `src/i18n/request.ts`
- Create: `__tests__/i18n/messages.test.ts`

- [ ] **Step 1: 编写 i18n 测试**

```typescript
// __tests__/i18n/messages.test.ts
import { describe, it, expect } from 'vitest'
import zh from '@/../src/messages/zh.json'
import en from '@/../src/messages/en.json'

describe('i18n messages', () => {
  it('zh and en have the same top-level keys', () => {
    const zhKeys = Object.keys(zh).sort()
    const enKeys = Object.keys(en).sort()
    expect(zhKeys).toEqual(enKeys)
  })

  it('zh messages have nav section', () => {
    expect(zh).toHaveProperty('nav')
    expect(zh.nav).toHaveProperty('home')
    expect(zh.nav).toHaveProperty('resume')
    expect(zh.nav).toHaveProperty('projects')
    expect(zh.nav).toHaveProperty('portfolio')
    expect(zh.nav).toHaveProperty('contact')
  })

  it('en messages have nav section', () => {
    expect(en.nav.home).toBe('Home')
    expect(en.nav.resume).toBe('Resume')
  })
})
```

- [ ] **Step 2: 运行测试，确认失败**

```bash
npx vitest run __tests__/i18n/messages.test.ts
```

Expected: FAIL - "Cannot find module"

- [ ] **Step 3: 创建中文文案**

```json
// src/messages/zh.json
{
  "nav": {
    "home": "首页",
    "resume": "简历",
    "projects": "项目",
    "portfolio": "作品集",
    "contact": "联系我"
  },
  "home": {
    "title": "你好，我是 Guoli",
    "subtitle": "AI训练师 · 数据标注专家 · 内容创作者",
    "cta": "探索我的世界",
    "npcLine": "慢慢来…… 不急的"
  },
  "resume": {
    "title": "我的战绩",
    "download": "下载简历 PDF",
    "skills": "核心技能",
    "experience": "工作经历",
    "education": "教育背景",
    "npcLine": "♩♪ 让我来介绍主人的高光时刻！"
  },
  "projects": {
    "title": "任务模式",
    "subtitle": "执行过的任务清单",
    "npcLine": "哼，这个项目还行吧"
  },
  "portfolio": {
    "title": "创作空间",
    "subtitle": "AI 生成作品展示",
    "npcLine": "这个好看吧？我觉得好看……"
  },
  "contact": {
    "title": "发送信息",
    "email": "邮箱",
    "wechat": "微信",
    "copy": "复制",
    "copied": "已复制！",
    "npcLine": "我们都在等你联系我的主人哦"
  },
  "common": {
    "loading": "加载中",
    "switchLang": "English"
  }
}
```

- [ ] **Step 4: 创建英文文案**

```json
// src/messages/en.json
{
  "nav": {
    "home": "Home",
    "resume": "Resume",
    "projects": "Projects",
    "portfolio": "Portfolio",
    "contact": "Contact"
  },
  "home": {
    "title": "Hi, I'm Guoli",
    "subtitle": "AI Trainer · Data Annotation Expert · Content Creator",
    "cta": "Explore My World",
    "npcLine": "Take your time... no rush"
  },
  "resume": {
    "title": "My Achievements",
    "download": "Download Resume PDF",
    "skills": "Core Skills",
    "experience": "Work Experience",
    "education": "Education",
    "npcLine": "♩♪ Let me introduce the highlights!"
  },
  "projects": {
    "title": "Mission Mode",
    "subtitle": "Completed Mission Log",
    "npcLine": "Hmph, this project is... acceptable"
  },
  "portfolio": {
    "title": "Creative Space",
    "subtitle": "AI Generated Works",
    "npcLine": "This looks nice, right? I think so..."
  },
  "contact": {
    "title": "Send Message",
    "email": "Email",
    "wechat": "WeChat",
    "copy": "Copy",
    "copied": "Copied!",
    "npcLine": "We're all waiting for you to reach out!"
  },
  "common": {
    "loading": "Loading",
    "switchLang": "中文"
  }
}
```

- [ ] **Step 5: 创建 i18n request 配置**

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'zh' | 'en')) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../../src/messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 6: 创建路由配置**

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
})
```

- [ ] **Step 7: 创建 middleware**

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
```

- [ ] **Step 8: 运行测试，确认通过**

```bash
npx vitest run __tests__/i18n/messages.test.ts
```

Expected: PASS - 3 tests passed

- [ ] **Step 9: Commit**

```bash
git add src/messages/ src/i18n/ middleware.ts __tests__/i18n/
git commit -m "feat: configure next-intl i18n with zh/en bilingual support"
```

---

## Task 4: 全局布局与导航组件

**Files:**
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/components/layout/Navigation.tsx`
- Create: `src/app/globals.css`
- Create: `__tests__/components/layout/Navigation.test.tsx`

- [ ] **Step 1: 编写 Navigation 测试**

```typescript
// __tests__/components/layout/Navigation.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import Navigation from '@/components/layout/Navigation'
import zh from '@/messages/zh.json'

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale="zh" messages={zh}>
    {children}
  </NextIntlClientProvider>
)

describe('Navigation', () => {
  it('renders all 5 nav items', () => {
    render(<Navigation currentLocale="zh" />, { wrapper: Wrapper })
    expect(screen.getByText('首页')).toBeInTheDocument()
    expect(screen.getByText('简历')).toBeInTheDocument()
    expect(screen.getByText('项目')).toBeInTheDocument()
    expect(screen.getByText('作品集')).toBeInTheDocument()
    expect(screen.getByText('联系我')).toBeInTheDocument()
  })

  it('renders language switch button', () => {
    render(<Navigation currentLocale="zh" />, { wrapper: Wrapper })
    expect(screen.getByText('English')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行测试，确认失败**

```bash
npx vitest run __tests__/components/layout/Navigation.test.tsx
```

Expected: FAIL

- [ ] **Step 3: 创建全局 CSS**

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --persona-gold: #FFD900;
  --persona-purple: #6B21A8;
  --persona-dark: #1A1A2E;
  --cyber-teal: #00CED1;
}

body {
  background-color: var(--persona-dark);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

/* Persona 斜切角 utility */
.clip-persona {
  clip-path: polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
}

.clip-persona-lg {
  clip-path: polygon(24px 0, 100% 0, calc(100% - 24px) 100%, 0 100%);
}

/* 霓虹发光 */
.glow-gold {
  text-shadow: 0 0 10px #FFD900, 0 0 20px #FFD900;
}

.glow-purple {
  box-shadow: 0 0 15px rgba(107, 33, 168, 0.6), 0 0 30px rgba(107, 33, 168, 0.3);
}

.border-glow-gold {
  border: 1px solid #FFD900;
  box-shadow: 0 0 8px rgba(255, 217, 0, 0.5), inset 0 0 8px rgba(255, 217, 0, 0.1);
}
```

- [ ] **Step 4: 创建 Navigation 组件**

```typescript
// src/components/layout/Navigation.tsx
'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

interface NavigationProps {
  currentLocale: string
}

const navKeys = ['home', 'resume', 'projects', 'portfolio', 'contact'] as const
const navPaths: Record<string, string> = {
  home: '/',
  resume: '/resume',
  projects: '/projects',
  portfolio: '/portfolio',
  contact: '/contact',
}

export default function Navigation({ currentLocale }: NavigationProps) {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = () => {
    const newLocale = currentLocale === 'zh' ? 'en' : 'zh'
    // 替换路径中的 locale 前缀
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-persona-dark/90 backdrop-blur-sm border-b border-persona-purple/30">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* 斜切标签页导航 */}
        <div className="flex gap-1">
          {navKeys.map((key) => {
            const href = `/${currentLocale}${navPaths[key]}`
            const isActive = pathname === href || (key === 'home' && pathname === `/${currentLocale}`)
            return (
              <Link key={key} href={href}>
                <motion.div
                  className={`
                    clip-persona px-4 py-2 text-sm font-bold transition-colors cursor-pointer
                    ${isActive
                      ? 'bg-persona-gold text-persona-dark'
                      : 'bg-persona-purple/30 text-white hover:bg-persona-purple/60'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(key)}
                </motion.div>
              </Link>
            )
          })}
        </div>

        {/* 语言切换 */}
        <motion.button
          onClick={switchLocale}
          className="clip-persona px-3 py-1.5 text-xs font-bold border border-cyber-teal text-cyber-teal hover:bg-cyber-teal/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tCommon('switchLang')}
        </motion.button>
      </div>
    </nav>
  )
}
```

- [ ] **Step 5: 创建全局布局**

```typescript
// src/app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import '../globals.css'

const locales = ['zh', 'en']

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className="bg-persona-dark min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Navigation currentLocale={locale} />
          <main className="pt-14">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: 运行测试**

```bash
npx vitest run __tests__/components/layout/Navigation.test.tsx
```

Expected: PASS

- [ ] **Step 7: 启动开发服务器验证导航渲染**

```bash
npm run dev
```

访问 http://localhost:3000，应看到带斜切导航栏的暗色页面

- [ ] **Step 8: Commit**

```bash
git add src/app/ src/components/layout/ __tests__/components/layout/
git commit -m "feat: add locale layout, Persona-style navigation, and global CSS"
```

---

## Task 5: 基础 UI 组件库

**Files:**
- Create: `src/components/ui/ClipCard.tsx`
- Create: `src/components/ui/GlitchText.tsx`
- Create: `src/components/ui/TypewriterText.tsx`
- Create: `src/components/ui/PersonaButton.tsx`
- Create: `src/components/ui/NPCDialog.tsx`
- Create: `__tests__/components/ui/GlitchText.test.tsx`
- Create: `__tests__/components/ui/TypewriterText.test.tsx`

- [ ] **Step 1: 编写 GlitchText 测试**

```typescript
// __tests__/components/ui/GlitchText.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GlitchText from '@/components/ui/GlitchText'

describe('GlitchText', () => {
  it('renders text content', () => {
    render(<GlitchText text="HELLO WORLD" />)
    // 文字出现在 DOM 中（可能有多个副本用于 glitch 效果）
    const elements = screen.getAllByText('HELLO WORLD')
    expect(elements.length).toBeGreaterThanOrEqual(1)
  })

  it('applies custom className', () => {
    const { container } = render(<GlitchText text="TEST" className="text-4xl" />)
    expect(container.firstChild).toHaveClass('text-4xl')
  })
})
```

- [ ] **Step 2: 编写 TypewriterText 测试**

```typescript
// __tests__/components/ui/TypewriterText.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TypewriterText from '@/components/ui/TypewriterText'

describe('TypewriterText', () => {
  it('renders text container', () => {
    const { container } = render(<TypewriterText text="Hello" />)
    expect(container.firstChild).toBeDefined()
  })
})
```

- [ ] **Step 3: 运行测试，确认失败**

```bash
npx vitest run __tests__/components/ui/
```

Expected: FAIL

- [ ] **Step 4: 实现 GlitchText**

```typescript
// src/components/ui/GlitchText.tsx
'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { glitchVariants } from '@/lib/animations'

interface GlitchTextProps {
  text: string
  className?: string
  autoPlay?: boolean
}

export default function GlitchText({ text, className = '', autoPlay = true }: GlitchTextProps) {
  const controls = useAnimation()

  useEffect(() => {
    if (!autoPlay) return
    const loop = async () => {
      while (true) {
        await new Promise(r => setTimeout(r, 3000 + Math.random() * 2000))
        await controls.start('glitch')
        await controls.start('idle')
      }
    }
    loop()
  }, [controls, autoPlay])

  return (
    <div className={`relative inline-block ${className}`}>
      {/* 主文字 */}
      <motion.span
        variants={glitchVariants}
        animate={controls}
        initial="idle"
        className="relative z-10 text-persona-gold font-black"
        style={{ textShadow: '0 0 10px #FFD900' }}
      >
        {text}
      </motion.span>
      {/* 赛博阴影层 */}
      <span
        className="absolute inset-0 text-cyber-teal font-black opacity-40"
        style={{ transform: 'translate(2px, 2px)', userSelect: 'none' }}
        aria-hidden
      >
        {text}
      </span>
    </div>
  )
}
```

- [ ] **Step 5: 实现 TypewriterText**

```typescript
// src/components/ui/TypewriterText.tsx
'use client'
import { motion } from 'framer-motion'
import { typewriterContainer, typewriterChar } from '@/lib/animations'

interface TypewriterTextProps {
  text: string
  className?: string
  delay?: number
}

export default function TypewriterText({ text, className = '', delay = 0 }: TypewriterTextProps) {
  return (
    <motion.span
      className={className}
      variants={typewriterContainer}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={typewriterChar}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
```

- [ ] **Step 6: 实现 ClipCard**

```typescript
// src/components/ui/ClipCard.tsx
'use client'
import { motion } from 'framer-motion'
import { cardHoverVariants } from '@/lib/animations'

interface ClipCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

const sizeClip = {
  sm: 'clip-persona',
  md: 'clip-persona',
  lg: 'clip-persona-lg',
}

export default function ClipCard({ children, className = '', onClick, size = 'md' }: ClipCardProps) {
  return (
    <motion.div
      className={`
        ${sizeClip[size]}
        bg-gradient-to-br from-persona-purple/20 to-persona-dark
        border border-persona-purple/40
        p-4
        cursor-${onClick ? 'pointer' : 'default'}
        ${className}
      `}
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 7: 实现 PersonaButton**

```typescript
// src/components/ui/PersonaButton.tsx
'use client'
import { motion } from 'framer-motion'

interface PersonaButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  variant?: 'gold' | 'purple' | 'teal'
  className?: string
}

const variants = {
  gold: 'bg-persona-gold text-persona-dark hover:brightness-110',
  purple: 'bg-persona-purple text-white hover:brightness-110',
  teal: 'border border-cyber-teal text-cyber-teal hover:bg-cyber-teal/20',
}

export default function PersonaButton({ children, onClick, href, variant = 'gold', className = '' }: PersonaButtonProps) {
  const cls = `clip-persona px-6 py-2.5 font-black text-sm tracking-wider transition-all ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a href={href} className={cls} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button onClick={onClick} className={cls} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      {children}
    </motion.button>
  )
}
```

- [ ] **Step 8: 实现 NPCDialog**

```typescript
// src/components/ui/NPCDialog.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import TypewriterText from './TypewriterText'

interface NPCDialogProps {
  isOpen: boolean
  text: string
  npcName: string
  onClose: () => void
}

export default function NPCDialog({ isOpen, text, npcName, onClose }: NPCDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute z-20 bottom-full mb-2 left-1/2 -translate-x-1/2 min-w-48 max-w-64"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* 对话框主体 */}
          <div className="bg-persona-dark border border-persona-gold/60 p-3 clip-persona relative">
            {/* NPC 名字标签 */}
            <div className="absolute -top-3 left-4 bg-persona-gold text-persona-dark text-xs font-black px-2 py-0.5 clip-persona">
              {npcName}
            </div>
            <TypewriterText
              text={text}
              className="text-white text-xs leading-relaxed"
            />
          </div>
          {/* 气泡箭头 */}
          <div className="w-3 h-3 bg-persona-gold/60 mx-auto mt-[-1px]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 9: 运行测试**

```bash
npx vitest run __tests__/components/ui/
```

Expected: PASS - all tests passed

- [ ] **Step 10: Commit**

```bash
git add src/components/ui/ __tests__/components/ui/
git commit -m "feat: add ClipCard, GlitchText, TypewriterText, PersonaButton, NPCDialog UI components"
```

---

## Task 6: 电路背景与 NPC 基础组件

**Files:**
- Create: `src/components/layout/CircuitBackground.tsx`
- Create: `src/components/layout/PageTransition.tsx`
- Create: `src/components/npc/NPCBase.tsx`
- Create: `src/components/npc/NPCRingbell.tsx`
- Create: `src/components/npc/NPCDuoduo.tsx`
- Create: `src/components/npc/NPCXiaoke.tsx`
- Create: `src/components/npc/NPCBeer.tsx`

- [ ] **Step 1: 实现动态电路背景**

```typescript
// src/components/layout/CircuitBackground.tsx
'use client'
import { useEffect, useRef } from 'react'

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const lines: { x: number; y: number; dx: number; dy: number; len: number; alpha: number }[] = []

    for (let i = 0; i < 30; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() > 0.5 ? 1 : -1) * 0.5,
        dy: (Math.random() > 0.5 ? 1 : -1) * 0.5,
        len: 60 + Math.random() * 100,
        alpha: 0.1 + Math.random() * 0.3,
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      lines.forEach(line => {
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x + line.dx * line.len, line.y + line.dy * line.len)
        ctx.strokeStyle = `rgba(0, 206, 209, ${line.alpha})`
        ctx.lineWidth = 1
        ctx.stroke()

        // 节点圆点
        ctx.beginPath()
        ctx.arc(line.x, line.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 217, 0, ${line.alpha * 1.5})`
        ctx.fill()

        line.x += line.dx
        line.y += line.dy
        if (line.x < 0 || line.x > canvas.width) line.dx *= -1
        if (line.y < 0 || line.y > canvas.height) line.dy *= -1
      })
      animId = requestAnimationFrame(draw)
    }

    draw()
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
    />
  )
}
```

- [ ] **Step 2: 实现页面切换过场动画**

```typescript
// src/components/layout/PageTransition.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)' }}
        animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        exit={{ opacity: 0, clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 3: 实现 NPCBase 通用容器**

```typescript
// src/components/npc/NPCBase.tsx
'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import NPCDialog from '@/components/ui/NPCDialog'
import { npcIdleVariants } from '@/lib/animations'

interface NPCBaseProps {
  name: string
  imageSrc: string
  imageAlt: string
  lines: string[]
  className?: string
  size?: number
}

export default function NPCBase({ name, imageSrc, imageAlt, lines, className = '', size = 80 }: NPCBaseProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)

  const handleClick = () => {
    if (isOpen) {
      const next = (lineIndex + 1) % lines.length
      setLineIndex(next)
      if (next === 0) setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <NPCDialog
        isOpen={isOpen}
        text={lines[lineIndex]}
        npcName={name}
        onClose={() => setIsOpen(false)}
      />
      <motion.div
        variants={npcIdleVariants}
        animate="idle"
        onClick={handleClick}
        className="cursor-pointer"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 4: 实现各 NPC 组件（使用占位图直到素材就绪）**

```typescript
// src/components/npc/NPCRingbell.tsx
'use client'
import NPCBase from './NPCBase'
import { NPC_LINES } from '@/lib/constants'

interface NPCRingbellProps {
  locale: string
  size?: number
}

export default function NPCRingbell({ locale, size = 100 }: NPCRingbellProps) {
  const lines = locale === 'zh' ? NPC_LINES.ringbell.zh : NPC_LINES.ringbell.en
  return (
    <NPCBase
      name={locale === 'zh' ? '铃布' : 'Ringbell'}
      imageSrc="/assets/npc/ringbell.png"
      imageAlt="铃布 - 导航NPC猫咪"
      lines={lines}
      size={size}
    />
  )
}
```

```typescript
// src/components/npc/NPCDuoduo.tsx
'use client'
import NPCBase from './NPCBase'
import { NPC_LINES } from '@/lib/constants'

interface NPCDuoduoProps { locale: string; size?: number }

export default function NPCDuoduo({ locale, size = 100 }: NPCDuoduoProps) {
  const lines = locale === 'zh' ? NPC_LINES.duoduo.zh : NPC_LINES.duoduo.en
  return (
    <NPCBase
      name={locale === 'zh' ? '角多多' : 'Duoduo'}
      imageSrc="/assets/npc/duoduo.png"
      imageAlt="角多多 - 简历页NPC鹦鹉"
      lines={lines}
      size={size}
    />
  )
}
```

```typescript
// src/components/npc/NPCXiaoke.tsx
'use client'
import NPCBase from './NPCBase'
import { NPC_LINES } from '@/lib/constants'

interface NPCXiaokeProps { locale: string; size?: number }

export default function NPCXiaoke({ locale, size = 100 }: NPCXiaokeProps) {
  const lines = locale === 'zh' ? NPC_LINES.xiaoke.zh : NPC_LINES.xiaoke.en
  return (
    <NPCBase
      name={locale === 'zh' ? '小可' : 'Xiaoke'}
      imageSrc="/assets/npc/xiaoke.png"
      imageAlt="小可 - 项目页NPC鹦鹉"
      lines={lines}
      size={size}
    />
  )
}
```

```typescript
// src/components/npc/NPCBeer.tsx
'use client'
import NPCBase from './NPCBase'
import { NPC_LINES } from '@/lib/constants'

interface NPCBeerProps { locale: string; size?: number }

export default function NPCBeer({ locale, size = 100 }: NPCBeerProps) {
  const lines = locale === 'zh' ? NPC_LINES.beer.zh : NPC_LINES.beer.en
  return (
    <NPCBase
      name={locale === 'zh' ? '小啤酒' : 'Beer'}
      imageSrc="/assets/npc/beer.png"
      imageAlt="小啤酒 - 作品集页NPC鹦鹉"
      lines={lines}
      size={size}
    />
  )
}
```

- [ ] **Step 5: 创建 NPC 占位图目录**

```bash
mkdir -p public/assets/npc public/assets/images public/assets/portfolio
```

- [ ] **Step 6: 更新全局布局加入 CircuitBackground 和 PageTransition**

将 `src/app/[locale]/layout.tsx` 中的 `<main>` 部分更新为：

```typescript
// src/app/[locale]/layout.tsx (修改 body 内容部分)
import CircuitBackground from '@/components/layout/CircuitBackground'
import PageTransition from '@/components/layout/PageTransition'

// 在 body 内：
<NextIntlClientProvider messages={messages}>
  <CircuitBackground />
  <Navigation currentLocale={locale} />
  <main className="pt-14 relative z-10">
    <PageTransition>
      {children}
    </PageTransition>
  </main>
</NextIntlClientProvider>
```

- [ ] **Step 7: 验证电路背景和 NPC 系统**

```bash
npm run dev
```

访问 http://localhost:3000，应看到动态电路纹理背景流动

- [ ] **Step 8: Commit**

```bash
git add src/components/ public/assets/
git commit -m "feat: add circuit background, page transitions, and NPC component system"
```

---

## Task 7: 首页开发

**Files:**
- Create: `src/app/[locale]/page.tsx`
- Create: `src/components/sections/home/HeroSection.tsx`

- [ ] **Step 1: 实现 HeroSection**

```typescript
// src/components/sections/home/HeroSection.tsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import GlitchText from '@/components/ui/GlitchText'
import TypewriterText from '@/components/ui/TypewriterText'
import PersonaButton from '@/components/ui/PersonaButton'
import NPCRingbell from '@/components/npc/NPCRingbell'
import { slideInFromLeft, slideInFromRight } from '@/lib/animations'

interface HeroSectionProps {
  locale: string
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home')

  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center relative overflow-hidden">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-persona-dark via-persona-purple/10 to-persona-dark" />

      {/* 斜切色块装饰 */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full bg-persona-purple/5"
        style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-persona-gold/5"
        style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0 100%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* 左侧文字区 */}
        <motion.div
          className="flex-1 text-left"
          variants={slideInFromLeft}
          initial="hidden"
          animate="visible"
        >
          {/* 职业标签 */}
          <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-4">
            <span className="text-cyber-teal text-sm font-bold tracking-widest uppercase">
              AI Trainer · Data Annotation
            </span>
          </div>

          {/* 主标题 - Glitch 效果 */}
          <div className="mb-4">
            <GlitchText text={t('title')} className="text-5xl md:text-7xl block mb-2" />
          </div>

          {/* 副标题 - 打字机效果 */}
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            <TypewriterText text={t('subtitle')} delay={0.5} />
          </p>

          {/* CTA 按钮 */}
          <PersonaButton href={`/${locale}/projects`} variant="gold">
            {t('cta')} →
          </PersonaButton>
        </motion.div>

        {/* 右侧 - 个人形象 + NPC */}
        <motion.div
          className="flex-shrink-0 relative"
          variants={slideInFromRight}
          initial="hidden"
          animate="visible"
        >
          {/* 个人卡通形象 */}
          <div
            className="w-64 h-72 md:w-80 md:h-96 border-2 border-persona-gold/40 flex items-center justify-center bg-persona-purple/10"
            style={{ clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
          >
            <img
              src="/assets/images/hero-avatar.png"
              alt="个人卡通形象"
              className="w-full h-full object-cover"
              onError={(e) => {
                // 占位显示
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="absolute text-persona-gold/40 text-sm text-center">
              <div className="text-4xl mb-2">◇</div>
              <div>角色形象</div>
              <div className="text-xs">待AI生成</div>
            </div>
          </div>

          {/* 铃布 NPC - 右下角 */}
          <div className="absolute -bottom-8 -right-8">
            <NPCRingbell locale={locale} size={90} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 实现首页**

```typescript
// src/app/[locale]/page.tsx
import HeroSection from '@/components/sections/home/HeroSection'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <HeroSection locale={locale} />
}
```

- [ ] **Step 3: 启动并验证首页**

```bash
npm run dev
```

访问 http://localhost:3000/zh，应看到：
- 带 Glitch 效果的标题
- 打字机副标题
- 斜切角按钮
- 铃布 NPC（待机上下浮动）

- [ ] **Step 4: Commit**

```bash
git add src/app/\[locale\]/page.tsx src/components/sections/home/
git commit -m "feat: implement Home page with hero section, NPC Ringbell, and Persona animations"
```

---

## Task 8: 简历页开发

**Files:**
- Create: `src/app/[locale]/resume/page.tsx`
- Create: `src/components/sections/resume/TimelineSection.tsx`
- Create: `src/components/sections/resume/SkillRadar.tsx`

- [ ] **Step 1: 安装雷达图依赖（已在 Task 1 安装 recharts）**

确认 recharts 已安装：

```bash
npm list recharts
```

Expected: recharts@X.X.X

- [ ] **Step 2: 实现技能雷达图**

```typescript
// src/components/sections/resume/SkillRadar.tsx
'use client'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { useTranslations } from 'next-intl'

const skillData = [
  { skill: 'AI数据标注', value: 95 },
  { skill: '规则文档编写', value: 88 },
  { skill: '数据处理', value: 85 },
  { skill: '质量审核', value: 90 },
  { skill: '项目管理', value: 75 },
  { skill: '内容创作', value: 82 },
]

const skillDataEn = [
  { skill: 'AI Annotation', value: 95 },
  { skill: 'Doc Writing', value: 88 },
  { skill: 'Data Process', value: 85 },
  { skill: 'QA Review', value: 90 },
  { skill: 'Project Mgmt', value: 75 },
  { skill: 'Content Create', value: 82 },
]

export default function SkillRadar({ locale }: { locale: string }) {
  const t = useTranslations('resume')
  const data = locale === 'zh' ? skillData : skillDataEn

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-persona-gold font-black text-center mb-4 text-lg">{t('skills')}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(107,33,168,0.4)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: '#ffffff', fontSize: 12 }} />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#FFD900"
            fill="#FFD900"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
```

- [ ] **Step 3: 实现时间线组件**

```typescript
// src/components/sections/resume/TimelineSection.tsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import ClipCard from '@/components/ui/ClipCard'
import { slideInFromLeft } from '@/lib/animations'

// 简历内容（后续由用户提供实际数据后替换）
const experienceZh = [
  {
    period: '2023 - 至今',
    title: 'AI数据标注专家',
    company: '待填写',
    desc: '负责大型语言模型训练数据的标注、质量审核与规则文档编写。',
    tags: ['AI标注', '数据处理', '质量管控'],
  },
  {
    period: '2021 - 2023',
    title: '数据处理专员',
    company: '待填写',
    desc: '处理多模态数据集，制定标注规范与审核标准。',
    tags: ['多模态数据', '规则制定', '团队协作'],
  },
]

const experienceEn = [
  {
    period: '2023 - Present',
    title: 'AI Data Annotation Expert',
    company: 'TBD',
    desc: 'Responsible for annotating LLM training data, quality review, and writing annotation guidelines.',
    tags: ['AI Annotation', 'Data Processing', 'QA'],
  },
  {
    period: '2021 - 2023',
    title: 'Data Processing Specialist',
    company: 'TBD',
    desc: 'Processed multimodal datasets and established annotation standards.',
    tags: ['Multimodal Data', 'Standards', 'Teamwork'],
  },
]

export default function TimelineSection({ locale }: { locale: string }) {
  const t = useTranslations('resume')
  const experience = locale === 'zh' ? experienceZh : experienceEn

  return (
    <div>
      <h3 className="text-persona-gold font-black text-xl mb-6 flex items-center gap-3">
        <span className="w-8 h-0.5 bg-persona-gold" />
        {t('experience')}
      </h3>
      <div className="space-y-4">
        {experience.map((item, i) => (
          <motion.div
            key={i}
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <ClipCard className="border-l-4 border-l-persona-gold/60">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <p className="text-white/60 text-sm">{item.company}</p>
                </div>
                <span className="text-persona-gold text-xs font-mono clip-persona bg-persona-gold/10 px-2 py-1">
                  {item.period}
                </span>
              </div>
              <p className="text-white/80 text-sm mb-3">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="clip-persona bg-cyber-teal/10 text-cyber-teal text-xs px-2 py-0.5 border border-cyber-teal/30">
                    {tag}
                  </span>
                ))}
              </div>
            </ClipCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: 实现简历页**

```typescript
// src/app/[locale]/resume/page.tsx
import { getTranslations } from 'next-intl/server'
import GlitchText from '@/components/ui/GlitchText'
import PersonaButton from '@/components/ui/PersonaButton'
import NPCDuoduo from '@/components/npc/NPCDuoduo'
import TimelineSection from '@/components/sections/resume/TimelineSection'
import SkillRadar from '@/components/sections/resume/SkillRadar'

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('resume')

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      {/* 页面标题区 */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-3">
            <span className="text-cyber-teal text-xs font-bold tracking-widest">RESUME · 简历</span>
          </div>
          <GlitchText text={t('title')} className="text-4xl md:text-5xl block" />
        </div>
        {/* 角多多 NPC */}
        <NPCDuoduo locale={locale} size={90} />
      </div>

      {/* PDF 下载按钮 */}
      <div className="mb-10 flex gap-4">
        <PersonaButton href="/assets/resume-zh.pdf" variant="gold">
          📄 {t('download')} (中文)
        </PersonaButton>
        <PersonaButton href="/assets/resume-en.pdf" variant="purple">
          📄 {t('download')} (EN)
        </PersonaButton>
      </div>

      {/* 主内容区 */}
      <div className="grid md:grid-cols-2 gap-10">
        <TimelineSection locale={locale} />
        <SkillRadar locale={locale} />
      </div>
    </div>
  )
}
```

- [ ] **Step 5: 验证简历页**

```bash
npm run dev
```

访问 http://localhost:3000/zh/resume，应看到时间线、雷达图、PDF下载按钮和角多多NPC

- [ ] **Step 6: Commit**

```bash
git add src/app/\[locale\]/resume/ src/components/sections/resume/
git commit -m "feat: implement Resume page with timeline, skill radar, PDF download, and NPC Duoduo"
```

---

## Task 9: 项目页开发

**Files:**
- Create: `src/app/[locale]/projects/page.tsx`
- Create: `src/components/sections/projects/ProjectCard.tsx`
- Create: `__tests__/components/sections/projects/ProjectCard.test.tsx`

- [ ] **Step 1: 编写 ProjectCard 测试**

```typescript
// __tests__/components/sections/projects/ProjectCard.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from '@/components/sections/projects/ProjectCard'

const mockProject = {
  name: '测试项目',
  desc: '这是一个测试项目描述',
  tags: ['React', 'TypeScript'],
  link: 'https://example.com',
  result: '完成上线，用户好评',
}

describe('ProjectCard', () => {
  it('renders project name and description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('测试项目')).toBeInTheDocument()
    expect(screen.getByText('这是一个测试项目描述')).toBeInTheDocument()
  })

  it('renders all tags', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 运行测试，确认失败**

```bash
npx vitest run __tests__/components/sections/projects/
```

Expected: FAIL

- [ ] **Step 3: 实现 ProjectCard**

```typescript
// src/components/sections/projects/ProjectCard.tsx
'use client'
import { motion } from 'framer-motion'
import { cardHoverVariants } from '@/lib/animations'

export interface Project {
  name: string
  desc: string
  tags: string[]
  link?: string
  result?: string
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-persona-purple/20 to-persona-dark border border-persona-purple/40 p-5 relative overflow-hidden group"
      style={{ clipPath: 'polygon(16px 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
    >
      {/* 金色顶部线 */}
      <div className="absolute top-0 left-4 right-4 h-0.5 bg-persona-gold/60" />

      {/* 项目名称 */}
      <h3 className="text-persona-gold font-black text-lg mb-2 flex items-center gap-2">
        <span className="text-persona-purple">▶</span>
        {project.name}
      </h3>

      {/* 描述 */}
      <p className="text-white/75 text-sm mb-4 leading-relaxed">{project.desc}</p>

      {/* 成果 */}
      {project.result && (
        <p className="text-cyber-teal text-xs mb-3 flex items-center gap-1">
          <span>◆</span> {project.result}
        </p>
      )}

      {/* 技术栈标签 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 border border-persona-gold/40 text-persona-gold/80">
            {tag}
          </span>
        ))}
      </div>

      {/* 查看链接 */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-cyber-teal hover:text-persona-gold transition-colors underline"
        >
          查看详情 →
        </a>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 4: 运行测试，确认通过**

```bash
npx vitest run __tests__/components/sections/projects/
```

Expected: PASS

- [ ] **Step 5: 实现项目页**

```typescript
// src/app/[locale]/projects/page.tsx
import { getTranslations } from 'next-intl/server'
import { motion } from 'framer-motion'
import GlitchText from '@/components/ui/GlitchText'
import NPCXiaoke from '@/components/npc/NPCXiaoke'
import ProjectCard, { Project } from '@/components/sections/projects/ProjectCard'

// 项目数据（后续由用户填充实际项目）
const projectsZh: Project[] = [
  {
    name: 'AI对话数据标注项目',
    desc: '参与大规模LLM对话数据的标注与质量审核，涉及多轮对话、指令跟随、安全性评估等维度。',
    tags: ['数据标注', 'LLM', '质量审核', 'RLHF'],
    result: '处理50,000+对话样本，合格率98.5%',
  },
  {
    name: '标注规范文档体系建立',
    desc: '从零构建AI标注团队的规则文档体系，包含任务说明书、质检标准、边界案例判断指南。',
    tags: ['文档编写', '规范制定', '团队培训'],
    result: '文档被团队20+标注员采用，减少歧义30%',
  },
  {
    name: '多模态数据处理流水线',
    desc: '设计并执行图文对数据的收集、清洗、分类和标注全流程，保障数据质量符合模型训练要求。',
    tags: ['多模态', '数据清洗', '图文标注', 'Python'],
    result: '处理10,000+图文对，质检通过率96%',
  },
]

const projectsEn: Project[] = [
  {
    name: 'AI Dialogue Data Annotation',
    desc: 'Participated in large-scale LLM dialogue annotation and QA, covering multi-turn conversations, instruction following, and safety evaluation.',
    tags: ['Annotation', 'LLM', 'QA', 'RLHF'],
    result: 'Processed 50,000+ samples, 98.5% acceptance rate',
  },
  {
    name: 'Annotation Guidelines System',
    desc: 'Built annotation documentation system from scratch: task specs, QA standards, and edge case guides.',
    tags: ['Documentation', 'Standards', 'Training'],
    result: 'Adopted by 20+ annotators, reduced ambiguity by 30%',
  },
  {
    name: 'Multimodal Data Pipeline',
    desc: 'Designed and executed full pipeline for image-text pair collection, cleaning, classification, and annotation.',
    tags: ['Multimodal', 'Data Cleaning', 'Image Annotation', 'Python'],
    result: 'Processed 10,000+ image-text pairs, 96% QA pass rate',
  },
]

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('projects')
  const projects = locale === 'zh' ? projectsZh : projectsEn

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      {/* 页面标题 */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-3">
            <span className="text-cyber-teal text-xs font-bold tracking-widest">MISSIONS · 任务记录</span>
          </div>
          <GlitchText text={t('title')} className="text-4xl md:text-5xl block" />
          <p className="text-white/50 text-sm mt-2">{t('subtitle')}</p>
        </div>
        <NPCXiaoke locale={locale} size={90} />
      </div>

      {/* 项目卡片网格 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: 验证项目页**

访问 http://localhost:3000/zh/projects，应看到3个斜切角项目卡片和小可NPC

- [ ] **Step 7: Commit**

```bash
git add src/app/\[locale\]/projects/ src/components/sections/projects/ __tests__/components/sections/
git commit -m "feat: implement Projects page with ProjectCard components and NPC Xiaoke"
```

---

## Task 10: 作品集页开发

**Files:**
- Create: `src/app/[locale]/portfolio/page.tsx`
- Create: `src/components/sections/portfolio/Gallery.tsx`
- Create: `src/components/sections/portfolio/Lightbox.tsx`

- [ ] **Step 1: 实现 Lightbox**

```typescript
// src/components/sections/portfolio/Lightbox.tsx
'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface LightboxItem {
  type: 'image' | 'video'
  src: string
  alt: string
}

interface LightboxProps {
  item: LightboxItem | null
  onClose: () => void
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-4xl max-h-[90vh] relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={e => e.stopPropagation()}
          >
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} className="max-w-full max-h-[85vh] object-contain border border-persona-gold/40" />
            ) : (
              <video src={item.src} controls autoPlay className="max-w-full max-h-[85vh] border border-persona-gold/40" />
            )}
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/60 hover:text-persona-gold text-2xl font-bold"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: 实现 Gallery**

```typescript
// src/components/sections/portfolio/Gallery.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from './Lightbox'
import { cardHoverVariants } from '@/lib/animations'

interface GalleryItem {
  type: 'image' | 'video'
  src: string
  alt: string
  thumb?: string
}

interface GalleryProps {
  items: GalleryItem[]
}

export default function Gallery({ items }: GalleryProps) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-white/30">
        <div className="text-5xl mb-4">◇</div>
        <p>作品上传中，敬请期待...</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="aspect-square overflow-hidden cursor-pointer relative group"
            style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
            variants={cardHoverVariants}
            initial="rest"
            whileHover="hover"
            onClick={() => setSelected(item)}
          >
            {item.type === 'image' ? (
              <img
                src={item.thumb || item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                muted
                preload="metadata"
              />
            )}
            {/* 悬浮蒙版 */}
            <div className="absolute inset-0 bg-persona-gold/0 group-hover:bg-persona-gold/10 transition-colors flex items-center justify-center">
              {item.type === 'video' && (
                <span className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </>
  )
}
```

- [ ] **Step 3: 实现作品集页**

```typescript
// src/app/[locale]/portfolio/page.tsx
import { getTranslations } from 'next-intl/server'
import GlitchText from '@/components/ui/GlitchText'
import NPCBeer from '@/components/npc/NPCBeer'
import Gallery from '@/components/sections/portfolio/Gallery'

// 作品数据（用户上传素材后替换）
const portfolioItems: { type: 'image' | 'video'; src: string; alt: string }[] = [
  // 示例：{ type: 'image', src: '/assets/portfolio/work1.jpg', alt: 'AI生成图1' },
]

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('portfolio')

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <div className="flex items-start justify-between mb-12">
        <div>
          <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-3">
            <span className="text-cyber-teal text-xs font-bold tracking-widest">GALLERY · 创作</span>
          </div>
          <GlitchText text={t('title')} className="text-4xl md:text-5xl block" />
          <p className="text-white/50 text-sm mt-2">{t('subtitle')}</p>
        </div>
        <NPCBeer locale={locale} size={90} />
      </div>

      <Gallery items={portfolioItems} />
    </div>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\[locale\]/portfolio/ src/components/sections/portfolio/
git commit -m "feat: implement Portfolio page with Gallery, Lightbox, and NPC Beer"
```

---

## Task 11: 联系页开发

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`
- Create: `src/components/sections/contact/ContactInfo.tsx`
- Create: `__tests__/components/sections/contact/ContactInfo.test.tsx`

- [ ] **Step 1: 编写 ContactInfo 测试**

```typescript
// __tests__/components/sections/contact/ContactInfo.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import ContactInfo from '@/components/sections/contact/ContactInfo'
import zh from '@/messages/zh.json'

// Mock clipboard
Object.assign(navigator, {
  clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
})

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale="zh" messages={zh}>{children}</NextIntlClientProvider>
)

describe('ContactInfo', () => {
  it('renders email and wechat labels', () => {
    render(
      <ContactInfo
        email="test@example.com"
        wechat="testWechat"
        github="https://github.com/test"
      />,
      { wrapper: Wrapper }
    )
    expect(screen.getByText('邮箱')).toBeInTheDocument()
    expect(screen.getByText('微信')).toBeInTheDocument()
  })

  it('copy button triggers clipboard write', async () => {
    render(
      <ContactInfo email="test@example.com" wechat="testWechat" />,
      { wrapper: Wrapper }
    )
    const copyButtons = screen.getAllByText('复制')
    fireEvent.click(copyButtons[0])
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test@example.com')
  })
})
```

- [ ] **Step 2: 运行测试，确认失败**

```bash
npx vitest run __tests__/components/sections/contact/
```

Expected: FAIL

- [ ] **Step 3: 实现 ContactInfo**

```typescript
// src/components/sections/contact/ContactInfo.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { slideInFromLeft } from '@/lib/animations'

interface ContactInfoProps {
  email?: string
  wechat?: string
  github?: string
  linkedin?: string
}

export default function ContactInfo({ email, wechat, github, linkedin }: ContactInfoProps) {
  const t = useTranslations('contact')
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const items = [
    { key: 'email', label: t('email'), value: email, icon: '📧' },
    { key: 'wechat', label: t('wechat'), value: wechat, icon: '💬' },
  ].filter(item => item.value)

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <motion.div
          key={item.key}
          className="flex items-center gap-4 p-4 border border-persona-purple/40 bg-persona-purple/10"
          style={{ clipPath: 'polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)' }}
          variants={slideInFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={i}
        >
          <span className="text-2xl">{item.icon}</span>
          <div className="flex-1">
            <div className="text-white/50 text-xs mb-1">{item.label}</div>
            <div className="text-white font-mono">{item.value}</div>
          </div>
          <motion.button
            onClick={() => handleCopy(item.value!, item.key)}
            className="clip-persona px-3 py-1.5 text-xs font-bold border border-persona-gold/60 text-persona-gold hover:bg-persona-gold/20 transition-colors min-w-14"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied === item.key ? t('copied') : t('copy')}
          </motion.button>
        </motion.div>
      ))}

      {/* 社交链接 */}
      {(github || linkedin) && (
        <div className="flex gap-4 mt-6">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="clip-persona px-4 py-2 border border-persona-purple/60 text-white/70 hover:text-white hover:border-persona-purple text-sm transition-colors">
              GitHub ↗
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer"
              className="clip-persona px-4 py-2 border border-cyber-teal/60 text-cyber-teal/70 hover:text-cyber-teal text-sm transition-colors">
              LinkedIn ↗
            </a>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: 运行测试，确认通过**

```bash
npx vitest run __tests__/components/sections/contact/
```

Expected: PASS

- [ ] **Step 5: 实现联系页**

```typescript
// src/app/[locale]/contact/page.tsx
import { getTranslations } from 'next-intl/server'
import GlitchText from '@/components/ui/GlitchText'
import NPCRingbell from '@/components/npc/NPCRingbell'
import NPCDuoduo from '@/components/npc/NPCDuoduo'
import NPCXiaoke from '@/components/npc/NPCXiaoke'
import NPCBeer from '@/components/npc/NPCBeer'
import ContactInfo from '@/components/sections/contact/ContactInfo'

// 实际联系方式（用户填写后替换）
const CONTACT = {
  email: 'your-email@example.com',  // 替换为真实邮箱
  wechat: 'your-wechat-id',          // 替换为真实微信
  github: 'https://github.com/yourusername',
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations('contact')

  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="clip-persona bg-persona-purple/40 inline-block px-4 py-1 mb-3">
          <span className="text-cyber-teal text-xs font-bold tracking-widest">CONTACT · 联系</span>
        </div>
        <GlitchText text={t('title')} className="text-4xl md:text-5xl block" />
      </div>

      {/* 全员NPC出场 */}
      <div className="flex justify-center gap-8 mb-12">
        <NPCRingbell locale={locale} size={70} />
        <NPCDuoduo locale={locale} size={70} />
        <NPCXiaoke locale={locale} size={70} />
        <NPCBeer locale={locale} size={70} />
      </div>

      <p className="text-white/50 text-center text-sm mb-10">{t('npcLine')}</p>

      <ContactInfo
        email={CONTACT.email}
        wechat={CONTACT.wechat}
        github={CONTACT.github}
      />
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add src/app/\[locale\]/contact/ src/components/sections/contact/ __tests__/components/sections/contact/
git commit -m "feat: implement Contact page with all NPCs, copy-to-clipboard, and social links"
```

---

## Task 12: 响应式设计与移动端优化

**Files:**
- Modify: `src/components/layout/Navigation.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/components/layout/CircuitBackground.tsx`

- [ ] **Step 1: 为 Navigation 添加移动端汉堡菜单**

```typescript
// src/components/layout/Navigation.tsx （完整替换）
'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface NavigationProps { currentLocale: string }

const navKeys = ['home', 'resume', 'projects', 'portfolio', 'contact'] as const
const navPaths: Record<string, string> = {
  home: '/',
  resume: '/resume',
  projects: '/projects',
  portfolio: '/portfolio',
  contact: '/contact',
}

export default function Navigation({ currentLocale }: NavigationProps) {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const switchLocale = () => {
    const newLocale = currentLocale === 'zh' ? 'en' : 'zh'
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
    router.push(`/${newLocale}${pathWithoutLocale}`)
    setMobileOpen(false)
  }

  const NavLink = ({ k }: { k: string }) => {
    const href = `/${currentLocale}${navPaths[k]}`
    const isActive = pathname === href || (k === 'home' && pathname === `/${currentLocale}`)
    return (
      <Link href={href} onClick={() => setMobileOpen(false)}>
        <motion.div
          className={`clip-persona px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${
            isActive ? 'bg-persona-gold text-persona-dark' : 'bg-persona-purple/30 text-white hover:bg-persona-purple/60'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t(k as typeof navKeys[number])}
        </motion.div>
      </Link>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-persona-dark/90 backdrop-blur-sm border-b border-persona-purple/30">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* 桌面端导航 */}
        <div className="hidden md:flex gap-1">
          {navKeys.map(k => <NavLink key={k} k={k} />)}
        </div>

        {/* 移动端汉堡菜单按钮 */}
        <button
          className="md:hidden text-persona-gold font-bold text-xl"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* 语言切换 */}
        <motion.button
          onClick={switchLocale}
          className="clip-persona px-3 py-1.5 text-xs font-bold border border-cyber-teal text-cyber-teal hover:bg-cyber-teal/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tCommon('switchLang')}
        </motion.button>
      </div>

      {/* 移动端下拉菜单 */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden border-t border-persona-purple/30 bg-persona-dark/95 px-4 py-3 flex flex-col gap-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {navKeys.map(k => <NavLink key={k} k={k} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
```

- [ ] **Step 2: 移动端减少电路背景粒子数量**

在 `src/components/layout/CircuitBackground.tsx` 中，将粒子数量改为根据屏幕宽度动态调整：

```typescript
// 在 useEffect 内，替换固定的 30 为：
const count = window.innerWidth < 768 ? 15 : 30
for (let i = 0; i < count; i++) {
```

- [ ] **Step 3: 全局测试响应式布局**

```bash
npm run dev
```

在浏览器中：
1. 打开 DevTools → 切换移动端视图（375px）
2. 验证汉堡菜单可正常展开/关闭
3. 验证各页面内容不溢出
4. 切换到平板视图（768px）验证网格布局

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navigation.tsx src/components/layout/CircuitBackground.tsx
git commit -m "feat: add mobile hamburger menu and responsive circuit background"
```

---

## Task 13: 性能优化与 SEO

**Files:**
- Create: `src/app/[locale]/layout.tsx` (修改，添加 metadata)
- Create: `public/robots.txt`

- [ ] **Step 1: 添加动态 metadata**

在 `src/app/[locale]/layout.tsx` 添加 generateMetadata：

```typescript
// 在 LocaleLayout 函数前添加：
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh'
  return {
    title: isZh ? 'Guoli | AI训练师 · 数据标注专家' : 'Guoli | AI Trainer · Data Annotation Expert',
    description: isZh
      ? '个人作品集网站，展示AI训练、数据标注领域的专业经验与项目成果'
      : 'Personal portfolio showcasing AI training and data annotation expertise',
    openGraph: {
      title: isZh ? 'Guoli 的个人主页' : "Guoli's Portfolio",
      description: isZh ? 'AI训练师 · 数据标注 · 内容创作' : 'AI Trainer · Data Annotation · Content Creation',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
  }
}
```

- [ ] **Step 2: 创建 robots.txt**

```
# public/robots.txt
User-agent: *
Allow: /
```

- [ ] **Step 3: 在 next.config.ts 中配置静态导出语言路径**

确认 next.config.ts 包含生成静态路径配置（适用于 GitHub Pages）：

```typescript
// next.config.ts - 确认有以下配置
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,  // GitHub Pages 需要
}
```

- [ ] **Step 4: 运行 Lighthouse 性能检测**

```bash
npm run build && npx serve@latest out
```

在另一个终端：访问 http://localhost:3000，使用 Chrome DevTools → Lighthouse 运行检测

Expected: Performance > 80, Accessibility > 90

- [ ] **Step 5: Commit**

```bash
git add next.config.ts public/robots.txt src/app/\[locale\]/layout.tsx
git commit -m "feat: add SEO metadata, Open Graph, and static export config for GitHub Pages"
```

---

## Task 14: 部署配置

**Files:**
- Create: `.github/workflows/deploy.yml`（GitHub Pages 部署）
- 或配置 Vercel（推荐）

- [ ] **Step 1: 最终构建测试**

```bash
npm run build
```

Expected: 构建成功，无 TypeScript 或 ESLint 错误，输出在 `out/` 目录

- [ ] **Step 2: 本地预览静态构建**

```bash
npx serve out
```

访问 http://localhost:3000，确认所有页面正常、导航切换、语言切换有效

- [ ] **Step 3A: 选择 Vercel 部署（推荐，最简单）**

```bash
npm install -g vercel
vercel --prod
```

按照提示关联 GitHub 仓库，自动部署。Vercel 支持 Next.js 零配置。

- [ ] **Step 3B: 或选择 GitHub Pages 部署**

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

- [ ] **Step 4: 推送代码触发部署**

```bash
git add .github/ || git add vercel.json
git commit -m "feat: add deployment configuration"
git push origin main
```

- [ ] **Step 5: 验证线上部署**

访问 Vercel/GitHub Pages 提供的 URL，验证：
- 首页正常加载，电路背景动画运行
- 导航在中英文间切换
- 所有 5 个页面可访问
- 移动端布局正常

---

## 自检：需求覆盖确认

| 需求 | 任务 | 状态 |
|------|------|------|
| 5个主要页面 | Task 7-11 | ✅ |
| Persona斜切角UI | Task 4-5 (ClipCard, CSS) | ✅ |
| GlitchText效果 | Task 5 (GlitchText) | ✅ |
| 打字机效果 | Task 5 (TypewriterText) | ✅ |
| 电路纹理背景 | Task 6 (CircuitBackground) | ✅ |
| 页面切换过场 | Task 6 (PageTransition) | ✅ |
| 4个NPC + 待机动画 | Task 6 (NPCBase + 4 NPCs) | ✅ |
| NPC点击对话 | Task 6 (NPCBase + NPCDialog) | ✅ |
| 中英双语切换 | Task 3 (next-intl) | ✅ |
| 技能雷达图 | Task 8 (SkillRadar) | ✅ |
| PDF下载 | Task 8 (PersonaButton) | ✅ |
| 项目卡片式布局 | Task 9 (ProjectCard) | ✅ |
| 作品集瀑布/网格 + Lightbox | Task 10 (Gallery + Lightbox) | ✅ |
| 联系方式一键复制 | Task 11 (ContactInfo) | ✅ |
| 响应式设计 | Task 12 | ✅ |
| SEO优化 | Task 13 | ✅ |
| 部署 | Task 14 | ✅ |
| NPC台词双语 | Task 2 (constants.ts) | ✅ |
| 霓虹发光效果 | Task 4 (globals.css) | ✅ |
| 卡片Hover动效 | Task 2 (animations.ts) | ✅ |

## 素材占位说明

以下素材需在开发过程中或之后填充，不影响功能开发：

| 素材 | 路径 | 何时需要 |
|------|------|----------|
| 个人卡通形象 | `public/assets/images/hero-avatar.png` | Task 7 |
| 铃布NPC图 | `public/assets/npc/ringbell.png` | Task 6 |
| 角多多NPC图 | `public/assets/npc/duoduo.png` | Task 6 |
| 小可NPC图 | `public/assets/npc/xiaoke.png` | Task 6 |
| 小啤酒NPC图 | `public/assets/npc/beer.png` | Task 6 |
| 中文简历PDF | `public/assets/resume-zh.pdf` | Task 8 |
| 英文简历PDF | `public/assets/resume-en.pdf` | Task 8 |
| AI作品图/视频 | `public/assets/portfolio/` | Task 10 |
| 真实联系方式 | `src/app/[locale]/contact/page.tsx` 的 CONTACT 对象 | Task 11 |
| 真实工作经历 | `TimelineSection.tsx` 的 experienceZh/En | Task 8 |
| 真实项目信息 | `projects/page.tsx` 的 projectsZh/En | Task 9 |
