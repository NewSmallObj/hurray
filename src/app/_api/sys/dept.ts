import requset from "@/app/utils/request"

enum URL {
  SystemDeptList = '/adm/sys/dept/list',
  SystemDept = '/adm/sys/dept',
  SystemDeptManager = '/adm/sys/dept/leader',
}

export interface PageData<T> {
  records: T[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRow: number;
}

export interface DeptType {
  id: string;
  name: string;
  pid: string;
  code: string;
  relationIds: string;
  remark: string;
  simpleName: string;
  sort: number;
  type: number;
  leader: string;
  leaderName: string;
}

export const getDeptList = async (params: any,values: any) => {
  const {pageSize,current} = params
  const res = await requset<PageData<DeptType>>({
    url:URL.SystemDeptList,
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


export const sysDeptSave = async (params: any) => {
  return await requset({
    url: URL.SystemDept,
    method: params.id ? 'put' : 'post',
    data: params
  })
}

export const sysDeptFind = async (id: string) => {
  return await requset<DeptType>({
    url: URL.SystemDept + '/' + id
  })
}

export const sysDeptDelete = async (id: string) => {
  return await requset({
    url: URL.SystemDept + '/' + id,
    method: 'delete'
  })
}
