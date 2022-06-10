interface LoginOAuth2Props {
  className: string;
  clientId: string;
  scope: string;
  state?: string;
  authorizeUri: string;
  redirectUri: string;
  onClick(): void;
  onSuccess(response: { code: string }): void;
  onFailure(response: { message: string }): void;
  params?: { [key: string]: string };
  children?: React.ReactNode;
}

declare const LoginOAuth2: React.FC<LoginOAuth2Props>;

export default LoginOAuth2;
