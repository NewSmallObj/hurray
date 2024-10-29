
import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';

export const PUT = async (request: Request) => {
  const body = await request.json();
  const { id,...values} = body
  
  const column = await prisma.columns.findFirst({
    where: {id}
  })

  await prisma.columns.update({
    where: {
      id: id
    },
    data: {
      disabled: column?.disabled ? false : true
    },
  })

  return ResponseSuccess(null)
}

