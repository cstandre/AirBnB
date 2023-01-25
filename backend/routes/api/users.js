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
      const user = await User.signup({ firstName, lastName, email, username, password });

      console.log(setTokenCookie)

      return res.json({
        user
      });
    }
  );



module.exports = router;
