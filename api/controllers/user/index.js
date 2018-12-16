const { EmailVerifyResponse } = require('../../models/user/index');
const { INVALID_TOKEN } = require('../../models/Errors');
const User = require('../../models/User');
const EmailVerifyToken = require('../../models/EmailVerifyToken');
const { EMAIL_VERIFIED, PLEASE_TRY_AGAIN } = require('../../models/Messages');

const verifyEmailToken = async (req, res) => {
  const { token } = req.query;
  try {
    const tokenInfo = await EmailVerifyToken.findOne({ token }).lean().exec();
    if (!tokenInfo) {
      res.send(new Error(INVALID_TOKEN));
    }
    const { userId } = tokenInfo;

    const verifiedUser = await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true }).exec();
    if (verifiedUser && verifiedUser.isVerified) {
      return res.send(new EmailVerifyResponse({ message: EMAIL_VERIFIED }));
    }
    res.code(500);
    return res.send(new EmailVerifyResponse({ message: PLEASE_TRY_AGAIN }));
  } catch (err) {
    throw err;
  }
};

module.exports = {
  verifyEmailToken,
};
