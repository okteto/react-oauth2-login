export function toParams(query) {
  // TODO: parsedQuery is a workaround to preserve the old behavior of toParams
  // but we should analyze if we can/should remove it
  const parsedQuery = query.replace(/^\??\//, '');
  return Object.fromEntries(new URLSearchParams(parsedQuery));
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
