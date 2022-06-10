import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PopupWindow from './PopupWindow';
import { toQuery } from './utils';

class OAuth2Login extends Component {
  static propTypes = {
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
    disabled: PropTypes.bool,
    params: PropTypes.object
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
    params: {}
  }

  onBtnClick = () => {
    const {
      authorizeUri, clientId, scope, redirectUri, responseType, state,
      popupHeight, popupWidth, params
    } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      response_type: responseType,
      state,
      ...params
    });

    // To fix issues with window.screen in multi-monitor setups, the easier option is to
    // center the pop-up over the parent window.
    const top = window.top.outerHeight / 2 + window.top.screenY - (popupHeight / 2);
    const left = window.top.outerWidth / 2 + window.top.screenX - (popupWidth / 2);

    const url = `${authorizeUri}?${search}`;
    const popup = this.popup = PopupWindow.open(
      'github-oauth2-authorize',
      url,
      {
        height: popupHeight,
        width: popupWidth,
        top: top,
        left: left
      }
    );

    this.onRequest();
    popup.then(
      data => this.onSuccess(data),
      error => this.onFailure(error)
    );
  }

  onRequest = () => {
    this.props.onRequest();
  }

  onSuccess = (data) => {
    if (data.error) {
      return this.onFailure(new Error(`'${data.error}': ${decodeURI(data.error_description)}`));
    }

    if (!data.code) {
      return this.onFailure(new Error(`'code' not found: ${JSON.stringify(data)}`));
    }

    this.props.onSuccess(data);
  }

  onFailure = (error) => {
    this.props.onFailure(error);
  }

  render() {
    const { className, buttonText, children, disabled } = this.props;
    const attrs = {
      onClick: this.onBtnClick,
      className: className || '',
      disabled: disabled || false
    };
    return <button {...attrs}>{ children || buttonText }</button>;
  }
}

export default OAuth2Login;
