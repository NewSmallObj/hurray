"use client";

import { useThrottleEffect } from "ahooks";
import { Button } from "antd";
import { useThree3 } from "./useThree3";
import { useThree } from "./useThree";
import Image from 'next/image'
import { BASE_STATICPREFIX } from "@/app/utils/stants";
import clsx from "clsx"

export default function Scene() {
  const { init,percentComplete } = useThree3()
  // const { init } = useThree()

  useThrottleEffect(()=>{
    init()
  },[],{wait:100})

  
  return (
    <div className="w-full h-full relative">
      {/* bg-black */}
      {/* bg-zinc-950 neutral #050816 */}
     
      <Image
				className="object-cover h-full w-full absolute z-0"
				width={1920}
				height={1080}
				style={{ width: '100%', height: '100%' }}
				src={`${BASE_STATICPREFIX}/images/herobg-CSqWnoE3.png`}
				alt={'bg'}
				priority
			/>
      <div className={
        clsx(`w-full h-full text-center absolute justify-center items-center z-20 text-white font-bold text-4xl`,{
          "hidden": percentComplete === 100,
          "flex": percentComplete < 100
        })
      }> 
        { percentComplete }%
      </div>
      {/* bg-gradient-to-b from-[#020512] to-[#050816] */}
      <div id="three" className='w-full h-full box-border relative z-10 bg-transparent'></div>
    </div>
  )
}