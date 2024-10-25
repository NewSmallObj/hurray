import requset from "@/app/utils/request"
import { OPTIONS_DEPTS, OPTIONS_ROLES, OPTIONS_USERS } from "@/app/utils/stants"
import { arrayToTree2 } from "@/app/utils/utils"
import { useRequest } from "ahooks"

enum URL {
  commonRole = '/adm/common/role/list',
  commonDeptTree = '/adm/common/dept/list',
  commonUsers = '/adm/common/user/list',
}



export const optionsRole = async () => {
  return await requset({
    url: URL.commonRole,
    method: 'get',
  })
}

export const useOptionsRole = () => {
  return useRequest(optionsRole,{
    manual: true,
    cacheKey: OPTIONS_ROLES,
    cacheTime: 1000 * 60 * 60 * 1,
    staleTime: 1000 * 60 * 60 * 1,
  })
}

export const optionsDept = async () => {
  const list = await requset({
    url: URL.commonDeptTree,
    method: 'get',
  })
  return {
    ...list,
    data:arrayToTree2(list.data,'0')
  }
}


export const useOptionsDept = () => {
  return useRequest(optionsDept,{
    cacheKey: OPTIONS_DEPTS,
    manual: true,
    cacheTime: 1000 * 60 * 60 * 1,
    staleTime: 1000 * 60 * 60 * 1,
  })
}


export const optionsUser = async () => {
  return await requset({
    url: URL.commonUsers,
    method: 'get',
  })
}

export const useOptionsUser = () => {
  return useRequest(optionsUser,{
    cacheKey: OPTIONS_USERS,
    manual: true,
    cacheTime: 1000 * 60 * 60 * 1,
    staleTime: 1000 * 60 * 60 * 1,
  })
}