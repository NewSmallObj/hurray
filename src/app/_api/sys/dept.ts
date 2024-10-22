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

export const getDeptList = async (params: any) => {
  const res = await requset<PageData<DeptType>>({
    url:URL.SystemDeptList,
    params
  })
  return {
    list:res.data.records,
    total:res.data.totalRow
  }
}


export const sysDeptFind = async (id: string) => {
  return await requset<DeptType>({
    url: URL.SystemDept + '/' + id
  })
}

