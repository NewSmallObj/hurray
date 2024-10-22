'use client'

import { useToggle } from 'ahooks'
import { Button, Input, Modal, Space } from 'antd'
import AntdIcon from '../AntdIcon/index'
import * as Icon from '@ant-design/icons'
import { useMemo } from 'react'
import { useField } from '@formily/react'

export default function SelectIcon(props: any) {
	const [state, { toggle, setLeft }] = useToggle()

	const field = useField()
	const IconList = useMemo(() => Object.keys(Icon).slice(0, 830), [])

	const hanlderChange = (item: string) => {
		props.onChange(item)
		toggle()
	}

	const inputChange = (item: string) => {
		props.onChange(item)
	}

	return (
		<div>
			<Space direction="horizontal">
				<Input
					style={{ width: 255 }}
					value={props.value}
					onChange={(e) => inputChange(e.target.value)}
					disabled={field.readPretty}
					placeholder="请选择图标"
				/>
				<Button
					className="w-[50px]"
					disabled={field.readPretty}
					onClick={toggle}
				>
					<AntdIcon name={props.value || "FontColorsOutlined"} />
				</Button>
			</Space>

			<Modal
				title="选择图标"
				open={state}
				footer={false}
				onCancel={setLeft}
			>
				<div className="w-full max-h-[400px] overflow-y-auto">
					<Space size={[8, 16]} wrap>
						{IconList.map((item) => (
							<Button
								className="w-[48px]"
								key={item}
								onClick={() => hanlderChange(item)}
							>
								<AntdIcon name={`${item}`} />
							</Button>
						))}
					</Space>
				</div>
			</Modal>
		</div>
	)
}
