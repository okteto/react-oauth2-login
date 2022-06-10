import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import LoginOAuth2 from './LoginOAuth2.js';

test('Renders defaults', () => {
  const component = renderer.create(
    <LoginOAuth2
      clientId="foo"
      redirectUri="http://foo.test/auth/github"
      authorizeUri="http://bar.test"
    />
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders with `className`', () => {
  const component = renderer.create(
    <LoginOAuth2
      clientId="foo"
      redirectUri="http://foo.test/auth/github"
      authorizeUri="http://bar.test"
      className="foobar"
    />
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Renders with `buttonText`', () => {
  const component = renderer.create(
    <LoginOAuth2 clientId="foo"
      authorizeUri="http://bar.test"
      redirectUri="http://foo.test/auth/github"
      buttonText="Foo"
    />
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Opens OAuth dialog', () => {
  const clientId = 'foo';
  const redirectUri = 'http://foo.test/auth/github';

  const component = (
    <LoginOAuth2
      clientId={clientId}
      redirectUri={redirectUri}
      state="hello"
      authorizeUri="http://bar.test"
    />
  );
  const wrapper = shallow(component);

  wrapper.find('button').simulate('click');

  const query = `client_id=${clientId}&scope=email&redirect_uri=${redirectUri}&response_type=code&state=hello`

  expect(wrapper.instance().popup.url).toBe(
    `http://bar.test?${query}`
  );
});
