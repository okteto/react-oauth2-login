import { toParams, toQuery } from './utils';

const clientId = 'foo';
const redirectUri = 'http://foo.test/auth/github';
const scope = 'email';
const responseType = 'code';
const state = 'hello';

describe('toParams', () => {
  it('should return a params object', () => {
    const query = `client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${state}`;

    const returnedObject = toParams(query);

    expect(returnedObject).toStrictEqual({
      client_id: clientId, redirect_uri: redirectUri, scope, response_type: responseType, state,
    });
  });
});

describe('toQuery', () => {
  const params = {
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    response_type: responseType,
    state,
  };
  const delimiter = '-';

  it('should transform params to query', () => {
    const query = `client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${state}`;

    expect(toQuery(params)).toStrictEqual(query);
  });

  it('should replace default delimiter if passed', () => {
    const query = `client_id=${clientId}${delimiter}scope=${scope}${delimiter}redirect_uri=${redirectUri}${delimiter}response_type=${responseType}${delimiter}state=${state}`;

    expect(toQuery(params, delimiter)).toStrictEqual(query);
  });

  it('should not end with delimiter', () => {
    const result = toQuery(params, delimiter);

    expect(result[result.length - 1]).not.toBe(delimiter);
  });
});
