"use client";
import React,{ Fragment, useEffect, useState } from "react";
import * as Icon from "@ant-design/icons";

export default function AntdIcon({name}:{name:string}) {

  return (
    <Fragment>
      {
        React.createElement(Icon && (Icon as any)[name],{
          style: {
            fontSize: '16px',
          }
        })
      }
    </Fragment>
  )
}