import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json()

  await prisma.user.create({
    data: body,
  })
  
  return NextResponse.json(JSON.stringify(body))
}


export const PUT = async (request: Request) => {
  const body = await request.json()

  await prisma.user.update({
    where: {
      id: body.id
    },
    data: body,
  })
  
  return NextResponse.json(JSON.stringify(body))
}