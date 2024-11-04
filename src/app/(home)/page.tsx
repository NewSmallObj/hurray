import Image from 'next/image'
import { Button } from 'antd'
import SelectorTheme from '@/app/components/SelectorTheme/index'
import Toggle from '@/app/components/Toggle/index'
import Scene from '../components/Scene/index'
import { TbArrowBigDownLines } from 'react-icons/tb'
import { Nest, Next, React, Vue } from '../components/Svgs/index'
import Card from './components/card'
import Timeline from "./components/timeline"
import Link from 'next/link'

export default function Home() {
	return (
		<div className="w-full h-full box-border bg-[--background] text-[--foreground] ">
			<div className="w-full absolute top-28 z-10">
				<h1 className="text-[#915eff] text-[80px] font-bold max-w-[1330px] m-auto">
					"TanStar
				</h1>
				<div className="text-white text-[26px] max-w-[1330px] m-auto leading-7">
					顶级<span className="text-[#915eff]">Ctrl'CV</span> 工程师{' '}
				</div>
				<div className="text-white text-[26px] max-w-[1330px] m-auto leading-7">
					一个代码的搬运工。
				</div>
			</div>
			<div className="w-[1330px] m-auto p-[30px] z-20 absolute text-[#aaa6c3] text-lg gap-[60px] flex justify-end items-center">
				<div className="cursor-pointer">简介</div>
				<Link href={'http://8.140.224.171:3002'} target="_blank" className="cursor-pointer">博客</Link>
        <Link href={'/admin/login'} target="_blank" className="cursor-pointer">演示</Link>
			</div>
			<Scene />
			<div className="w-full flex justify-center items-center mt-[-60px] relative z-20">
				<TbArrowBigDownLines className="text-center animate-bounce text-6xl text-white" />
			</div>

			<div className="w-full bg-[#020512] box-border py-6">
        <div className="w-[1330px] m-auto text-left text-white text-4xl pb-10 font-bold flex justify-start items-center">
          技能介绍
        </div>
				<div className="w-[1330px] flex justify-between items-center gap-[20px] m-auto box-border">
					<Card title="Vue" outline="vue2、vue3、uniapp、element-ui..." key={'vue'}>
						<Vue />
					</Card>

					<Card title="React" outline="umi、antv、antd..." key={'react'}>
						<React />
					</Card>

					<Card title="Next" outline="prisma、shadcn、tailwind..." key={'next'}>
						<Next />
					</Card>

					<Card title="Nest" outline="typeorm、mysql、mongodb..." key={'nest'}>
						<Nest />
					</Card>
				</div>
			</div>

      <div className="w-full bg-[#020512] box-border py-16">
        <div className="w-[1330px] m-auto text-left text-white text-4xl pb-8 font-bold flex justify-start items-center">
          项目经验
        </div>
        <div className='w-[1330px] m-auto'>
          <Timeline />
        </div>
      </div>
		</div>
	)
}
