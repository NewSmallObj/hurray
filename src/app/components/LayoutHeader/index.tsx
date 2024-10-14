import { Col,Row,Button } from "antd"
import { useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import useCollapse from "@/app/store/useCollapse";

export default function LayoutHeader(){
  // const [collapsed, setCollapsed] = useState(false)
  const { collapse,setCollapse } = useCollapse()
  
  return (
    <div className="w-full flex justify-between items-center px-[20px] h-[50px] leading-[50px] bg-[background] text-[foreground]">
      <div>
        <Button
            type="text"
            icon={collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapse(!collapse)}
            className="text-[16px] w-[32px] h-[32px]"
          />
      </div>
      <div>Logout</div>
    </div>
  )
}