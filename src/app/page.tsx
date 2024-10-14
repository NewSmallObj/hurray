import Image from 'next/image'
import { Button } from 'antd'
import SelectorTheme from '@/components/SelectorTheme/index'
import Toggle from '@/components/Toggle/index'

export default function Home() {
	return (
		<div className="w-full h-full box-border bg-[background] text-[foreground]">
			<Button type='primary'>Button</Button>
			<button className="btn">Button</button>
			<table className="table">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Job</th>
						<th>Favorite Color</th>
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					<tr>
						<th>1</th>
						<td>Cy Ganderton</td>
						<td>Quality Control Specialist</td>
						<td>Blue</td>
					</tr>
					{/* row 2 */}
					<tr>
						<th>2</th>
						<td>Hart Hagerty</td>
						<td>Desktop Support Technician</td>
						<td>Purple</td>
					</tr>
					{/* row 3 */}
					<tr>
						<th>3</th>
						<td>Brice Swyre</td>
						<td>Tax Accountant</td>
						<td>Red</td>
					</tr>
				</tbody>
			</table>

      <SelectorTheme />
      <Toggle />

		</div>
	)
}
