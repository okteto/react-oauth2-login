export function toParams(query) {
  return Object.fromEntries(new URLSearchParams(query));
}

export function toQuery(params, delimiter = '&') {
  const keys = Object.keys(params);
  return keys.reduce((str, key, index) => {
    if (typeof params[key] === 'undefined' || params[key] === null) return;
    let query = `${str}${key}=${params[key]}`;
    if (index < (keys.length - 1)) {
      query += delimiter;
    }
    return query;
  }, '');
}
