"use client"
import React, { useMemo, useState } from 'react';
import { ConfigProvider, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';



export const themes = ['light','dark' ,'cupcake'];
type Theme = 'light' | 'dark'| 'cupcake' ;

const themeValues = {
  light: {
    '--background': '#ffffff',
    '--foreground': '#171717',
  },
  dark: {
    '--background': '#0a0a0a',
    '--foreground': '#ededed',
  },
  cupcake: {
    '--background': '#ffffff',
    '--foreground': '#171717',
  },
};


export default function SelectorTheme(){

  const [theme,setTheme] = useState<Theme>('light');

  const items = useMemo<MenuProps['items']>(()=>{
      return themes.map(v=>({
        key:v,
        label:v,
        value:v
      }))
  },[themes])

  const setCssVar = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(themeValues[theme]).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });  
  };
  
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setTheme(e.key as Theme)
    setCssVar(e.key as Theme)
  };
  
  return (
    <div>
      <Dropdown menu={{ 
          items,
          selectable: true,
          defaultSelectedKeys: [theme],
          onClick: handleMenuClick,
        }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            切换主题
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      
      <div className="hidden">
        {
          themes.map((v)=>(
            <input
              key={v}
              type="checkbox"
              className="theme-controller"
              aria-label={v}
              checked={v === theme}
              value={v}
              onChange={(e)=>setTheme(e.target.value as Theme)}
            />
          ))
        }
      </div>
    </div>
  )
}