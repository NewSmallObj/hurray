import { ResponseError, ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  dictDataId: string
}
export const DELETE = async (request: NextRequest,
  { params }: { params: Params }
  )=> {
    await prisma.dictData.delete({
      where: {
        id: params.dictDataId
      }
    })
    
    return ResponseSuccess(null)
  }