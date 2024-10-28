'use client'
import SchemaForm from '@/app/components/SchemaForm/index'
import { USER_SCHEMA } from '@/app/schema/user'
import useUser from '@/app/store/useUser'
import {
	PAGE_SYS_USER,
	StatusOperation,
	statusOperation,
} from '@/app/utils/stants'
import { filterSort } from '@/app/utils/utils'
import { useOptionsDept, useOptionsRole } from '@/app/_api/common/index'
import { DeptType } from '@/app/_api/sys/dept'
import { getUserList, SystemUserDisabled, SystemUserRemove, sysUserAdd, sysUserFind, UserType } from '@/app/_api/sys/user'
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
import { useMemo } from 'react'

export default function UserPage() {
	const [form] = Form.useForm()
  const {dic} = useUser()
  const depts = useOptionsDept()
  const roles = useOptionsRole()

  useThrottleEffect(()=>{
    depts.run()
    roles.run()
  },[],{wait:300})

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
			dataIndex: 'name',
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
      render: (_, record) => (
				<Tag color={record.disabled ? 'error' : 'success'}>
					{record.disabled ? '禁用' : '启用'}
				</Tag>
			),
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
						onConfirm={() => {}}
						okText="是"
						cancelText="否"
					>
            <Button type="link" danger onClick={() => handlerDelete(record)}>
              删除
            </Button>
          </Popconfirm>
				</Space>
			),
		},
	]

  const handlerDelete = async (row:UserType)=>{
    const res = await SystemUserRemove({id:row.id})
    if(res.code === 200){
      message.success('删除成功')
      await reset()
    }
  }

  const handlerEnable = async (row:UserType)=>{
    const res = await SystemUserDisabled({
      id:row.id!,
      disabled: !row.disabled,
      isLogout: false
    })
    if(res.code === 200){
      message.success("操作成功")
      reset()
    }
  }

  const rolesDataSource = useMemo(()=>{
    if(!roles.data?.data) return []
    return roles.data.data.map((v:UserType)=>({...v,label:v.name,value:v.id}))
  },[roles.data])

  const deptsDataSource = useMemo(()=>{
    if(!depts.data?.data) return []
    return depts.data.data.map((v:UserType)=>({...v,label:v.name,value:v.id}))
  },[depts.data])

	const fetchRoles = async (field: Field) => {
		field.loading = true
		field.dataSource = rolesDataSource || []
		field.loading = false
	}
	const fetchDepts = async (field: Field) => {
		field.loading = true
		field.dataSource  = deptsDataSource || []
		field.loading = false
	}
	const fetchType = (field: Field) => {
		field.loading = true
		field.dataSource = dic?.USER_TYPE || []
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
		await dialog.forOpen(beforeOpen(id, status, record))

		await dialog.forConfirm(confirm(id))

		await dialog.open().catch(console.error);
	}

  const confirm = (id?: string) => {
    return async (payload: any, next: (payload?: any) => void) => {
      try {
        const dict = await payload.submit();
        await finished(dict, id);
        next(payload);
      } catch (e) {
        console.log(e);
      }
    };
  };
  
  const finished = async (data: UserType, id?: string) => {
    try {
      await sysUserAdd({ ...data, id });
      message.success('操作成功');
      reset()
    } catch (e) {
      console.log(e);
      throw new Error('请求出错');
    }
  };

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
								<Select placeholder="请选择角色" options={rolesDataSource} filterSort={filterSort} />
							</Form.Item>
						</Col>
						<Col span={6}>
							<Form.Item label="部门" name="deptId">
								<Select placeholder="请选择部门" options={deptsDataSource} filterSort={filterSort} />
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
