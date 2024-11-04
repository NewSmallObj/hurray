import Image from 'next/image'
import { Button } from 'antd'
import SelectorTheme from '@/app/components/SelectorTheme/index'
import Toggle from '@/app/components/Toggle/index'
import Scene from './components/Scene/index'
import { TbArrowBigDownLines } from "react-icons/tb";

export default function Home() {
  
	return (
		<div className="w-full h-full box-border bg-[--background] text-[--foreground]">
        <div className="w-full absolute top-28 z-10">
          <h1 className="text-[#915eff] text-[80px] font-bold max-w-[1330px] m-auto">"TanStar</h1>
          <div className="text-white text-[26px] max-w-[1330px] m-auto leading-7"> 顶级 <span className="text-[#915eff]">Ctrl'CV</span> 工程师 </div>
          <div className="text-white text-[26px] max-w-[1330px] m-auto leading-7">一个代码的搬运工。</div>
        </div>
        <div className="w-[1330px] m-auto p-[30px] z-20 absolute text-[#aaa6c3] text-lg gap-[60px] flex justify-end items-center">
          <div className="cursor-pointer">简介</div>
          <div className="cursor-pointer">技能</div>
          <div className="cursor-pointer">作品</div>
        </div>
      <Scene />
      <div className='w-full flex justify-center items-center mt-[-60px] relative z-20'>
        <TbArrowBigDownLines className='text-center animate-bounce text-6xl text-white' />
      </div>
		</div>
	)
}
