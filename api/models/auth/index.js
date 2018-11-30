class SignInResponse {
  constructor({ token }) {
    this.token = token;
  }
}

class SignUpResponse {
  constructor({
    token, refreshToken, expiresIn, email, id,
  }) {
    this.token = token;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.email = email;
    this.id = id;
  }
}

module.exports = {
  SignInResponse,
  SignUpResponse,
};
