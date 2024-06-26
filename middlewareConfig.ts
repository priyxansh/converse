export const middlewareConfig = {
  excludedPaths: {
    withRedirectToAuth: [
      "/",
      "/about",
      "/faq",
      "/feedback",
      "/auth",
      "/auth/signin",
      "/auth/signup",
    ],
    withRedirectToSetPassword: ["/auth/set-password"],
    withRedirectToCompleteProfile: ["/auth/complete-profile"],
  },
};
