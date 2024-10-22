import getSession from '@/app/actions/getSession';
import { ResponseError, ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { User } from '@prisma/client';
import { flatten } from 'lodash';
import { NextResponse } from 'next/server';
export const POST = async (request: Request) => {
  const body = await request.json()
  
  const session = await getSession();
  if(!session) return NextResponse.json({error:'未登录'},{status:401})

  const { loginReturn,...values } = body
  
  const user = await prisma.user.findFirst({
    where:{
      id:session?.user.userId as string,
      disabled:false
    },
    include:{
      user_role:{
        include:{
          roles:true
        }
      },
      user_dept:{
        include:{
          depts:true
        }
      }
    }
  })
  if(!user) return ResponseError("该用户不存在或已被禁用")
  
 
 const menuIds = await getMenuIds(user,user?.user_role.map(item=>item.role_id));
 
  const {permissionCodes,menu} = await getMenu(flatten(menuIds))
  
  const dict = await prisma.dict.findMany({
    where:{
      login_return:true,
      disabled:false
    },
    orderBy:{
      sort:'asc'
    },
    include:{
      dict_datas:{
        where:{
          disabled:false
        },
        orderBy:{
          sort:'asc'
        }
      }
    }
  })
  
  return ResponseSuccess({
    infra:{
      dict:dict.map((v)=>({[v.code]:v.dict_datas})),
      menu,
      route:null,
      user:{...user,password:null,permissionCodes}}
  })
}

 // 查询角色下对应的所有菜单ids
const getMenuIds = async (user:User,role_ids:string[])=>{
  // if(!user.type){
  //   return await prisma.menu.findMany()
  // }
  const role = await prisma.role.findMany({
    where:{
      menu_role:{
        some:{
          role_id:{ in: role_ids}
        }
      }
    },
    include:{
      menu_role:true
    }
  })
  return role.map((v)=>v.menu_role.map((v)=>v.menu_id))
}

// 根据菜单ids查询所有菜单树
const getMenu = async (menu_ids:string[])=>{
  const menu = await prisma.menu.findMany({
    where:{
      id:{in:menu_ids}
    }
  })
  return {
    permissionCodes :menu.map((v)=>`${v.perms},${v.addit_perms}`.split(',')),
    menu
  }
}