// const express = require('express');
// const router = express.Router();
// const useController = ('../controllers/userController');
 
// //Define routes for user Functionality
// router.post('/register', userController.registerUser);
// router.post('/login',userController.loginUser);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const authMiddleware = require('../middlewares/authMiddleware');

// // POST /forgot-password
// router.post('/forgot-password', authController.forgotPassword);

// // GET /reset-password/:token
// router.get('/reset-password/:token', authMiddleware.authenticateToken, (req, res) => {
//   res.status(200).json({ message: 'Reset password page.' });
// });

// module.exports = router;
const express = require('express');
const {
  createUser,
  loginUser,
  logoutUser,
  createOrgAndUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/signup/org-user', createOrgAndUser);

// forgot password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.use(auth);
router.post('/logout', logoutUser);

module.exports = router;
