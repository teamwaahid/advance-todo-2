// dependencies:
const { Router } = require('express');
const { loginPageHandler,logoutHandler, signupPageHandler, signupHandler, loginHandler } = require('../controllers/auth/auth');
const { authChecker } = require('../middlewares/auth/authMiddleware');

// router
const authRouter = Router()

// signup page handler
authRouter.get('/signup', authChecker, signupPageHandler);

// signup handler 
authRouter.post('/signup', signupHandler)



// loginpage handler
authRouter.get('/login', authChecker, loginPageHandler )

// login handler
authRouter.post('/login', loginHandler )

authRouter.get('/logout', logoutHandler)

// exports
module.exports = authRouter;