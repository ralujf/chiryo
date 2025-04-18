function sanitizeString(input) {
  if (typeof input !== 'string') {
    return input;
  }
  return input.replace(/[&<>'"`]/g, (char) => {
    const escapeChars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
      '`': '&#96;',
    };
    return escapeChars[char] || char;
  });
}

function sanitizeNumber(input) {
  const number = Number(input);
  return isNaN(number) ? null : number;
}

function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const sanitizedObj = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      sanitizedObj[key] = sanitizeInput(obj[key]);
    }
  }
  return sanitizedObj;
}

function sanitizeInput(input) {
  switch (typeof input) {
    case 'string':
      return sanitizeString(input);
    case 'number':
      return sanitizeNumber(input);
    case 'object':
      return sanitizeObject(input);
    default:
      return input;
  }
}

export { sanitizeInput, sanitizeString, sanitizeNumber, sanitizeObject };
