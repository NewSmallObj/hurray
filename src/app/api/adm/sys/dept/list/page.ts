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

  const records = await prisma.user.findMany({
    where: {
      name: {
        contains: params.name || undefined
      },
    },
    skip: (params.page - 1) * params.limit,
    take: params.limit,
  })
  
  const totalRow = await prisma.user.count({
    where: {
      name: {
        contains: params.name || undefined
      },
    }
  })

  return ResponseSuccess({
    records,
    totalRow
  })
  
}