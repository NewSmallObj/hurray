import { NextRequest } from "next/server"
import prisma from '@/app/libs/prisma';
import { ResponseSuccess } from "@/app/api/response/success";
import { arrayToTree2 } from "@/app/utils/utils";

export const GET = async (request: NextRequest) => {

  const records = await prisma.columns.findMany({
    orderBy:{
      sort: 'asc'
    }
  })

  const tree = arrayToTree2(records,'0')
  
  return ResponseSuccess(tree)
  
}