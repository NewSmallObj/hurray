import { NextRequest } from "next/server"
import prisma from '@/app/libs/prisma';
import { ResponseSuccess } from "@/app/api/response/success";
import { arrayToTree2 } from "@/app/utils/utils";

interface Params {
  page: number;
  limit: number;
}

export const GET = async (request: NextRequest) => {

  const records = await prisma.menu.findMany({
    orderBy:{
      sort: 'asc'
    }
  })

  const tree = arrayToTree2(records
    .map((v)=>({
      ...v,
      routePath:v.route_path,
      permissionCode:v.perms,
      includePermissionCode:v.addit_perms
    })),'0')
  
  return ResponseSuccess(tree)
  
}