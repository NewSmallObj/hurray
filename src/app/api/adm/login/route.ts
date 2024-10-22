import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json()

  const { loginReturn,...values } = body
  
  const dict = await prisma.dict.findMany({
    where:{
      login_return:true
    }
  })
  
  return ResponseSuccess({
    infra:{dict,menu:[],route:null,user:{}}
  })
}