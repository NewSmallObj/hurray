export const COLUMN_SCHEMA = {
  type: 'object',
  properties: {
    pid: {
      type: 'string',
      title: '父级',
      required: true,
      // 'x-hidden': '{{showPid}}',
      enum: [{}],
      'x-decorator': 'FormItem',
      'x-component': 'TreeSelect',
      'x-read-pretty': true,
      'x-reactions': '{{fetchMenuTree}}',
    },
    show_type: {
      type: 'string',
      title: '类型',
      required: false,
      enum: [
        { label: '文本列表', value: '1' },
        { label: '图文列表', value: '2' },
        { label: '详情', value: '3' },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-reactions':'{{visableShowType}}',
      'x-read-pretty': '{{readOnly}}',
      'x-component-props': {
        placeholder: '请选择类型',
        allowClear:true
      },
    },
    title: {
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
        maxLength: 50,
      },
    },
    url: {
      type: 'string',
      title: '地址',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-reactions':'{{visableUrl}}',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入地址',
        allowClear: true,
        maxLength: 50,
      },
    },
    
    icon: {
      type: 'string',
      title: '图标',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'SelectIcon',
      'x-component-props': {
        placeholder: '请选择图标',
      },
    },
    
    sort: {
      type: 'number',
      title: '排序',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-read-pretty': '{{readOnly}}',
      'x-validator': [
        {
          triggerType: 'onBlur',
          required: false,
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
    url_open_with: {
      type: 'string',
      title: '新窗口打开',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Switch',
    },
    show_nav: {
      type: 'string',
      title: '导航展示',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Switch',
    },
  },
}