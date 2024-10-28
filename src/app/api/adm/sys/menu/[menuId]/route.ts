import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { arrayToTree, arrayToTree2, getTreeAllIds } from '@/app/utils/utils';
import { NextResponse } from 'next/server';

type Params = {
  menuId: string
}

export const DELETE = async (request: Request,
  { params }: { params: Params }) => {
    
  const menus = await prisma.menu.findMany()

  const menu = arrayToTree2(menus,params.menuId)
    
  const ids = getTreeAllIds(menu);
  
  await prisma.menu.updateMany({
    where: {
      id: {
        in: [...ids,params.menuId]
      }
    },
    data:{
      deleted:true
    }
  })

  return ResponseSuccess(null)
}


