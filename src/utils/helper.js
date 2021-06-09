export const isEmptyObj = (obj) => {
  return Object.keys(obj).length === 0;
};

export const moneyFormat = (price, sign = '$', delimeter = '.') => {
  const pieces = parseFloat(price).toFixed(2).split('');
  let ii = pieces.length - 3;
  while ((ii -= 3) > 0) {
    pieces.splice(ii, 0, delimeter);
  }
  return sign + pieces.join('').substr(0, pieces.length - 3);
};

export const sortArr = function (props, arr) {
  console.log(props);
  let prop = props.split('.');
  var len = prop.length;

  arr.sort(function (a, b) {
    var i = 0;
    while (i < len) {
      a = a[prop[i]];
      b = b[prop[i]];
      i++;
    }
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
};

export const addDays = (date, sign = '+', days) => {
  let result = date;

  if (sign === '+') {
    result.setDate(result.getDate() + days);
  } else {
    result.setDate(result.getDate() - days);
  }

  return result;
};
