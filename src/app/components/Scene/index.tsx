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
      {/* bg-zinc-950 neutral */}
      <div id="three" className='w-full h-full box-border bg-zinc-950'></div>
    </div>
  )
}