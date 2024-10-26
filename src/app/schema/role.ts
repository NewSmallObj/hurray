export const ROLE_SCHEMA = {
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
        maxLength: 50,
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
        maxLength: 50,
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
        maxLength: 20
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
    menuIds: {
      type: 'array',
      title: '菜单权限',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'SelectTable',
      'x-reactions': '{{fetchMenuTree}}',
      'x-component-props': {
        bordered: false,
        showSearch: true,
        primaryKey: 'id',
        isTree: true,
        filterOption: (input: String, option: any) =>
          option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0,
        filterSort: (optionA: any, optionB: any) =>
          optionA.name
            .toLowerCase()
            .localeCompare(optionB.name.toLowerCase()),
        optionAsValue: false, // 返回整行数据
        rowSelection: {
          checkStrictly: true,
        },
        pagination:false
      },
      enum:[],
      properties: {
        name: {
          title: '名称',
          type: 'string',
          'x-component': 'SelectTable.Column',
        },
      },

    },
  }
};