export const LAYOUTTAGS = "LAYOUTTAGS"


export const PAGE_SYS_MENU = "PAGE_SYS_MENU"


export const statusOperation = {
  undefined: '新增',
  'view': "查看",
  "edit": '编辑',
  "add": '新增'
}
export type StatusOperation = keyof typeof statusOperation;