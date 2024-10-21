'use client'
import SchemaForm from '@/app/components/SchemaForm/index'
import { DICT_DATA_SCHEMA } from '@/app/schema/dict_data'
import {
	PAGE_SYS_DICT_DATA,
	StatusOperation,
	statusOperation,
} from '@/app/utils/stants'
import { getDictDataList, DictDataType } from '@/app/_api/sys/dict'
import { FormDialog } from '@formily/antd-v5'
import { Field, IFormProps } from '@formily/core'
import { useAntdTable, useThrottleEffect } from 'ahooks'
import {
	Button,
	Col,
	Form,
	Input,
	Row,
	Select,
	Space,
	Table,
	TableColumnType,
} from 'antd'
import { defer } from 'lodash'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function DictDataPage() {
	const [form] = Form.useForm()
	const searchParams = useSearchParams()

	const { tableProps, search, params } = useAntdTable(getDictDataList, {
    defaultParams:[
      {current:1,pageSize:5,dictId:searchParams.get('id')},
    ],
		manual: true,
		defaultPageSize: 5,
		cacheKey: PAGE_SYS_DICT_DATA,
		form,
	})
	const { submit, reset } = search

	useThrottleEffect(
		() => {
			submit()
		},
		[],
		{
			wait: 300,
		}
	)

	const columns: TableColumnType<DictDataType>[] = [
		{
			dataIndex: 'name',
			title: '名称',
		},
		{
			dataIndex: 'value',
			title: '值',
		},
		{
			dataIndex: 'sort',
			title: '排序',
		},
		{
			dataIndex: 'disabled',
			title: '是否禁用',
		},
		{
			dataIndex: 'readonly',
			title: '是否只读',
		},
		{
			title: '操作',
			render: (_, record) => (
				<Space>
					<Button
						type="link"
						onClick={() => hanlder(record.id, 'edit', record)}
					>
						编辑
					</Button>
					<Button type="link" onClick={() => {}}>
						删除
					</Button>
				</Space>
			),
		},
	]

	// 编辑
	const addFormroot = (
		id?: string,
		status?: StatusOperation,
		record?: DictDataType
	): any => {
		if (!id && !status && !record) {
			return {
				label: null,
				value: null,
				remark: null,
				sort: 1,
				disabled: false,
			}
		}
	}

	const editForm = async (
		id?: string,
		status?: StatusOperation,
		record?: DictDataType
	) => {
		if (id && status && record && ['edit', 'view'].includes(status)) {
			return {
				label: record.label,
				value: record.value,
				remark: record.remark,
				sort: record.sort,
				disabled: record.disabled,
			}
		}
	}

	const beforeOpen = (
		id?: string,
		status?: StatusOperation,
		record?: DictDataType
	) => {
		return async (
			payload: IFormProps,
			next: (props?: IFormProps) => Promise<any>
		) => {
			next({
				initialValues:
					addFormroot(id, status, record) ??
					(await editForm(id, status, record)),
			})
		}
	}

	const hanlder = async (
		id?: string,
		status?: StatusOperation,
		record?: DictDataType
	) => {
		const dialog = await FormDialog(
			{
				title: statusOperation[status!],
				maskClosable: false,
				footer: status === 'view' ? true : undefined,
			},
			SchemaForm(DICT_DATA_SCHEMA, {
				readOnly: Boolean(status === 'view'),
			})
		)
		await dialog.forOpen(beforeOpen(id, status, record))

		await dialog.open().then((value) => {
			console.log('submit', value)
		})

		await dialog.forConfirm((payload, next) => {
			next(payload)
		})
	}

	return (
		<div className="w-full box-border overflow-y-auto h-full p-4">
			<div className="bg-[--background] w-full p-4 rounded-md">

				<Button
					type="primary"
					className="mb-4"
					onClick={() => hanlder()}
				>
					添加
				</Button>

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
