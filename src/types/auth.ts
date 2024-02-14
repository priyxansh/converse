export type Credentials = {
  email: string;
  password: string;
};

export type Provider = "credentials";

export type AuthenticateOptions = {
  provider: Provider;
  credentials?: Credentials;
  isSignUp?: boolean;
};
