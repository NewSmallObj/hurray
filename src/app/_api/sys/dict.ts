import requset from "@/app/utils/request"

enum URL {
  SystemDictList = '/adm/sys/dict/list',
  SystemDict = '/adm/sys/dict',
  SystemDictDataList = '/adm/sys/dict-data/list',
  SystemDictDataAdd = '/adm/sys/dict-data',
}

export interface PageData<T> {
  records: T[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRow: number;
}

export interface DictType {
  creatorName?: any;
  creatorUserName?: any;
  createTime: string;
  updaterName?: any;
  updaterUserName?: any;
  updateTime: string;
  id: string;
  name: string;
  code: string;
  remark?: any;
  sort: number;
  loginReturn: boolean;
  dataCount: number;
  readonly: boolean;
  disabled: boolean;
}

export interface DictSaveParams {
  id?: string;
  name: string;
  code: string;
  remark?: string;
  sort: number;
  loginReturn: boolean;
  disabled: boolean;
}

export const sysDictSave = async (params: DictSaveParams) => {
  return await requset<DictType>({
    url: URL.SystemDict,
    method: params.id ? 'put' : 'post',
    data: params
  })
}

export const getDictList = async (params: any) => {
  const {pageSize,current,values} = params
  const res = await requset<PageData<DictType>>({
    url:URL.SystemDictList,
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


export const sysDictFind = async (id: string) => {
  return await requset<DictType>({
    url: URL.SystemDict + '/' + id,
    method: 'get'
  })
}



export interface DictDataType {
  creatorName?: any;
  creatorUserName?: any;
  createTime: string;
  updaterName?: any;
  updaterUserName?: any;
  updateTime: string;
  id: string;
  dictId: string;
  dictCode: string;
  label: string;
  value: number;
  remark?: any;
  sort: number;
  readonly: boolean;
  disabled: boolean;
}


export const getDictDataList = async (params: any) => {
  const {pageSize,current,...values} = params
  const res = await requset<PageData<DictDataType>>({
    url:URL.SystemDictDataList,
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