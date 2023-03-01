import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginOAuth2Window from './LoginOAuth2Window';
import { toQuery } from './utils';

class LoginOAuth2 extends Component {
  static propTypes = {
    authorizeUri: PropTypes.string,
    buttonText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    clientId: PropTypes.string.isRequired,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    popupHeight: PropTypes.number,
    popupWidth: PropTypes.number,
    redirectUri: PropTypes.string,
    scope: PropTypes.string,
    state: PropTypes.string,
    responseType: PropTypes.string,
    disabled: PropTypes.bool,
    params: PropTypes.object,
  }

  static defaultProps = {
    buttonText: 'Sign in',
    redirectUri: '',
    authorizeUri: '',
    state: '',
    scope: 'email',
    responseType: 'code',
    popupHeight: 650,
    popupWidth: 500,
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
    params: {},
  }

  onBtnClick = () => {
    const {
      authorizeUri, clientId, scope, redirectUri, responseType, state,
      popupHeight, popupWidth, params,
    } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      response_type: responseType,
      state,
      ...params,
    });

    // To fix issues with window.screen in multi-monitor setups, the easier option is to
    // center the pop-up over the parent window.
    const top = window.top.outerHeight / 2 + window.top.screenY - (popupHeight / 2);
    const left = window.top.outerWidth / 2 + window.top.screenX - (popupWidth / 2);

    const url = `${authorizeUri}?${search}`;
    const popup = this.popup = LoginOAuth2Window.open(
      'github-oauth2-authorize',
      url,
      {
        height: popupHeight,
        width: popupWidth,
        top,
        left,
      },
    );

    this.onRequest();
    popup.then(
      (data) => this.onSuccess(data),
      (error) => this.onFailure(error),
    );
  }

  onRequest = () => {
    this.props.onRequest();
  }

  onSuccess = (data) => {
    const { responseType } = this.props;
    if (data.error) {
      return this.onFailure(new Error(`'${data.error}': ${data.error_description}`));
    }

    if (!data[responseType]) {
      return this.onFailure(new Error(`'${responseType}' not found: ${JSON.stringify(data)}`));
    }

    this.props.onSuccess(data);
  }

  onFailure = (error) => {
    this.props.onFailure(error);
  }

  render() {
    const {
      className, buttonText, children, disabled,
    } = this.props;
    const attrs = {
      onClick: this.onBtnClick,
      className: className || '',
      disabled: disabled || false,
    };
    return <button {...attrs}>{ children || buttonText }</button>;
  }
}

export default LoginOAuth2;
