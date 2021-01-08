# React OAuth2 Login

React component for [OAuth2 login](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce/?utm_campaign=text_website_all_multiple_dev_dev_oauth-pkce_null&utm_source=oauthio&utm_medium=cpc).

## Installation

```console
yarn add @okteto/react-oauth2-login
```

or

```console
npm install @okteto/react-oauth2-login
```

## Usage

```js
import React from 'react';
import ReactDOM from 'react-dom';
import OAuth2Login from 'react-oauth2-login';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(
  <OAuth2Login clientId="xxXXxxXXxxxxxXXXXx"
    authorizeUri="https://example.com/oauth2/authorize"
    onSuccess={onSuccess}
    onFailure={onFailure}/>,
  document.getElementById('example')
);
```

### Props

#### `authorizeUri`

`{string}` _required_

Authorize Uri for the OAuth2 application.

#### `clientId`

`{string}` _required_

Client ID for the OAuth2 application.

#### `redirectUri`

`{string}`

Registered redirect URI for GitHub OAuth application.

#### `scope`

`{string}`

Scope for OAuth2 application. Defaults to `oidc:email`.

#### `className`

`{string}`

CSS class for the login button.

#### `buttonText`

`{string}`

Text content for the login button.

#### `onRequest`

`{function}`

Callback for every request.

#### `onSuccess`

`{function}`

Callback for successful login. An object will be passed as an argument to the callback, e.g. `{ "code": "..." }`.

#### `onFailure`

`{function}`

Callback for errors raised during login.

#### `state`

`{string}`

Pass `state` value as a parameter of the redirect URI.


## Development

```sh
$ yarn start
```

Webpack development server starts at [http://localhost:8080](http://localhost:8080), loading [example/index.html](github.com/okteto/react-oauth2-login/tree/master/example/index.html).


*This component was inspired by https://github.com/checkr/react-github-login*
