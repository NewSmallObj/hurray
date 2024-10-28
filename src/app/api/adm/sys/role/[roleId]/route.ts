import { ResponseError, ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  roleId: string
}

export const GET = async (request: NextRequest,
  { params }: { params: Params }
  ) => {

  const role = await prisma.role.findFirst({
    where: {
      id: params.roleId
    },
    include:{
      menu_role:{
        include:{
          menus:true
        }
      }
    }
  })
  if(!role) return ResponseError(null)
  
  const { menu_role,...values } = role
  
  return ResponseSuccess({
    ...values,
    menuIds: menu_role.map(item=>item.menu_id)
  })
}


export const DELETE = async (request: NextRequest,
  { params }: { params: Params }
  )=> {
    await prisma.role.update({
      where: {
        id: params.roleId
      },
      data:{
        deleted:true
      }
    })
    
    return ResponseSuccess(null)
  }