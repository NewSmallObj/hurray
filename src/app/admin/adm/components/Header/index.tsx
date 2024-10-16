import Account from "@/app/admin/adm/components/Header/account";
import SelectorTheme from "@/app/components/SelectorTheme/index";
// import useTheme from "@/app/store/useTheme";
import { Button } from "antd";
import clsx from "clsx"

export default function LayoutHeader(){
  
  return (
    <div 
      className={
        clsx(`w-full h-[50px] leading-[50px] px-[20px] box-border shadow-md relative z-10 flex justify-between items-center`)
      }>
      <div>Header</div>
      <div className="flex justify-end items-center gap-1">
        <SelectorTheme />
        <Account />
      </div>
    </div>
  )
}