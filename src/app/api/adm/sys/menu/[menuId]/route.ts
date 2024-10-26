import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { getTreeAllIds } from '@/app/utils/utils';
import { NextResponse } from 'next/server';

type Params = {
  menuId: string
}

export const DELETE = async (request: Request,
  { params }: { params: Params }) => {
    
  const menu = await prisma.menu.findFirst({
    where: {
      id: params.menuId
    }
  })
    
  const ids = getTreeAllIds(menu);
  
  await prisma.menu.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  })

  return ResponseSuccess(null)
}


