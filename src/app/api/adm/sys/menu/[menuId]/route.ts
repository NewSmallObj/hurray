import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';

type Params = {
  menuId: string
}

export const DELETE = async (request: Request,
  { params }: { params: Params }) => {

  await prisma.menu.delete({
    where: {
      id: params.menuId
    },
  })

  return ResponseSuccess(null)
}