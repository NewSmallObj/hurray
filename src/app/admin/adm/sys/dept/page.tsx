'use client'
import SchemaForm from '@/app/components/SchemaForm/index'
import { DEPT_SCHEMA } from '@/app/schema/dept'
import useUser from '@/app/store/useUser'
import {
	PAGE_SYS_DEPT,
	StatusOperation,
	statusOperation,
} from '@/app/utils/stants'
import { getDeptList, sysDeptFind, DeptType, sysDeptSave, sysDeptDelete } from '@/app/_api/sys/dept'
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
	Select,
	Space,
	Table,
	TableColumnType,
} from 'antd'

export default function DeptPage() {
	const [form] = Form.useForm()
  const { dic } = useUser()
	const { tableProps, search, params } = useAntdTable(getDeptList, {
		manual: false,
		defaultPageSize: 5,
		cacheKey: PAGE_SYS_DEPT,
		form,
	})
	const { submit, reset } = search

	const columns: TableColumnType<DeptType>[] = [
		{
			dataIndex: 'name',
			title: '名称',
		},
		{
			dataIndex: 'simpleName',
			title: '简称',
		},
		{
			dataIndex: 'type',
			title: '类型',
		},
		{
			dataIndex: 'leaderName',
			title: '负责人',
		},
		{
			dataIndex: 'code',
			title: '编码',
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
						onConfirm={() => handlerDelete(record)}
						okText="是"
						cancelText="否"
					>
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
				</Space>
			),
		},
	]

  const handlerDelete = async (row:DeptType)=>{
    const res = await sysDeptDelete(row.id!)
    if(res.code === 200){
      message.success('删除成功')
      await reset()
    }
  }

  const fetchUsers = (field: Field) => {
    field.loading = true;
  
    field.dataSource = [];
  
    field.loading = false;
  };

  const fetchType = (field:Field)=>{
    field.loading = true
    field.dataSource = dic.DEPT_TYPE;
    field.loading = false;
  }

	// 编辑
	const addFormroot = (
		id?: string,
		status?: StatusOperation,
		record?: DeptType
	): any => {
		if (!id && !status && !record) {
			return {
        name: null,
        simpleName: null,
        leader: null,
        sort: null,
        code: null,
        type: null,
        pid: '0',
        remark: null,
			}
		}
	}

	const editForm = async (
		id?: string,
		status?: StatusOperation,
		record?: DeptType
	) => {
		if (id && status && record && ['edit', 'view'].includes(status)) {
			const res = await sysDeptFind(record.id)
			if (status === 'view') {
				return {
          name: res.data.name,
          simpleName: res.data.simpleName || '-',
          leader: res.data.leader || '无',
          sort: res.data.sort,
          type: res.data.type,
          code: res.data.code || '-',
          pid: res.data.pid,
          remark: res.data.remark || '-',
        };
      }
      return {
        name: res.data.name,
        simpleName: res.data.simpleName,
        leader: res.data.leader,
        sort: res.data.sort,
        type: res.data.type,
        code: res.data.code,
        pid: res.data.pid,
        remark: res.data.remark,
      };
		}
	}

	const beforeOpen = (
		id?: string,
		status?: StatusOperation,
		record?: DeptType
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
		record?: DeptType
	) => {
		const dialog = await FormDialog(
			{
				title: statusOperation[status!],
				maskClosable: false,
				footer: status === 'view' ? true : undefined,
			},
			SchemaForm(DEPT_SCHEMA, {
				readOnly: Boolean(status === 'view'),
				usernameReadOnly: Boolean(status === 'view') || id,
        fetchUsers,
        fetchType
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
  
  const finished = async (data: DeptType, id?: string) => {
    try {
      await sysDeptSave({ ...data, id });
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
								<Input placeholder="请输入关键字" allowClear />
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
