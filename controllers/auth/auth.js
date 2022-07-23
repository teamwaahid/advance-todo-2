const User = require("../../models/User")
const { hashStr } = require("../../utilities/utilities")
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const auth = {}

// signup page controller
auth.signupPageHandler = (req, res) => {
    try {
        res.render('auth/signup')

    } catch (error) {
        throw error
    }
}
// signup  controller
auth.signupHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({
            name,
            email,
            password: await hashStr(password)
        })
        const result = await user.save()
       res.render('signupdone')


    } catch (error) {
        throw error
    }
}


// login page controller
auth.loginPageHandler = (req, res) => {
    try {
        res.render('auth/login', {err: null, email:null, emailError: false, passwordErr:false})

    } catch (error) {
        throw error
    }
}

// login page controller
auth.loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isMatched = await bcrypt.compare(password, user.password)
            if (isMatched) {
                const token = await jwt.sign({
                    email,
               }, process.env.JWT_SECRETE, {expiresIn: "1h"})

                res.cookie('assess_token', "Bearer " + token,{signed: true, httpOnly:true,secure:true})
                res.redirect('/')

            } else {
                res.render('auth/login', { err: "Wrong passord!", emailError: false, passwordErr:true, email})
           }
            
        } else {
            res.render('auth/login', { err: "User not found!", emailError: true, passwordErr:false, email})
        }

    } catch (error) {
        throw error
    }
}


auth.logoutHandler = (req, res)=>{
    try {
        res.clearCookie('assess_token')
        res.redirect('/login')
    } catch (error) {
       throw error 
    }
}


module.exports = auth;
