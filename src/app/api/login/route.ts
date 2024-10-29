import getSession from '@/app/actions/getSession';
import { ResponseError, ResponseSuccess } from '@/app/api/response/success';
import prisma from '@/app/libs/prisma';
import { arrayToTree2 } from '@/app/utils/utils';
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
      disabled:false,
      deleted:false,
      // user_role:{
      //   some:{
      //     roles:{
      //       deleted:false,
      //       menu_role:{
      //         some:{
      //           menus:{
      //             deleted:false
      //           }
      //         }
      //       }
      //     }
      //   }
      // },
      // user_dept:{
      //   some:{
      //     depts:{
      //       deleted:false
      //     }
      //   }
      // }
    },
 
    include:{
      user_role:{
        where:{
          roles:{
            deleted:false
          }
        },
        include:{
          roles:{
            include:{
              menu_role:{
                where:{
                  menus:{
                    deleted:false,
                    type:{
                      in:[1,2]
                    }
                  },
                },
                orderBy:{
                  menus:{
                    sort:'asc'
                  }
                },
                select:{
                  menus:true,
                }
              }
            }
          }
        }
      },
      user_dept:{
        where:{
          depts:{deleted:false}
        },
        include:{
          depts:true
        }
      }
    }
  })
  if(!user) return ResponseError("该用户不存在或已被禁用")
 

  const menus = user?.user_role.map((userRole)=>userRole.roles
    .menu_role.map((menuRole)=>menuRole.menus))
 
  const menu = menus.length < 1 ? [] : menus.reduce((acc,cur)=>acc.concat(cur)).reduce((prev,cur)=>{
    if(!prev.some((v)=>v.id === cur.id)) prev.push(cur)
    return prev
  },([] as typeof menus[0]))

  
  const permissionCodes = menu.map((v)=>`${v.perms},${v.addit_perms}`.split(',')).reduce((acc,cur)=>{
    return acc.concat(cur)
  },([] as string[])).filter((s)=>s !== 'null');
  
  
  const dict = await prisma.dict.findMany({
    where:{
      login_return:true,
      // disabled:false
    },
    orderBy:{
      sort:'asc'
    },
    include:{
      dict_datas:{
        // where:{
        //   disabled:false,
        // },
        orderBy:{
          sort:'asc'
        }
      }
    }
  })

  const dic:any = {};
  dict.forEach((v)=>{
    dic[v.code] = v.dict_datas
  })
  
  return ResponseSuccess({
    infra:{
      dict:dic,
      menu:arrayToTree2(menu,"0"),
      route:null,
    },
    user:{...user,password:null,permissionCodes}}
  )
}
