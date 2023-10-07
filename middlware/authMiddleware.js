// const authenticateToken = (req, res, next) => {
//     // Here you would authenticate the token
//     const { token } = req.params;
//     // Simulated authentication for demonstration purposes
//     if (!token || !resetTokens.has(token)) {
//       return res.status(401).json({ error: 'Invalid or expired token.' });
//     }
//     next();
//   };
  
//   module.exports = { authenticateToken };
  
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken');
// const { createCustomError } = require('../errors/custom-errors');
// const User = require('../models/user.model');

// dotenv.config();
// async function auth(req, res, next) {
// }

// /**
//  * checks if the user is an admin user
//  * @requires auth middleware be added first
//  * @param {Express.Request} req
//  * @param {Express.Response} res
//  * @param {*} next
//  */
// function adminUser(req, res, next) {
//   const { is_admin } = req.user;
//   try {
//     if (!is_admin) {
//       throw createCustomError('Not admin user', 403);
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// }
// module.exports = { auth, adminUser };
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createCustomError } = require('../errors/custom-errors');
const User = require('../models/user.model');

const secretKey = process.env.JWT_SECRET_KEY;

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createCustomError('Fill all required fields', 400);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw createCustomError('Invalid credentials', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw createCustomError('Invalid credentials', 401);
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      message: 'User authenticated successfully',
      statusCode: 200,
      data: {
        access_token: token,
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res) => {
  try {
    // Assuming you have a valid token in the request header
    const token = req.header('Authorization').replace('Bearer ', '');

    // JWT verification here to ensure it's a valid token

    // Return a response indicating successful logout
    return res.status(200).json({ message: 'User logged out successfully.' });
  } catch (error) {
    // Handle any errors during logout (optional)
    return res.status(200).json({ message: 'User logged out successfully.' });
  }
};

module.exports = {
  loginUser,
  logoutUser,
};
