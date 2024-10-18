import prisma from '@/app/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  deptId: string
}

export const GET = async (request: NextRequest,
  { params }: { params: Params }
  ) => {

  const user = await prisma.dept.findFirst({
    where: {
      id: params.deptId
    },
  })
  
  return NextResponse.json(user)
}