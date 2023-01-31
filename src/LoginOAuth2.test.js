import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import LoginOAuth2 from './LoginOAuth2';

describe('LoginOauth2', () => {
  it('should render defaults', () => {
    const { container, getByRole } = render(
      <LoginOAuth2
        clientId="foo"
        redirectUri="http://foo.test/auth/github"
        authorizeUri="http://bar.test"
      />,
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
    const { getByRole } = render(
      <LoginOAuth2
        clientId="foo"
        redirectUri="http://foo.test/auth/github"
        authorizeUri="http://bar.test"
        className="foobar"
      />,
    );

    const button = getByRole('button', {
      name: 'Sign in',
      hidden: false,
    });

    expect(button.getAttribute('class')).toBe('foobar');
  });

  it('should render with `buttonText`', () => {
    const buttonText = 'Foo';

    const { getByRole } = render(
      <LoginOAuth2 clientId="foo"
        authorizeUri="http://bar.test"
        redirectUri="http://foo.test/auth/github"
        buttonText={buttonText}
      />,
    );

    const button = getByRole('button', {
      name: buttonText,
      hidden: false,
    });

    expect(button).toBeEnabled();
    expect(button.getAttribute('class')).toBe('');
  });

  it('should open OAuth dialog', async () => {
    window.open = jest.fn();

    const clientId = 'foo';
    const redirectUri = 'http://foo.test/auth/github';
    const authorizeUri = 'http://bar.test';
    const query = `client_id=${clientId}&scope=email&redirect_uri=${redirectUri}&response_type=code&state=hello`;

    const { getByRole } = render(
      <LoginOAuth2
        clientId={clientId}
        redirectUri={redirectUri}
        state="hello"
        authorizeUri={authorizeUri}
      />,
    );

    const button = getByRole('button', {
      name: 'Sign in',
    });

    fireEvent.click(button);

    expect(window.open).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(`${authorizeUri}?${query}`, expect.any(String), expect.any(String));
  });
});
