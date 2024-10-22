export const DEPT_SCHEMA = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: '名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-read-pretty': '{{readOnly}}',
      'x-component-props': {
        placeholder: '请输入名称',
        allowClear: true,
        maxlength: 50,
      },
      'x-validator': [
        {
          required: true,
          triggerType: 'onBlur',
          message: '请输入名称',
        },
      ],
    },
    simpleName: {
      type: 'string',
      title: '简称',
      required: false,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-read-pretty': '{{readOnly}}',
      'x-component-props': {
        placeholder: '请输入简称',
        allowClear: true,
        maxlength: 50,
      },
    },
    type: {
      type: 'number',
      title: '类型',
      required: true,
      'x-decorator': 'FormItem',
      enum: [],
      'x-read-pretty': '{{readOnly}}',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择类型',
        allowClear: true,
      },
    },
    leader: {
      type: 'string',
      title: '负责人',
      required: false,
      'x-decorator': 'FormItem',
      'x-read-pretty': '{{readOnly}}',
      'x-reactions': '{{fetchUsers}}',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择负责人',
        showSearch: true,
        optionFilterProp: 'label',
        allowClear: true,
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
    code: {
      type: 'string',
      title: '编码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-read-pretty': '{{readOnly}}',
      'x-validator': [
        {
          triggerType: 'onBlur',
          required: false,
          whitespace: true,
          message: '请输入编码',
        },
      ],
      'x-component-props': {
        placeholder: '请输入编码',
        allowClear: true,
        maxlength: 50,
      },
    },
    pid: {
      type: 'string',
      'x-hidden': true,
    },
    remark: {
      type: 'string',
      title: '备注',
      required: false,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-read-pretty': '{{readOnly}}',
      'x-component-props': {
        placeholder: '请输入备注',
        type: 'textarea',
        allowClear: true,
        maxlength: 200,
        showCount: true,
      },
    },
  },
};