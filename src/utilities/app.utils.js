const commanumbers = number => {
  let numberString;
  if (number !== undefined) {
    numberString = number.toLocaleString(undefined, {
      maximumFractionDigits: 2
    });
  }
  return numberString;
};

const intersect = (arr1, arr2, accessors = [v => v, v => v], reverse) => {
  const [fn1, fn2] = accessors;
  const set = new Set(arr2.map(v => fn2(v)));
  return arr1.filter(value =>
    reverse ? !set.has(fn1(value)) : set.has(fn1(value))
  );
};

const byteConverter = (bytes, decimals) => {
  if (bytes === 0) return "0 Bytes";
  var k = 1024,
    dm = decimals <= 0 ? 0 : decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const validateExtension = (allowedFiles, fileName) => {
  var regex = new RegExp(
    "([a-zA-Z0-9s_\\.-:])+(" + allowedFiles.join("|") + ")$"
  );
  if (!regex.test(fileName.toLowerCase())) {
    return false;
  }
  return true;
};

const getCookie = cname => {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const luhnCheck = value => {
  if (/[^0-9-\s]+/.test(value)) return false;

  let nCheck = 0,
    bEven = false;
  value = value.replace(/\D/g, "");

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

    nCheck += nDigit;
    bEven = !bEven;
  }

  return nCheck % 10 === 0;
};

const formatDOB = dob => {
  if(typeof(dob) === "string") {
    const year = dob.substring(0,4);
    const month = dob.substring(4,6);
    const day = dob.substring(6,8)
    const formattedDOB = `${day}${"-"}${month}${"-"}${year}`;
    return formattedDOB
  } else {
    return dob;
  }
}

const isEmptyObject = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

const downloadFile = filePath => {
  var link = document.createElement("a");
  link.target = '_blank';
  link.href = filePath;
  link.download = filePath.substr(filePath.lastIndexOf("/") + 1);
  link.click();
};

export const appUtils = {
  commanumbers,
  validateExtension,
  byteConverter,
  intersect,
  luhnCheck,
  formatDOB,
  downloadFile,
  isEmptyObject,
  getCookie
};
