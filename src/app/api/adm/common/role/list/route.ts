import { NextRequest } from "next/server"
import prisma from '@/app/libs/prisma';
import { ResponseSuccess } from "@/app/api/response/success";


export const GET = async (request: NextRequest) => {

  const records = await prisma.role.findMany()
  
  return ResponseSuccess(records)
  
}