import { NextResponse } from "next/server"

export const ResponseSuccess = <T>(data:T)=>{
  return NextResponse.json({code:200,data,msg:"操作成功"})
}

export const ResponseError = <T>(data:T)=>{
  return NextResponse.json({code:500,data,msg:"操作失败"})
}