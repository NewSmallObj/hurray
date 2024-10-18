import requset from "@/app/utils/request"

enum URL {
  SystemUser = '/adm/sys/user/list',
  SystemUserFind = '/adm/sys/user',
  SystemUserDisabled = '/adm/sys/user/disable',
  SystemUserReset = '/adm/sys/user/reset-password',
  SystemUserRemove = '/adm/sys/user/delete'
}

export interface PageData<T> {
  records: T[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRow: number;
}

export interface UserType {
  creatorName?: any;
  creatorUserName?: any;
  createTime: string;
  updaterName?: any;
  updaterUserName?: any;
  updateTime: string;
  id: string;
  username: string;
  type: number;
  name: string;
  mobile: string;
  email: string;
  deptId: string;
  deptName: string;
  roleNames?: any;
  loginTime?: any;
  passwordUpdateTime?: any;
  disabled: boolean;
  roleIds: any[];
}

export const getUserList = async (params: any) => {
  const res = await requset<PageData<UserType>>({
    url:URL.SystemUser,
    params
  })
  return {
    list:res.data.records,
    total:res.data.totalRow
  }
}


export const sysUserFind = async (id: string) => {
  return await requset<UserType>({
    url: URL.SystemUserFind + '/' + id
  })
}