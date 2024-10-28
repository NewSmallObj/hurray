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

  const records = await prisma.menu.findMany({
    where: {
      deleted: false
    },
    skip: (params.page - 1) * params.limit,
    take: params.limit,
    orderBy:{
      sort: 'asc'
    }
  })
  
  const totalRow = await prisma.menu.count()
  
  return ResponseSuccess({
    records,
    totalRow
  })
  
}