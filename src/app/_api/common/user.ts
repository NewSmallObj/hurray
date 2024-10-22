import requset from "@/app/utils/request"

enum URL {
  login = '/login',
}

export const login = async (params: any) => {
  return await requset({
    url: URL.login,
    method: 'post',
    data: params
  })
}