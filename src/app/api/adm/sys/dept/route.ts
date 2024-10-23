import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json();
  const { simpleName, ...values } = body;

  await prisma.dept.create({
    data: {
      ...values,
      simple_name: simpleName
    },
  })

  return ResponseSuccess(null)
}


export const PUT = async (request: Request) => {
  const body = await request.json();

  const { id, ...values } = body

  await prisma.dept.update({
    where: {
      id: id
    },
    data: {
      ...values
    },
  })

  return ResponseSuccess(null)
}