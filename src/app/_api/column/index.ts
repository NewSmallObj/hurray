import requset from "@/app/utils/request"

enum URL {
  admColumn = '/adm/column',
  admColumnList = '/adm/column/list',
  admColumnDisabled = '/adm/column/set_disabled',
  admColumnNav = '/adm/column/nav',
}

export interface ColumnType {
  id: string;
	pid: string;
	create_time: string;
	disabled: boolean;
	show_type: number | string;
	show_nav: boolean;
	sort: number;
	create_name: string;
	title: string;
	url: string;
	url_open_with: number;
	icon: string;
  children: ColumnType[];
}



export const columnSave = async (params: any) => {
  return await requset<ColumnType>({
    url: URL.admColumn,
    method: 'post',
    data: params
  })
}

export const columnUpdate = async (params: any) => {
  return await requset<ColumnType>({
    url: URL.admColumn,
    method: 'put',
    data: params
  })
}


export const columnTree = async () => {
  const column = await requset<ColumnType[]>({
    url: URL.admColumnList,
    method: 'get'
  })

  return column
}





export const columnDelete = async (id: string) => {
  return await requset({
    url: URL.admColumn + '/' + id,
    method: 'delete'
  })
}

export const columnDisabled = async (id: string) => {
  return await requset({
    url: URL.admColumnDisabled,
    method: 'put',
    data: {id}
  })
}

export const columnFindById = async (id: string) => {
  return await requset({
    url: URL.admColumn + '/' + id,
    method: 'get'
  })
}



// 获取导航菜单
export const columnNav = async () => {
  const column = await requset<ColumnType[]>({
    url: URL.admColumnNav,
    method: 'get'
  })

  return column
}