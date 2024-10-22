export const DICT_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Input',
      'x-validator': [
        {
          triggerType: 'onBlur',
          max: 50,
          min: 1,
          required: true,
          whitespace: true,
          message: '名称应在1-50个字符之间',
        },
      ],
      'x-component-props': {
        placeholder: '请输入名称',
        allowClear: true,
        maxlength: 50,
      },
    },
    code: {
      type: 'string',
      title: '编码',
      required: true,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Input',
      'x-validator': [
        {
          triggerType: 'onBlur',
          max: 50,
          min: 1,
          required: true,
          whitespace: true,
          message: '编码应在1-50个字符之间',
        },
      ],
      'x-component-props': {
        placeholder: '请输入编码',
        allowClear: true,
        maxlength: 50,
      },
    },
    remark: {
      type: 'string',
      title: '描述',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: "请输入描述",
        allowClear: true,
        maxlength: 20
      },
    },
    sort: {
      type: 'number',
      title: '排序',
      required: true,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'NumberPicker',
      'x-validator': [
        {
          triggerType: 'onBlur',
          required: true,
          whitespace: true,
          message: '请输入排序',
        },
      ],
      'x-component-props': {
        placeholder: '请输入排序',
        allowClear: true,
        max: 999999,
        min: 0,
      },
    },
    disabled: {
      type: 'string',
      title: '是否禁用',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Switch',
    },
    loginReturn: {
      type: 'string',
      title: '登陆返回',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Switch',
    }
  }
};