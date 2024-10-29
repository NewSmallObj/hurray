'use client'

import AntdIcon from '@/app/components/AntdIcon/index'
import SchemaForm from '@/app/components/SchemaForm/index'
import { COLUMN_SCHEMA } from '@/app/schema/column'
import {
  StatusOperation,
  statusOperation
} from '@/app/utils/stants'
import { arrayToTree2, treeToArray } from '@/app/utils/utils'
import { columnDelete, columnDisabled, columnSave, columnTree, ColumnType, columnUpdate } from '@/app/_api/column/index'
import { FormDialog } from '@formily/antd-v5'
import { Field, IFormProps } from '@formily/core'
import { useThrottleEffect } from 'ahooks'
import {
  Button, message, Popconfirm, Space, Table, TableColumnType,
  Tag
} from 'antd'
import { find, get } from 'lodash'
import { useState } from 'react'

const MENUTYPE = [
	{
		label: '文本列表',
		value: '1',
	},
	{
		label: '图文列表',
		value: '2',
	},
	{
		label: '详情',
		value: '3',
	},
]

export default function ColumnPage() {
	const [tableData, setTableData] = useState<ColumnType[]>([])
	const [loading, setLoading] = useState(false)

	useThrottleEffect(
		() => {
			getColumnTree()
		},
		[],
		{ wait: 500 }
	)

	const getColumnTree = async () => {
		try {
			setLoading(true)
			const res = await columnTree()
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

  const visableShowType = (field: Field)=>{
    const url = field.query('url').value();
    field.visible = !url
  }

  const visableUrl = (field: Field)=>{
    const show_type = field.query('show_type').value();
    field.visible = !show_type
  }

	const columns: TableColumnType<ColumnType>[] = [
		{
			title: '名称',
			dataIndex: 'title',
		},
		{
			dataIndex: 'icon',
			title: '图标',
			render: (_, record) =>  record.icon ? <AntdIcon name={record?.icon} /> : <></>,
		},
		{
			dataIndex: 'show_type',
			title: '类型',
			render: (_, record) => (
				<Tag>
					{get(find(MENUTYPE, ['value', record.show_type]), 'label', '-')}
				</Tag>
			),
		},
		{
			dataIndex: 'show_nav',
			title: '展示导航',
      render: (_, record) => (
				<Tag color={record.show_nav ? 'success' : 'error'}>
					{record.show_nav ? '是' : '否'}
				</Tag>
			),
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
						title={ record.disabled ? "确认启用":"确认禁用?"}
						onConfirm={() => handlerEnable(record)}
						okText="是"
						cancelText="否"
					>
            <Button type="link" 
              danger={!record.disabled}>
              { record.disabled ? "启用":"禁用" }
            </Button>
          </Popconfirm>
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

	const handlerDelete = async (row: ColumnType) => {
		const res = await columnDelete(row.id!)
		if (res.code === 200) {
			message.success('删除成功')
			await getColumnTree()
		}
	}

  const handlerEnable = async (row: ColumnType) => {
    const res = await columnDisabled(row.id!)
    if (res.code === 200) {
      message.success('操作成功')
      await getColumnTree()
    }
  }


	const addFormChild = (
		id?: string,
		status?: StatusOperation,
		record?: ColumnType
	) => {
		if (id && status === 'add') {
			return {
				pid: id,
				sort: 1,
			}
		}
	}

	const addFormroot = (
		id?: string,
		status?: StatusOperation,
		record?: ColumnType
	) => {
		if (!id && !status && !record) {
			return {
				pid: '0',
				sort: 1,
			}
		}
	}

	const editForm = (
		id?: string,
		status?: StatusOperation,
		record?: ColumnType
	) => {
		if (id && status && ['edit', 'view'].includes(status)) {
			return record
		}
	}

	const beforeOpen = (
		id?: string,
		status?: StatusOperation,
		record?: ColumnType
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
		record?: ColumnType
	) => {
		const dialog = await FormDialog(
			{
				title: statusOperation[status!],
				maskClosable: false,
				footer: status === 'view' ? true : undefined,
			},
			SchemaForm(COLUMN_SCHEMA, {
				readOnly: Boolean(status === 'view'),
				fetchMenuTree,
        visableShowType,
        visableUrl
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
		data: ColumnType,
		id?: string,
		status?: StatusOperation
	) => {
		try {
			if (!id) {
				await columnSave({
					...data,
				})
			}
			if (status === 'add') {
				await columnSave(data)
			}
			if (status === 'edit') {
				await columnUpdate({
					...data,
					id,
				})
			}
			message.success('操作成功')
			getColumnTree()
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
