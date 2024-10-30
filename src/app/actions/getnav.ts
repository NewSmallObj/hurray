import prisma from '@/app/libs/prisma';
import { arrayToTree2 } from "@/app/utils/utils";
const getNav = async ()=>{
  const records = await prisma.columns.findMany({
    where:{
      disabled: false,
      show_nav: true
    },
    orderBy:{
      sort: 'asc'
    }
  })

  return arrayToTree2(records,'0')
}

export default getNav;