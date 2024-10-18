export const LAYOUTTAGS = "LAYOUTTAGS"


export const PAGE_SYS_MENU = "PAGE_SYS_MENU"
export const PAGE_SYS_USER = "PAGE_SYS_USER"
export const PAGE_SYS_DEPT = "PAGE_SYS_DEPT"

export const BASE_STATICPREFIX = "/school-partner-server/static/frt"


export const statusOperation = {
  undefined: '新增',
  'view': "查看",
  "edit": '编辑',
  "add": '新增'
}
export type StatusOperation = keyof typeof statusOperation;