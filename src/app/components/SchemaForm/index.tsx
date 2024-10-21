"use client";
import React from 'react'
import { FormItem,
  FormLayout,
  Input,
  Select,
  PreviewText,
  Switch,
  NumberPicker,
  TreeSelect } from '@formily/antd-v5'
import { createSchemaField, FormProvider, ISchema, Schema } from '@formily/react'
import { Button, ConfigProvider } from 'antd'
import { createForm } from '@formily/core';
import zhCN from 'antd/locale/zh_CN'



export default function SchemaForm(schema:Partial<ISchema>,scope?: any) {
  // const form = createForm();

  const SchemaField = createSchemaField({
    components: {
      FormItem,
      Input,
      Select,
      PreviewText,
      Switch,
      NumberPicker,
      TreeSelect,
    },
    scope:{
      ...scope
    }
  })
  

  return (
    <ConfigProvider locale={zhCN}>
      {/* <FormProvider> */}
        <FormLayout labelCol={6} wrapperCol={16}>
          <SchemaField schema={schema} />
        </FormLayout>
      {/* </FormProvider> */}
    </ConfigProvider>
  )
}