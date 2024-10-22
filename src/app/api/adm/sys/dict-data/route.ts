import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json()

  const {dictId,...dict_datas} = body

  await prisma.dict.update({
    where:{
      id: dictId
    },
    data: {
      dict_datas:{
        create: dict_datas
      }
    },
    include:{
      dict_datas:true
    }
  })
  
  return ResponseSuccess(null);
}


export const PUT = async (request: Request) => {
  const body = await request.json();
  const {dictId,code,id,...dict_datas} = body

  await prisma.dictData.update({
    where: {
      dict_code:code,
      id: id
    },
    data: {
      ...dict_datas
    }
  })
  
  return ResponseSuccess(null);
}

export const DELETE = async (request: Request) => {
  const body = await request.json()

  await prisma.dict.delete({
    where: {
      id: body.id
    }
  })
  
  return ResponseSuccess(null);
}