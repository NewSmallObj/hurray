import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { get } from 'lodash';
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
    include: {
      user_role: {
        include: {
          roles: true
        }
      },
      user_dept: {
        include: {
          depts: true
        }
      }
    }
  })

  
  return ResponseSuccess({
    ...user,
    roleIds: user?.user_role?.map(item => item.role_id) || [],
    deptId: get(user, 'user_dept[0].dept_id', null)
  })
}

