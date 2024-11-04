"use client";

import { useMouse, useThrottleEffect } from "ahooks";
import { useRef } from "react";


type CardProps = {
  children: React.ReactNode
  title:String
  outline:String
}

export default function Card(props:CardProps) {

  const cardRef = useRef<HTMLDivElement>(null)

  const mouse = useMouse();

  useThrottleEffect(()=>{
    const rect = cardRef.current?.getBoundingClientRect();
    if(!rect) return;
    const distanceX = mouse.pageX - (rect.left + window.pageXOffset);
    const distanceY = mouse.pageY - (rect.top + window.pageYOffset);
    cardRef.current?.style.setProperty('--x', distanceX + 'px');
    cardRef.current?.style.setProperty('--y', distanceY + 'px');
  },[mouse.pageX,mouse.pageY],{wait:100})

	return (
		<div ref={cardRef} className="flex-1 box-border rounded-lg h-[180px] bg-[#172033] relative gradient-element">
      <div className="mask flex justify-center items-center gap-2 flex-col py-4">
        { props.children }
        <div className="text-white text-xl"> { props.title } </div>
        <div className="text-[#aaa6c3] line-clamp-2 text-sm">{ props.outline }</div>
      </div>
    </div>
	)
}