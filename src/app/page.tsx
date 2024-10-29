import Image from 'next/image'
import { Button } from 'antd'
import SelectorTheme from '@/app/components/SelectorTheme/index'
import Toggle from '@/app/components/Toggle/index'
import Scene from './components/Scene/index'

export default function Home() {
  
	return (
		<div className="w-full h-full box-border bg-[--background] text-[--foreground]">
      <Scene />
		</div>
	)
}
