export const COLORS = {
  gold: '#FFD900',
  purple: '#6B21A8',
  dark: '#1A1A2E',
  teal: '#00CED1',
} as const

export const NPC_LINES = {
  ringbell: {
    zh: ['慢慢来…… 不急的', '进来吧，我等你很久了', '喵。（瞄了你一眼，继续打盹）'],
    en: ["Take your time... no rush", "Come in, I've been waiting", '*stares at you, then naps*'],
  },
  duoduo: {
    zh: ['♩♪ 欢迎欢迎！我来介绍我的主人！', '嘿！这里有她的全部战绩哦！', '吹个口哨给你 ～ 呼哩哩～'],
    en: ['♩♪ Welcome welcome! Let me introduce!', 'Hey! All her achievements are here!', '*whistles* Here we go~'],
  },
  xiaoke: {
    zh: ['哼，这个项目还行吧', '总算做了点正经事', '（傲娇地转过头）……还凑合'],
    en: ["Hmph, this project is... acceptable", "Finally did something decent", "(turns away) ...it's fine"],
  },
  beer: {
    zh: ['这个好看吧？我觉得好看……', '要不要看看这个？', '（小声）小可说这个不错……'],
    en: ["This looks nice, right? I think so...", "Want to check this out?", "(quietly) Xiaoke said this is good..."],
  },
}

export const PAGES = ['home', 'resume', 'projects', 'portfolio', 'contact'] as const
export type Page = typeof PAGES[number]
