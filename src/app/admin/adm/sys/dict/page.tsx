'use client'
import SchemaForm from '@/app/components/SchemaForm/index'
import { DICT_SCHEMA } from '@/app/schema/dict'
import {
	PAGE_SYS_DICT,
	StatusOperation,
	statusOperation,
} from '@/app/utils/stants'
import { getDictList, sysDictFind, DictType, sysDictSave, sysDictDelete } from '@/app/_api/sys/dict'
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
import { useRouter } from 'next/navigation'

export default function DictPage() {
	const [form] = Form.useForm()

	const { tableProps, search, params } = useAntdTable(getDictList, {
		manual: true,
		defaultPageSize: 5,
		cacheKey: PAGE_SYS_DICT,
		form,
	})

  useThrottleEffect(()=>{
    reset()
  },[],{wait:500})
  
	const { submit, reset } = search
	const router = useRouter()

	const columns: TableColumnType<DictType>[] = [
		{
			dataIndex: 'name',
			title: '名称',
		},
		{
			dataIndex: 'code',
			title: '编码',
		},
		{
			dataIndex: 'dataCount',
			title: '内容数量',
			render: (_, record) => (
				<Button
					type="link"
					onClick={() => router.push(`/admin/adm/sys/dict/dict-data?id=${record.id}&code=${record.code}`)}
				>
					{record.dataCount}
				</Button>
			),
		},
		{
			dataIndex: 'sort',
			title: '排序',
		},
		{
			dataIndex: 'loginReturn',
			title: '登录返回',
      render: (_, record) => (
        <Tag color={record.loginReturn ? 'success' : 'error'}>{record.loginReturn ? '是' : '否'}</Tag>
      )
		},
		{
			dataIndex: 'disabled',
			title: '是否禁用',
      render: (_, record) => (
        <Tag color={record.disabled ? 'error' : 'success'}>{record.disabled ? '是' : '否'}</Tag>
      )
		},
		{
			dataIndex: 'readonly',
			title: '是否只读',
      render: (_, record) => (
        <Tag color={record.readonly ? 'error' : 'success'}>{record.readonly ? '是' : '否'}</Tag>
      )
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
            <Button type="link" 
              disabled={record.readonly}
              danger>
              删除
            </Button>
          </Popconfirm>
				</Space>
			),
		},
	]

  const handlerDelete = async (row:DictType)=>{
    const res = await sysDictDelete(row.id!)
    if(res.code === 200){
      message.success('删除成功')
      await reset()
    }
  }

	// 编辑
	const addFormroot = (
		id?: string,
		status?: StatusOperation,
		record?: DictType
	): any => {
		if (!id && !status && !record) {
			return {
				name: null,
				code: null,
				remark: null,
				sort: 1,
				disabled: false,
				loginReturn: false,
			}
		}
	}

	const editForm = async (
		id?: string,
		status?: StatusOperation,
		record?: DictType
	) => {
		if (id && status && record && ['edit', 'view'].includes(status)) {
			const res = await sysDictFind(record.id)
			if (status === 'view') {
				return {
					name: res.data.name || '-',
					code: res.data.code || '-',
					remark: res.data.remark || '-',
					sort: res.data.sort || 1,
					disabled: res.data.disabled,
					loginReturn: res.data.loginReturn,
				}
			}
			return {
				name: res.data.name,
				code: res.data.code,
				remark: res.data.remark,
				sort: res.data.sort,
				disabled: res.data.disabled,
				loginReturn: res.data.loginReturn,
			}
		}
	}

	const beforeOpen = (
		id?: string,
		status?: StatusOperation,
		record?: DictType
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
		record?: DictType
	) => {
		const dialog = await FormDialog(
			{
				title: statusOperation[status!],
				maskClosable: false,
				footer: status === 'view' ? true : undefined,
			},
			SchemaForm(DICT_SCHEMA, {
				readOnly: Boolean(status === 'view'),
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
  
  const finished = async (data: DictType, id?: string) => {
    try {
      if (id) {
        await sysDictSave({ ...data, id });
      } else {
        await sysDictSave(data);
      }
      message.success('操作成功');
      reset()
    } catch (e) {
      console.log(e);
      throw new Error('请求出错');
    }
  };
  
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
