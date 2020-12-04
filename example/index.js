import React from 'react';
import ReactDOM from 'react-dom';
import OAuth2 from '../src/OAuth2Login';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(
  <OAuth2 clientId=""
    authorizeUri=""
    redirectUri=""
    onSuccess={onSuccess}
    onFailure={onFailure}/>,
  document.getElementById('example')
);
