const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
  check('email')
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage('Please provide a vaild email.'),
  check('username')
  .exists({ checkFalsy: true })
  .isLength({ min: 4 })
  .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
  .not()
  .isEmail()
  .withMessage('Username cannot be an email.'),
  check('password')
  .exists()
  .isLength({ min: 6 })
  .withMessage('Password must be 6 characters or more.'),
  check('firstName')
  .exists()
  .withMessage('Please provide a first name.'),
  check('lastName')
  .exists()
  .withMessage('Please provide a last name.'),
  handleValidationErrors
];



router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const userEmail = await User.findOne({ where: {email: email } })
      const userUsername = await User.findOne({ where: {username: username } })

      if (userEmail) {
        res.status(403).json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": ["User with that email already exists"]
        })
      }

      if (userUsername) {
        res.status(403).json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": ["User with that username already exists"]
        })
      }

      const user = await User.signup({ firstName, lastName, email, username, password });

      await setTokenCookie(res, user)

      return res.json({
        user
      });
    }
  );



module.exports = router;
