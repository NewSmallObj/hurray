import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json();
  const { simpleName,leader, ...values } = body;

  await prisma.dept.create({
    data: {
      ...values,
      simple_name: simpleName,
      leader_id:leader
    },
  })

  return ResponseSuccess(null)
}


export const PUT = async (request: Request) => {
  const body = await request.json();

  const { id, simpleName,leader, ...values } = body

  await prisma.dept.update({
    where: {
      id: id
    },
    data: {
      ...values,
      simple_name: simpleName,
      leader_id:leader
    },
  })

  return ResponseSuccess(null)
}