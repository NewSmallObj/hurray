'use client'
import useCollapse from '@/app/store/useCollapse'
import useTheme from '@/app/store/useTheme'
import { themeValues } from '@/app/utils/themeStants'
import { ConfigProvider, Layout, theme, ThemeConfig } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useEffect, useMemo } from 'react'
const { Header, Footer, Sider, Content } = Layout
import clsx from "clsx"

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

  const algorithm = useMemo(() => {
    return currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
  }, [currentTheme])

	return (
		<ConfigProvider theme={{
      algorithm,
      token: themeValues[currentTheme].token
    }} locale={zhCN}>
			<Layout className="w-full h-full box-border">
				{header}
				<Layout>
					<Sider theme="light" collapsed={collapse} width="200px">
						{sider}
					</Sider>
					<Content className='w-full h-full p-[20px] box-border'>{children}</Content>
				</Layout>
			</Layout>
		</ConfigProvider>
	)
}
