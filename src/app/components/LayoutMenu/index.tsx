import { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
  { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
  { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
];

export default function LayoutMenu(){

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  
  return (
    <div>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  )
}