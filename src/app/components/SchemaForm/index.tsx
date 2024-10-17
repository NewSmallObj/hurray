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
import { Button } from 'antd'
import { createForm } from '@formily/core';



export default function SchemaForm(schema:Partial<ISchema>,scope?: any) {
  const form = createForm();

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
      <FormProvider form={form}>
        <FormLayout labelCol={6} wrapperCol={10}>
          <SchemaField schema={schema} />
        </FormLayout>
      </FormProvider>
  )
}