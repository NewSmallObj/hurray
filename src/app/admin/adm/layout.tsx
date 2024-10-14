'use client'
import LayoutHeader from '@/app/components/LayoutHeader/index'
import LayoutMenu from '@/app/components/LayoutMenu/index'
import useCollapse from '@/app/store/useCollapse'
import { Flex, Layout, Splitter, Typography,Row ,Col } from 'antd'
const { Header, Footer, Sider, Content } = Layout
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode,
}>) {

  const {collapse} =  useCollapse()
  
	return (
		<Layout className='w-full h-full box-border'>
			<Sider theme='light' collapsed={collapse} width="200px">
				<LayoutMenu />
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				<Content>{children}</Content>
			</Layout>
		</Layout>
	)
}
