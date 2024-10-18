export const USER_SCHEMA = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '账号',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-read-pretty': '{{usernameReadOnly}}',
      'x-validator': [
        {
          triggerType: 'onBlur',
          max: 50,
          min: 6,
          required: true,
          whitespace: true,
          message: '名称应在6-50个字符之间',
        },
      ],
      'x-component-props': {
        placeholder: '请输入名称',
        allowClear: true,
        maxlength: 30,
      },
    },
    name: {
      type: 'string',
      title: '姓名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-read-pretty': '{{readOnly}}',
      'x-component-props': {
        placeholder: '请输入姓名',
        allowClear: true,
        maxlength: 50,
      },
    },
    deptId: {
      type: 'string',
      title: '部门',
      required: true,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Select',
      'x-reactions': '{{fetchDepts}}',
      'x-component-props': {
        placeholder: '请选择部门',
        showSearch: true,
        optionFilterProp: 'label',
        allowClear: true
      },
    },
    type: {
      type: 'number',
      title: '类型',
      required: true,
      'x-decorator': 'FormItem',
      enum: [],
      'x-read-pretty': '{{readOnly}}',
      'x-reactions': '{{fetchType}}',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择类型',
        allowClear: true
      },
    },
    mobile: {
      type: 'string',
      title: '手机',
      required: false,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-read-pretty': '{{readOnly}}',
      'x-validator': [
        {
          triggerType: 'onBlur',
          pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
          required: false,
          whitespace: true,
          message: '请输入正确的手机号',
        },
      ],
      'x-component-props': {
        placeholder: '请输入手机',
        allowClear: true,
        maxlength: 50,
      },
    },

    email: {
      type: 'string',
      title: '邮箱',
      required: false,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-read-pretty': '{{readOnly}}',
      'x-validator': [
        {
          triggerType: 'onBlur',
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          required: false,
          whitespace: true,
          message: '请输入正确的邮箱',
        },
      ],
      'x-component-props': {
        placeholder: '请输入邮箱',
        allowClear: true,
        maxlength: 30,
      },
    },
    roleIds: {
      type: 'string',
      title: '角色',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Select',
      'x-reactions': '{{fetchRoles}}',
      'x-component-props': {
        placeholder: '请选择角色',
        allowClear: true,
        mode: 'multiple',
        maxTagCount: 2,
      },
    },
  },
};