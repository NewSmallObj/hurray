'use client'
import SchemaForm from '@/app/components/SchemaForm/index'
import { ROLE_SCHEMA } from '@/app/schema/role'
import {
	PAGE_SYS_ROLE,
	statusOperation,
	StatusOperation,
} from '@/app/utils/stants'
import { sysMenuTree } from '@/app/_api/sys/menu'
import {
	getRoleList,
	sysRoleAdd,
	sysRoleFind,
	RoleType,
  sysRoleDelete,
} from '@/app/_api/sys/role'
import { FormDialog } from '@formily/antd-v5'
import { Field, IFormProps } from '@formily/core'
import { useAntdTable } from 'ahooks'
import {
	Button,
	Col,
	Form,
	Input,
	message,
	Popconfirm,
	Row,
	Space,
	Table,
	TableColumnType,
} from 'antd'

export default function RolePage() {
	const [form] = Form.useForm()

	const { tableProps, search, params } = useAntdTable(getRoleList, {
		manual: false,
		defaultPageSize: 5,
		cacheKey: PAGE_SYS_ROLE,
		form,
	})
	const { submit, reset } = search

	const columns: TableColumnType<RoleType>[] = [
		{
			title: '名称',
			dataIndex: 'name',
		},
		{
			title: '编码',
			dataIndex: 'code',
		},
		{
			title: '描述',
			dataIndex: 'remark',
		},
		{
			title: '创建时间',
			dataIndex: 'createTiime',
		},
		{
			title: '操作',
			render: (_, record) => (
				<Space>
					<Button
						type="link"
						onClick={() => hanlder(record.id, 'view', record)}
					>
						查看
					</Button>
					<Button
						type="link"
						onClick={() => hanlder(record.id, 'edit', record)}
					>
						编辑
					</Button>
					<Popconfirm
						title="确认删除?"
						onConfirm={() => {}}
						okText="是"
						cancelText="否"
					>
						<Button
							type="link"
							danger
							onClick={() => handlerDelete(record)}
						>
							删除
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	]

	const handlerDelete = async (row: RoleType) => {
    const res = await sysRoleDelete(row.id!)
    if(res.code === 200){
      message.success('删除成功')
      await reset()
    }
  }

	const fetchMenuTree = async (field: Field) => {
		field.loading = true
    const res = await sysMenuTree();
		field.dataSource = res.data
		field.loading = false
	}
	// 编辑
	const addFormroot = (
		id?: string,
		status?: StatusOperation,
		record?: RoleType
	): any => {
		if (!id && !status && !record) {
			return {
				name: null,
				code: null,
        remark:null,
        sort:1,
				menuIds: [],
			}
		}
	}

	const editForm = async (
		id?: string,
		status?: StatusOperation,
		record?: RoleType
	) => {
		if (id && status && record && ['edit', 'view'].includes(status)) {
			const res = await sysRoleFind(record.id)
			if (status === 'view') {
				return {
					name: res.data.name || '-',
					code: res.data.code || '-',
					remark: res.data.remark || '-',
					sort: res.data.sort || '-',
					menuIds: res.data.menuIds,
				}
			}
			return {
				name: res.data.name,
				code: res.data.code,
				remark: res.data.remark,
				sort: res.data.sort,
				menuIds: res.data.menuIds,
			}
		}
	}

	const beforeOpen = (
		id?: string,
		status?: StatusOperation,
		record?: RoleType
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
		record?: RoleType
	) => {
		const dialog = await FormDialog(
			{
				title: statusOperation[status!],
        width: 800,
				maskClosable: false,
				footer: status === 'view' ? true : undefined,
			},
			SchemaForm(ROLE_SCHEMA, {
				readOnly: Boolean(status === 'view'),
				usernameReadOnly: Boolean(status === 'view') || id,
				fetchMenuTree
			})
		)
		await dialog.forOpen(beforeOpen(id, status, record))

		await dialog.forConfirm(confirm(id))

		await dialog.open().catch(console.error)
	}

	const confirm = (id?: string) => {
		return async (payload: any, next: (payload?: any) => void) => {
			try {
				const role = await payload.submit()
				await finished(role, id)
				next(payload)
			} catch (e) {
				console.log(e)
			}
		}
	}

  const getTreeAllIds = (data: any) => {
    return data.reduce((acc: any, cur: any) => {
      if(!acc.includes(cur.id)) acc.push(cur.id)
      return acc.concat(getTreeAllIds(cur.children || []))
    }, [])
  }

	const finished = async (data: RoleType, id?: string) => {
		try {
      const { menuIds,...values } = data
      
			await sysRoleAdd({ ...values,menuIds: menuIds, id })
			message.success('操作成功')
			reset()
		} catch (e) {
			console.log(e)
			throw new Error('请求出错')
		}
	}

	return (
		<div className="w-full box-border overflow-y-auto h-full p-4">
			<div className="bg-[--background] w-full p-4 pb-0 rounded-md mb-4">
				<Form form={form}>
					<Row gutter={24}>
						<Col span={6}>
							<Form.Item label="关键字" name="name">
								<Input placeholder="请输入关键字" />
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
