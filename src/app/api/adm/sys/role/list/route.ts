import { NextRequest } from "next/server"
import prisma from '@/app/libs/prisma';
import { ResponseSuccess } from "@/app/api/response/success";

interface Params {
  name: string | null;
  page: number;
  limit: number;
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  
  const params: Params = {
    name: searchParams.get('name'),
    page: Number(searchParams.get('page')),
    limit: Number(searchParams.get('limit'))
  }

  const records = await prisma.role.findMany({
    where: {
      name: {
        contains: params.name || undefined
      },
    },
    orderBy:{
      sort: 'asc'
    },
    skip: (params.page - 1) * params.limit,
    take: params.limit,
    include:{
      menu_role:{
        include:{
          menus:true
        }
      }
    }
  })
  
  const totalRow = await prisma.role.count({
    where: {
      name: {
        contains: params.name || undefined
      },
    }
  })

  const list = records.map((item)=>({...item,menuIds:item.menu_role.map(v=>v.menus.id)}))
  return ResponseSuccess({
    records:list,
    totalRow
  })
  
}