import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { findInstance } from 'react-dom-instance';

import LoginOAuth2 from './LoginOAuth2.js';

describe('LoginOauth2', () => {
  it('should render defaults', () => {
    const { container, getByRole } = render(
      <LoginOAuth2
        clientId="foo"
        redirectUri="http://foo.test/auth/github"
        authorizeUri="http://bar.test"
      />
    );
    
    expect(container.firstChild).toMatchSnapshot();
  
    const button = getByRole('button', {
      name: 'Sign in',
      hidden: false,
    });
  
    expect(button).toBeEnabled();
    expect(button.getAttribute('class')).toBe('');
  });
  
  it('should render with `className`', () => {
    const { container, getByRole } = render(
      <LoginOAuth2
        clientId="foo"
        redirectUri="http://foo.test/auth/github"
        authorizeUri="http://bar.test"
        className="foobar"
      />
    );
  
    const button = getByRole('button', {
      name: 'Sign in',
      hidden: false,
    });
  
    expect(button.getAttribute('class')).toBe('foobar');
  });
  
  it('should render with `buttonText`', () => {
    const buttonText = 'Foo';
  
    const { container, getByRole } = render(
      <LoginOAuth2 clientId="foo"
        authorizeUri="http://bar.test"
        redirectUri="http://foo.test/auth/github"
        buttonText={buttonText}
      />
    );
  
    const button = getByRole('button', {
      name: buttonText,
      hidden: false,
    });
  
    expect(button).toBeEnabled();
    expect(button.getAttribute('class')).toBe('');
  });
  
  it('should open OAuth dialog', async () => {
    const clientId = 'foo';
    const redirectUri = 'http://foo.test/auth/github';
    const authorizeUri = 'http://bar.test'
    const query = `client_id=${clientId}&scope=email&redirect_uri=${redirectUri}&response_type=code&state=hello`
  
    const { container, getByRole } = render(
      <LoginOAuth2
        clientId={clientId}
        redirectUri={redirectUri}
        state="hello"
        authorizeUri={authorizeUri}
      />
    );
  
    const button = getByRole('button', {
      name: 'Sign in'
    });
  
    await fireEvent.click(button)
  
    expect(findInstance(container).popup.url).toBe(
      `${authorizeUri}?${query}`
    );
  });
})
