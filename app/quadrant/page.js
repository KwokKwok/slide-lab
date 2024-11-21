import dynamic from 'next/dynamic'
import './page.css'

const Quadrant = dynamic(() => import('./components'), {
  ssr: false
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  title: '象限编辑器 | SlideLab',
  description: '专业的在线象限图制作工具，帮助您轻松创建优先级矩阵、SWOT分析、波士顿矩阵等多种象限图表',
  keywords: '象限图,四象限图,优先级矩阵,SWOT分析,波士顿矩阵,在线工具,图表制作',
  openGraph: {
    title: '象限编辑器 | SlideLab - 专业的在线象限图制作工具',
    description: '专业的在线象限图制作工具，帮助您轻松创建优先级矩阵、SWOT分析、波士顿矩阵等多种象限图表',
    type: 'website',
    locale: 'zh_CN',
    siteName: 'SlideLab',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://slidelab.vercel.app/quadrant',
  }
}

export default function QuadrantPage () {
  return (
    <main className="flex min-h-screen bg-white flex-col items-center justify-center">
      <Quadrant />
    </main>
  )
} 