"use client";
import React from 'react'
import { FormDialog, FormItem, FormLayout, Input } from '@formily/antd-v5'
import { createSchemaField, FormProvider, ISchema, Schema } from '@formily/react'
import { Button } from 'antd'
import { createForm } from '@formily/core';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})


export default function SchemaForm(schema:Partial<ISchema>,scope?: any) {
  const form = createForm();

  return (
      <FormProvider form={form}>
        <FormLayout labelCol={6} wrapperCol={10}>
          <SchemaField schema={schema} />
        </FormLayout>
      </FormProvider>
  )
}