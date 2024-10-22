import { ResponseError, ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  dictId: string
}

export const GET = async (request: NextRequest,
  { params }: { params: Params }
  ) => {

  const dict = await prisma.dict.findFirst({
    where: {
      id: params.dictId
    },
  })
  if(!dict) return ResponseError(null)
  
  const { login_return,...values } = dict
  
  return ResponseSuccess({
    ...values,
    loginReturn: login_return
  })
}


export const DELETE = async (request: NextRequest,
  { params }: { params: Params }
  )=> {
    await prisma.dict.delete({
      where: {
        id: params.dictId
      }
    })
    
    return ResponseSuccess(null)
  }