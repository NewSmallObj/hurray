'use client'

import React, { useEffect } from 'react'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Table,
	Select,
	Space,
	TableColumnType,
} from 'antd'
import { useAntdTable } from 'ahooks'
import { FormDialog } from '@formily/antd-v5'
import SchemaForm from '@/app/components/SchemaForm/index'
import { Field, IFormProps } from '@formily/core'
import { MENU_SCHEMA } from '@/app/schema/menu'
import { PAGE_SYS_MENU } from '@/app/utils/stants'

const { Option } = Select

interface Item {
	name: {
		last: string
	}
	email: string
	phone: string
	gender: 'male' | 'female'
}

interface Result {
	total: number
	list: Item[]
}

const getTableData = (
	{ current, pageSize }:any,
	formData: Object
): Promise<Result> => {
	let query = `page=${current}&size=${pageSize}`
	Object.entries(formData).forEach(([key, value]) => {
		if (value) {
			query += `&${key}=${value}`
		}
	})

	return fetch(`https://randomuser.me/api?results=55&${query}`)
		.then((res) => res.json())
		.then((res) => ({
			total: res.info.results,
			list: res.results,
		}))
}
export default function MenuPage() {
	const [form] = Form.useForm()

	const { tableProps, search, params } = useAntdTable(getTableData, {
		defaultPageSize: 5,
		cacheKey: PAGE_SYS_MENU,
		form,
	})

	const { type, changeType, submit, reset } = search

  const fetchMenuTree = (field:Field)=>{
    // const list = treeToArray(tableData.value.list,'0').map((v)=>({...v,label:v.name,value:v.id}))
    
    field.loading = true
    field.dataSource = [...tableProps.dataSource] // {label:"-",value:'0',children:arrayToTree(list)}
    field.loading = false
  }

	const hanlder = async () => {
		const dialog = await FormDialog(
			'编辑',
			SchemaForm(MENU_SCHEMA, {
				readOnly: true,
        fetchMenuTree
			})
		)
		await dialog.forOpen((payload:IFormProps, next:(props?: IFormProps) => Promise<any>) => {
			next({
        initialValues: {
          aaa: '123',
        },
      })
		})
		
		await dialog.open().then((value) => {
			console.log('submit', value)
		})

    await dialog.forConfirm((payload, next) => {
			next(payload)
		})
	}

	const columns: TableColumnType[] = [
		{
			title: 'name',
			dataIndex: ['name', 'last'],
		},
		{
			title: 'email',
			dataIndex: 'email',
		},
		{
			title: 'phone',
			dataIndex: 'phone',
		},
		{
			title: 'gender',
			dataIndex: 'gender',
		},
		{
			title: 'opreation',
			render: (_, record) => (
				<Button type="link" onClick={() => hanlder()}>
					edit
				</Button>
			),
		},
	]

	return (
		<div className="w-full box-border overflow-y-auto h-full p-4">
			<div className="bg-[--background] w-full p-4 pb-0 rounded-md mb-4">
				<Form form={form}>
					<Row gutter={24}>
						<Col span={6}>
							<Form.Item label="name" name="name">
								<Input placeholder="name" />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label="email" name="email">
								<Input placeholder="email" />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label="phone" name="phone">
								<Input placeholder="phone" />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Space>
								<Button type="primary" onClick={submit}>
									搜索
								</Button>
								<Button onClick={reset}>重置</Button>
							</Space>
						</Col>
					</Row>
				</Form>
			</div>

			<div className="bg-[--background] w-full p-4 rounded-md">
				<Table
					columns={columns}
					rowKey="email"
					style={{ overflow: 'auto' }}
					{...tableProps}
				/>
			</div>
		</div>
	)
}
