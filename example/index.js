import React from 'react';
import { createRoot } from 'react-dom/client';
import LoginOAuth2 from '../src/LoginOAuth2';

const container = document.getElementById('example');
const root = createRoot(container);

const onSuccess = (response) => console.log(response);
const onFailure = (response) => console.error(response);

root.render(
  <LoginOAuth2
    authorizeUri="https://discord.com/oauth2/authorize"
    responseType="code"
    clientId="XXXXX"
    redirectUri=""
    scope="identify guilds"
    onSuccess={onSuccess}
    onFailure={onFailure}
    params={{
      prompt: 'consent',
      access_type: 'offline',
    }}
  />,
);
