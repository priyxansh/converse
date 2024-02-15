export type Credentials = {
  email: string;
  password: string;
};

export type Provider = "credentials" | "github";

export type AuthenticateOptions = {
  provider: Provider;
  credentials?: Credentials;
  isSignUp?: boolean;
};
