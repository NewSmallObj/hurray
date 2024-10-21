import { NextRequest } from "next/server"
import prisma from '@/app/libs/prisma';
import { ResponseSuccess } from "@/app/api/response/success";

interface Params {
  dictId:string
  page: number;
  limit: number;
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  
  const params: Params = {
    dictId: searchParams.get('dictId')!,
    page: Number(searchParams.get('page')),
    limit: Number(searchParams.get('limit'))
  }

  const records = await prisma.dict.findFirst({
    where:{
      id:params.dictId
    },
    skip: (params.page - 1) * params.limit,
    take: params.limit,
    include:{
      dict_datas:true
    },
  })
  
  const totalRow = await prisma.user.count()

  return ResponseSuccess({
    records:records?.dict_datas || [],
    totalRow
  })
  
}