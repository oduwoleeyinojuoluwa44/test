const resetTokens = new Map();

const generateResetToken = () => {
  const token = Math.random().toString(36).substr(2, 10);
  return token;
};

const sendResetEmail = (email, token) => {
  // Logic to send a reset password email (you can use nodemailer)
  console.log(`Reset link for ${email}: http://example.com/reset-password/${token}`);
};

const forgotPassword = (req, res) => {
  const { email } = req.body;

  const resetToken = generateResetToken();
  resetTokens.set(email, resetToken);

  // Send the reset password email
  sendResetEmail(email, resetToken);

  res.status(200).json({ message: 'Reset password link sent successfully.' });
};

module.exports = { forgotPassword };
