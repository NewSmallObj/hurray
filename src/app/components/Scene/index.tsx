"use client";

import { useThrottleEffect } from "ahooks";
import { Button } from "antd";
import { useThree3 } from "./useThree3";
import { useThree } from "./useThree";

export default function Scene() {
  const { init } = useThree3()
  // const { init } = useThree()

  useThrottleEffect(()=>{
    init()
  },[],{wait:100})

  
  return (
    <div className="w-full h-full relative">
      {/* bg-black */}
      {/* bg-zinc-950 neutral #050816 */}
      <div className="w-full absolute top-28 z-10">
        <h1 className="text-[#915eff] text-[80px] font-bold max-w-[1330px] m-auto">"TanStar</h1>
        <div className="text-white text-[26px] max-w-[1330px] m-auto leading-7"> 顶级 <span className="text-[#915eff]">Ctrl'CV</span> 工程师 </div>
        <div className="text-white text-[26px] max-w-[1330px] m-auto leading-7">一个代码的搬运工。</div>
      </div>
      <div className="w-[1330px] m-auto p-[30px] absolute text-[#aaa6c3] text-lg gap-[60px] flex justify-end items-center">
        <div className="cursor-pointer">简介</div>
        <div className="cursor-pointer">技能</div>
        <div className="cursor-pointer">作品</div>
      </div>
      <div id="three" className='w-full h-full box-border bg-gradient-to-b from-[#020512] to-[#050816]'></div>
    </div>
  )
}