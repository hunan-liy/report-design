// 定义一些允许外界修改的值
const propertys = [
  'abort',
  'error',
  'load',
  'loadend',
  'loadstart',
  'progress',
  'timeout',
  'success',
  'type',
  'async',
  'url',
  'data',
  'params',
  'contentType'
];
/**
 *
 * @description 请求的核心方法-原生
 * @param {*} [options={}]
 */
function xhrHandle(options = {}) {
  const type = options.type || 'get'; // 设置请求类型，如果没有传请求类型，默认为get
  const async = options.async || true; // 是否时异步请求，默认为true，如果是同步请求，页面会在请求数据时假死
  var url = options.url || location.origin; // 如果没有传请求地址，那就默认当前源为目标地址
  let header = options.header || {};

  var contentType =
    options.contentType ||
    header['Content-Type'] ||
    'application/json;charset=UTF-8'; // 设置默认的请求类型
  header['Content-Type'] = contentType;
  var data; // data为post发送数据
  // 当花括号内容只有一行时，可以省略
  if (contentType.indexOf('json') > -1 && options.data) {
    data = JSON.stringify(options.data);
  } else {
    data = buildParams(options.data);
  }
  // 构建url参数或者表单数据
  if (options.params) {
    url += '?' + buildParams(options.params);
  }
  // 实例化xhr对象
  var xhr = new XMLHttpRequest();
  // 遍历并快速赋值到我们xhr对象上，好处是不用一个一个赋值，坏处，需要控制好属性，不必要的属性也会添加到对象上
  for (var key of propertys) {
    xhr[key] = options[key];
  }
  // 在xhr状态发生改变时进行我们success方法的业务执行
  xhr.onreadystatechange = function () {
    // readyState:4 表示资源下载完成
    // status:200 表示服务器返回正确
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 判断是否有success方法并执行
      let res = xhr.response;
      try {
        res = JSON.parse(res);
      } catch (error) {
        console.log(error);
      }

      options.success && options.success(res);
    }
  };
  // 配置请求类型和目的地址
  xhr.open(type, url, async);
  // 处理请求头
  Object.keys(header).forEach((key) => {
    xhr.setRequestHeader(key, header[key]);
  });
  // 发送数据到服务端
  xhr.send(data);
}

/**
 *
 * @description 构建params参数
 * @param {*} obj
 * @return {*}
 */
function buildParams(obj) {
  var vs = [];
  for (var key in obj) {
    vs.push(key + '=' + obj[key]);
  }
  return vs.join('&'); // 通过  &  符号合并数组的字段
}

export function post(url, data, success, contentType) {
  xhrHandle({ type: 'post', url, data, success, contentType });
}

export function get(url, params, success) {
  xhrHandle({ type: 'get', url, params, success });
}

export default xhrHandle;
