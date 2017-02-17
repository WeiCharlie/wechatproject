function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 转换成xxxx年xx月xx日
*/
function formatDate(time) {
  var date = new Date(time)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return year + "年" + month + "月" + day + "日"
}

/**
 * 转换成xxxx-xx-xx
*/
function formatDate_(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

/**
 * 转换成xxxx年xx月
*/
function formatMonth(time) {
  var date = new Date(time)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return year + "年" + month + "月"
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatMonth: formatMonth,
  formatDate: formatDate,
  formatDate_: formatDate_
}
