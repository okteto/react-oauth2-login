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
    disabled: PropTypes.bool
  }

  static defaultProps = {
    buttonText: 'Sign in',
    redirectUri: '',
    authorizeUri: '',
    scope: 'email',
    responseType: 'code',
    popupHeight: 650,
    popupWidth: 500,
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
  }

  onBtnClick = () => {
    const {
      authorizeUri, clientId, scope, redirectUri, responseType,
      popupHeight, popupWidth
    } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
      response_type: responseType,
    });

    let top = window.screen.height - popupHeight;
    top = top > 0 ? top / 2 : 0;

    let left = window.screen.width - popupWidth;
    left = left > 0 ? left / 2 : 0;

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
