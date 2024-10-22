import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"
export const POST = async (request: Request) => {
  const body = await request.json();

  const {roleIds,deptId,...values} = body;

  const connectDept = deptId ? {user_dept:{connect:{id:deptId}}} : {} // user_dept:{disconnect:true}

  const password =  await bcrypt.hash('123456',10)
  
  const user = await prisma.user.create({
    data: {
      ...values,
      password: password,
      user_role:{
        connect:roleIds.map((id:string)=>({id}))
      },
      ...connectDept
    },
  })
  
  
  
  return ResponseSuccess({...user,parssword:'123456'})
}


export const PUT = async (request: Request) => {
  const body = await request.json()

  const user = await prisma.user.update({
    where: {
      id: body.id
    },
    data: body,
  })
  
  return ResponseSuccess(user)
}