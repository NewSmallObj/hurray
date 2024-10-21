import { NextRequest } from "next/server"
import prisma from '@/app/libs/prisma';
import { ResponseSuccess } from "@/app/api/response/success";

interface Params {
  page: number;
  limit: number;
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  
  const params: Params = {
    page: Number(searchParams.get('page')),
    limit: Number(searchParams.get('limit'))
  }

  const list = await prisma.dict.findMany({
    skip: (params.page - 1) * params.limit,
    take: params.limit,
    include:{
      dict_datas:true
    },
    orderBy:{
      sort: 'asc'
    }
  })
  
  const totalRow = await prisma.dict.count()

  const records = list.map(item=>{
    const { login_return,dict_datas,...values } = item
    return {
      ...values,
      loginReturn:item.login_return,
      dataCount:dict_datas.length
    }
  })
  
  return ResponseSuccess({
    records,
    totalRow
  })
  
}