import prisma from '@/app/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  userId: string
}

export const GET = async (request: NextRequest,
  { params }: { params: Params }
  ) => {

  const user = await prisma.user.findFirst({
    where: {
      id: params.userId
    },
  })
  
  return NextResponse.json(user)
}