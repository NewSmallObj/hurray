'use client'
import SchemaForm from '@/app/components/SchemaForm/index'
import { DICT_DATA_SCHEMA } from '@/app/schema/dict_data'
import {
	PAGE_SYS_DICT_DATA,
	StatusOperation,
	statusOperation,
} from '@/app/utils/stants'
import {
	getDictDataList,
	DictDataType,
	sysDictDataSave,
  sysDictDataDelete,
} from '@/app/_api/sys/dict'
import { FormDialog } from '@formily/antd-v5'
import { Field, IFormProps } from '@formily/core'
import { useAntdTable, useThrottleEffect } from 'ahooks'
import {
	Button,
	Col,
	Form,
	Input,
	message,
	Popconfirm,
	Row,
	Select,
	Space,
	Table,
	TableColumnType,
	Tag,
} from 'antd'
import { defer } from 'lodash'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function DictDataPage() {
	const [form] = Form.useForm()
	const searchParams = useSearchParams()

	const { tableProps, search, params } = useAntdTable(getDictDataList, {
		defaultParams: [
			{ current: 1, pageSize: 5, dictId: searchParams.get('id') },
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
			dataIndex: 'label',
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
			render: (_, record) => (
				<Tag color={record.disabled ? 'error' : 'success'}>
					{record.disabled ? '是' : '否'}
				</Tag>
			),
		},
		{
			dataIndex: 'readonly',
			title: '是否只读',
			render: (_, record) => (
				<Tag color={record.readonly ? 'error' : 'success'}>
					{record.readonly ? '是' : '否'}
				</Tag>
			),
		},
		{
			title: '操作',
			render: (_, record) => (
				<Space>
					<Button
						type="link"
            disabled={record.readonly}
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
						<Button disabled={record.readonly} type="link" danger>
							删除
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	]

  const handlerDelete = async (row:DictDataType)=>{
    const res = await sysDictDataDelete(row.id!)
    if(res.code === 200){
      message.success('删除成功')
      await reset()
    }
  }

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

		await dialog.forConfirm(confirm(id))

		await dialog.open().catch(console.error)
	}

	const confirm = (id?: string) => {
		return async (payload: any, next: (payload?: any) => void) => {
			try {
				const dict = await payload.submit()
				await finished(dict, id)
				next(payload)
			} catch (e) {
				console.log(e)
			}
		}
	}

	const finished = async (data: DictDataType, id?: string) => {
		try {
			await sysDictDataSave({
				...data,
				id,
				dictCode: searchParams.get('code'),
				dictId: searchParams.get('id'),
			})
			message.success('操作成功')
			reset()
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
					添加
				</Button>

				<Table
					columns={columns}
					rowKey="id"
					style={{ overflow: 'auto' }}
					{...tableProps}
				/>
			</div>
		</div>
	)
}
