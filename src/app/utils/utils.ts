/**
* 树结构数组扁平化
* @param {*} data 树结构的数组
* @returns
*/
export function treeToArray(data: any[], pid: string|number): any[] {
  return data.reduce((pre, cur) => {
    const { children = [], ...item } = cur;
    return pre.concat([{ ...item, pid }], treeToArray(children || [], item.id))
  }, []);
}


export function arrayToTree2(items: any[], pid:number | string = 0): any[] | null{
  const tree: any[] = [];
  
  items.forEach(item => {
    if (item.pid === pid) {
      let children = arrayToTree2(items, item.id);
      
      // 如果子节点列表为空，则设置children为null
      if (children && !children.length) {
        children = null;
      }
      
      // 构造当前层级节点并添加子节点
      const node = { ...item, children };
      tree.push(node);
    }
  });

  return tree;
}

/**
 * 一维数组转树结构
 * @param items
 * @returns
 */

export function arrayToTree(items: any[]) {
  const result = [];   // 存放结果集
  const itemMap: any = {};  //
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem = itemMap[id];

    if (pid === '0') {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}


export const getTreeAllIds = (data: any):string[] => {
  return data.reduce((acc: any, cur: any) => {
    if(!acc.includes(cur.id)) acc.push(cur.id)
    return acc.concat(getTreeAllIds(cur.children || []))
  }, [])
}

export const filterSort= (optionA:any, optionB:any) =>
  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())



type OverloadFunction = {
    (...args: any[]): any;
    register: (types: (string | symbol)[], fn: Function) => void;
};

export function createOverload(): OverloadFunction {
    const fnMap = new Map<string, Function>();

    function overload(this: any, ...args: any[]): any {
        const key = args.map((a) => Array.isArray(a) ? 'array' : typeof a).join(',');
        const fn = fnMap.get(key);
        if (!fn) {
            throw new Error(`未找到对应的实现`);
        }
        return fn.apply(this, args);
    }

    overload.register = function (types: (string | symbol)[], fn: Function): void {
        if (typeof fn !== 'function') {
            throw new Error('最后一个参数必须是函数');
        }
        const key = types.join(',');
        fnMap.set(key, fn);
    };

    return overload as OverloadFunction;
}


// 示例用法
// const myOverload = createOverload();

// myOverload.register(['string', 'string'], (a: string, b: string) => a + b);
// myOverload.register(['number', 'number'], (a: number, b: number) => a + b);
// myOverload.register(['string', 'number'], (a: string, b: number) => ({ text: a, value: b }));

// console.log(myOverload("Hello", "World")); // 输出: HelloWorld
// console.log(myOverload(10, 20));           // 输出: 30
// console.log(myOverload("Age:", 25));  
