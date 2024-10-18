'use client'
import SchemaForm from '@/app/components/SchemaForm/index'
import { USER_SCHEMA } from '@/app/schema/user'
import {
	PAGE_SYS_USER,
	StatusOperation,
	statusOperation,
} from '@/app/utils/stants'
import { getUserList, sysUserFind, UserType } from '@/app/_api/sys/user'
import { FormDialog } from '@formily/antd-v5'
import { Field, IFormProps } from '@formily/core'
import { useAntdTable } from 'ahooks'
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

export default function UserPage() {
	const [form] = Form.useForm()

	const { tableProps, search, params } = useAntdTable(getUserList, {
		manual: false,
		defaultPageSize: 5,
		cacheKey: PAGE_SYS_USER,
		form,
	})
	const { submit, reset } = search

  const columns: TableColumnType<UserType>[] = [
		{
			title: '账号',
			dataIndex: ['username'],
		},
		{
			title: '姓名',
			dataIndex: ['name', 'last'],
		},
		{
			title: '手机',
			dataIndex: 'mobile',
		},
		{
			title: '邮箱',
			dataIndex: 'email',
		},
		{
			title: '角色',
			dataIndex: 'roleNames',
		},
		{
			title: '状态',
			dataIndex: 'disabled',
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
          <Button
						type="link"
						onClick={()=>{}}
					>
						删除
					</Button>
				</Space>
			),
		},
	]

	const fetchRoles = (field: Field) => {
		field.loading = true
		field.dataSource = []
		field.loading = false
	}
	const fetchDepts = (field: Field) => {
		field.loading = true
		field.dataSource = []
		field.loading = false
	}
	const fetchType = (field: Field) => {
		field.loading = true
		field.dataSource = []
		field.loading = false
	}
  
// 编辑
const addFormroot = (
  id?: string,
  status?: StatusOperation,
  record?: UserType
): any => {
  if (!id && !status && !record) {
    return {
      name: null,
      mobile: null,
      username: null,
      email: null,
      type: null,
      roleIds: [],
      deptId: null,
    };
  }
};

const editForm = async (
  id?: string,
  status?: StatusOperation,
  record?: UserType
) => {
  if (id && status && record && ['edit', 'view'].includes(status)) {
    const res = await sysUserFind(record.id);
    if (status === 'view') {
      return {
        name: res.data.name || '-',
        mobile: res.data.mobile || '-',
        username: res.data.username || '-',
        email: res.data.email || '-',
        roleIds: res.data.roleIds,
        type: res.data.type,
        deptId:
          res.data.deptId && res.data.deptId.length ? res.data.deptId : '无',
      };
    }
    return {
      name: res.data.name,
      mobile: res.data.mobile,
      username: res.data.username,
      email: res.data.email,
      roleIds: res.data.roleIds,
      type: res.data.type,
      deptId: res.data.deptId,
    };
  }
};

const beforeOpen = (
  id?: string,
  status?: StatusOperation,
  record?: UserType
)=>{
  return async (
    payload: IFormProps,
    next: (props?: IFormProps) => Promise<any>
  ) => {
    next({
      initialValues: addFormroot(id, status, record) ??
      (await editForm(id, status, record)),
    })
  }
}

	const hanlder = async (
		id?: string,
		status?: StatusOperation,
		record?: UserType
	) => {
		const dialog = await FormDialog(
			{
				title: statusOperation[status!],
				maskClosable: false,
				footer: status === 'view' ? true : undefined,
			},
			SchemaForm(USER_SCHEMA, {
				readOnly: Boolean(status === 'view'),
				usernameReadOnly: Boolean(status === 'view') || id,
				fetchRoles,
				fetchDepts,
				fetchType,
			})
		)
		await dialog.forOpen(
			beforeOpen(id,status,record)
		)

		await dialog.open().then((value) => {
			console.log('submit', value)
		})

		await dialog.forConfirm((payload, next) => {
			next(payload)
		})
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
							<Form.Item label="角色" name="roleId">
								<Select placeholder="请选择角色" />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label="部门" name="deptId">
								<Select placeholder="请选择部门" />
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
					rowKey="email"
					style={{ overflow: 'auto' }}
					{...tableProps}
				/>
			</div>
		</div>
	)
}
