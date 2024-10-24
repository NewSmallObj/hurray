"use client";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation"

export default function LayoutSider(){
  const menu = [
    {
      path: '/admin/adm/sys',
      icon: '',
      name: "系统管理",
      pid: 0,
      id: 1,
      children: [
        {
          path: '/admin/adm/sys/menu',
          icon: '',
          name: "菜单管理",
          pid: 1,
          id: 11,
        },
        {
          path: '/admin/adm/sys/dict',
          icon: '',
          name: "字典管理",
          pid: 1,
          id: 12,
        },
        {
          path: '/admin/adm/sys/user',
          icon: '',
          name: "用户管理",
          pid: 1,
          id: 13,
        },
        {
          path: '/admin/adm/sys/dept',
          icon: '',
          name: "部门管理",
          pid: 1,
          id: 14,
        },
        {
          path: '/admin/adm/sys/role',
          icon: '',
          name: "角色管理",
          pid: 1,
          id: 15,
        }
      ],
    }
  ]
  
  return (
    <div className="h-full shadow-md relative">
      <ul className="menu bg-base h-full w-full">
        <MenuItem menu={menu} />
      </ul>
    </div>
  )
}

const MenuItem = ({menu}: {menu:any[]}) => {
  const pathname = usePathname();
  const router = useRouter()

  const handler = (item:any)=>{
    router.push(item.path)
  }

  return (
    <>
      {
        menu.map((item: any) => {
          if(item.children){
            return (
              <li key={item.id}>
                <details open={pathname.includes(item.path) && pathname != '/admin/adm'}>
                  <summary>{item.name}</summary>
                  <ul>
                    <MenuItem menu={item.children} />
                  </ul>
                </details>
              </li>
            )
          }
          return (
            <li key={item.id}>
              <a className={
                clsx(`text-[inherit] hover:text-[inherit]`,{
                    'active': pathname.includes(item.path) && pathname != '/admin/adm' // item.path === pathname
                  })
                }
                onClick={()=> handler(item)}
              >
              {item.name}
              </a>
            </li>
          )
        })
      }
    </>
  )
}