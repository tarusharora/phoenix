class EmailVerifyResponse {
  constructor({ userId, email, message }) {
    this.userId = userId;
    this.email = email;
    this.message = message;
  }
}

module.exports = {
  EmailVerifyResponse,
};
