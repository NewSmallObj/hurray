import { NextResponse } from "next/server";
import prisma from '@/app/libs/prisma';
import { ResponseSuccess } from "@/app/api/response/success";

interface Params {
  name: string | null;
  roleId: string | null;
  deptId: string | null;
  disabled: boolean | null;
  page: number;
  limit: number;
}

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  const params: Params = {
    name: searchParams.get('name'),
    roleId: searchParams.get('roleId'),
    deptId: searchParams.get('deptId'),
    disabled: searchParams.get('disabled') === 'true',
    page: Number(searchParams.get('page')),
    limit: Number(searchParams.get('limit'))
  }

  const user_dept = params.deptId ? {
    some: {
      dept_id: params.deptId || undefined
    }
  } :{}

  const user_role = params.roleId ? {
    some: {
      role_id: params.roleId || undefined
    }
  } :{}

  const records = await prisma.user.findMany({
    where: {
      name: {
        contains: params.name || undefined
      },
      user_dept: {
        ...user_dept
      },
      user_role: {
        ...user_role
      },
      disabled: params.disabled || undefined,
      deleted: false
    },
    skip: (params.page - 1) * params.limit,
    take: params.limit,
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
  
  const totalRow = await prisma.user.count({
    where: {
      name: {
        contains: params.name || undefined
      },
      user_dept: {
        ...user_dept
      },
      user_role: {
        ...user_role
      },
      disabled: params.disabled || undefined,
      deleted: false
    }
  })

  return ResponseSuccess({
    records:records.map((item)=>({...item,roleNames:item.user_role.map(v=>v.roles.name).join(',')})),
    totalRow
  })
}