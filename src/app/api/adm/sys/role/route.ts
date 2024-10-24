import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json()

  const { menuIds,...values } = body
  
  await prisma.role.create({
    data: {
      ...values,
      menu_role:{
        create: menuIds.map((menu_id:string) => ({ menu_id }))
      }
    },
  })
  
  return ResponseSuccess(null)
}


export const PUT = async (request: Request) => {
  const body = await request.json();

  const { id,menuIds,...values } = body

  const currentMenuRoles = await prisma.menuRole.findMany({
    where: {
      role_id: id
    },
    select: {
      menu_id: true
    }
  })
  
  const currentMenuIds = currentMenuRoles.map(menuRole => menuRole.menu_id);
  
  // 计算需要新增的菜单 ID
  const newMenuIds = menuIds.filter((menuId:string) => !currentMenuIds.includes(menuId));
  // 计算需要移除的菜单 ID
  const removedMenuIds = currentMenuIds.filter(menuId => !menuIds.includes(menuId));

  await prisma.role.update({
    where: {
      id: id
    },
    data: {
      ...values,
      menu_role:{
        create: newMenuIds.map((menu_id:string) => ({ menu_id })),
      }
    },
  })
  
  await prisma.menuRole.deleteMany({
    where: {
      role_id: id,
      menu_id: {
        in: removedMenuIds
      }
    }
  })
  
  return ResponseSuccess(null)
}