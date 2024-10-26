'use client'
import useCollapse from '@/app/store/useCollapse'
import useTheme from '@/app/store/useTheme'
import { themeValues } from '@/app/utils/themeStants'
import {
	Breadcrumb,
	ConfigProvider,
	Layout,
	message,
	Spin,
	Splitter,
	Tabs,
	theme,
	ThemeConfig,
} from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useEffect, useMemo, useState } from 'react'
const { Header, Footer, Sider, Content } = Layout
import clsx from 'clsx'
import { useParams, usePathname, useRouter } from 'next/navigation'
import LayoutHeader from './components/Header/index'
import LayoutSider from './components/Sider/index'
import {
	useLocalStorageState,
	useSessionStorageState,
	useThrottleEffect,
} from 'ahooks'
import { LAYOUTTAGS, LOCALSTORAGE } from '@/app/utils/stants'
import { findIndex, get, last, omit } from 'lodash'
import useUser from '@/app/store/useUser'
import { signOut } from 'next-auth/react'
const Panel = Splitter.Panel

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const { collapse } = useCollapse()
	const { currentTheme } = useTheme()
	const pathname = usePathname()
	const params = useParams()
	const router = useRouter()
	const [activeKey, setActiveKey] = useState('')
	const { setCurrentUser, setDic, setMenuTree, setPermsList } = useUser()
	const [userData, setUserData] = useLocalStorageState<any>(LOCALSTORAGE)
	const [spinning, setSpinning] = useState(true)

	useThrottleEffect(
		() => {
			if (!userData) {
				message.warning('登陆失效')
				signOut()
				return router.replace('/admin/login')
			}
			setCurrentUser(userData.user)
			setDic(userData.infra.dict)
			setMenuTree(userData.infra.menu)
			setPermsList(userData.infra.user?.permissionCodes || [])
      setSpinning(false)
		},
		[userData],
		{ wait: 100 }
	)

	const [layoutTags, setLayoutTags] = useSessionStorageState(LAYOUTTAGS, {
		defaultValue: {},
		listenStorageChange: true,
	})

	const tags = useMemo(() => {
		if (!layoutTags) return []
		return Object.entries(layoutTags!).map(([key, value]) => {
			return {
				label: key,
				key: key,
				children: <></>,
			}
		})
	}, [layoutTags])

	useThrottleEffect(
		() => {
			if (pathname === '/admin/adm') return
			setLayoutTags({
				...layoutTags,
				[pathname]: params,
			})
			setActiveKey(pathname)
		},
		[pathname, params],
		{ wait: 500 }
	)

	const algorithm = useMemo(() => {
		return currentTheme === 'dark'
			? theme.darkAlgorithm
			: theme.defaultAlgorithm
	}, [currentTheme])

	const onChange = (newActiveKey: string) => {
		setActiveKey(newActiveKey)
		router.push(newActiveKey)
	}

	const onEdit = (targetKey: any, action: 'add' | 'remove') => {
		if (action === 'remove') {
			remove(targetKey)
		}
	}

	const remove = (targetKey: string) => {
		if (pathname === targetKey) {
			const index = findIndex(tags, (item: any) => item.key === targetKey)
			const item = tags[index - 1]
			if (item) {
				onChange(item.key)
			}
		}

		setLayoutTags({ ...omit(layoutTags!, [targetKey]) })
	}

	return (
		<ConfigProvider
			componentSize="middle"
			theme={{
				algorithm,
				token: {
					...themeValues[currentTheme].token,
				},
			}}
			// button={{ style: { borderRadius: 99 } }}
			locale={zhCN}
		>
			<Spin spinning={spinning} percent={"auto"} fullscreen />
			<div className={clsx(`w-full h-full box-border`,{
        hidden: spinning
      })}>
				<Splitter
					layout="vertical"
					className={clsx(`w-screen h-screen box-border`)}
				>
					<Panel max={50} defaultSize={50}>
						<LayoutHeader />
					</Panel>
					<Panel>
						<Splitter>
							<Panel
								className={clsx(`min-w-[200px]`)}
								defaultSize={200}
								max={200}
							>
								<LayoutSider />
							</Panel>
							<Panel>
								{/* <div className={
                clsx(`w-full h-full flex flex-col items-start justify-start box-border p-2`,{
                  "bg-gray-100": currentTheme !== 'dark'
                })
              }>
								<Tabs
									hideAdd
                  className='w-full rounded-md'
                  size="small"
									onChange={onChange}
									activeKey={activeKey}
									type="editable-card"
									onEdit={onEdit}
									items={tags}
								/>
								<div className='flex-1 w-full box-border border-l border-r border-solid border-base-200'>
                  {children}
                </div>
							</div> */}
								<div className="w-full h-full bg-base-200 box-border">
									{children}
								</div>
							</Panel>
						</Splitter>
					</Panel>
				</Splitter>
			</div>
		</ConfigProvider>
	)
}

{
	/* <Layout className="w-full h-full box-border">
				
				<Layout>
					<Sider theme="light" collapsed={collapse} width="200px">
						{sider}
					</Sider>
					<Content className='w-full h-full p-[20px] box-border'>{children}</Content>
				</Layout>
			</Layout> */
}
