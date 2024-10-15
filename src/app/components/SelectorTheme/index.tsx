'use client'
import useTheme from '@/app/store/useTheme'
import { detectTheme } from '@/app/utils/detectTheme'
import { Theme, themes, themeValues } from '@/app/utils/themeStants'
import { BgColorsOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import { useLayoutEffect, useMemo } from 'react'

export default function SelectorTheme() {
	const { currentTheme, setCurrentTheme } = useTheme()

	const items = useMemo<MenuProps['items']>(() => {
		return themes.map((v) => ({
			key: v,
			label: v,
			value: v,
		}))
	}, [themes])

	const setCssVar = (theme: Theme) => {
		const root = document.documentElement
    const {token,...values} = themeValues[theme]
		Object.entries(values).forEach(([key, value]) => {
			root.style.setProperty(key, value)
		})
	}

	useLayoutEffect(() => {
		setCurrentTheme(detectTheme() as Theme)
		setCssVar(detectTheme() as Theme)
	}, [])

	const handleMenuClick: MenuProps['onClick'] = (e) => {
		setCurrentTheme(e.key as Theme)
		setCssVar(e.key as Theme)
	}

	return (
		<div>
			<Dropdown
				menu={{
					items,
					selectable: true,
					defaultSelectedKeys: [currentTheme],
					onClick: handleMenuClick,
				}}
				trigger={['click']}
			>
				<Button type='text' onClick={(e) => e.preventDefault()}>
          <BgColorsOutlined />
				</Button>
			</Dropdown>

			<div className="hidden">
				{themes.map((v) => (
					<input
						key={v}
						type="checkbox"
						className="theme-controller"
						aria-label={v}
						checked={v === currentTheme}
						value={v}
						onChange={(e) =>
							setCurrentTheme(e.target.value as Theme)
						}
					/>
				))}
			</div>
		</div>
	)
}
