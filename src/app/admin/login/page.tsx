'use client'

import { useDocumentVisibility, useThrottleEffect } from 'ahooks'
import { useEffect, useLayoutEffect } from 'react'
import Image from 'next/image'
import { BASE_STATICPREFIX } from '@/app/utils/stants'
import { Button, Col, Form, Input, Row, Select, Space } from 'antd'

export default function LoginPage() {
	const [form] = Form.useForm()

	useThrottleEffect(
		() => {
			if (typeof window !== 'undefined') {
				console.log('login page', window.config)
			}
		},
		[],
		{
			wait: 100,
		}
	)

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

				<Form form={form}>
					<Form.Item name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
						<Input placeholder="请输入用户名" />
					</Form.Item>
					<Form.Item name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
						<Input.Password
							type="password"
							placeholder="请输入密码"
						/>
					</Form.Item>
					<Form.Item>
						<Button block type="primary" onClick={form.submit}>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
