'use client'

import React, { useEffect, useState } from 'react'
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
	Tag,
	Popconfirm,
	message,
} from 'antd'
import { useAntdTable, useThrottleEffect } from 'ahooks'
import { FormDialog } from '@formily/antd-v5'
import SchemaForm from '@/app/components/SchemaForm/index'
import { Field, IFormProps } from '@formily/core'
import { MENU_SCHEMA } from '@/app/schema/menu'
import {
	PAGE_SYS_MENU,
	StatusOperation,
	statusOperation,
} from '@/app/utils/stants'
import {
	MenuType,
	sysMenuDelete,
	sysMenuSave,
	sysMenuTree,
	sysMenuUpdate,
} from '@/app/_api/sys/menu'
import { find, get } from 'lodash'
import { arrayToTree, arrayToTree2, treeToArray } from '@/app/utils/utils'
import AntdIcon from '@/app/components/AntdIcon/index'

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

const MENUTYPE = [
	{
		label: '目录',
		value: 1,
	},
	{
		label: '菜单',
		value: 2,
	},
	{
		label: '按钮',
		value: 3,
	},
]

export default function MenuPage() {
	const [tableData, setTableData] = useState<MenuType[]>([])
	const [loading, setLoading] = useState(false)

	useThrottleEffect(
		() => {
			getsysMenuTree()
		},
		[],
		{ wait: 500 }
	)

	const getsysMenuTree = async () => {
		try {
			setLoading(true)
			const res = await sysMenuTree()
      if(res.code === 200){
        setTableData(res.data)
      }
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	const fetchMenuTree = (field: Field) => {
		let list = treeToArray(tableData || [], '0')
    list = list.map((v) => ({
			...v,
			label: v.name,
			value: v.id,
		}))

		field.loading = true
		field.dataSource = [
			{ label: '-', value: '0', children: arrayToTree2(list,'0') || [] },
		]
		field.loading = false
	}

	const columns: TableColumnType<MenuType>[] = [
		{
			title: '名称',
			dataIndex: 'name',
		},
		{
			dataIndex: 'icon',
			title: '图标',
			render: (_, record) =>  record.icon ? <AntdIcon name={record?.icon} /> : <></>,
		},
		{
			dataIndex: 'type',
			title: '类型',
			render: (_, record) => (
				<Tag>
					{get(find(MENUTYPE, ['value', record.type]), 'label', '-')}
				</Tag>
			),
		},
		{
			dataIndex: 'routePath',
			title: '路由地址',
		},
		{
			dataIndex: 'permissionCode',
			title: '权限',
		},
		{
			dataIndex: 'disabled',
			title: '是否禁用',
			render: (_, record) => (
				<Tag color={record.disabled ? 'error' : 'success'}>
					{record.disabled ? '是' : '否'}
				</Tag>
			),
		},
		{
			dataIndex: 'sort',
			title: '排序',
		},
		{
			title: '操作',
			render: (_, record) => (
				<Space>
					<Button
						type="link"
						onClick={() => hanlder(record.id, 'add', record)}
					>
						新增
					</Button>
					<Button
						type="link"
						onClick={() => hanlder(record.id, 'edit', record)}
					>
						编辑
					</Button>
					<Popconfirm
						title="确认删除?"
						onConfirm={() => handlerDelete(record)}
						okText="是"
						cancelText="否"
					>
						<Button
							type="link"
							danger
						>
							删除
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	]

	const handlerDelete = async (row: MenuType) => {
		const res = await sysMenuDelete(row.id!)
		if (res.code === 200) {
			message.success('删除成功')
			await getsysMenuTree()
		}
	}

	const addFormChild = (
		id?: string,
		status?: StatusOperation,
		record?: MenuType
	) => {
		if (id && status === 'add') {
			return {
				pid: id,
				sort: 1,
				type: 1,
			}
		}
	}

	const addFormroot = (
		id?: string,
		status?: StatusOperation,
		record?: MenuType
	) => {
		if (!id && !status && !record) {
			return {
				pid: '0',
				sort: 1,
				type: 1,
			}
		}
	}

	const editForm = (
		id?: string,
		status?: StatusOperation,
		record?: MenuType
	) => {
		if (id && status && ['edit', 'view'].includes(status)) {
			return record
		}
	}

	const beforeOpen = (
		id?: string,
		status?: StatusOperation,
		record?: MenuType
	) => {
		return async (
			payload: IFormProps,
			next: (props?: IFormProps) => Promise<any>
		) => {
			next({
				initialValues:
					addFormChild(id, status, record) ??
					addFormroot(id, status, record) ??
					editForm(id, status, record),
			})
		}
	}

	const hanlder = async (
		id?: string,
		status?: StatusOperation,
		record?: MenuType
	) => {
		const dialog = await FormDialog(
			{
				title: statusOperation[status!],
				maskClosable: false,
				footer: status === 'view' ? true : undefined,
			},
			SchemaForm(MENU_SCHEMA, {
				readOnly: Boolean(status === 'view'),
				fetchMenuTree,
			})
		)
		await dialog.forOpen(beforeOpen(id, status, record))

		await dialog.forConfirm(confirm(id, status))

		await dialog.open().catch(console.error)
	}

	const confirm = (id?: string, status?: StatusOperation) => {
		return async (payload: any, next: (payload?: any) => void) => {
			try {
				const dict = await payload.submit()
				await finished(dict, id, status)
				next(payload)
			} catch (e) {
				console.log(e)
			}
		}
	}

	const finished = async (
		data: MenuType,
		id?: string,
		status?: StatusOperation
	) => {
		try {
			if (!id) {
				await sysMenuSave({
					...data,
				})
			}
			if (status === 'add') {
				await sysMenuSave(data)
			}
			if (status === 'edit') {
				await sysMenuUpdate({
					...data,
					id,
				})
			}
			message.success('操作成功')
			getsysMenuTree()
		} catch (e) {
			console.log(e)
			throw new Error('请求出错')
		}
	}

	return (
		<div className="w-full box-border overflow-y-auto h-full p-4">
			<div className="bg-[--background] w-full p-4 rounded-md">
				<Button
					type="primary"
					className="mb-4"
					onClick={() => hanlder()}
				>
					新增
				</Button>

				<Table
					columns={columns}
					rowKey="id"
					style={{ overflow: 'auto' }}
					dataSource={tableData}
					pagination={false}
          loading={loading}
				/>
			</div>
		</div>
	)
}
