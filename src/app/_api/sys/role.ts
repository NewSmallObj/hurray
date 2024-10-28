import requset from "@/app/utils/request"

enum URL {
  SystemRole = '/adm/sys/role/list',
  SystemRoleFind = '/adm/sys/role',
}

export interface PageData<T> {
  records: T[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRow: number;
}

export interface RoleType {
  creatorName?: any;
  creatorUserName?: any;
  createTime: string;
  updaterName?: any;
  updaterUserName?: any;
  updateTime: string;
  id: string;
  name: string;
  code: string;
  remark: string;
  disabled: boolean;
  readonly: boolean;
  menuIds: any[];
  sort: number;
}

export const getRoleList = async (params: any,values:any) => {
  const {pageSize,current} = params
  const res = await requset<PageData<RoleType>>({
    url:URL.SystemRole,
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


export const sysRoleFind = async (id: string) => {
  return await requset<RoleType>({
    url: URL.SystemRoleFind + '/' + id
  })
}


export const sysRoleAdd = async (params: any)=>{
  return await requset({
    url: URL.SystemRoleFind,
    method: params.id ? 'put' : 'post',
    data: params
  })
}

export const sysRoleDelete = async (id: string)=>{
  return await requset({
    url: URL.SystemRoleFind+ `/${id}`,
    method: 'delete',
  })
}