'use client'
import useCollapse from '@/app/store/useCollapse'
import useTheme from '@/app/store/useTheme'
import { themeValues } from '@/app/utils/themeStants'
import {
	Breadcrumb,
	Button,
	ConfigProvider,
	Dropdown,
	Layout,
	message,
	Space,
	Spin,
	Splitter,
	Tabs,
	Tag,
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
import type { MenuProps } from 'antd';
import { treeToArray } from '@/app/utils/utils'
import { DownOutlined } from '@ant-design/icons';
const Panel = Splitter.Panel



const items: MenuProps['items'] = [
  {
    label: "关闭当前",
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: "关闭左侧",
    key: '1',
  },
  {
    label: '关闭右侧',
    key: '2',
  },
  {
    label: '全部关闭',
    key: '3',
  },
];

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
	const { menuTree, setCurrentUser, setDic, setMenuTree, setPermsList } =
		useUser()
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

	const menu = useMemo(() => {
		return treeToArray(menuTree, '0')
	}, [menuTree])

	const getLable = (key: string) => {
		return menu.find((item) => item.route_path === key)?.name || ''
	}

	const [layoutTags, setLayoutTags] = useSessionStorageState(LAYOUTTAGS, {
		defaultValue: {},
		listenStorageChange: true,
	})

	const tags = useMemo(() => {
		if (!layoutTags) return []
		return Object.entries(layoutTags!).map(([key, value]) => {
			return {
				id: key,
				label: getLable(key),
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

	// const onEdit = (targetKey: any, action: 'add' | 'remove') => {
	// 	if (action === 'remove') {
	// 		remove(targetKey)
	// 	}
	// }

	const colorPrimary = useMemo(() => {
		return themeValues[currentTheme]['token']['colorPrimary']
	}, [currentTheme, themeValues])

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


  const handleMenuClick:MenuProps['onClick'] = (e) => {
    if(e.key === "0"){
      remove(activeKey)
    }
    const currentIndex = tags.findIndex((v)=>v.key === activeKey)
    if(e.key === '1'){
      const keys = tags.filter((_,i)=> i < currentIndex).map((v)=>v.key)
      setLayoutTags({ ...omit(layoutTags!, [...keys]) })
    }
    if(e.key === '2'){
      const keys = tags.filter((_,i)=> i > currentIndex).map((v)=>v.key)
      setLayoutTags({ ...omit(layoutTags!, [...keys]) })
    }
    if(e.key === '3'){
      tags.forEach((v)=>{
        remove(v.key)
      })
    }
  }


  const DropDownRight = ()=>(
    <Dropdown menu={{ 
      items,
      onClick: handleMenuClick,
       }} trigger={['hover']}>
      <a className='p-[20px]' onClick={(e) => e.preventDefault()}>
        <DownOutlined />
      </a>
    </Dropdown>
  )

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
			<Spin spinning={spinning} percent={'auto'} fullscreen />
			<div
				className={clsx(`w-full h-full box-border`, {
					hidden: spinning,
				})}
			>
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
								<div className="w-full h-full box-border flex justify-start items-start flex-col">
									<div className={
                    clsx(`w-full box-border px-[20px]`,{
                      'hidden': !tags.length
                    })
                  }>
										<Tabs
											className="w-full box-border"
											defaultActiveKey={activeKey}
											tabBarExtraContent={<DropDownRight />}
											tabPosition={'top'}
											items={tags}
                      style={{height:'46px'}}
                      size={'small'}
											renderTabBar={(
												props,
												DefaultTabBar
											) => (
												<DefaultTabBar {...props}>
													{(node) => (
														<div key={node.key} className="h-[46px] flex justify-center items-center flex-col">
                              <Tag
                                key={node.key}
                                closable
                                color={ node.key === activeKey ? colorPrimary : ''}
                                className={clsx(
                                  `cursor-pointer`
                                )}
                                onClick={() =>onChange(node.key!)}
                                onClose={() =>remove(node.key!)}
                              >
                                {getLable( node.key!)}
                              </Tag>
                            </div>
													)}
												</DefaultTabBar>
											)}
										/>
									</div>

									<div className="flex-1 w-full bg-base-200 box-border">
										{children}
									</div>
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
