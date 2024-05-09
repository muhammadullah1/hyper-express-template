exports.INVITATION = {
  email: "no-reply@test.com",
  subject: "Activate Your test.com Account",
  body: "You are invited to join test.com. Please click on the link below or paste it into your browser to complete the registration process.",
  footer: "",
  btnName: "Accept Invite",
  url: "/auth/invite",
};

exports.JWT_ERR_MESSAGES = {
  JsonWebTokenError: "Invalid Token",
  TokenExpiredError: "Expired Token",
  NotBeforeError: "Token Not Yet Valid",
  AudienceError: "Audience Mismatch",
  IssuerError: "Issuer Mismatch",
  RevokedTokenError: "Revoked Token",
  MissingRequiredClaimError: "Missing Required Claims",
};


exports.FORGOT_PASSWORD = {
  email: "no-reply@test.com",
  subject: "test.com Reset password request",
  body: "Click the link below or copy paste the URL into your browser to reset your password.",
  footer: "If you didn't request this, contact your support team immediately.",
  btnName: "Reset Password",
  url: "/auth/confirm-forgot-password",
};
