/**
 * formatDate：转换为相应格式的日期字符串
 * @param dateinit 13位的时间戳或是日期格式的字符串。必填。
 * @param format 日期格式。默认'yyyy-MM-dd hh:mm:ss'
 * @returns {string} 返回format格式的字符串
 */
const dateFormat = function(dateinit, format = 'yyyy/MM/dd hh:mm:ss') {
  let fmt = format;
  if (
    dateinit === null ||
    dateinit === 0 ||
    dateinit === '' ||
    dateinit === undefined
  ) {
    return '';
  }
  let date = new Date(dateinit);
  // 若改为let date = new Date(dateinit / 1000);则dateinit参数仅支持10位的时间戳

  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substring(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ('00' + o[k]).substring(('' + o[k]).length)
      );
    }
  }
  return fmt;
};

/**
 * 数字金额转化成大写金额
 * @param {*} n
 * @returns
 */
const convertCurrency = function(n) {
  var fraction = ['角', '分'];
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  var head = n < 0 ? '负' : '';
  n = Math.abs(n);
  var s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (
      digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
    ).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  );
};

/**
 * 将数字转为带千分位的金额数字
 * @param {*} num 要格式化的数字
 * @param {*} decimals 保留几位小数
 * @returns
 */
const numberThousandth = function(num = 0, decimals) {
  // 是否保留小数位
  if (decimals) {
    return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // 使用正则替换，每隔三个数加一个','
  } else {
    return String(num).replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
  }
};

/**
 * 手机号脱敏
 * @param str 要脱敏的手机号
 * @returns 脱敏后的手机号
 */
const desensitization = function(str) {
  let _str = str || '';

  return `${_str}`.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
};

export default {
  dateFormat,
  convertCurrency,
  numberThousandth,
  desensitization
};
