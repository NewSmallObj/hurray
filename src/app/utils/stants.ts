export const LAYOUTTAGS = "LAYOUTTAGS"


export const PAGE_SYS_MENU = "PAGE_SYS_MENU"
export const PAGE_SYS_USER = "PAGE_SYS_USER"
export const PAGE_SYS_DEPT = "PAGE_SYS_DEPT"
export const PAGE_SYS_DICT = "PAGE_SYS_DICT"
export const PAGE_SYS_DICT_DATA = "PAGE_SYS_DICT_DATA"
export const PAGE_SYS_ROLE = "PAGE_SYS_ROLE"

export const LOCALSTORAGE = "HURRAY_LOCALSTORAGE"


export const OPTIONS_ROLES = "OPTIONS_ROLES"
export const OPTIONS_DEPTS = "OPTIONS_DEPTS"
export const OPTIONS_USERS = "OPTIONS_USERS"

export const BASE_STATICPREFIX = ""


export const statusOperation = {
  undefined: '新增',
  'view': "查看",
  "edit": '编辑',
  "add": '新增'
}
export type StatusOperation = keyof typeof statusOperation;