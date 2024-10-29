
import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json()

  await prisma.columns.create({
    data: body,
  })
  
  return ResponseSuccess(null)
}


export const PUT = async (request: Request) => {
  const body = await request.json();

  const { 
    id,
    pid,
    show_nav,
    sort,
    title,
    url,
  } = body

  await prisma.columns.update({
    where: {
      id: id
    },
    data: {
      pid,
      show_nav,
      sort,
      title,
      url,
    },
  })
  
  return ResponseSuccess(null)
}

