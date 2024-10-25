import { ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt"
export const POST = async (request: Request) => {
  const body = await request.json();

  const {roleIds,deptId,...values} = body;

  // const connectDept = deptId ? {user_dept:{connect:{id:deptId}}} : {} // user_dept:{disconnect:true}

  const password =  await bcrypt.hash('123456',10)
  
  const user = await prisma.user.create({
    data: {
      ...values,
      password: password,
      user_role:{
        create:roleIds.map((role_id:string)=>({role_id}))
      },
      user_dept:{
        create:{ dept_id: deptId }
      }
    },
  })
  
  
  
  return ResponseSuccess({...user,parssword:'123456'})
}


export const PUT = async (request: Request) => {
  const body = await request.json();
  const {roleIds,deptId,id,...values} = body;

  const currentUserRoles = await prisma.userRole.findMany({
    where: {
      user_id: id
    },
    select: {
      role_id: true
    }
  })

  const currentRoleIds = currentUserRoles.map(userRole => userRole.role_id);

  const newRoleIds = roleIds.filter((roleId:string) => !currentRoleIds.includes(roleId));
  const removedRoleIds = currentRoleIds.filter(roleId => !roleIds.includes(roleId));
  

  const currentDepts = await prisma.userDept.findMany({
    where: {
      user_id: id
    },
    select: {
      dept_id: true
    }
  })

  const currentDeptIds = currentDepts.map(userDept => userDept.dept_id);
  const newDeptIds = !deptId ? [] : [deptId].filter(dept_id => !currentDeptIds.includes(dept_id));
  const removedDeptIds = currentDeptIds.filter(dept_id => ![deptId].includes(dept_id));  

  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      ...values,
      user_role:{
        create: newRoleIds.map((role_id:string) => ({ role_id })),
        deleteMany: {
          role_id: {in:removedRoleIds}
        }
      },
      user_dept:{
        create: newDeptIds.map((dept_id:string) => ({ dept_id })),
        deleteMany: {
          dept_id: {in:removedDeptIds}
        }
      }
    },
  })
  
  return ResponseSuccess(user)
}