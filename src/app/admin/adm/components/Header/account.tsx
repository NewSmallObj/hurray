'use client'
import { UserOutlined,LogoutOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Account() {

  const router = useRouter()

	const items:MenuProps['items'] = [
    {
      label:"退出登录",
      key:"logout",
      icon:<LogoutOutlined />
    }
  ]

	const handleMenuClick: MenuProps['onClick'] = (e) => {
    if(e.key === "logout"){
      signOut()
      router.replace('/admin/login')
    }
  }

	return (
		<div>
			<Dropdown
				menu={{
					items,
					onClick: handleMenuClick,
				}}
				trigger={['click']}
			>
				<Button type='text' onClick={(e) => e.preventDefault()}>
          <UserOutlined />
				</Button>
			</Dropdown>
		</div>
	)
}
