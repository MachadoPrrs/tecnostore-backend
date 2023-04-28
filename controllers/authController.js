const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, status, res, errorMessage) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // remove password
  user.password = undefined;

  const verificarAdmin = await checkAdmin(user.email);

  if (errorMessage) {
    res.status(status).json({
      status: 'error',
      message: errorMessage,
    });
  } else {
    res.status(status).json({
      status: 'success',
      token,
      verificarAdmin,
      // data: {
      //   user,
      // },
    });
  }
};

exports.signup = catchAsync(async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    // Enviar una respuesta de error con el mensaje adecuado.
    createSendToken(null, 400, res, error.message);
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

const checkAdmin = async function (emailRequest, next) {
  const email = emailRequest;
  const verificarEmail = await User.findOne({ email });

  if (verificarEmail && verificarEmail.role === 'admin') {
    return true;
  } else {
    return false;
  }
};
