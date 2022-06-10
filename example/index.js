import React from 'react';
import ReactDOM from 'react-dom';
import OAuth2 from '../src/OAuth2Login';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(
  <OAuth2
    authorizeUri="https://discord.com/oauth2/authorize"
    responseType="code"
    clientId="XXXXX"
    redirectUri=""
    scope="identify guilds"
    onSuccess={onSuccess}
    onFailure={onFailure}
    params={{
      prompt: 'consent',
      access_type: 'offline'
    }}
  />,
  document.getElementById('example')
);
