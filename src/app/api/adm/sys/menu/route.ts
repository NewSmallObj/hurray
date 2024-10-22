import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json()

  const { routePath,permissionCode,includePermissionCode,...values } = body
  
  await prisma.menu.create({
    data: {
      ...values,
      route_path:routePath,
      perms: permissionCode,
      addit_perms: includePermissionCode
    },
  })
  
  return ResponseSuccess(null)
}


export const PUT = async (request: Request) => {
  const body = await request.json();

  const { id,routePath,permissionCode,includePermissionCode,...values } = body

  await prisma.dict.update({
    where: {
      id: id
    },
    data: {
      ...values,
      route_path:routePath,
      perms: permissionCode,
      addit_perms: includePermissionCode
    },
  })
  
  return ResponseSuccess(null)
}

