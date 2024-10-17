"use client";
import { PAGE_SYS_USER } from "@/app/utils/stants";
import { getUserList } from "@/app/_api/sys/user";
import { useAntdTable } from "ahooks";
import { Button, Col, Form, Input, Row, Space, Table, TableColumnType } from "antd";

export default function UserPage() {

  const [form] = Form.useForm();

  const { tableProps, search, params } = useAntdTable(getUserList, {
    manual: false,
		defaultPageSize: 5,
		cacheKey: PAGE_SYS_USER,
		form,
	})
  const { submit, reset } = search
  
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
        <></>
				// <Button type="link" onClick={() => hanlder()}>
				// 	edit
				// </Button>
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