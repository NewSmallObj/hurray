'use client'
import useCollapse from '@/app/store/useCollapse'
import useTheme from '@/app/store/useTheme'
import { themeValues } from '@/app/utils/themeStants'
import { Breadcrumb, ConfigProvider, Layout, Splitter, theme, ThemeConfig } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useEffect, useMemo } from 'react'
const { Header, Footer, Sider, Content } = Layout
import clsx from "clsx"
import { useRouter } from 'next/router'
import { usePathname, useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation'

export default function RootLayout({
	children,
	sider,
	header,
}: Readonly<{
	children: React.ReactNode
	sider: React.ReactNode
	header: React.ReactNode
}>) {
	const { collapse } = useCollapse()

	const { currentTheme } = useTheme()

  const pathname = usePathname()

  // const items = 

  const algorithm = useMemo(() => {
    return currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  }, [currentTheme])

	return (
		<ConfigProvider 
      componentSize='middle'
      theme={{
        algorithm,
        token: themeValues[currentTheme].token
      }} 
      locale={zhCN}>
			
      <Splitter layout="vertical" className='w-full h-full box-border'>
        <Splitter.Panel max={50} defaultSize={50}>
          {header} 
        </Splitter.Panel>
        <Splitter.Panel>
          <Splitter layout="horizontal">
            <Splitter.Panel defaultSize={200} max={200}>
              {sider}
            </Splitter.Panel>
            <Splitter.Panel>
              
              <div className='w-full h-full p-[20px] box-border'>
                {children}
              </div>
            </Splitter.Panel>
          </Splitter>
        </Splitter.Panel>
      </Splitter>
		</ConfigProvider>
	)
}



{/* <Layout className="w-full h-full box-border">
				
				<Layout>
					<Sider theme="light" collapsed={collapse} width="200px">
						{sider}
					</Sider>
					<Content className='w-full h-full p-[20px] box-border'>{children}</Content>
				</Layout>
			</Layout> */}