"use client";

import { useThrottleEffect } from "ahooks";
import { useThree } from "./useThree";

export default function Scene() {
  const { init } = useThree()

  useThrottleEffect(()=>{
    init()
  },[],{wait:100})
  
  return (
    <div id="three" className='w-full h-full box-border'></div>
  )
}