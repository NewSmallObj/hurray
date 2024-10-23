'use client'

import { useDocumentVisibility, useLocalStorageState, useThrottleEffect } from 'ahooks'
import { useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import { BASE_STATICPREFIX, LOCALSTORAGE } from '@/app/utils/stants'
import { Button, Col, Form, Input, Row, Select, Space } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { login } from '@/app/_api/common/user'
import useUser from '@/app/store/useUser'

export default function LoginPage() {
	const [form] = Form.useForm()
	const router = useRouter()
	const [loading, setLodaing] = useState(false);

  const [ userData,setUserData ] = useLocalStorageState(LOCALSTORAGE)

	useThrottleEffect(
		() => {
			if (typeof window !== 'undefined') {
				console.log('login page', window.config)
				form.setFieldsValue({
					username: 'superadmin',
					password: '123456',
				})
			}
		},
		[],
		{
			wait: 100,
		}
	)

	const submit = async (values: any) => {
		try {
			setLodaing(true)
			const res = await signIn('credentials', {
				username: values.username,
				password: values.password,
				redirect: false,
			})
			if (res?.ok) {
				const res = await login({
					username: values.username,
					password: values.password,
				})

				// console.log(res.data)
        setUserData(res.data)
				router.push('/admin/adm')
			}
		} catch (error) {
		} finally {
			setTimeout(() => {
        setLodaing(false)
      }, 2000);
		}
	}

	return (
		<div className="w-full h-full box-border relative z-10">
			<Image
				className="object-cover h-full w-full"
				width={1920}
				height={1080}
				style={{ width: '100%', height: '100%' }}
				src={`${BASE_STATICPREFIX}/images/login_sw.png`}
				alt={'bg'}
				priority
			/>
			<div className="absolute top-1/2 right-10 shadow-md -translate-y-1/2 bg-white rounded-sm w-[400px] p-[40px]">
				<div className="text-left mb-[40px] font-bold text-[24px]">
					项目名
				</div>

				<Form form={form} onFinish={submit}>
					<Form.Item
						name="username"
						rules={[{ required: true, message: '请输入用户名' }]}
					>
						<Input placeholder="请输入用户名" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: '请输入密码' }]}
					>
						<Input.Password
							type="password"
							placeholder="请输入密码"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							block
							type="primary"
							loading={loading}
							onClick={form.submit}
						>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
