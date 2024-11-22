import { Lato } from 'next/font/google'
import './globals.css'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { Analytics } from "@vercel/analytics/react"

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'SlideLab',
  description: '图表制作，PPT工具，数据可视化',
}

export default function RootLayout ({ children }) {
  return (
    <html lang="zh-CN">
      <Analytics />
      <body className={lato.className}>
        <ConfigProvider
          locale={zhCN}
          theme={{
            components: {
              ColorPicker: {
                popupOverlayInnerPadding: 8,
              },
              Select: {
                zIndexPopup: 1100,
              },
            },
            token: {
              colorPrimary: '#2d3efa',
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  )
}
