import requset from "@/app/utils/request"
import { arrayToTree, arrayToTree2, treeToArray } from "@/app/utils/utils";

enum URL {
  SystemMenuList = '/adm/sys/menu/list',
  SystemMenuTree = '/adm/sys/menu/tree',
  SystemMenu = '/adm/sys/menu',
}

export interface PageData<T> {
  records: T[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRow: number;
}

export interface MenuType {
  creatorName?: any;
  creatorUserName?: any;
  createTime?: any;
  updaterName?: any;
  updaterUserName?: any;
  updateTime?: any;
  id: string;
  pid: string;
  type: number;
  name: string;
  icon: string;
  routePath: string;
  pagePath: string;
  permissionCode: string;
  includePermissionCode?: any;
  sort: number;
  disabled: boolean;
  children: MenuType[]
}



export const sysMenuSave = async (params: any) => {
  return await requset<MenuType>({
    url: URL.SystemMenu,
    method: 'post',
    data: params
  })
}

export const sysMenuUpdate = async (params: any) => {
  return await requset<MenuType>({
    url: URL.SystemMenu,
    method: 'put',
    data: params
  })
}


export const sysMenuTree = async () => {
  const menu = await requset<MenuType[]>({
    url: URL.SystemMenuTree,
    method: 'get'
  })

  return menu
}

export const getMenuList = async (params: any) => {
  const {pageSize,current,values} = params
  const res = await requset<PageData<MenuType>>({
    url:URL.SystemMenuList,
    method: 'get',
    params:{
      ...values,
      page:current,
      limit:pageSize
    }
  })
  return {
    list:res.data.records,
    total:res.data.totalRow
  }
}


export const sysMenuDelete = async (id: string) => {
  return await requset({
    url: URL.SystemMenu + '/' + id,
    method: 'delete'
  })
}