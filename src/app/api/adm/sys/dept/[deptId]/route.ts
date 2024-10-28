import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  deptId: string
}

export const GET = async (request: NextRequest,
  { params }: { params: Params }
  ) => {

  const user = await prisma.dept.findFirst({
    where: {
      id: params.deptId
    },
    include:{
      leader:true
    }
  })
  
  return ResponseSuccess({
    ...user,
    leader:user?.leader?.id,
    simpleName:user?.simple_name  
  })
}


export const DELETE = async (request: Request,
  { params }: { params: Params }
  ) => {
  await prisma.dept.update({
    where: {
      id: params.deptId
    },
    data:{
      deleted:true
    }
  })

  return ResponseSuccess(null)
}