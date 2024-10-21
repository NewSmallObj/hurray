import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json()

  const { loginReturn,...values } = body
  
  await prisma.dict.create({
    data: {
      ...values,
      login_return: loginReturn
    },
  })
  
  return ResponseSuccess(null)
}


export const PUT = async (request: Request) => {
  const body = await request.json();

  const { id,loginReturn,...values } = body

  await prisma.dict.update({
    where: {
      id: id
    },
    data: {
      ...values,
      login_return: loginReturn
    },
  })
  
  return ResponseSuccess(null)
}