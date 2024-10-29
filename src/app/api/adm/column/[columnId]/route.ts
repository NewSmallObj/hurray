import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { arrayToTree, arrayToTree2, getTreeAllIds } from '@/app/utils/utils';
import { NextResponse } from 'next/server';

type Params = {
  columnId: string
}

export const DELETE = async (request: Request,
  { params }: { params: Params }) => {
    
  await prisma.columns.delete({
    where: {
      id: params.columnId
    },
  })

  return ResponseSuccess(null)
}


export const GET = async (request: Request,
  { params }: { params: Params }) => {
    
  await prisma.columns.findFirst({
    where: {
      id: params.columnId
    },
    include:{
      articles:true
    }
  })

  return ResponseSuccess(null)
}