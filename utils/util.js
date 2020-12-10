const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const Time = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') 
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const arrRemoveObj = (array, obj) => {
  let length = array.length;
  for (let i = 0; i < length; i++) {
      if (array[i] === obj) {
          if (i === 0) {
              array.shift();
              return array;
          } else if (i === length - 1) {
              array.pop();
              return array;
          } else {
              array.splice(i, 1);
              return array;
          }
      }
  }
}
// export default Util; 
module.exports = {
  Time:Time,
  formatTime: formatTime,
  arrRemoveObj: arrRemoveObj
}
